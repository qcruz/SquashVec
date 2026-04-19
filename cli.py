#!/usr/bin/env python3
"""
Babel Compression CLI

Usage:
  babel compress "hello world"
  babel compress --file input.txt
  babel compress --file input.txt --out out.babel
  babel decompress --depth 119 "compressed string"
  babel decompress --file out.babel
  babel analyze "hello world"
"""

import argparse
import sys
from pathlib import Path

from babel import compress, decompress, analyze
from babel.exceptions import BabelInputError, BabelDecodeError


def cmd_compress(args: argparse.Namespace) -> None:
    if args.file:
        text = Path(args.file).read_text(encoding="ascii")
    else:
        text = args.text

    try:
        result = analyze(text)
    except BabelInputError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    depth, compressed = result.depth, result.compressed

    if args.out:
        out = Path(args.out)
        out.write_text(f"{depth}\n{compressed}\n", encoding="ascii")
        print(f"Written to {out}")
    else:
        print(f"Depth:      {depth}  (base {result.base_in})")
        print(f"Compressed: {repr(compressed)}")
        print()
        print(result)


def cmd_decompress(args: argparse.Namespace) -> None:
    if args.file:
        lines = Path(args.file).read_text(encoding="ascii").splitlines()
        if len(lines) < 2:
            print("Error: .babel file must have depth on line 1 and compressed text on line 2.", file=sys.stderr)
            sys.exit(1)
        depth = int(lines[0])
        compressed = lines[1]
    else:
        depth = args.depth
        compressed = args.text

    try:
        original = decompress(depth, compressed)
    except BabelDecodeError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    print(original)


def cmd_analyze(args: argparse.Namespace) -> None:
    if args.file:
        text = Path(args.file).read_text(encoding="ascii")
    else:
        text = args.text

    try:
        result = analyze(text)
    except BabelInputError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    print(result)


def main() -> None:
    parser = argparse.ArgumentParser(
        prog="babel",
        description="Babel Compression — base-transcoding text compressor",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    # compress
    p_compress = sub.add_parser("compress", help="Compress text")
    p_compress.add_argument("text", nargs="?", help="Input text (or use --file)")
    p_compress.add_argument("--file", "-f", help="Read input from file")
    p_compress.add_argument("--out", "-o", help="Write (depth, compressed) to .babel file")

    # decompress
    p_decompress = sub.add_parser("decompress", help="Decompress text")
    p_decompress.add_argument("text", nargs="?", help="Compressed text (or use --file)")
    p_decompress.add_argument("--depth", "-d", type=int, help="Depth value from compression")
    p_decompress.add_argument("--file", "-f", help="Read from .babel file")

    # analyze
    p_analyze = sub.add_parser("analyze", help="Show compression analysis without writing output")
    p_analyze.add_argument("text", nargs="?", help="Input text (or use --file)")
    p_analyze.add_argument("--file", "-f", help="Read input from file")

    args = parser.parse_args()

    if args.command == "compress":
        cmd_compress(args)
    elif args.command == "decompress":
        cmd_decompress(args)
    elif args.command == "analyze":
        cmd_analyze(args)


if __name__ == "__main__":
    main()
