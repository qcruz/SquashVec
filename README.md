# SquashVec

A repository for compression and sorting algorithm research.

---

## Projects

### 1. Babel Compression (`babel/`)

**Status: Active research — core algorithm working, honest byte-level benchmarking complete.**

#### Concept

Babel Compression is a lossless text compressor based on large-number base conversion — inspired by the Library of Babel (any text can be represented as a position in an arbitrarily large indexed library).

The algorithm:
1. Find the input **depth** — the highest index of any character in the shared symbol library (CHARSET).
2. Treat the input string as a **big integer** where each character is a digit in `base_in = depth + 1`.
3. Re-encode that integer in `base_out = len(CHARSET)` — a much larger base.
4. Because `base_in ≤ base_out` always, the output has fewer *symbols* than the input.

The compression key is two small integers: `(depth, original_length)`.

#### Symbol Library

The CHARSET is all printable Unicode characters from Basic Latin through the Greek block — **948 symbols** (`U+0020` → `U+03FF`). This is the shared "library" both encoder and decoder must agree on. Adding more symbols increases `base_out` and improves compression for all inputs — hence "Babel".

#### Honest Byte Measurement

Babel's output is a sequence of symbols from the 948-symbol CHARSET. For a fair byte-level comparison against standard compressors, symbols are packed as **10-bit integers** (`ceil(log₂(948)) = 10`) into a binary blob with an 8-byte header:

```
[0:2]  BASE_OUT       uint16   — library version
[2:4]  depth          uint16   — encodes base_in
[4:8]  original_length uint32  — restores leading characters
[8:]   symbol indices  10 bits each, MSB-first
```

Total size: `8 + ceil(n_symbols × 10 / 8)` bytes.

#### Benchmark Results

**Random full ASCII** (95 printable chars, uniform random — no statistical patterns):

| Chars | Babel (packed) | Babel-FREQ (packed) | zlib-9 | bz2-9 | lzma |
|------:|---------------:|--------------------:|-------:|------:|-----:|
| 1,000 | 840B **+16.0%** ✓ | 840B **+16.0%** ✓ | 857B +14.3% | 970B +3.0% | 940B +6.0% |
| 5,000 | 4,161B **+16.8%** ✓ | 4,161B **+16.8%** ✓ | 4,174B +16.5% | 4,331B +13.4% | 4,288B +14.2% |
| 10,000 | 8,313B **+16.9%** ✓ | 8,313B **+16.9%** ✓ | 8,329B +16.7% | 8,430B +15.7% | 8,476B +15.2% |

On truly random data, Babel matches zlib and beats bz2/lzma at all lengths. Standard compressors rely on statistical patterns (word repetition, byte frequency skew) that don't exist in random input. Babel's savings are structural — a direct result of base conversion — and hold regardless of randomness.

**Structured English prose** (Pride & Prejudice, Project Gutenberg):

| Chars | Babel (packed) | Babel-FREQ (packed) | zlib-9 | bz2-9 | lzma |
|------:|---------------:|--------------------:|-------:|------:|-----:|
| 1,000 | 830B +17.0% ✓ | 836B +16.4% ✓ | 288B **+71.2%** | 325B +67.5% | 356B +64.4% |
| 5,000 | 4,675B +6.5% ✓ | 4,676B +6.5% ✓ | 2,246B **+55.1%** | 2,218B +55.6% | 2,312B +53.8% |
| 10,000 | 9,342B +6.6% ✓ | 9,342B +6.6% ✓ | 4,443B **+55.6%** | 4,192B +58.1% | 4,400B +56.0% |

Standard compressors win decisively on structured text by exploiting word and phrase repetition — redundancy that base conversion is blind to. Babel's savings also degrade when rare characters push `depth` higher (a single uncommon character raises `base_in` for the entire document).

#### Key Findings

| Input type | Babel | Standard best | Winner |
|---|---|---|---|
| Random ASCII | ~17% | ~17% (zlib) | **Tie** |
| Structured prose | ~7–17% | ~55–71% | **Standard** |
| Digits only | ~52% (symbol savings) | ~50% (bz2) | **Tie** |

**Babel's structural advantage:** For random or near-random data it matches the best general-purpose compressors with a far simpler algorithm and no statistical analysis. It is purely mathematical.

**Babel's limitation:** Single high-index characters poison the depth, inflating `base_in` toward `base_out` and collapsing savings. One rare character in a large document can drop compression from 17% to near 0%.

#### Frequency-Ordered Charset (branch: `freq-ordered-charset`)

A CHARSET variant ordered by English letter frequency (`e=0, t=1, a=2, ...`). Common letters get low indices, lowering `depth` for typical prose:

| Input type | ASCII-ordered | Freq-ordered |
|---|---|---|
| Lowercase text | ~17% byte savings | **~22% byte savings** |
| Moby Dick (5k chars) | +17.6% | **+19.2%** |
| Full random ASCII | ~17% | ~17% (no difference) |

#### Correctness

All compression is fully lossless. A Hypothesis-based property test (`tests/test_roundtrip.py`) verifies `decompress(compress(s)) == s` for 500+ random inputs. The `packing.py` roundtrip (pack → decode_packed → decompress) is also verified on every benchmark run.

#### Usage

```python
from babel import compress, decompress, analyze
from babel.packing import encode_packed, decode_packed

# Compress
depth, length, compressed = compress("Hello, World!")

# Pack to bytes (fair byte-level representation)
blob = encode_packed(depth, length, compressed)

# Unpack and decompress
depth2, length2, compressed2 = decode_packed(blob)
original = decompress(depth2, length2, compressed2)

# Analysis
result = analyze("Hello, World!")
print(result)
```

```bash
python3 cli.py compress "Hello, World!"
python3 cli.py analyze --file input.txt
python3 benchmark.py
```

#### Project Structure

```
babel/
  codec.py          # Core algorithm (ASCII-ordered CHARSET)
  codec_freq.py     # Frequency-ordered CHARSET variant
  charset_freq.py   # Frequency-ordered symbol library definition
  packing.py        # 10-bit symbol packing for honest byte measurement
  analysis.py       # Compression ratio analysis
  generator.py      # Random text corpus generator
  exceptions.py     # BabelInputError, BabelDecodeError
  __init__.py

tests/
  test_codec.py       # Deterministic unit tests
  test_roundtrip.py   # Hypothesis property-based roundtrip tests

benchmark.py      # Byte-level comparison vs zlib/bz2/lzma
cli.py
```

#### Open Questions / Next Steps

- **Depth poisoning:** Filtering or remapping outlier characters before compression to prevent one rare char from collapsing savings.
- **Larger CHARSET:** Extending into CJK or other Unicode blocks increases `base_out`, improving savings for all inputs.
- **Optimal ordering:** What CHARSET ordering minimises depth for a target corpus?
- **Key compression:** Can `(depth, original_length)` itself be compressed?
- **O(n²) performance:** The big-integer encoding is quadratic in input length. At ~10k characters it takes ~100ms; at 100k chars it would take minutes. A chunked encoding strategy would fix this.

---

### 2. SquashVec (coming soon)

A novel sorting algorithm. Details to follow.
