"""
Property-based roundtrip tests using Hypothesis.
The core invariant: decompress(compress(s)) == s for all valid inputs.
"""

import pytest
from hypothesis import given, settings, strategies as st
from babel.codec import compress, decompress, BASE_OUT

printable_ascii = st.text(
    alphabet=st.characters(min_codepoint=32, max_codepoint=126),
    min_size=1,
    max_size=500,
)


@given(printable_ascii)
@settings(max_examples=500)
def test_roundtrip(s):
    depth, compressed = compress(s)
    recovered = decompress(depth, compressed)
    assert recovered == s


@given(printable_ascii)
def test_depth_invariant(s):
    depth, _ = compress(s)
    assert depth == max(ord(c) for c in s)
    assert 32 <= depth <= 126


@given(printable_ascii)
def test_compressed_is_printable_ascii(s):
    _, compressed = compress(s)
    assert all(32 <= ord(c) <= 126 for c in compressed)
    assert len(compressed) >= 1


@given(printable_ascii)
def test_compression_ratio_narrow_charset(s):
    # Strings using only digits (max ord 57, base_in 58 < base_out 95)
    # should compress for length >= 2
    digits_only = st.text(
        alphabet=st.characters(min_codepoint=48, max_codepoint=57),
        min_size=3,
    )


@given(st.text(
    alphabet=st.characters(min_codepoint=48, max_codepoint=57),
    min_size=3,
    max_size=200,
))
def test_digit_strings_compress(s):
    depth, compressed = compress(s)
    # base_in=58, base_out=95: ratio should be < 1 for strings of length >= 3
    assert len(compressed) <= len(s)
    assert decompress(depth, compressed) == s
