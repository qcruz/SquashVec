"""
Frequency-ordered character set for Babel Compression.

Characters are ordered by their occurrence rate in typical English text.
The most common characters get the lowest indices — so everyday text has a
lower depth (max index used), yielding a smaller base_in and better compression.

Ordering rationale:
  1. Lowercase letters  — by English letter frequency (e, t, a, o, i, n, ...)
  2. Space              — most common single character in prose
  3. Common punctuation — ordered by typical prose frequency
  4. Uppercase letters  — mirroring lowercase frequency order
  5. Digits             — 0–9
  6. Remaining symbols  — roughly by commonness
  7. Latin-1 supplement — extended characters (less common)
  8. Latin Extended A/B + Greek — rare / extended use

The decoder only needs to know this same ordering — it is the shared
"Library of Babel" that both sides agree on.
"""

# ── 1. Lowercase by English frequency ────────────────────────────────────────
_LOWER_FREQ = list("etaoinshrdlcumwfgypbvkjxqz")

# ── 2. Space ──────────────────────────────────────────────────────────────────
_SPACE = [" "]

# ── 3. Common punctuation (prose frequency order) ────────────────────────────
_PUNCT_COMMON = list(".,'-!?;:\"()")

# ── 4. Uppercase (same frequency order as lowercase) ─────────────────────────
_UPPER_FREQ = [c.upper() for c in _LOWER_FREQ]

# ── 5. Digits ─────────────────────────────────────────────────────────────────
_DIGITS = list("0123456789")

# ── 6. Remaining printable ASCII symbols not yet included ────────────────────
_already = set(_LOWER_FREQ + _SPACE + _PUNCT_COMMON + _UPPER_FREQ + _DIGITS)
_SYMBOLS_REST = [
    c for c in (
        # roughly ordered: common code/text symbols first
        list("/\\@#$%^&*+=_`~<>|[]{}") +
        # remaining printable ASCII 33–126 not yet placed
        [chr(i) for i in range(33, 127)]
    )
    if c not in _already and chr(0x0020) <= c <= chr(0x007E)
]
# deduplicate while preserving order
_seen: set[str] = set()
_SYMBOLS_REST_DEDUP: list[str] = []
for c in _SYMBOLS_REST:
    if c not in _seen:
        _seen.add(c)
        _SYMBOLS_REST_DEDUP.append(c)

# ── 7 & 8. Extended Unicode (Latin-1 supplement + Latin Extended + Greek) ────
_EXTENDED = [
    chr(i) for i in range(0x0080, 0x0400)
    if chr(i).isprintable() and chr(i) not in _already and chr(i) not in _seen
]

# ── Final ordered charset ─────────────────────────────────────────────────────
FREQ_CHARSET: list[str] = (
    _LOWER_FREQ +
    _SPACE +
    _PUNCT_COMMON +
    _UPPER_FREQ +
    _DIGITS +
    _SYMBOLS_REST_DEDUP +
    _EXTENDED
)

FREQ_BASE_OUT: int = len(FREQ_CHARSET)
_FREQ_CHAR_TO_IDX: dict[str, int] = {ch: i for i, ch in enumerate(FREQ_CHARSET)}

# Sanity check — same total size as the standard CHARSET
assert FREQ_BASE_OUT == len(set(FREQ_CHARSET)), "Duplicate characters in FREQ_CHARSET"


def freq_charset_info() -> str:
    return (
        f"FREQ_CHARSET: {FREQ_BASE_OUT} symbols  "
        f"('{FREQ_CHARSET[0]}'=0  '{FREQ_CHARSET[1]}'=1  '{FREQ_CHARSET[2]}'=2 … "
        f"'{FREQ_CHARSET[25]}'=25  '{FREQ_CHARSET[26]}'=26 …)"
    )
