"""
Babel Compression Codec
=======================
Each character is mapped to its 0-indexed position in the CHARSET — an
ordered list of printable Unicode characters (Basic Latin through Greek):

  space=0, !=1, "=2, ... A=33, ... z=90, ... ~=94,
  ¡=95, ¢=96, ... ÿ=188, Ā=189, ... ω=947, ...

The input string is treated as a big integer where each character is a digit:

  base_in  = depth + 1,  where depth = max position index among input chars
  base_out = len(CHARSET)

Because base_in ≤ BASE_OUT always, re-encoding produces a shorter (or
equal-length) string. The wider the output alphabet, the more it compresses.

Compression key: (depth, original_length)
  depth           — highest CHARSET index used (determines base_in for decoding)
  original_length — recovers leading CHARSET[0] characters (leading zeros)
"""

from .exceptions import BabelInputError, BabelDecodeError

# ── Symbol library ────────────────────────────────────────────────────────────
# Printable Unicode from Basic Latin through Greek block (U+0020–U+03FF).
# chr.isprintable() filters out control chars, surrogates, and unassigned points.
CHARSET: list[str] = [chr(i) for i in range(0x0020, 0x0400) if chr(i).isprintable()]
BASE_OUT: int = len(CHARSET)

# Fast lookup: character → 0-based index in CHARSET
_CHAR_TO_IDX: dict[str, int] = {ch: i for i, ch in enumerate(CHARSET)}
# ─────────────────────────────────────────────────────────────────────────────


def charset_info() -> str:
    return (
        f"CHARSET: {BASE_OUT} symbols  "
        f"(U+{ord(CHARSET[0]):04X} '{CHARSET[0]}' … "
        f"U+{ord(CHARSET[-1]):04X} '{CHARSET[-1]}')"
    )


def _validate_input(s: str) -> None:
    if not s:
        raise BabelInputError("Input string must not be empty.")
    bad = [c for c in s if c not in _CHAR_TO_IDX]
    if bad:
        raise BabelInputError(
            f"Input contains characters outside CHARSET: "
            f"{[repr(c) for c in bad[:5]]}"
        )


def _validate_compressed(s: str) -> None:
    if not s:
        raise BabelDecodeError("Compressed string must not be empty.")
    bad = [c for c in s if c not in _CHAR_TO_IDX]
    if bad:
        raise BabelDecodeError(
            f"Compressed string contains characters outside CHARSET: "
            f"{[repr(c) for c in bad[:5]]}"
        )


def compress(text: str) -> tuple[int, int, str]:
    """
    Compress text → (depth, original_length, compressed_string).

    depth:           0-indexed position of the highest character used in CHARSET.
                     Encodes which base was used: base_in = depth + 1.
    original_length: length of the original string (recovers leading spaces).
    compressed_string: the input integer re-encoded in BASE_OUT (CHARSET).

    base_in ≤ BASE_OUT always → output is always ≤ input length.
    """
    _validate_input(text)
    indices = [_CHAR_TO_IDX[c] for c in text]
    depth = max(indices)          # 0-based, range 0–(BASE_OUT-1)
    base_in = depth + 1

    # Encode as big integer (Horner's method)
    N = 0
    for idx in indices:
        N = N * base_in + idx

    # Re-encode in BASE_OUT
    if N == 0:
        compressed = CHARSET[0]
    else:
        digits: list[str] = []
        M = N
        while M > 0:
            M, r = divmod(M, BASE_OUT)
            digits.append(CHARSET[r])
        compressed = "".join(reversed(digits))

    return (depth, len(text), compressed)


def decompress(depth: int, original_length: int, compressed: str) -> str:
    """
    Recover original text from (depth, original_length, compressed_string).
    """
    max_depth = BASE_OUT - 1
    if not (0 <= depth <= max_depth):
        raise BabelDecodeError(f"depth must be in range 0–{max_depth}, got {depth}.")
    if original_length < 1:
        raise BabelDecodeError(f"original_length must be >= 1, got {original_length}.")
    _validate_compressed(compressed)
    base_in = depth + 1

    # Decode base-BASE_OUT string → integer
    N = 0
    for ch in compressed:
        N = N * BASE_OUT + _CHAR_TO_IDX[ch]

    # Decode integer → CHARSET indices in base_in
    indices: list[int] = []
    while N > 0:
        N, r = divmod(N, base_in)
        indices.append(r)
    indices.reverse()

    # Restore leading zeros (CHARSET[0] = space) lost in integer conversion
    padding = original_length - len(indices)
    indices = [0] * padding + indices

    return "".join(CHARSET[i] for i in indices)
