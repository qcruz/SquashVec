#!/usr/bin/env python3
"""
Compression comparison benchmark.

Compares:
  1. Babel (ASCII-ordered charset)
  2. Babel (frequency-ordered charset)
  3. zlib  (deflate)
  4. bz2
  5. lzma  (xz)
"""

import zlib, bz2, lzma, math
from babel.codec import compress, decompress, CHARSET, BASE_OUT, _CHAR_TO_IDX
from babel.codec_freq import compress_freq, decompress_freq, FREQ_CHARSET, FREQ_BASE_OUT, _FREQ_CHAR_TO_IDX
from babel.charset_freq import freq_charset_info
from babel.generator import generate

LENGTHS = [100, 500, 1000]
MODES   = ["full", "alphanumeric", "lowercase", "digits"]
SEED    = 42


def pct(compressed_len: int, original_len: int) -> str:
    saved = (1 - compressed_len / original_len) * 100
    return f"{saved:+.1f}%"


def babel_depth_label(text: str, char_to_idx: dict) -> str:
    depth = max(char_to_idx[c] for c in text)
    return f"depth={depth} base_in={depth+1}"


def run_benchmark() -> None:
    print("=" * 100)
    print("CHARSET INFO")
    print(f"  ASCII-ordered : {BASE_OUT} symbols  (space=0, e=69, t=84, z=90, ~=94, …Greek…)")
    print(f"  Freq-ordered  : {freq_charset_info()}")
    print("=" * 100)

    for mode in MODES:
        print(f"\n{'━'*100}")
        print(f"  MODE: {mode.upper()}")
        print(f"{'━'*100}")
        header = (
            f"  {'Length':>6}  "
            f"{'Babel-ASCII':>22}  "
            f"{'Babel-FREQ':>22}  "
            f"{'zlib':>10}  "
            f"{'bz2':>10}  "
            f"{'lzma':>10}  "
            f"  Accuracy"
        )
        print(header)
        print("  " + "-" * 96)

        for length in LENGTHS:
            text = generate(length, mode=mode, seed=SEED)
            raw = text.encode("utf-8")

            # ── Babel ASCII-ordered ───────────────────────────────────────────
            depth_a, orig_len, comp_a = compress(text)
            rev_a = decompress(depth_a, orig_len, comp_a)
            base_in_a = depth_a + 1

            # ── Babel freq-ordered ────────────────────────────────────────────
            depth_f, _, comp_f = compress_freq(text)
            rev_f = decompress_freq(depth_f, orig_len, comp_f)
            base_in_f = depth_f + 1

            # ── Standard compressors (byte length of compressed output) ───────
            zlib_len  = len(zlib.compress(raw, level=9))
            bz2_len   = len(bz2.compress(raw, compresslevel=9))
            lzma_len  = len(lzma.compress(raw))

            ok_a = "✓" if rev_a == text else "✗"
            ok_f = "✓" if rev_f == text else "✗"

            babel_a = f"{len(comp_a):4d}ch {pct(len(comp_a), length):>7} (b{base_in_a})"
            babel_f = f"{len(comp_f):4d}ch {pct(len(comp_f), length):>7} (b{base_in_f})"
            z_col   = f"{zlib_len:4d}B {pct(zlib_len, length):>6}"
            bz_col  = f"{bz2_len:4d}B {pct(bz2_len, length):>6}"
            lz_col  = f"{lzma_len:4d}B {pct(lzma_len, length):>6}"

            print(
                f"  {length:>6}  "
                f"{babel_a:>22}  "
                f"{babel_f:>22}  "
                f"{z_col:>10}  "
                f"{bz_col:>10}  "
                f"{lz_col:>10}  "
                f"  {ok_a}/{ok_f}"
            )

        # Show the freq-ordered depth advantage for a sample word
        sample = generate(50, mode=mode, seed=SEED)
        d_ascii = max(_CHAR_TO_IDX[c] for c in sample if c in _CHAR_TO_IDX)
        d_freq  = max(_FREQ_CHAR_TO_IDX[c] for c in sample if c in _FREQ_CHAR_TO_IDX)
        print(
            f"\n  Sample (50 chars): ASCII depth={d_ascii} base_in={d_ascii+1}  |  "
            f"FREQ depth={d_freq} base_in={d_freq+1}  |  "
            f"theoretical FREQ gain: "
            f"{(1 - math.log(d_freq+1)/math.log(FREQ_BASE_OUT))*100:.1f}% vs "
            f"{(1 - math.log(d_ascii+1)/math.log(BASE_OUT))*100:.1f}% ASCII"
        )


if __name__ == "__main__":
    run_benchmark()
