"""
Bit-packing for Babel compressed output.

Babel's compressed string is a sequence of symbols from a 948-symbol CHARSET.
Each symbol index fits in ceil(log2(948)) = 10 bits. Packing them as 10-bit
integers into a raw byte array gives the true byte cost of the compressed data,
making comparison against zlib/bz2/lzma fair.

Wire format (fully self-contained):
  [0:2]   BASE_OUT as uint16            (2 bytes — identifies the symbol library)
  [2:4]   depth    as uint16            (2 bytes — base_in = depth + 1)
  [4:8]   original_length as uint32     (4 bytes — up to 4 billion chars)
  [8:]    symbol indices, 10 bits each, MSB-first, zero-padded to byte boundary
"""

import math
import struct
from .codec import BASE_OUT, _CHAR_TO_IDX, CHARSET
from .exceptions import BabelDecodeError

BITS_PER_SYMBOL: int = math.ceil(math.log2(BASE_OUT))   # 10 for BASE_OUT=948
_HEADER = struct.Struct(">HHI")                          # uint16 uint16 uint32 = 8 bytes
HEADER_BYTES: int = _HEADER.size                         # 8


def packed_size(n_symbols: int) -> int:
    """Byte size of the packed symbol payload (excluding header)."""
    return math.ceil(n_symbols * BITS_PER_SYMBOL / 8)


def total_packed_size(n_symbols: int) -> int:
    """Total byte size including the 8-byte header."""
    return HEADER_BYTES + packed_size(n_symbols)


def _pack_bits(indices: list[int], bits: int) -> bytes:
    """Pack list of integers into a MSB-first bitstream, padded to byte boundary."""
    buf = bytearray()
    acc = 0
    acc_bits = 0
    for idx in indices:
        acc = (acc << bits) | idx
        acc_bits += bits
        while acc_bits >= 8:
            acc_bits -= 8
            buf.append((acc >> acc_bits) & 0xFF)
    if acc_bits > 0:
        buf.append((acc << (8 - acc_bits)) & 0xFF)
    return bytes(buf)


def _unpack_bits(data: bytes, n: int, bits: int) -> list[int]:
    """Unpack n integers of `bits` bits each from a MSB-first bitstream."""
    acc = 0
    acc_bits = 0
    mask = (1 << bits) - 1
    result: list[int] = []
    it = iter(data)
    for _ in range(n):
        while acc_bits < bits:
            acc = (acc << 8) | next(it, 0)
            acc_bits += 8
        acc_bits -= bits
        result.append((acc >> acc_bits) & mask)
    return result


def encode_packed(depth: int, original_length: int, compressed: str) -> bytes:
    """
    Encode a Babel compressed result to a compact binary blob.

    Returns header (8 bytes) + packed 10-bit symbol indices.
    Total size = 8 + ceil(len(compressed) * 10 / 8) bytes.
    """
    indices = [_CHAR_TO_IDX[c] for c in compressed]
    header  = _HEADER.pack(BASE_OUT, depth, original_length)
    payload = _pack_bits(indices, BITS_PER_SYMBOL)
    return header + payload


def decode_packed(data: bytes) -> tuple[int, int, str]:
    """
    Decode a packed binary blob back to (depth, original_length, compressed_string).
    Raises BabelDecodeError if the header is invalid.
    """
    if len(data) < HEADER_BYTES:
        raise BabelDecodeError("Packed data too short to contain a valid header.")
    base_out_stored, depth, original_length = _HEADER.unpack(data[:HEADER_BYTES])
    if base_out_stored != BASE_OUT:
        raise BabelDecodeError(
            f"Symbol library mismatch: packed with BASE_OUT={base_out_stored}, "
            f"current BASE_OUT={BASE_OUT}."
        )
    payload = data[HEADER_BYTES:]
    # Infer number of symbols from payload length and BITS_PER_SYMBOL
    n_symbols = (len(payload) * 8) // BITS_PER_SYMBOL
    indices = _unpack_bits(payload, n_symbols, BITS_PER_SYMBOL)
    compressed = "".join(CHARSET[i] for i in indices)
    return (depth, original_length, compressed)
