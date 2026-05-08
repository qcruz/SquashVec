"""
Random text corpus generator using the standard printable ASCII set (32–126).
Supports full-random and weighted modes (letter-heavy, digit-heavy, etc.).
"""

import random
from typing import Literal

# Standard printable ASCII only (the input alphabet)
ASCII_CHARS = [chr(i) for i in range(32, 127)]  # 95 chars

Mode = Literal["full", "letters", "digits", "alphanumeric", "lowercase", "uppercase"]

_SUBSETS: dict[str, list[str]] = {
    "full":         ASCII_CHARS,
    "letters":      [c for c in ASCII_CHARS if c.isalpha()],
    "digits":       [c for c in ASCII_CHARS if c.isdigit()],
    "alphanumeric": [c for c in ASCII_CHARS if c.isalnum()],
    "lowercase":    [c for c in ASCII_CHARS if c.islower()],
    "uppercase":    [c for c in ASCII_CHARS if c.isupper()],
}


def generate(length: int, mode: Mode = "full", seed: int | None = None) -> str:
    """
    Generate a random text string of `length` characters.

    mode:
      "full"         — all 95 printable ASCII chars (deepest possible depth)
      "letters"      — a-z A-Z only (52 chars)
      "alphanumeric" — a-z A-Z 0-9 (62 chars)
      "lowercase"    — a-z only (26 chars)
      "uppercase"    — A-Z only (26 chars)
      "digits"       — 0-9 only (10 chars, strongest compression)
    """
    if length < 1:
        raise ValueError("length must be >= 1")
    rng = random.Random(seed)
    alphabet = _SUBSETS.get(mode, ASCII_CHARS)
    return "".join(rng.choices(alphabet, k=length))


def generate_corpus(lengths: list[int], mode: Mode = "full", seed: int | None = None
                    ) -> list[tuple[int, str]]:
    """Generate multiple texts at specified lengths. Returns [(length, text), ...]."""
    rng = random.Random(seed)
    return [(n, generate(n, mode, seed=rng.randint(0, 2**32))) for n in lengths]
