# SquashVec

A repository for compression and sorting algorithm research.

---

## Projects

### 1. Babel Compression (`babel/`)

**Status: Active research — core algorithm working, frequency-charset variant in progress.**

#### Concept

Babel Compression is a lossless text compressor based on large-number base conversion — inspired by the Library of Babel (the idea that any text can be represented as a position in an arbitrarily large indexed library).

The algorithm:
1. Take the input string and find its **depth** — the highest index of any character in the shared symbol library (CHARSET).
2. Treat the input string as a **big integer** where each character is a digit in `base_in = depth + 1`.
3. Re-encode that integer in `base_out = len(CHARSET)` — a much larger base using an extended Unicode symbol set.
4. Because `base_in ≤ base_out` always, the output string is always shorter than or equal to the input.

The compression key is just two small integers: `(depth, original_length)`.

#### Symbol Library

The current CHARSET is all printable Unicode characters from Basic Latin through the Greek block — **948 symbols** total (`U+0020` → `U+03FF`). This is the shared "library" that both encoder and decoder must agree on. Adding more symbols to the library increases `base_out` and improves compression for all existing inputs — hence "Babel".

#### Compression Results (full random ASCII input, all 95 printable chars)

| Length | Babel | zlib | bz2 | lzma |
|-------:|------:|-----:|----:|-----:|
| 100 | **+33.0%** | −8.0% | −50.0% | −56.0% |
| 500 | **+33.4%** | +11.0% | −5.0% | −3.2% |
| 1,000 | **+33.5%** | +14.3% | +3.0% | +6.0% |
| 5,000 | **+33.6%** | +16.5% | +13.4% | +14.2% |
| 100,000 | **+33.6%** | +16.8% | +17.0% | +16.2% |

Babel delivers a stable **~33.6% savings at every scale** on random ASCII. Standard compressors plateau at ~16–17% on random data because they rely on statistical patterns that don't exist in random input. Babel's savings are structural — a mathematical consequence of base conversion.

Compression ratio converges quickly with length and holds precisely. The theoretical savings for any input is:

```
savings = 1 - log(base_in) / log(base_out)
```

#### Frequency-Ordered Charset (branch: `freq-ordered-charset`)

A variant CHARSET ordered by English letter frequency (`e=0, t=1, a=2, ...`) instead of ASCII code point order. Because common letters get low indices, typical English prose has a much lower depth and smaller `base_in`:

| Input type | ASCII-ordered | Freq-ordered |
|---|---|---|
| Lowercase text | +34% (base_in=91) | **+52%** (base_in=26) |
| Alphanumeric | +34% (base_in=91) | **+37%** (base_in=74) |
| Full random ASCII | +33% | +33% (no difference — all chars appear) |
| Digits only | **+52%** (base_in=26) | +37% (base_in=74) — worse |

Frequency ordering is a trade-off: it improves compression for text matching the frequency assumptions, and hurts for content that doesn't.

#### Accuracy

All compression is fully lossless. A Hypothesis-based property test (`tests/test_roundtrip.py`) verifies `decompress(compress(s)) == s` for 500+ random inputs across the full CHARSET.

#### Usage

```python
from babel import compress, decompress, analyze

depth, length, compressed = compress("Hello, World!")
original = decompress(depth, length, compressed)

result = analyze("Hello, World!")
print(result)
```

```bash
python3 cli.py compress "Hello, World!"
python3 cli.py decompress --depth 82 --length 13 "εWQǳȅ̝ȿ"
python3 cli.py analyze --file input.txt
```

#### Project Structure

```
babel/
  codec.py          # Core algorithm (ASCII-ordered CHARSET)
  codec_freq.py     # Frequency-ordered CHARSET variant
  charset_freq.py   # Frequency-ordered symbol library definition
  analysis.py       # Compression ratio analysis and reporting
  generator.py      # Random text corpus generator for benchmarking
  exceptions.py     # BabelInputError, BabelDecodeError
  __init__.py       # Public API

tests/
  test_codec.py       # Deterministic unit tests
  test_roundtrip.py   # Hypothesis property-based roundtrip tests

benchmark.py      # Full comparison: Babel vs zlib/bz2/lzma
cli.py            # Command-line interface
```

#### Open Questions / Next Steps

- Does frequency ordering of the output CHARSET (not just input mapping) further improve compression?
- What is the optimal CHARSET ordering for a mixed real-world corpus?
- Can the compression key `(depth, original_length)` itself be compressed?
- Extend CHARSET further into Unicode (CJK etc.) for even larger `base_out`.

---

### 2. SquashVec (coming soon)

A novel sorting algorithm. Details to follow.
