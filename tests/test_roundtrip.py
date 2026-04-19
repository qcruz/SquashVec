"""
Property-based roundtrip tests using Hypothesis.
Core invariant: decompress(*compress(s)) == s for all valid inputs.
"""

from hypothesis import given, settings, strategies as st
from babel.codec import compress, decompress, BASE_OUT, CHARSET

# Any character in our CHARSET
babel_chars = st.sampled_from(CHARSET)
babel_text = st.text(alphabet=babel_chars, min_size=1, max_size=500)


@given(babel_text)
@settings(max_examples=500)
def test_roundtrip(s):
    depth, length, compressed = compress(s)
    recovered = decompress(depth, length, compressed)
    assert recovered == s


@given(babel_text)
def test_depth_is_max_charset_index(s):
    from babel.codec import _CHAR_TO_IDX
    depth, _, _ = compress(s)
    expected = max(_CHAR_TO_IDX[c] for c in s)
    assert depth == expected
    assert 0 <= depth <= BASE_OUT - 1


@given(babel_text)
def test_base_in_leq_base_out(s):
    depth, _, _ = compress(s)
    assert depth + 1 <= BASE_OUT


@given(babel_text)
def test_compressed_chars_in_charset(s):
    from babel.codec import _CHAR_TO_IDX
    _, _, compressed = compress(s)
    assert all(c in _CHAR_TO_IDX for c in compressed)
    assert len(compressed) >= 1


@given(st.text(
    alphabet=st.characters(min_codepoint=48, max_codepoint=57),
    min_size=3,
    max_size=200,
))
def test_digit_strings_always_compress(s):
    # digits: CHARSET index 16-25, base_in≤26 << BASE_OUT → strong compression
    depth, length, compressed = compress(s)
    assert len(compressed) <= len(s)
    assert decompress(depth, length, compressed) == s
