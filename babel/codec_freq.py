"""
Babel Compression — frequency-ordered charset variant.

Same algorithm as codec.py but uses FREQ_CHARSET instead of CHARSET as the
digit alphabet for both input mapping and output encoding.

Because common English characters (e, t, a, o, i, n, s, h, r, ...) sit at
low indices, typical prose has a much lower depth → smaller base_in →
better compression than the ASCII-ordered baseline.
"""

from .exceptions import BabelInputError, BabelDecodeError
from .charset_freq import FREQ_CHARSET, FREQ_BASE_OUT, _FREQ_CHAR_TO_IDX


def _validate(s: str, label: str) -> None:
    if not s:
        raise BabelInputError(f"{label} must not be empty.")
    bad = [c for c in s if c not in _FREQ_CHAR_TO_IDX]
    if bad:
        raise BabelInputError(
            f"{label} contains characters outside FREQ_CHARSET: "
            f"{[repr(c) for c in bad[:5]]}"
        )


def compress_freq(text: str) -> tuple[int, int, str]:
    """
    Compress using the frequency-ordered charset.
    Returns (depth, original_length, compressed_string) — same shape as codec.compress().

    depth is now the index of the deepest character in FREQ_CHARSET, so common
    English text has a much lower depth than with the ASCII-ordered charset.
    """
    _validate(text, "Input")
    indices = [_FREQ_CHAR_TO_IDX[c] for c in text]
    depth = max(indices)
    base_in = depth + 1

    N = 0
    for idx in indices:
        N = N * base_in + idx

    if N == 0:
        compressed = FREQ_CHARSET[0]
    else:
        digits: list[str] = []
        M = N
        while M > 0:
            M, r = divmod(M, FREQ_BASE_OUT)
            digits.append(FREQ_CHARSET[r])
        compressed = "".join(reversed(digits))

    return (depth, len(text), compressed)


def decompress_freq(depth: int, original_length: int, compressed: str) -> str:
    """Recover original text from (depth, original_length, compressed_string)."""
    if not (0 <= depth <= FREQ_BASE_OUT - 1):
        raise BabelDecodeError(f"depth out of range: {depth}")
    if original_length < 1:
        raise BabelDecodeError(f"original_length must be >= 1")
    _validate(compressed, "Compressed string")

    base_in = depth + 1

    N = 0
    for ch in compressed:
        N = N * FREQ_BASE_OUT + _FREQ_CHAR_TO_IDX[ch]

    indices: list[int] = []
    while N > 0:
        N, r = divmod(N, base_in)
        indices.append(r)
    indices.reverse()

    padding = original_length - len(indices)
    indices = [0] * padding + indices

    return "".join(FREQ_CHARSET[i] for i in indices)
