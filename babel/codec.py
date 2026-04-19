"""
Babel Compression Codec
=======================
Core algorithm: treat input text as a big integer in base (max_ascii + 1),
then re-encode it in base 95 (printable ASCII 32–126).

Compression key: (depth, compressed_string)
  - depth: highest ASCII value in the original text (determines base_in)
  - compressed_string: the integer re-encoded in base 95

Compression is lossless. Ratio improves as the input character set narrows
(lower depth → smaller base_in → more symbols needed → bigger integer →
bigger efficiency gain when re-encoded in the wider base-95 alphabet).
"""

from .exceptions import BabelInputError, BabelDecodeError

# Output base: printable ASCII 32–126
BASE_OUT = 95
OFFSET_OUT = 32  # digit 0 → chr(32) = ' ', digit 94 → chr(126) = '~'


def _validate_input(s: str) -> None:
    if not s:
        raise BabelInputError("Input string must not be empty.")
    bad = [c for c in s if not (32 <= ord(c) <= 126)]
    if bad:
        raise BabelInputError(
            f"Input contains characters outside printable ASCII 32–126: "
            f"{[repr(c) for c in bad]}"
        )


def _validate_compressed(s: str) -> None:
    if not s:
        raise BabelDecodeError("Compressed string must not be empty.")
    bad = [c for c in s if not (32 <= ord(c) <= 126)]
    if bad:
        raise BabelDecodeError(
            f"Compressed string contains characters outside printable ASCII 32–126: "
            f"{[repr(c) for c in bad]}"
        )


def _str_to_int(s: str, base: int) -> int:
    """
    Interpret s as a big integer where each character's ASCII value is a digit
    in the given base (Horner's method, O(n) multiplications).
    """
    N = 0
    for ch in s:
        N = N * base + ord(ch)
    return N


def _int_to_str(N: int, base: int, offset: int) -> str:
    """
    Convert integer N to a string of characters where digit d maps to
    chr(d + offset). The base is the number of symbols.
    """
    if N == 0:
        return chr(offset)
    digits = []
    while N > 0:
        N, remainder = divmod(N, base)
        digits.append(chr(remainder + offset))
    return "".join(reversed(digits))


def compress(text: str) -> tuple[int, str]:
    """
    Compress text into (depth, compressed_string).

    depth:             highest ASCII value of any character in text
    compressed_string: text re-encoded as a base-95 number (printable ASCII)

    Compression ratio = len(compressed_string) / len(text)
    Ratio < 1 when depth < 126 (input doesn't use the full printable range).
    """
    _validate_input(text)
    depth = max(ord(c) for c in text)
    base_in = depth + 1  # all ordinal values are valid digits (0 .. depth)
    N = _str_to_int(text, base_in)
    compressed = _int_to_str(N, BASE_OUT, OFFSET_OUT)
    return (depth, compressed)


def decompress(depth: int, compressed: str) -> str:
    """
    Recover original text from (depth, compressed_string).

    depth must be the value returned by compress() for the original input.
    """
    if not (32 <= depth <= 126):
        raise BabelDecodeError(
            f"depth must be in range 32–126, got {depth}."
        )
    _validate_compressed(compressed)
    base_in = depth + 1
    # Decode the base-95 string back to an integer.
    # Each compressed character: digit = ord(ch) - OFFSET_OUT
    N = 0
    for ch in compressed:
        N = N * BASE_OUT + (ord(ch) - OFFSET_OUT)
    # Re-encode the integer in base_in; digits are raw ASCII code points (offset=0)
    original = _int_to_str(N, base_in, offset=0)
    return original
