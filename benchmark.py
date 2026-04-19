#!/usr/bin/env python3
"""
Babel Compression — honest byte-level benchmark.

All sizes are in BYTES. Babel output is measured as a compact 10-bit packed
binary (8-byte header + ceil(n_symbols * 10 / 8) bytes), not as a UTF-8
Unicode string. This is the fair apples-to-apples comparison.

Compares:
  Babel       — ASCII-ordered CHARSET, 10-bit packed
  Babel-FREQ  — frequency-ordered CHARSET, 10-bit packed
  zlib-9      — deflate, max compression
  bz2-9       — bzip2, max compression
  lzma        — LZMA/xz

Roundtrip: every Babel result is decoded back and verified against the original.
"""

import zlib, bz2, lzma, math
from babel.codec      import compress,      decompress,      BASE_OUT,      _CHAR_TO_IDX
from babel.codec_freq import compress_freq, decompress_freq, FREQ_BASE_OUT, _FREQ_CHAR_TO_IDX
from babel.packing    import (encode_packed, decode_packed,
                               BITS_PER_SYMBOL, HEADER_BYTES, total_packed_size)
from babel.generator  import generate

SEED = 42


def pct(comp: int, orig: int) -> str:
    return f"{(1 - comp / orig) * 100:>+6.1f}%"


def run(n: int, text: str, label: str) -> None:
    # Filter to valid CHARSET chars and truncate
    text = "".join(c for c in text if c in _CHAR_TO_IDX)[:n]
    n    = len(text)
    raw  = text.encode("utf-8")       # original bytes (ASCII = 1 byte/char)

    # ── Babel ASCII-ordered ───────────────────────────────────────────────────
    depth_a, length_a, comp_str_a = compress(text)
    packed_a   = encode_packed(depth_a, length_a, comp_str_a)
    d2_a, l2_a, cs2_a = decode_packed(packed_a)
    ok_a = "✓" if decompress(d2_a, l2_a, cs2_a) == text else "✗"

    # ── Babel FREQ-ordered ────────────────────────────────────────────────────
    text_f = "".join(c for c in text if c in _FREQ_CHAR_TO_IDX)
    depth_f, length_f, comp_str_f = compress_freq(text_f)
    # Use same packing (BASE_OUT == FREQ_BASE_OUT == 948)
    packed_f   = encode_packed(depth_f, length_f, comp_str_f)
    d2_f, l2_f, cs2_f = decode_packed(packed_f)
    ok_f = "✓" if decompress_freq(d2_f, l2_f, cs2_f) == text_f else "✗"

    # ── Standard compressors ──────────────────────────────────────────────────
    zl = len(zlib.compress(raw, level=9))
    bz = len(bz2.compress(raw, compresslevel=9))
    lz = len(lzma.compress(raw))

    pa = len(packed_a)
    pf = len(packed_f)

    print(
        f"  {n:>8,}  "
        f"{pa:>6}B {pct(pa,n)}  {ok_a}  "
        f"{pf:>6}B {pct(pf,n)}  {ok_f}  "
        f"{zl:>6}B {pct(zl,n)}  "
        f"{bz:>6}B {pct(bz,n)}  "
        f"{lz:>6}B {pct(lz,n)}  "
        f"d={depth_a+1:<4} {len(set(text))}dist"
    )


HDR = (
    f"  {'Chars':>8}  "
    f"{'Babel (packed)':>16}      "
    f"{'Babel-FREQ (packed)':>20}    "
    f"{'zlib-9':>14}  "
    f"{'bz2-9':>14}  "
    f"{'lzma':>14}"
)
SEP = "  " + "─" * 112

LENGTHS = [1_000, 2_500, 5_000, 10_000]

print(f"\nSymbol library : {BASE_OUT} symbols, {BITS_PER_SYMBOL} bits/symbol, {HEADER_BYTES}-byte header")
print(f"Packed size    : 8 + ceil(n_symbols × {BITS_PER_SYMBOL} / 8) bytes\n")

print("=" * 116)
print("RANDOM FULL ASCII  (95 printable chars, uniformly random — no statistical patterns)")
print("=" * 116)
print(HDR); print(SEP)
for n in LENGTHS:
    run(n, generate(n, mode="full", seed=SEED), "random")

pp = open("/tmp/pride_prejudice.txt", encoding="utf-8", errors="ignore").read()
print()
print("=" * 116)
print("PRIDE & PREJUDICE — Jane Austen  (Project Gutenberg — structured English prose)")
print("=" * 116)
print(HDR); print(SEP)
for n in LENGTHS:
    run(n, pp, "pp")

md = open("/tmp/moby_dick.txt", encoding="utf-8", errors="ignore").read()
print()
print("=" * 116)
print("MOBY DICK — Herman Melville  (Project Gutenberg — structured English prose)")
print("=" * 116)
print(HDR); print(SEP)
for n in LENGTHS:
    run(n, md, "md")
