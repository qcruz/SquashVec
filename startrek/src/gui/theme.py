"""
Starsleep GUI theme — Citizen Sleeper-inspired dark terminal aesthetic.
"""
import platform
import tkinter.font as tkfont


# ---------------------------------------------------------------------------
# Color palette
# ---------------------------------------------------------------------------

C = {
    "bg":            "#0b0c0e",    # near-black background
    "bg_panel":      "#141619",    # slightly lighter panel background
    "bg_button":     "#1c1f24",    # button default background
    "bg_button_hot": "#272c36",    # button hover
    "bg_input":      "#111318",    # text input areas

    "fg":            "#c8a878",    # primary text (warm amber)
    "fg_dim":        "#7a6a52",    # secondary / dimmed text
    "fg_header":     "#e8b840",    # headers and titles
    "fg_label":      "#8fa0b0",    # labels, column headers (cool grey-blue)

    "accent":        "#e8b840",    # accent amber (same as header)
    "border":        "#2a2f3a",    # panel borders / separators
    "border_bright": "#445060",    # brighter border (active panel)

    "success":       "#52c97e",    # green — success outcomes
    "partial":       "#c9a040",    # amber — partial outcomes
    "failure":       "#c94a4a",    # red — failure outcomes
    "crit_success":  "#80e8a0",    # bright green — critical success
    "crit_failure":  "#e84040",    # bright red — critical failure
    "info":          "#5a9fd4",    # blue — informational

    "bar_fill":      "#e8b840",    # stat bar fill
    "bar_empty":     "#2a2f3a",    # stat bar background
}

TIER_COLORS = {
    "critical_success": C["crit_success"],
    "full_success":     C["success"],
    "partial":          C["partial"],
    "full_failure":     C["failure"],
    "critical_failure": C["crit_failure"],
}

TIER_LABELS = {
    "critical_success": "★  CRITICAL SUCCESS",
    "full_success":     "✓  SUCCESS",
    "partial":          "~  PARTIAL",
    "full_failure":     "✗  FAILURE",
    "critical_failure": "✗✗ CRITICAL FAILURE",
}

OUTCOME_COLORS = {
    "success": C["success"],
    "partial": C["partial"],
    "failure": C["failure"],
}


# ---------------------------------------------------------------------------
# Font helpers
# ---------------------------------------------------------------------------

def _mono_family() -> str:
    system = platform.system()
    if system == "Darwin":
        return "Menlo"
    elif system == "Windows":
        return "Consolas"
    else:
        return "DejaVu Sans Mono"

MONO = _mono_family()

FONTS = {
    "title":      (MONO, 22, "bold"),
    "header":     (MONO, 14, "bold"),
    "subheader":  (MONO, 12, "bold"),
    "body":       (MONO, 11),
    "body_bold":  (MONO, 11, "bold"),
    "small":      (MONO, 10),
    "tiny":       (MONO, 9),
    "button":     (MONO, 11, "bold"),
    "button_sm":  (MONO, 10),
}


# ---------------------------------------------------------------------------
# Layout constants
# ---------------------------------------------------------------------------

PAD = 8          # standard padding
PAD_SM = 4       # small padding
PAD_LG = 16      # large padding

WINDOW_W = 1200
WINDOW_H = 820

HEADER_H   = 56
STATUS_H   = 28
ACTIONS_W  = 280   # width of right action panel


# ---------------------------------------------------------------------------
# Widget style helpers
# ---------------------------------------------------------------------------

def apply_bg(widget, color: str = None):
    """Recursively apply background to a widget and all children."""
    c = color or C["bg"]
    try:
        widget.configure(bg=c)
    except Exception:
        pass
    for child in widget.winfo_children():
        apply_bg(child, c)


def styled_button(parent, text: str, command, width: int = 28,
                  color: str = None, font=None, small: bool = False) -> object:
    """Return a consistently styled dark button."""
    import tkinter as tk
    fg = color or C["fg_header"]
    f = font or (FONTS["button_sm"] if small else FONTS["button"])
    btn = tk.Button(
        parent,
        text=text,
        command=command,
        font=f,
        fg=fg,
        bg=C["bg_button"],
        activeforeground=C["accent"],
        activebackground=C["bg_button_hot"],
        relief="flat",
        bd=0,
        padx=PAD,
        pady=PAD_SM,
        cursor="hand2",
        anchor="w",
        width=width,
    )
    # Subtle border via a frame is handled at call site if needed
    return btn


def styled_label(parent, text: str, font=None, color: str = None, **kw) -> object:
    import tkinter as tk
    return tk.Label(
        parent,
        text=text,
        font=font or FONTS["body"],
        fg=color or C["fg"],
        bg=kw.pop("bg", C["bg"]),
        anchor=kw.pop("anchor", "w"),
        **kw,
    )


def bar_str(value: int, width: int = 10, max_val: int = 10) -> str:
    """Return a text progress bar string."""
    filled = round((value / max_val) * width)
    return "█" * filled + "░" * (width - filled)


def loyalty_bar(value: int) -> str:
    return bar_str(value, width=10, max_val=100)
