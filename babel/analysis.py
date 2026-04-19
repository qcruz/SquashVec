"""
Compression analysis and reporting.
"""

from dataclasses import dataclass
from .codec import compress


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
        direction = "compressed" if self.savings_pct > 0 else "expanded"
        return (
            f"Original:    {self.original_len} chars  (base {self.base_in}, depth={self.depth})\n"
            f"Compressed:  {self.compressed_len} chars  (+1 byte depth header = {self.effective_len} effective)\n"
            f"Ratio:       {self.ratio:.4f}  →  {abs(self.savings_pct):.2f}% {direction}\n"
            f"Depth:       {self.depth}  ('{chr(self.depth)}')\n"
            f"Output:      {repr(self.compressed)}"
        )


def analyze(text: str) -> CompressionResult:
    depth, compressed = compress(text)
    base_in = depth + 1
    orig_len = len(text)
    comp_len = len(compressed)
    effective = comp_len + 1  # 1 byte for depth header
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
