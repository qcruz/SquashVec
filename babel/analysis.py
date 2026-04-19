"""
Compression analysis and reporting.
"""

from dataclasses import dataclass
from .codec import compress, CHARSET, BASE_OUT


@dataclass
class CompressionResult:
    original: str
    depth: int
    base_in: int
    compressed: str
    original_len: int
    compressed_len: int
    # +1 byte accounts for storing `depth` as a header in a real encoding
    effective_len: int
    ratio: float
    savings_pct: float

    def __str__(self) -> str:
        direction = "compressed" if self.savings_pct > 0 else "no change"
        deepest_char = CHARSET[self.depth]
        return (
            f"Input text:    {repr(self.original)}\n"
            f"ASCII depth:   {self.depth}  (deepest char: '{deepest_char}' = U+{ord(deepest_char):04X})\n"
            f"Base in:       {self.base_in}  →  Base out: {BASE_OUT}\n"
            f"Original len:  {self.original_len} chars\n"
            f"Compressed:    {self.compressed}  ({self.compressed_len} chars)\n"
            f"Ratio:         {self.ratio:.4f}  →  {abs(self.savings_pct):.2f}% {direction}"
        )


def analyze(text: str) -> CompressionResult:
    depth, original_length, compressed = compress(text)
    base_in = depth + 1
    orig_len = len(text)
    comp_len = len(compressed)
    # key overhead: depth (1 byte, range 0-94) + length (varint, ~1-4 bytes)
    # simplified here as 2 bytes overhead
    effective = comp_len + 2
    ratio = effective / orig_len
    savings = (1 - ratio) * 100
    return CompressionResult(
        original=text,
        depth=depth,
        base_in=base_in,
        compressed=compressed,
        original_len=orig_len,
        compressed_len=comp_len,
        effective_len=effective,
        ratio=ratio,
        savings_pct=savings,
    )
