"""Deterministic unit tests for the Babel codec."""

import pytest
from babel.codec import compress, decompress, BASE_OUT
from babel.exceptions import BabelInputError, BabelDecodeError


def test_single_char_uppercase():
    depth, compressed = compress("A")
    assert depth == 65
    # N = 65, base_out = 95, 65 < 95 so it's one char: chr(65 + 32) = 'a'
    assert compressed == "a"
    assert decompress(depth, compressed) == "A"


def test_single_char_space():
    depth, compressed = compress(" ")
    assert depth == 32
    assert decompress(depth, compressed) == " "


def test_digits_only_roundtrip():
    text = "1234567890"
    depth, compressed = compress(text)
    assert depth == ord("9")  # 57
    assert decompress(depth, compressed) == text


def test_digits_compress():
    # base_in=58 < base_out=95 → compression expected for long enough input
    text = "0" * 20
    depth, compressed = compress(text)
    assert len(compressed) < len(text)
    assert decompress(depth, compressed) == text


def test_repeated_char_roundtrip():
    text = "aaaaaaaaaa"
    depth, compressed = compress(text)
    assert depth == ord("a")
    assert decompress(depth, compressed) == text


def test_leading_space_preserved():
    text = "   hello"
    depth, compressed = compress(text)
    assert decompress(depth, compressed) == text


def test_full_sentence_roundtrip():
    text = "Hello, World!"
    depth, compressed = compress(text)
    assert decompress(depth, compressed) == text


def test_depth_equals_max_ord():
    text = "abcXYZ123"
    depth, _ = compress(text)
    assert depth == max(ord(c) for c in text)


def test_compressed_chars_in_range():
    text = "The quick brown fox jumps over the lazy dog."
    depth, compressed = compress(text)
    assert all(32 <= ord(c) <= 126 for c in compressed)


def test_empty_string_raises():
    with pytest.raises(BabelInputError):
        compress("")


def test_tab_char_raises():
    with pytest.raises(BabelInputError):
        compress("hello\tworld")


def test_newline_raises():
    with pytest.raises(BabelInputError):
        compress("hello\nworld")


def test_bad_depth_raises():
    with pytest.raises(BabelDecodeError):
        decompress(5, "hello")  # depth 5 is below printable ASCII range


def test_decompress_invalid_char_raises():
    with pytest.raises(BabelDecodeError):
        decompress(65, "hello\x00world")


def test_long_lowercase_roundtrip():
    text = "the library of babel contains all possible books " * 10
    depth, compressed = compress(text)
    assert decompress(depth, compressed) == text
