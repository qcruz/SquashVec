"""Deterministic unit tests for the Babel codec."""

import pytest
from babel.codec import compress, decompress, CHARSET, BASE_OUT, _CHAR_TO_IDX
from babel.exceptions import BabelInputError, BabelDecodeError


# CHARSET index helper
def idx(c): return _CHAR_TO_IDX[c]


def test_single_char_uppercase():
    # 'A' = ASCII 65, CHARSET index 33
    depth, length, compressed = compress("A")
    assert depth == 33
    assert length == 1
    # N = 33, in base 95: CHARSET[33] = chr(65) = 'A'
    assert compressed == "A"
    assert decompress(depth, length, compressed) == "A"


def test_single_char_space():
    # space = ASCII 32, CHARSET index 0
    depth, length, compressed = compress(" ")
    assert depth == 0
    assert length == 1
    assert decompress(depth, length, compressed) == " "


def test_leading_spaces_preserved():
    text = "   hello"
    depth, length, compressed = compress(text)
    assert decompress(depth, length, compressed) == text


def test_all_spaces():
    text = "     "
    depth, length, compressed = compress(text)
    assert depth == 0
    assert decompress(depth, length, compressed) == text


def test_digits_only_roundtrip():
    text = "1234567890"
    depth, length, compressed = compress(text)
    assert depth == idx("9")   # '9' = ASCII 57, index 25
    assert length == 10
    assert decompress(depth, length, compressed) == text


def test_digits_compress():
    # base_in = 26 (depth=25 for '9') < base_out=95 → compression for long strings
    text = "0" * 20
    depth, length, compressed = compress(text)
    assert len(compressed) < len(text)
    assert decompress(depth, length, compressed) == text


def test_repeated_char_roundtrip():
    text = "aaaaaaaaaa"
    depth, length, compressed = compress(text)
    assert depth == idx("a")   # 'a' = ASCII 97, index 65
    assert decompress(depth, length, compressed) == text


def test_full_sentence_roundtrip():
    text = "Hello, World!"
    depth, length, compressed = compress(text)
    assert decompress(depth, length, compressed) == text


def test_depth_is_max_charset_index():
    text = "abcXYZ123"
    depth, _, _ = compress(text)
    assert depth == max(idx(c) for c in text)


def test_compressed_chars_in_charset():
    text = "The quick brown fox jumps over the lazy dog."
    _, _, compressed = compress(text)
    assert all(c in _CHAR_TO_IDX for c in compressed)


def test_empty_string_raises():
    with pytest.raises(BabelInputError):
        compress("")


def test_tab_raises():
    with pytest.raises(BabelInputError):
        compress("hello\tworld")


def test_newline_raises():
    with pytest.raises(BabelInputError):
        compress("hello\nworld")


def test_bad_depth_range_raises():
    with pytest.raises(BabelDecodeError):
        decompress(BASE_OUT, 5, "hello")   # depth must be 0–(BASE_OUT-1)


def test_decompress_invalid_char_raises():
    with pytest.raises(BabelDecodeError):
        decompress(33, 1, "hello\x00world")


def test_long_lowercase_roundtrip():
    text = "the library of babel contains all possible books " * 10
    depth, length, compressed = compress(text)
    assert decompress(depth, length, compressed) == text


def test_base_in_always_leq_base_out():
    for text in ["A", "z", "~", "Hello World", "0123456789"]:
        depth, _, _ = compress(text)
        assert depth + 1 <= BASE_OUT
