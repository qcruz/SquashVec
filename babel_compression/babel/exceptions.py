class BabelInputError(ValueError):
    """Raised when input contains characters outside printable ASCII 32–126."""
    pass


class BabelDecodeError(ValueError):
    """Raised when a compressed token contains invalid characters."""
    pass
