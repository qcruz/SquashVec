#!/usr/bin/env python3
"""
Babel Compression CLI

Usage:
  babel compress "hello world"
  babel compress --file input.txt --out out.babel
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
        text = Path(args.file).read_text(encoding="utf-8")
    else:
        text = args.text

    try:
        result = analyze(text)
    except BabelInputError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    if args.out:
        out = Path(args.out)
        # File format: depth / original_length / compressed
        out.write_text(
            f"{result.depth}\n{result.original_len}\n{result.compressed}\n",
            encoding="utf-8"
        )
        print(f"Written to {out}")
    else:
        print(result)


def cmd_decompress(args: argparse.Namespace) -> None:
    if args.file:
        lines = Path(args.file).read_text(encoding="utf-8").splitlines()
        if len(lines) < 3:
            print("Error: .babel file must have depth / length / compressed on lines 1-3.", file=sys.stderr)
            sys.exit(1)
        depth = int(lines[0])
        original_length = int(lines[1])
        compressed = lines[2]
    else:
        depth = args.depth
        original_length = args.length
        compressed = args.text

    try:
        original = decompress(depth, original_length, compressed)
    except BabelDecodeError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

    print(original)


def cmd_analyze(args: argparse.Namespace) -> None:
    if args.file:
        text = Path(args.file).read_text(encoding="utf-8")
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

    p_compress = sub.add_parser("compress", help="Compress text")
    p_compress.add_argument("text", nargs="?", help="Input text (or use --file)")
    p_compress.add_argument("--file", "-f", help="Read input from file")
    p_compress.add_argument("--out", "-o", help="Write .babel file")

    p_decompress = sub.add_parser("decompress", help="Decompress text")
    p_decompress.add_argument("text", nargs="?", help="Compressed text (or use --file)")
    p_decompress.add_argument("--depth", "-d", type=int, help="Depth value")
    p_decompress.add_argument("--length", "-l", type=int, help="Original length")
    p_decompress.add_argument("--file", "-f", help="Read from .babel file")

    p_analyze = sub.add_parser("analyze", help="Show compression analysis")
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
