"""
Starsleep — tkinter GUI frontend.
Runs the same game engine as main.py with a windowed interface.

Launch: python3 -m src.gui.app
"""

import tkinter as tk
import tkinter.scrolledtext as scrolledtext
import random
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.engine.crew_generator import generate_roster
from src.engine.scenario_generator import generate_scenario, resolve
from src.engine.crew import STATS
from src.engine.game_state import (GameState, CareerRecord, Score, GameClock,
                                   RANK_NAMES, award_stat_progress, apply_stat_decay)
from src.engine.save_load import save_game, load_game, list_saves
from src.engine.hierarchy import (generate_project, generate_mission, generate_voyage,
                                  auto_assign_crew_to_project, auto_execute_project,
                                  INTERRUPTION_OPTIONS)
from src.gui.theme import (C, FONTS, TIER_COLORS, TIER_LABELS, OUTCOME_COLORS,
                           PAD, PAD_SM, PAD_LG, WINDOW_W, WINDOW_H,
                           HEADER_H, STATUS_H, ACTIONS_W,
                           styled_button, styled_label, bar_str, loyalty_bar)

ACADEMY_FOCUSES = [
    {"name": "Command Track",       "bonuses": {"Command": 2, "Diplomacy": 1},
     "trait": "Natural Authority",  "desc": "Leadership and authority under pressure."},
    {"name": "Sciences",            "bonuses": {"Science": 2, "Medicine": 1},
     "trait": "Analytical Mind",    "desc": "Analysis and pattern recognition."},
    {"name": "Engineering",         "bonuses": {"Engineering": 2, "Science": 1},
     "trait": "Systems Thinker",    "desc": "Systems, improvisation, damage control."},
    {"name": "Security / Tactical", "bonuses": {"Tactical": 2, "Command": 1},
     "trait": "Combat Ready",       "desc": "Threat assessment and precision under fire."},
    {"name": "Medical",             "bonuses": {"Medicine": 2, "Diplomacy": 1},
     "trait": "Healer's Eye",       "desc": "Biology, triage, and crew welfare."},
    {"name": "Diplomatic Corps",    "bonuses": {"Diplomacy": 2, "Science": 1},
     "trait": "Cultural Fluency",   "desc": "Negotiation and cultural understanding."},
]

FREE_TIME_OPTIONS = [
    ("Study",            "Improve one stat by 1."),
    ("Physical Training","Builds injury resistance over time."),
    ("Crew Time",        "Improve a crew member's loyalty (40% to discover hidden talent)."),
    ("Rest",             "Reduce crew fatigue by 8–18%."),
]


# ---------------------------------------------------------------------------
# Main application class
# ---------------------------------------------------------------------------

class StarSleepApp:

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("STARSLEEP")
        self.root.geometry(f"{WINDOW_W}x{WINDOW_H}")
        self.root.resizable(True, True)
        self.root.configure(bg=C["bg"])
        self.root.minsize(900, 600)

        self.gs: GameState = None
        self._pending_scenario = None
        self._pending_result   = None
        self._pending_project  = None
        self._selected_focus   = tk.IntVar(value=0)
        self._bonus_remaining  = 0
        self._bonus_assignments = {}

        self._build_layout()
        self.show_splash()
        self.root.mainloop()

    # -----------------------------------------------------------------------
    # Layout construction (persistent frame skeleton)
    # -----------------------------------------------------------------------

    def _build_layout(self):
        """Build the persistent frame structure. Content areas are cleared/rebuilt per screen."""
        root = self.root

        # ── Top header bar ──────────────────────────────────────────────────
        self.header = tk.Frame(root, bg=C["bg_panel"], height=HEADER_H)
        self.header.pack(side=tk.TOP, fill=tk.X)
        self.header.pack_propagate(False)

        self.lbl_title = tk.Label(self.header, text="◈ STARSLEEP",
                                  font=FONTS["header"], fg=C["fg_header"],
                                  bg=C["bg_panel"], padx=PAD_LG)
        self.lbl_title.pack(side=tk.LEFT, pady=PAD_SM)

        self.lbl_status = tk.Label(self.header, text="",
                                   font=FONTS["small"], fg=C["fg_dim"],
                                   bg=C["bg_panel"], padx=PAD_LG)
        self.lbl_status.pack(side=tk.RIGHT, pady=PAD_SM)

        self.lbl_rank = tk.Label(self.header, text="",
                                 font=FONTS["body_bold"], fg=C["fg"],
                                 bg=C["bg_panel"], padx=PAD)
        self.lbl_rank.pack(side=tk.RIGHT, pady=PAD_SM)

        # ── Separator ───────────────────────────────────────────────────────
        tk.Frame(root, bg=C["border"], height=1).pack(fill=tk.X)

        # ── Main area (narrative left + actions right) ─────────────────────
        self.main = tk.Frame(root, bg=C["bg"])
        self.main.pack(side=tk.TOP, fill=tk.BOTH, expand=True)

        # Left: narrative / content panel
        self.content = tk.Frame(self.main, bg=C["bg"])
        self.content.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Divider
        tk.Frame(self.main, bg=C["border"], width=1).pack(side=tk.LEFT, fill=tk.Y)

        # Right: actions panel
        self.actions = tk.Frame(self.main, bg=C["bg_panel"], width=ACTIONS_W)
        self.actions.pack(side=tk.RIGHT, fill=tk.Y)
        self.actions.pack_propagate(False)

        # ── Bottom status strip ─────────────────────────────────────────────
        tk.Frame(root, bg=C["border"], height=1).pack(fill=tk.X)
        self.status_bar = tk.Frame(root, bg=C["bg_panel"], height=STATUS_H)
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)
        self.status_bar.pack_propagate(False)

        self.lbl_last_event = tk.Label(self.status_bar, text="  No events recorded.",
                                       font=FONTS["tiny"], fg=C["fg_dim"],
                                       bg=C["bg_panel"])
        self.lbl_last_event.pack(side=tk.LEFT, padx=PAD, pady=3)

        self.lbl_score = tk.Label(self.status_bar, text="",
                                  font=FONTS["tiny"], fg=C["fg_dim"],
                                  bg=C["bg_panel"])
        self.lbl_score.pack(side=tk.RIGHT, padx=PAD_LG, pady=3)

        self.btn_save = tk.Button(self.status_bar, text=" [S] Save ",
                                  font=FONTS["tiny"], fg=C["fg_dim"],
                                  bg=C["bg_panel"],
                                  activeforeground=C["accent"],
                                  activebackground=C["bg_button_hot"],
                                  relief=tk.FLAT, bd=0, cursor="hand2",
                                  command=self._save_game_action)
        self.btn_save.pack(side=tk.RIGHT, padx=PAD, pady=2)
        self.btn_save.pack_forget()   # hidden until game is active

    def _clear_content(self):
        for w in self.content.winfo_children():
            w.destroy()

    def _clear_actions(self):
        for w in self.actions.winfo_children():
            w.destroy()

    def _update_header(self):
        if not self.gs:
            self.lbl_status.config(text="")
            self.lbl_rank.config(text="")
            return
        gs = self.gs
        hull = gs.ship_condition
        fat  = gs.crew_fatigue
        name = gs.character.get("name", "—")
        rank = gs.career.rank
        self.lbl_rank.config(text=f"{name}  ·  {rank}")
        self.lbl_status.config(
            text=f"Hull {hull}%   Fatigue {fat}%   Score {gs.score.total():,}"
        )
        if gs.event_log:
            last = gs.event_log[-1]
            self.lbl_last_event.config(
                text=f"  Last: {last['title']} — {last['outcome']}"
            )
        self.lbl_score.config(text=f"Score: {gs.score.total():,}")

    # -----------------------------------------------------------------------
    # Text display helpers
    # -----------------------------------------------------------------------

    def _make_text_area(self, parent, height=None) -> tk.Text:
        """Create a read-only dark scrollable text area."""
        frame = tk.Frame(parent, bg=C["border"], padx=1, pady=1)
        frame.pack(fill=tk.BOTH, expand=True, padx=PAD_LG, pady=PAD)

        txt = tk.Text(frame,
                      font=FONTS["body"],
                      bg=C["bg_input"],
                      fg=C["fg"],
                      insertbackground=C["fg"],
                      selectbackground=C["border_bright"],
                      relief=tk.FLAT,
                      bd=0,
                      wrap=tk.WORD,
                      padx=PAD_LG,
                      pady=PAD,
                      height=height,
                      state=tk.DISABLED)
        scroll = tk.Scrollbar(frame, command=txt.yview,
                              bg=C["bg_panel"], troughcolor=C["bg"])
        txt.configure(yscrollcommand=scroll.set)
        scroll.pack(side=tk.RIGHT, fill=tk.Y)
        txt.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

        # Tag definitions
        txt.tag_configure("header",   font=FONTS["header"],   foreground=C["fg_header"])
        txt.tag_configure("subhead",  font=FONTS["subheader"],foreground=C["fg_label"])
        txt.tag_configure("dim",                               foreground=C["fg_dim"])
        txt.tag_configure("success",                           foreground=C["success"])
        txt.tag_configure("partial",                           foreground=C["partial"])
        txt.tag_configure("failure",                           foreground=C["failure"])
        txt.tag_configure("crit_s",                            foreground=C["crit_success"])
        txt.tag_configure("crit_f",                            foreground=C["crit_failure"])
        txt.tag_configure("info",                              foreground=C["info"])
        txt.tag_configure("accent",                            foreground=C["accent"])
        txt.tag_configure("bold",     font=FONTS["body_bold"])
        return txt

    def _write(self, txt: tk.Text, text: str, tag: str = None, newline: bool = True):
        txt.config(state=tk.NORMAL)
        if tag:
            txt.insert(tk.END, text + ("\n" if newline else ""), tag)
        else:
            txt.insert(tk.END, text + ("\n" if newline else ""))
        txt.config(state=tk.DISABLED)

    def _write_sep(self, txt: tk.Text):
        self._write(txt, "─" * 60, "dim")

    def _action_header(self, text: str):
        lbl = tk.Label(self.actions, text=text,
                       font=FONTS["subheader"], fg=C["fg_label"],
                       bg=C["bg_panel"], anchor="w", padx=PAD_LG)
        lbl.pack(fill=tk.X, pady=(PAD_LG, PAD_SM))

    def _action_sep(self):
        tk.Frame(self.actions, bg=C["border"], height=1).pack(fill=tk.X, padx=PAD)

    def _add_action_button(self, text: str, cmd, color=None, small=False):
        frm = tk.Frame(self.actions, bg=C["bg_panel"])
        frm.pack(fill=tk.X, padx=PAD, pady=2)
        btn = styled_button(frm, text, cmd, width=0, color=color, small=small)
        btn.pack(fill=tk.X)

    # -----------------------------------------------------------------------
    # SPLASH SCREEN
    # -----------------------------------------------------------------------

    def show_splash(self):
        self._clear_content()
        self._clear_actions()
        self.lbl_rank.config(text="")
        self.lbl_status.config(text="")
        self.btn_save.pack_forget()

        frm = tk.Frame(self.content, bg=C["bg"])
        frm.place(relx=0.5, rely=0.45, anchor=tk.CENTER)

        tk.Label(frm, text="STARSLEEP", font=(FONTS["title"][0], 48, "bold"),
                 fg=C["fg_header"], bg=C["bg"]).pack(pady=(0, PAD_SM))
        tk.Label(frm, text="Every cycle counts.", font=FONTS["body"],
                 fg=C["fg_dim"], bg=C["bg"]).pack(pady=(0, PAD_LG * 2))

        btn_frm = tk.Frame(frm, bg=C["bg"])
        btn_frm.pack()

        tk.Button(btn_frm, text="  NEW GAME  ", font=FONTS["header"],
                  fg=C["fg_header"], bg=C["bg_button"],
                  activeforeground=C["accent"], activebackground=C["bg_button_hot"],
                  relief=tk.FLAT, bd=0, padx=PAD_LG, pady=PAD,
                  cursor="hand2", command=self.show_character_creation
                  ).pack(pady=PAD)

        saves = list_saves()
        if saves:
            most_recent = saves[0]
            tk.Button(btn_frm, text="  CONTINUE  ", font=FONTS["body_bold"],
                      fg=C["success"], bg=C["bg_button"],
                      activeforeground=C["crit_success"], activebackground=C["bg_button_hot"],
                      relief=tk.FLAT, bd=0, padx=PAD_LG, pady=PAD_SM,
                      cursor="hand2",
                      command=lambda p=most_recent["path"]: self._load_save(p)
                      ).pack(pady=PAD_SM)
            tk.Label(btn_frm, text=f"  {most_recent['save_name']}  ·  {most_recent['rank']}  ·  {most_recent['date'][:10]}",
                     font=FONTS["tiny"], fg=C["fg_dim"], bg=C["bg"]).pack()

            tk.Button(btn_frm, text="  LOAD GAME  ", font=FONTS["small"],
                      fg=C["fg_label"], bg=C["bg_button"],
                      activeforeground=C["accent"], activebackground=C["bg_button_hot"],
                      relief=tk.FLAT, bd=0, padx=PAD_LG, pady=PAD_SM,
                      cursor="hand2", command=self.show_load_game
                      ).pack(pady=(PAD_LG, PAD_SM))

        tk.Button(btn_frm, text="  QUIT  ", font=FONTS["body"],
                  fg=C["fg_dim"], bg=C["bg_button"],
                  activeforeground=C["failure"], activebackground=C["bg_button_hot"],
                  relief=tk.FLAT, bd=0, padx=PAD_LG, pady=PAD_SM,
                  cursor="hand2", command=self.root.quit
                  ).pack(pady=PAD_SM)

        tk.Label(frm, text="A sci-fi career strategy game.",
                 font=FONTS["tiny"], fg=C["fg_dim"], bg=C["bg"]).pack(pady=PAD_LG)

    # -----------------------------------------------------------------------
    # LOAD GAME
    # -----------------------------------------------------------------------

    def show_load_game(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "LOAD GAME", "header")
        self._write(txt, "")

        saves = list_saves()
        if not saves:
            self._write(txt, "  No save files found.", "dim")
        else:
            self._write(txt, f"  {len(saves)} save file(s) found.", "dim")
            self._write(txt, "")
            for s in saves:
                phase_label = {"farpoint": "Farpoint", "career": "Career",
                               "expedition": "Expedition"}.get(s["phase"], s["phase"])
                self._write(txt, f"  {s['save_name']}", "accent")
                self._write(txt,
                    f"  {s['char_name']}  ·  {s['rank']}  ·  {phase_label}  ·  Score {s['score']}",
                    "dim")
                self._write(txt, f"  Saved: {s['date'][:19]}", "dim")
                self._write(txt, "")

        self._action_header("SAVES")
        for s in saves:
            self._add_action_button(
                f"  {s['save_name'][:28]}\n  {s['char_name']}  ·  {s['rank']}",
                lambda p=s["path"]: self._load_save(p)
            )
        self._action_sep()
        self._add_action_button("  ← Back", self.show_splash,
                                color=C["fg_dim"], small=True)

    def _load_save(self, filepath: str):
        try:
            self.gs = load_game(filepath)
            self._update_header()
            self.btn_save.pack(side=tk.RIGHT, padx=PAD, pady=2)
            self.show_bridge()
        except Exception as e:
            self._clear_content()
            self._clear_actions()
            txt = self._make_text_area(self.content)
            self._write(txt, "LOAD ERROR", "header")
            self._write(txt, "")
            self._write(txt, f"  Could not load save file:", "failure")
            self._write(txt, f"  {e}", "dim")
            self._action_header("ERROR")
            self._add_action_button("  ← Back", self.show_splash, color=C["fg_dim"])

    def _save_game_action(self):
        if not self.gs:
            return
        try:
            path = save_game(self.gs)
            self.lbl_last_event.config(text=f"  Saved: {path}")
        except Exception as e:
            self.lbl_last_event.config(text=f"  Save failed: {e}")

    def _save_and_exit(self):
        self._save_game_action()
        self.btn_save.pack_forget()
        self.gs = None
        self.show_splash()

    def _add_save_exit(self):
        """Add Save & Exit to the current actions panel."""
        self._action_sep()
        self._add_action_button("  Save & Exit", self._save_and_exit,
                                color=C["fg_dim"], small=True)

    # -----------------------------------------------------------------------
    # CHARACTER CREATION
    # -----------------------------------------------------------------------

    def show_character_creation(self):
        self._clear_content()
        self._clear_actions()

        frm = tk.Frame(self.content, bg=C["bg"])
        frm.place(relx=0.5, rely=0.4, anchor=tk.CENTER)

        tk.Label(frm, text="NEW SLEEPER", font=FONTS["header"],
                 fg=C["fg_header"], bg=C["bg"]).pack(anchor="w", pady=(0, PAD_SM))
        tk.Label(frm, text="You wake from cryo at Farpoint Station.\nDebt balance: 1,200 credits. Departure clearance: pending.",
                 font=FONTS["small"], fg=C["fg_dim"], bg=C["bg"],
                 justify=tk.LEFT).pack(anchor="w", pady=(0, PAD_LG))

        name_frm = tk.Frame(frm, bg=C["bg"])
        name_frm.pack(anchor="w", pady=PAD_SM)
        tk.Label(name_frm, text="Name:", font=FONTS["body"],
                 fg=C["fg_label"], bg=C["bg"]).pack(side=tk.LEFT)
        self._name_var = tk.StringVar(value="J. Harrington")
        name_entry = tk.Entry(name_frm, textvariable=self._name_var,
                              font=FONTS["body"], fg=C["fg"], bg=C["bg_input"],
                              insertbackground=C["fg"], relief=tk.FLAT, bd=0,
                              width=24)
        name_entry.pack(side=tk.LEFT, padx=PAD, ipady=4)
        name_entry.focus_set()
        name_entry.bind("<Return>", lambda e: self._confirm_character())

        self._action_header("READY?")
        self._add_action_button("  Next →", self._confirm_character, color=C["success"])
        self._action_sep()
        self._add_action_button("  ← Back", self.show_splash,
                                color=C["fg_dim"], small=True)

    def _confirm_character(self):
        name = self._name_var.get().strip() or "J. Harrington"
        self._pending_char = {
            "name":  name,
            "rank":  "Ensign",
            "stats": {s: 3 for s in STATS},
        }
        self._bonus_remaining   = 2
        self._bonus_assignments = {}
        self.show_bonus_assignment()

    def show_bonus_assignment(self):
        self._clear_content()
        self._clear_actions()

        char = self._pending_char
        txt = self._make_text_area(self.content)
        self._write(txt, "ASSIGN BONUS POINTS", "header")
        self._write(txt, "")
        self._write(txt, f"  Name:  {char['name']}", "dim")
        self._write(txt, "")
        self._write(txt, f"  You have {self._bonus_remaining} bonus point(s) to assign.", "accent")
        self._write(txt, "  Distribute them freely — these become your baseline,", "dim")
        self._write(txt, "  the floor your skills will never decay below.", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "  CURRENT STATS", "subhead")
        for stat, val in char["stats"].items():
            extra = self._bonus_assignments.get(stat, 0)
            marker = f"  +{extra}" if extra else ""
            self._write(txt,
                f"  {stat:<14}  {bar_str(val)}  {val}/10{marker}", "dim")

        self._action_header(f"ASSIGN ({self._bonus_remaining} left)")
        if self._bonus_remaining > 0:
            for stat in STATS:
                val = char["stats"][stat]
                if val < 10:
                    self._add_action_button(
                        f"  +1  {stat}  (→ {val+1})",
                        lambda s=stat: self._assign_bonus(s)
                    )
        else:
            self._add_action_button("  Confirm & Begin →",
                                    self._finalize_character,
                                    color=C["success"])
        self._action_sep()
        self._add_action_button("  ← Back", self.show_character_creation,
                                color=C["fg_dim"], small=True)
        # Allow confirming with all 2 points still unspent too
        if self._bonus_remaining < 2:
            self._action_sep()
            self._add_action_button("  Skip remaining →", self._finalize_character,
                                    color=C["fg_dim"], small=True)

    def _assign_bonus(self, stat: str):
        char = self._pending_char
        if char["stats"][stat] >= 10 or self._bonus_remaining <= 0:
            return
        char["stats"][stat] += 1
        self._bonus_assignments[stat] = self._bonus_assignments.get(stat, 0) + 1
        self._bonus_remaining -= 1
        self.show_bonus_assignment()

    def _finalize_character(self):
        char = self._pending_char
        # Store base_stats as the decay floor (after bonus point assignment)
        char["base_stats"] = dict(char["stats"])
        char["stat_progress"] = {s: 0.0 for s in STATS}
        char["stat_decay"]    = {s: 0.0 for s in STATS}

        roster = generate_roster("scout", seed=random.randint(0, 9999))

        self.gs = GameState(
            character=char,
            roster=roster,
            score=Score(),
            career=CareerRecord(rank="Ensign", rank_idx=0),
            clock=GameClock(),
            ship_condition=100,
            crew_fatigue=20,
            xp=0,
            game_phase="farpoint",
        )

        self._update_header()
        self.btn_save.pack(side=tk.RIGHT, padx=PAD, pady=2)
        self.show_farpoint_bridge()

    # -----------------------------------------------------------------------
    # BRIDGE (main menu)
    # -----------------------------------------------------------------------

    def show_bridge(self):
        if self.gs and self.gs.game_phase == "farpoint":
            self.show_farpoint_bridge()
            return
        self._update_header()
        self._clear_content()
        self._clear_actions()

        gs = self.gs
        rank = gs.career.rank

        # ── Narrative panel: status overview ──────────────────────────────
        txt = self._make_text_area(self.content)

        self._write(txt, f"BRIDGE — {gs.character['name'].upper()}", "header")
        self._write(txt, "")
        self._write(txt, f"  Rank       {rank}", "dim")
        if gs.character.get("focus"):
            self._write(txt, f"  Focus      {gs.character['focus']}", "dim")
        elif gs.character.get("faction"):
            fac = gs.character["faction"].title()
            self._write(txt, f"  Faction    {fac}", "dim")
        self._write(txt, f"  Hull       {gs.ship_condition}%   "
                         f"Fatigue {gs.crew_fatigue}%", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "PROMOTION PROGRESS", "subhead")
        self._write(txt, f"  {gs.career.promotion_progress()}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "STATS", "subhead")
        for stat, val in gs.character["stats"].items():
            bar = bar_str(val, width=10)
            prog = gs.character.get("stat_progress", {}).get(stat, 0.0)
            prog_str = f"  [{prog:.0%} to next]" if prog > 0 else ""
            self._write(txt, f"  {stat:<14}  {bar}  {val}/10{prog_str}", "dim")

        if gs.career.career_flags:
            self._write(txt, "")
            self._write_sep(txt)
            self._write(txt, "")
            self._write(txt, "CAREER FLAGS", "subhead")
            for flag in gs.career.career_flags:
                self._write(txt, f"  ⚑  {flag}", "failure")

        # ── Actions panel ─────────────────────────────────────────────────
        self._action_header("ACTIONS")

        rank_labels = {
            "Ensign":         "  Next Task",
            "Lieutenant JG":  "  Next Task",
            "Lieutenant":     "  Next Project",
            "Lt. Commander":  "  Next Project",
            "Commander":      "  Next Mission",
            "Captain":        "  Next Voyage",
        }
        self._add_action_button(rank_labels.get(rank, "  Next Assignment"),
                                self._dispatch_primary, color=C["accent"])

        if rank == "Captain":
            self._action_sep()
            self._add_action_button("  ◈ Accept Five-Year Expedition",
                                    self._start_expedition, color=C["crit_success"])

        self._action_sep()
        self._add_action_button("  Free Time", self.show_free_time)
        self._action_sep()
        self._add_action_button("  Crew Logs",      self.show_crew_logs,  color=C["fg_label"])
        self._add_action_button("  Mission History", self.show_history,   color=C["fg_label"])
        self._add_action_button("  Career Stats",   self.show_stats,      color=C["fg_label"])
        self._add_action_button("  Score",          self.show_score,      color=C["fg_label"])
        self._add_save_exit()
        self._action_sep()
        self._add_action_button("  Quit", self.root.quit, color=C["fg_dim"], small=True)

    # -----------------------------------------------------------------------
    # FARPOINT STATION (beginner phase)
    # -----------------------------------------------------------------------

    FARPOINT_INTROS = [
        "Farpoint Station, Dock 7. You wake from cryo to the sound of ventilation fans "
        "and the smell of recycled air. Debt balance: 1,200 credits. Departure clearance: pending.",
        "The station roster has you logged as available for general assignment. "
        "Station Manager Voss needs bodies. You have a body.",
        "Chief Engineer Rael flags another problem in the industrial bay. "
        "Third one this week. She needs someone she can trust.",
        "Doctor Osei's infirmary has a waitlist. The mines are running twelve-hour shifts "
        "and the medics are stretched thin.",
        "Milo Fane waves you over near the cargo bay entrance. He looks like he's about to "
        "ask for a favor. He always looks like that.",
    ]

    def show_farpoint_bridge(self):
        self._update_header()
        self._clear_content()
        self._clear_actions()

        gs = self.gs
        tasks_done = gs.career.tasks_completed
        intro_idx = min(tasks_done, len(self.FARPOINT_INTROS) - 1)

        txt = self._make_text_area(self.content)
        self._write(txt, "FARPOINT STATION", "header")
        self._write(txt, "")
        self._write(txt, self.FARPOINT_INTROS[intro_idx], "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, f"  Assignments completed:  {tasks_done}", "dim")
        self._write(txt, f"  Hull:    {gs.ship_condition}%    Fatigue: {gs.crew_fatigue}%", "dim")
        self._write(txt, "")
        self._write(txt, "STATS", "subhead")
        for stat, val in gs.character["stats"].items():
            prog = gs.character.get("stat_progress", {}).get(stat, 0.0)
            prog_str = f"  [{prog:.0%} to next]" if prog > 0 else ""
            base = gs.character.get("base_stats", {}).get(stat, val)
            base_str = f"  (base {base})" if val != base else ""
            self._write(txt, f"  {stat:<14}  {bar_str(val)}  {val}/10{prog_str}{base_str}", "dim")

        if gs.career.career_flags:
            self._write(txt, "")
            self._write_sep(txt)
            self._write(txt, "CAREER FLAGS", "subhead")
            for flag in gs.career.career_flags:
                self._write(txt, f"  ⚑  {flag}", "failure")

        self._action_header("FARPOINT ACTIONS")
        self._add_action_button("  Take Assignment", self._run_task, color=C["accent"])

        if tasks_done >= 8:
            self._action_sep()
            self._add_action_button(
                "  ◈ Choose Your Path →",
                self.show_career_path,
                color=C["crit_success"]
            )

        self._action_sep()
        self._add_action_button("  Free Time", self.show_free_time)
        self._action_sep()
        self._add_action_button("  Crew Logs",      self.show_crew_logs,  color=C["fg_label"])
        self._add_action_button("  History",        self.show_history,    color=C["fg_label"])
        self._add_action_button("  Officer Status", self.show_stats,      color=C["fg_label"])
        self._add_save_exit()
        self._action_sep()
        self._add_action_button("  Quit", self.root.quit, color=C["fg_dim"], small=True)

    def show_career_path(self):
        self._clear_content()
        self._clear_actions()

        PATHS = [
            {
                "name":    "The Hegemony",
                "faction": "hegemony",
                "tagline": "Order. Law. Logistics.",
                "desc":    (
                    "The Reach's closest thing to a government. Diplomatic authority, "
                    "structured career advancement, and a steady salary. "
                    "You answer to a hierarchy — and the hierarchy expects results."
                ),
                "start":   "Medium cruiser · 8,000 credits · Diplomatic clearance",
                "color":   C["info"],
            },
            {
                "name":    "The Searchers",
                "faction": "searchers",
                "tagline": "Science. Discovery. The unknown.",
                "desc":    (
                    "A loose collective of scientists and explorers funded by research grants "
                    "and discovery bonuses. Exceptional sensors, academic standing, limited combat. "
                    "The hardest path — and the most important work."
                ),
                "start":   "Science vessel · 5,000 credits · Research network access",
                "color":   C["success"],
            },
            {
                "name":    "The RedHawks",
                "faction": "redhawks",
                "tagline": "Combat. Escort. Results.",
                "desc":    (
                    "The Reach's largest mercenary fleet. Well-armed, contract-paid, and "
                    "internally disciplined. No diplomatic standing, constant permit friction "
                    "with the Hegemony — but nobody questions your firepower."
                ),
                "start":   "Combat corvette · 6,000 credits · Arms trader contacts",
                "color":   C["failure"],
            },
            {
                "name":    "Independent Operator",
                "faction": "independent",
                "tagline": "No faction. No salary. No safety net.",
                "desc":    (
                    "You own your ship. You answer to no one. You can take contracts from "
                    "any faction, broker deals between parties that can't meet directly, "
                    "and operate in the grey. The weakest start — the highest ceiling."
                ),
                "start":   "Varkis' ship (small, paid off) · 3,000 credits · Cross-faction access",
                "color":   C["partial"],
            },
        ]

        txt = self._make_text_area(self.content)
        self._write(txt, "CHOOSE YOUR PATH", "header")
        self._write(txt, "")
        self._write(txt,
            "Your time at Farpoint has earned you an introduction. "
            "What comes next is your choice.", "dim")
        self._write(txt, "")
        self._write_sep(txt)

        for p in PATHS:
            self._write(txt, "")
            self._write(txt, f"  {p['name'].upper()}", "accent")
            self._write(txt, f"  {p['tagline']}", "subhead")
            self._write(txt, f"  {p['desc']}", "dim")
            self._write(txt, f"  Starting: {p['start']}", "dim")

        self._action_header("PATHS")
        for p in PATHS:
            self._add_action_button(
                f"  {p['name']}",
                lambda f=p["faction"], n=p["name"]: self._select_career_path(f, n),
                color=p["color"],
            )
        self._action_sep()
        self._add_action_button("  ← Farpoint", self.show_farpoint_bridge,
                                color=C["fg_dim"], small=True)

    def _select_career_path(self, faction: str, faction_name: str):
        gs = self.gs
        gs.character["faction"] = faction
        gs.game_phase = "career"

        # Set starting reputation based on faction
        rep_tables = {
            "hegemony":    {"hegemony": 30, "searchers": 10, "redhawks":  5, "independent": 0},
            "searchers":   {"hegemony": 10, "searchers": 40, "redhawks":  0, "independent": 15},
            "redhawks":    {"hegemony":  0, "searchers":  5, "redhawks": 50, "independent": 20},
            "independent": {"hegemony":  5, "searchers": 10, "redhawks": 10, "independent": 35},
        }
        gs.character["reputation"] = rep_tables.get(faction, {})

        gs.log_event("promotion", f"Joined {faction_name}", "completed",
                     "Left Farpoint Station")

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "DEPARTURE", "header")
        self._write(txt, "")
        self._write(txt, f"  You have chosen: {faction_name.upper()}", "accent")
        self._write(txt, "")
        departure_lines = {
            "hegemony":    "  Transfer orders received. Report to Centara Station.",
            "searchers":   "  Doctor Osei's contact at the Archive has confirmed your berth.",
            "redhawks":    "  Milo Fane's message gets you a seat on the next ship to Redgate.",
            "independent": "  Varkis signs over the title. It's yours now. Don't wreck it.",
        }
        self._write(txt, departure_lines.get(faction, "  You ship out."), "dim")
        self._write(txt, "")
        self._write(txt, "  Farpoint is behind you.", "dim")
        self._write(txt, "  The Reach is ahead.", "dim")

        self._action_header("DEPART")
        self._add_action_button("  Begin Career →", self.show_bridge, color=C["accent"])

    def _dispatch_primary(self):
        rank = self.gs.career.rank
        if rank in ("Ensign", "Lieutenant JG"):
            self._run_task()
        elif rank in ("Lieutenant", "Lt. Commander"):
            self._run_project()
        elif rank == "Commander":
            self._run_mission()
        elif rank == "Captain":
            self._run_voyage()

    # -----------------------------------------------------------------------
    # TASK EXECUTION (Ensign / LJG)
    # -----------------------------------------------------------------------

    def _run_task(self):
        scenario = generate_scenario(rank_idx=self.gs.career.rank_idx, roster=self.gs.roster)
        self._pending_scenario = scenario
        self.show_scenario(scenario)

    def show_scenario(self, scenario):
        self._clear_content()
        self._clear_actions()
        gs = self.gs

        txt = self._make_text_area(self.content)

        self._write(txt, f"TASK — {scenario.title.upper()}", "header")
        self._write(txt, "")
        self._write(txt, scenario.hook)
        self._write(txt, "")
        self._write(txt, scenario.situation)
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "BRIDGE STATUS", "subhead")

        for option in scenario.options:
            crew = scenario.assigned_crew.get(option.station)
            if option.station == "Command":
                self._write(txt, f"  Command        You ({gs.character['name']})", "dim")
            else:
                crew_name = crew.name if crew else "—"
                crew_stat = crew.stat(option.stat) if crew else 0
                self._write(txt,
                    f"  {option.station:<14}  {crew_name:<22}  "
                    f"{option.stat} {crew_stat}   "
                    f"Morale {crew.morale if crew else '—'}",
                    "dim")

        # ── Actions: one button per option ─────────────────────────────────
        self._action_header("RESPONSE OPTIONS")

        for i, option in enumerate(scenario.options):
            crew = scenario.assigned_crew.get(option.station)
            crew_stat = crew.stat(option.stat) if crew else 0
            player_stat = gs.character["stats"].get(option.stat, 1)
            total_mod = (player_stat - 5) + ((crew_stat - 5) // 2 if crew else 0)
            avg_roll = 10.5 + total_mod
            pct = max(5, min(95, int(50 + (avg_roll - option.difficulty) * 5)))

            cost_str = ""
            if option.cost_type != "none":
                cost_labels = {1: "minor", 2: "mod", 3: "high"}
                cost_str = f" [{cost_labels.get(option.cost_amount,'?')} cost]"

            label = (f"  [{i+1}] {option.label[:26]}\n"
                     f"       {option.stat} · ~{pct}%{cost_str}")
            idx = i
            self._add_action_button(label,
                                    lambda n=idx: self._choose_option(n))

        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)
        self._add_save_exit()

    def _choose_option(self, option_idx: int):
        scenario = self._pending_scenario
        gs = self.gs

        result = resolve(
            scenario=scenario,
            option_idx=option_idx,
            player_stats=gs.character["stats"],
            ship_condition=gs.ship_condition,
            crew_fatigue=gs.crew_fatigue,
        )
        self._pending_result = (scenario, result)
        self._apply_task_result(scenario, result)
        self.show_result(result)

    def _apply_task_result(self, scenario, result):
        gs = self.gs

        gs.career.tasks_completed += 1
        gs.score.tasks_completed += 1
        if result.tier in ("critical_success", "full_success"):
            gs.career.tasks_full_success += 1
            gs.score.tasks_full_success += 1

        stat_inc = award_stat_progress(gs.character, result.stat_used, result.tier)
        apply_stat_decay(gs.character, result.stat_used)

        if result.tier in ("full_failure", "critical_failure"):
            dmg = random.randint(3, 10)
            gs.ship_condition = max(0, gs.ship_condition - dmg)
        gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(2, 5))

        if scenario.has_ethical_weight and result.tier in ("full_failure", "critical_failure"):
            flag = f"[{scenario.title}] Ethical failure"
            gs.career.career_flags.append(flag)
            gs.score.career_flags_negative += 1
            gs.log_event("flag", scenario.title, "flagged", flag)

        gs.log_event("task", scenario.title, result.tier.replace("_", " "),
                     f"via {result.stat_used}")

        # XP
        xp_gain = {"critical_success": 3, "full_success": 2,
                   "partial": 1, "full_failure": 1, "critical_failure": 2}.get(result.tier, 1)
        gs.xp += xp_gain

    def show_result(self, result, on_continue=None):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)

        tier_label = TIER_LABELS.get(result.tier, result.tier.upper())
        tier_tag = {
            "critical_success": "crit_s",
            "full_success":     "success",
            "partial":          "partial",
            "full_failure":     "failure",
            "critical_failure": "crit_f",
        }.get(result.tier, "dim")

        self._write(txt, tier_label, tier_tag)
        self._write(txt, "")

        # Roll breakdown
        crew_mod = (result.crew_stat - 5) // 2 if result.crew_stat else 0
        self._write(txt,
            f"  Roll:  {result.base_roll} (d20)  "
            f"+{result.player_stat - 5} (stat)  "
            f"+{crew_mod} (crew)",
            "dim")
        if result.condition_mod:
            self._write(txt, f"  Condition: {result.condition_mod:+d}", "dim")
        self._write(txt,
            f"  Total: {result.total}  vs  Difficulty: {result.difficulty}",
            "dim")

        if result.hidden_triggered and result.crew_member:
            self._write(txt, "")
            self._write(txt, f"  {result.crew_member.name} performed exceptionally.", "accent")

        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, result.outcome_text)
        self._write(txt, "")

        gs = self.gs

        # XP check
        if gs.xp >= 5:
            gs.xp -= 5
            self._write_sep(txt)
            self._write(txt, "")
            self._write(txt, "ADVANCEMENT AVAILABLE — choose a stat to improve.", "accent")

        # Promotion check
        promotion_ready = gs.career.promotion_eligible()
        if promotion_ready:
            self._write(txt, "")
            self._write(txt, "★  PROMOTION ELIGIBLE  ★", "crit_s")

        self._write(txt, "")
        self._write(txt, f"  Hull: {gs.ship_condition}%   Fatigue: {gs.crew_fatigue}%", "dim")

        # Actions
        self._action_header("OUTCOME")
        self._write_tier_indicator(result.tier)

        if gs.xp == 0 and not hasattr(self, '_just_leveled'):
            # Check if we had xp rollover (we decremented above if >= 5)
            pass

        continue_cmd = on_continue or self._after_result
        self._add_action_button("  Continue →", continue_cmd, color=C["accent"])

        if promotion_ready:
            self._action_sep()
            self._add_action_button("  Accept Promotion",
                                    lambda: self._offer_promotion(on_continue or self._after_result),
                                    color=C["crit_success"])

    def _write_tier_indicator(self, tier: str):
        label = TIER_LABELS.get(tier, tier)
        color = TIER_COLORS.get(tier, C["fg"])
        lbl = tk.Label(self.actions, text=f"\n  {label}\n",
                       font=FONTS["body_bold"], fg=color,
                       bg=C["bg_panel"], anchor="w", padx=PAD_LG,
                       wraplength=ACTIONS_W - PAD_LG * 2)
        lbl.pack(fill=tk.X)

    def _after_result(self):
        gs = self.gs
        if gs.xp >= 5:
            gs.xp -= 5
            self.show_level_up()
        else:
            self.show_bridge()

    def show_level_up(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "ADVANCEMENT", "header")
        self._write(txt, "")
        self._write(txt, "Experience has sharpened your abilities.", "dim")
        self._write(txt, "Choose one stat to improve by 1 point.", "dim")
        self._write(txt, "")

        improvable = [s for s in STATS if self.gs.character["stats"][s] < 10]
        for stat in improvable:
            val = self.gs.character["stats"][stat]
            self._write(txt, f"  {stat:<14}  {bar_str(val)}  {val} → {val+1}", "dim")

        self._action_header("CHOOSE STAT")
        for stat in improvable:
            val = self.gs.character["stats"][stat]
            self._add_action_button(
                f"  {stat}  ({val} → {val+1})",
                lambda s=stat: self._apply_levelup(s)
            )
        self._add_save_exit()

    def _apply_levelup(self, stat: str):
        self.gs.character["stats"][stat] += 1
        self.gs.log_event("task", f"{stat} advanced", "promoted",
                          f"now {self.gs.character['stats'][stat]}")
        self.show_bridge()

    # -----------------------------------------------------------------------
    # PROMOTION
    # -----------------------------------------------------------------------

    def _offer_promotion(self, on_decline=None):
        next_rank = RANK_NAMES[self.gs.career.rank_idx + 1]
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "STARFLEET COMMUNICATION — PROMOTION REVIEW", "header")
        self._write(txt, "")
        self._write(txt, f"  Officer {self.gs.character['name']},", "dim")
        self._write(txt, f"  your record has been reviewed.", "dim")
        self._write(txt, "")
        self._write(txt, f"  Promotion offered: {next_rank}", "accent")
        self._write(txt, "")
        messages = {
            "Lieutenant JG":  "You are no longer probationary. Navigate well.",
            "Lieutenant":     "You are authorized to lead projects and assign crew.",
            "Lt. Commander":  "Two intervention slots per project. Your judgment is trusted.",
            "Commander":      "You will command missions directly.",
            "Captain":        "Command of a vessel is hereby granted.",
        }
        self._write(txt, f"  {messages.get(next_rank, 'Greater responsibility awaits.')}", "dim")

        self._action_header("PROMOTION")
        self._add_action_button(f"  Accept — {next_rank}",
                                lambda: self._apply_promotion(next_rank),
                                color=C["crit_success"])
        self._action_sep()
        self._add_action_button("  Decline (stay at current rank)",
                                on_decline or self.show_bridge,
                                color=C["fg_dim"], small=True)
        self._add_save_exit()

    def _apply_promotion(self, next_rank: str):
        gs = self.gs
        gs.career.promote()
        gs.character["rank"] = gs.career.rank
        gs.log_event("promotion", f"Promoted to {gs.career.rank}", "promoted")

        if gs.career.rank == "Lieutenant":
            gs.roster = generate_roster("cruiser", seed=random.randint(0, 9999))
            gs.log_event("promotion", "Transferred to cruiser-class vessel", "completed")
        elif gs.career.rank == "Commander":
            gs.roster = generate_roster("heavy_cruiser", seed=random.randint(0, 9999))
            gs.ship_condition = 100
            gs.crew_fatigue = 15
            gs.log_event("promotion", "Transferred to heavy cruiser", "completed")

        self._update_header()
        self.show_bridge()

    # -----------------------------------------------------------------------
    # PROJECT (Lieutenant / Lt. Commander)
    # -----------------------------------------------------------------------

    def _run_project(self):
        slots = 2 if self.gs.career.rank == "Lt. Commander" else 1
        project = generate_project(roster=self.gs.roster,
                                   rank_idx=self.gs.career.rank_idx,
                                   intervention_slots=slots)
        self._pending_project = project
        self._project_task_idx = 0
        self._project_assign_idx = 0
        self.show_project_brief(project)

    def show_project_brief(self, project):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"PROJECT — {project.title.upper()}", "header")
        self._write(txt, "")
        self._write(txt, project.objective)
        self._write(txt, "")
        self._write(txt, f"  Tasks: {len(project.tasks)}   "
                         f"Intervention slots: {project.intervention_slots}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "TASK OVERVIEW", "subhead")
        for i, task in enumerate(project.tasks, 1):
            best_opt = max(task.scenario.options, key=lambda o: o.difficulty)
            self._write(txt, f"  {i}.  {task.scenario.title}", "dim")
            self._write(txt, f"       Station: {best_opt.station}  ·  "
                             f"Stat: {best_opt.stat}", "dim")

        self._action_header("PROJECT")
        self._add_action_button("  Assign Crew →", self._assign_project_crew,
                                color=C["accent"])
        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    def _assign_project_crew(self):
        self._project_assign_idx = 0
        self._show_assign_task()

    def _show_assign_task(self):
        project = self._pending_project
        idx = self._project_assign_idx

        if idx >= len(project.tasks):
            self._execute_project_tasks()
            return

        task = project.tasks[idx]
        best_opt = max(task.scenario.options, key=lambda o: o.difficulty)
        station = best_opt.station
        stat = best_opt.stat

        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"ASSIGN CREW — TASK {idx+1}/{len(project.tasks)}", "header")
        self._write(txt, "")
        self._write(txt, f"  Task:    {task.scenario.title}", "dim")
        self._write(txt, f"  Station: {station}   Stat: {stat}", "dim")
        self._write(txt, "")

        if station == "Command":
            self._write(txt, "  This task falls under your direct command.", "accent")
            self._action_header(f"TASK {idx+1}")
            self._add_action_button("  Continue →",
                                    lambda: self._advance_assign(),
                                    color=C["accent"])
            return

        dept_map = {"Helm": "Helm", "Tactical": "Tactical", "Science": "Science",
                    "Engineering": "Engineering", "Medical": "Medical",
                    "Communications": "Operations"}
        dept = dept_map.get(station, station)

        used_ids = {id(t.assigned_crew) for t in project.tasks
                    if t.assigned_crew is not None}

        candidates = [c for c in self.gs.roster.by_department(dept)
                      if id(c) not in used_ids]
        if not candidates:
            candidates = [c for c in self.gs.roster.named_crew
                         if c.stat(stat) >= 3 and id(c) not in used_ids]
        candidates = sorted(candidates, key=lambda c: c.stat(stat), reverse=True)[:8]

        self._write(txt, f"  Available crew (sorted by {stat}):", "subhead")
        self._write(txt, "")
        for c in candidates:
            val = c.stat(stat)
            hidden = "  ★" if c.discovered_hidden_count() > 0 else ""
            self._write(txt, f"  {c.name:<22}  {c.rank:<16}  "
                             f"{stat} {val}  {bar_str(val)}{hidden}", "dim")

        self._action_header(f"ASSIGN TASK {idx+1}")
        for i, c in enumerate(candidates):
            val = c.stat(stat)
            self._add_action_button(
                f"  {c.name}  ({stat} {val})",
                lambda crew=c: self._assign_and_advance(crew)
            )
        if not candidates:
            self._add_action_button("  [No eligible crew — skip]",
                                    lambda: self._advance_assign())

    def _assign_and_advance(self, crew):
        project = self._pending_project
        idx = self._project_assign_idx
        task = project.tasks[idx]
        task.assigned_crew = crew
        # Pick best option for this crew
        task.option_idx = max(range(len(task.scenario.options)),
                              key=lambda i: crew.stat(task.scenario.options[i].stat))
        self._advance_assign()

    def _advance_assign(self):
        self._project_assign_idx += 1
        self._show_assign_task()

    def _execute_project_tasks(self):
        self._project_task_idx = 0
        self._show_next_project_task()

    def _show_next_project_task(self):
        project = self._pending_project
        idx = self._project_task_idx

        if idx >= len(project.tasks):
            self._finish_project()
            return

        task = project.tasks[idx]
        result = resolve(
            scenario=task.scenario,
            option_idx=task.option_idx,
            player_stats=self.gs.character["stats"],
            ship_condition=self.gs.ship_condition,
            crew_fatigue=self.gs.crew_fatigue,
        )
        task.result = result

        # Stats
        stat_used = task.scenario.options[task.option_idx].stat
        award_stat_progress(self.gs.character, stat_used, result.tier)
        self.gs.career.tasks_completed += 1
        self.gs.score.tasks_completed += 1
        if result.tier in ("critical_success", "full_success"):
            self.gs.career.tasks_full_success += 1
            self.gs.score.tasks_full_success += 1
        self.gs.log_event("task", task.scenario.title,
                          result.tier.replace("_", " "), f"project: {project.title}")

        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"TASK {idx+1}/{len(project.tasks)} — {task.scenario.title.upper()}", "header")
        self._write(txt, "")
        if task.assigned_crew:
            self._write(txt, f"  Assigned: {task.assigned_crew.name}  "
                             f"({task.assigned_crew.rank})", "dim")
        crew_mod = (result.crew_stat - 5) // 2 if result.crew_stat else 0
        self._write(txt, f"  Roll: {result.base_roll} + {result.player_stat-5} (stat) "
                         f"+ {crew_mod} (crew) = {result.total} vs {result.difficulty}", "dim")
        self._write(txt, "")

        tier_tag = {
            "critical_success": "crit_s", "full_success": "success",
            "partial": "partial", "full_failure": "failure",
            "critical_failure": "crit_f"
        }.get(result.tier, "dim")
        self._write(txt, TIER_LABELS.get(result.tier, result.tier), tier_tag)
        self._write(txt, "")
        self._write(txt, result.outcome_text)

        self._action_header(f"TASK {idx+1} RESULT")
        self._write_tier_indicator(result.tier)

        # Offer intervention on bad rolls
        if (result.tier in ("partial", "full_failure", "critical_failure")
                and project.slots_remaining() > 0
                and result.base_roll != 1):
            stat_used = task.scenario.options[task.option_idx].stat
            my_val = self.gs.character["stats"].get(stat_used, 1)
            self._action_sep()
            self._add_action_button(
                f"  Intervene (+{my_val} {stat_used})\n"
                f"  [{project.slots_remaining()} slot(s) left]",
                lambda t=task, p=project, r=result, s=stat_used, v=my_val:
                    self._apply_intervention(t, p, r, s, v),
                color=C["info"]
            )

        self._action_sep()
        self._add_action_button("  Next Task →",
                                self._advance_project_task,
                                color=C["accent"])

    def _apply_intervention(self, task, project, result, stat, bonus_val):
        project.slots_used += 1
        task.player_intervened = True
        new_total = result.total + bonus_val
        diff = result.difficulty
        if new_total >= diff + 5:
            new_tier = "full_success"
        elif new_total >= diff - 4:
            new_tier = "partial"
        else:
            new_tier = "full_failure"
        outcomes = task.scenario.outcomes[task.option_idx]
        new_text = (outcomes.full_success if new_tier in ("full_success", "critical_success")
                    else outcomes.partial if new_tier == "partial"
                    else outcomes.full_failure)
        # Rebuild result with updated values
        task.result = type(result)(
            option_idx=result.option_idx, option_label=result.option_label,
            station=result.station, stat_used=result.stat_used,
            base_roll=result.base_roll, player_stat=result.player_stat,
            crew_stat=result.crew_stat, hidden_bonus=result.hidden_bonus,
            condition_mod=result.condition_mod,
            total=new_total, difficulty=result.difficulty,
            tier=new_tier, outcome_text=new_text,
            effects=result.effects, hidden_triggered=result.hidden_triggered,
            crew_member=result.crew_member,
        )
        self._advance_project_task()

    def _advance_project_task(self):
        self._project_task_idx += 1
        self._show_next_project_task()

    def _finish_project(self):
        project = self._pending_project
        outcome = project.determine_outcome()

        gs = self.gs
        gs.career.projects_led += 1
        gs.score.projects_completed += 1
        if outcome in ("success", "partial"):
            gs.career.projects_succeeded += 1
        gs.log_event("project", project.title, outcome,
                     f"{project.success_count()}/{len(project.tasks)} tasks")
        if outcome == "failure":
            gs.ship_condition = max(0, gs.ship_condition - random.randint(2, 6))
        gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(3, 8))

        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"PROJECT COMPLETE — {project.title.upper()}", "header")
        self._write(txt, "")
        rate = int(project.success_rate() * 100)
        self._write(txt, f"  Tasks succeeded: {project.success_count()}/{len(project.tasks)} ({rate}%)", "dim")
        self._write(txt, "")
        oc = {"success": "success", "partial": "partial", "failure": "failure"}.get(outcome, "dim")
        self._write(txt, f"  Outcome:  {outcome.upper()}", oc)
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        for i, task in enumerate(project.tasks, 1):
            if task.result:
                tier = task.result.tier
                t = {"critical_success":"crit_s","full_success":"success",
                     "partial":"partial","full_failure":"failure",
                     "critical_failure":"crit_f"}.get(tier,"dim")
                crew_name = task.assigned_crew.name if task.assigned_crew else "—"
                self._write(txt, f"  {i}.  {task.scenario.title:<30}  "
                                 f"{TIER_LABELS.get(tier, tier)[:14]:<14}  {crew_name}", t)

        self._action_header("PROJECT")
        oc2 = {"success": C["success"], "partial": C["partial"],
               "failure": C["failure"]}.get(outcome, C["fg"])
        self._write_tier_indicator(outcome)
        self._add_action_button("  Continue →", self._check_promo_then_bridge,
                                color=C["accent"])

    def _check_promo_then_bridge(self):
        if self.gs.career.promotion_eligible():
            self._offer_promotion(self.show_bridge)
        else:
            self.show_bridge()

    # -----------------------------------------------------------------------
    # MISSION (Commander — simplified auto-execute with interruptions)
    # -----------------------------------------------------------------------

    def _run_mission(self):
        from src.engine.hierarchy import generate_mission
        mission = generate_mission(roster=self.gs.roster,
                                   rank_idx=self.gs.career.rank_idx)
        self._pending_mission = mission
        self.show_mission_brief(mission)

    def show_mission_brief(self, mission):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"MISSION — {mission.title.upper()}", "header")
        self._write(txt, "")
        self._write(txt, mission.objective)
        self._write(txt, "")
        threat_tag = {"low": "success", "medium": "partial", "high": "failure"}.get(
            mission.threat_level, "dim")
        self._write(txt, f"  Threat level: {mission.threat_level.upper()}", threat_tag)
        if mission.lives_at_stake:
            self._write(txt, f"  Lives at stake: {mission.lives_at_stake:,}", "accent")
        self._write(txt, f"  Projects: {len(mission.projects)}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "PROJECTS", "subhead")
        for i, mp in enumerate(mission.projects, 1):
            tag_str = "[PRIMARY]" if mp.is_primary else "[secondary]"
            self._write(txt, f"  {i}.  {tag_str} {mp.project.title}", "dim")
            self._write(txt, f"       {mp.project.objective[:70]}", "dim")

        if mission.interruptions:
            self._write(txt, "")
            self._write_sep(txt)
            self._write(txt, f"  {len(mission.interruptions)} interruption event(s) expected.", "dim")

        self._action_header("MISSION")
        self._add_action_button("  Execute Mission →",
                                lambda: self._execute_mission(mission),
                                color=C["accent"])
        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    def _execute_mission(self, mission):
        gs = self.gs
        for mp in mission.projects:
            auto_assign_crew_to_project(mp.project, gs.roster)
            auto_execute_project(mp.project, gs.character["stats"],
                                 gs.ship_condition, gs.crew_fatigue)
            n_tasks = len(mp.project.tasks)
            n_ok = mp.project.success_count()
            gs.career.tasks_completed += n_tasks
            gs.score.tasks_completed += n_tasks
            gs.career.tasks_full_success += n_ok
            gs.career.projects_led += 1
            gs.score.projects_completed += 1
            if mp.project.outcome in ("success", "partial"):
                gs.career.projects_succeeded += 1

        if mission.interruptions:
            self._pending_interruptions = list(zip(
                mission.interruptions, [False] * len(mission.interruptions)))
            self._pending_mission = mission
            self._show_interruption(0)
            return

        self._finish_mission(mission)

    def _show_interruption(self, idx: int):
        if idx >= len(self._pending_interruptions):
            self._finish_mission(self._pending_mission)
            return

        event, _ = self._pending_interruptions[idx]
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "INTERRUPTION", "header")
        self._write(txt, "")
        self._write(txt, event, "accent")
        self._write(txt, "")
        self._write(txt, "Your response:", "subhead")

        options = INTERRUPTION_OPTIONS.get(event, [
            ("Address directly", "direct"),
            ("Delegate", "delegate"),
            ("Defer", "defer"),
        ])
        for label, _ in options:
            self._write(txt, f"  ·  {label}", "dim")

        self._action_header("RESPOND")
        for label, resp_type in options:
            self._add_action_button(
                f"  {label[:32]}",
                lambda r=resp_type, i=idx: self._handle_interruption_choice(r, i)
            )

    def _handle_interruption_choice(self, response_type, idx):
        self._pending_interruptions[idx] = (self._pending_interruptions[idx][0], True)
        self._show_interruption(idx + 1)

    def _finish_mission(self, mission):
        mission.determine_outcome()
        mo = mission.outcome
        gs = self.gs

        gs.career.missions_commanded += 1
        gs.score.missions_completed += 1
        if mo in ("success", "partial"):
            gs.career.missions_succeeded += 1

        if mission.lives_at_stake:
            if mo in ("success", "partial"):
                frac = 1.0 if mo == "success" else 0.5
                gs.score.lives_saved += int(mission.lives_at_stake * frac)
            else:
                gs.score.lives_lost += mission.lives_at_stake

        gs.log_event("mission", mission.title, mo,
                     f"{mission.lives_at_stake:,} lives at stake" if mission.lives_at_stake else "")
        gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(5, 12))
        if mo == "failure":
            gs.ship_condition = max(0, gs.ship_condition - random.randint(5, 15))

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, f"MISSION COMPLETE — {mission.title.upper()}", "header")
        self._write(txt, "")
        for mp in mission.projects:
            tag = "[PRIMARY]" if mp.is_primary else "[secondary]"
            oc_tag = {"success":"success","partial":"partial","failure":"failure"}.get(
                mp.project.outcome, "dim")
            self._write(txt, f"  {tag} {mp.project.title}", "dim")
            self._write(txt, f"       {mp.project.success_count()}/{len(mp.project.tasks)} tasks  "
                             f"— {mp.project.outcome.upper()}", oc_tag)
            self._write(txt, "")

        self._write_sep(txt)
        self._write(txt, "")
        mo_tag = {"success":"success","partial":"partial","failure":"failure"}.get(mo,"dim")
        self._write(txt, f"  Mission outcome:  {mo.upper()}", mo_tag)
        if mission.lives_at_stake:
            if mo in ("success","partial"):
                self._write(txt, f"  Lives protected: {int(mission.lives_at_stake*(1.0 if mo=='success' else 0.5)):,}", "success")
            else:
                self._write(txt, f"  Lives lost: {mission.lives_at_stake:,}", "failure")

        self._action_header("MISSION")
        self._write_tier_indicator(mo)
        self._add_action_button("  Continue →", self._check_promo_then_bridge,
                                color=C["accent"])

    # -----------------------------------------------------------------------
    # VOYAGE (Captain)
    # -----------------------------------------------------------------------

    def _run_voyage(self):
        self.show_voyage_selection()

    def show_voyage_selection(self):
        VOYAGE_TYPES = ["Exploration", "Diplomacy", "Federation Support",
                        "Scientific Survey", "Border Patrol"]
        DURATIONS = [("short", "Short  (3 months, 3–4 missions)"),
                     ("standard", "Standard (6 months, 5–7 missions)"),
                     ("extended", "Extended (1 year, 10–14 missions)")]

        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "VOYAGE SELECTION", "header")
        self._write(txt, "")
        self._write(txt, "Choose your deployment type and duration.", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        for vt in VOYAGE_TYPES:
            self._write(txt, f"  ·  {vt}", "dim")
        self._write(txt, "")
        for dur, label in DURATIONS:
            self._write(txt, f"  ·  {label}", "dim")

        self._voyage_type_var = tk.StringVar(value=VOYAGE_TYPES[0])
        self._voyage_dur_var  = tk.StringVar(value="standard")

        self._action_header("VOYAGE TYPE")
        for vt in VOYAGE_TYPES:
            self._add_action_button(
                f"  {vt}",
                lambda v=vt: (self._voyage_type_var.set(v),
                              self._update_voyage_selection()),
                small=True
            )
        self._action_sep()
        self._action_header("DURATION")
        for dur, label in DURATIONS:
            self._add_action_button(
                f"  {label}",
                lambda d=dur: (self._voyage_dur_var.set(d),
                               self._update_voyage_selection()),
                small=True
            )
        self._action_sep()
        self._add_action_button("  Launch Voyage →",
                                self._launch_voyage, color=C["accent"])
        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)
        self._add_save_exit()

    def _update_voyage_selection(self):
        # Refresh selection label in header
        self.lbl_status.config(
            text=f"  Type: {self._voyage_type_var.get()}  ·  "
                 f"Duration: {self._voyage_dur_var.get()}"
        )

    def _launch_voyage(self):
        voyage = generate_voyage(
            self._voyage_type_var.get(),
            self._voyage_dur_var.get(),
            self.gs.roster,
            self.gs.career.rank_idx,
        )
        self._pending_voyage = voyage
        self._voyage_mission_idx = 0
        self._show_voyage_mission()

    def _show_voyage_mission(self):
        voyage = self._pending_voyage
        idx = self._voyage_mission_idx

        if idx >= len(voyage.missions):
            self._finish_voyage(voyage)
            return

        vm = voyage.missions[idx]
        mission = vm.mission
        gs = self.gs

        # Auto-execute mission
        for mp in mission.projects:
            auto_assign_crew_to_project(mp.project, gs.roster)
            auto_execute_project(mp.project, gs.character["stats"],
                                 gs.ship_condition, gs.crew_fatigue)
            gs.career.tasks_completed += len(mp.project.tasks)
            gs.score.tasks_completed += len(mp.project.tasks)
            gs.career.tasks_full_success += mp.project.success_count()
            gs.career.projects_led += 1
            gs.score.projects_completed += 1
            if mp.project.outcome in ("success", "partial"):
                gs.career.projects_succeeded += 1

        mission.determine_outcome()
        mo = mission.outcome

        gs.career.missions_commanded += 1
        gs.score.missions_completed += 1
        if mo in ("success", "partial"):
            gs.career.missions_succeeded += 1
        if mission.lives_at_stake:
            if mo in ("success", "partial"):
                gs.score.lives_saved += int(mission.lives_at_stake *
                                            (1.0 if mo == "success" else 0.5))
            else:
                gs.score.lives_lost += mission.lives_at_stake
        gs.log_event("mission", mission.title, mo)
        gs.crew_fatigue = min(100, gs.crew_fatigue + random.randint(4, 10))
        gs.clock.advance(1)

        # Show this mission result then continue
        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, f"VOYAGE — Mission {idx+1}/{len(voyage.missions)}", "header")
        self._write(txt, "")
        self._write(txt, f"  {mission.title}", "accent")
        self._write(txt, f"  {mission.objective}", "dim")
        self._write(txt, "")
        mo_tag = {"success":"success","partial":"partial","failure":"failure"}.get(mo,"dim")
        self._write(txt, f"  Outcome: {mo.upper()}", mo_tag)
        if mission.lives_at_stake:
            lives_tag = "success" if mo != "failure" else "failure"
            self._write(txt, f"  Lives {'protected' if mo!='failure' else 'lost'}: "
                             f"{mission.lives_at_stake:,}", lives_tag)
        self._write(txt, "")
        for mp in mission.projects:
            oc_tag = {"success":"success","partial":"partial","failure":"failure"}.get(
                mp.project.outcome, "dim")
            self._write(txt, f"  ·  {mp.project.title}  — {mp.project.outcome.upper()}", oc_tag)

        self._action_header(f"MISSION {idx+1}")
        self._add_action_button("  Next Mission →",
                                self._next_voyage_mission, color=C["accent"])

    def _next_voyage_mission(self):
        # Handle interruptions if any
        mission = self._pending_voyage.missions[self._voyage_mission_idx].mission
        self._voyage_mission_idx += 1
        if mission.interruptions:
            self._pending_interruptions = list(zip(
                mission.interruptions, [False] * len(mission.interruptions)))
            self._pending_mission = mission
            old_finish = lambda: self._show_voyage_mission()
            self._voyage_interrupt_callback = old_finish
            self._show_voyage_interruption(0)
        else:
            self._show_voyage_mission()

    def _show_voyage_interruption(self, idx):
        if idx >= len(self._pending_interruptions):
            self._voyage_interrupt_callback()
            return
        event, _ = self._pending_interruptions[idx]
        options = INTERRUPTION_OPTIONS.get(event, [
            ("Address directly", "direct"),
            ("Delegate", "delegate"),
            ("Defer", "defer"),
        ])
        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "INTERRUPTION — VOYAGE", "header")
        self._write(txt, "")
        self._write(txt, event, "accent")
        self._action_header("RESPOND")
        for label, _ in options:
            self._add_action_button(f"  {label[:32]}",
                lambda i=idx: self._show_voyage_interruption(i + 1))

    def _finish_voyage(self, voyage):
        voyage.determine_outcome()
        vo = voyage.outcome
        gs = self.gs
        gs.career.voyages_completed += 1
        gs.score.voyages_completed += 1
        gs.clock.advance(1)
        gs.score.years_reached = gs.clock.year
        gs.log_event("voyage", f"{voyage.voyage_type} ({voyage.duration})", vo,
                     f"{len(voyage.missions)} missions")

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, f"VOYAGE COMPLETE — {voyage.voyage_type.upper()}", "header")
        self._write(txt, "")
        ok = sum(1 for vm in voyage.missions if vm.mission.outcome != "failure")
        self._write(txt, f"  Missions: {ok}/{len(voyage.missions)} successful", "dim")
        vo_tag = {"success":"success","partial":"partial","failure":"failure"}.get(vo,"dim")
        self._write(txt, f"  Voyage outcome: {vo.upper()}", vo_tag)
        self._write(txt, f"  Current date: {gs.clock.display()}", "dim")

        self._action_header("VOYAGE")
        self._write_tier_indicator(vo)
        self._add_action_button("  Continue →", self._check_promo_then_bridge,
                                color=C["accent"])

    # -----------------------------------------------------------------------
    # EXPEDITION
    # -----------------------------------------------------------------------

    def _start_expedition(self):
        import random as _r
        gs = self.gs
        gs.expedition_active = True
        gs.clock = GameClock(year=1, month=1)
        enc_year = _r.choices([3, 4, 5], weights=[20, 35, 45])[0]
        gs.clock.encounter_year = enc_year
        gs.clock.encounter_set = True

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "THE FIVE-YEAR EXPEDITION", "header")
        self._write(txt, "")
        self._write(txt, f"  Captain {gs.character['name']},", "dim")
        self._write(txt, "  you have accepted command of a deep-space expedition.", "dim")
        self._write(txt, "")
        self._write(txt, "  Five years. Whatever you find out there — the ship will not return.", "accent")
        self._write(txt, "  You know this. The crew knows this. You ship out anyway.", "dim")
        self._write(txt, "")
        self._write(txt, "  Make it count.", "fg_header")

        self._action_header("EXPEDITION")
        self._add_action_button("  Begin Year 1 →", self.show_bridge, color=C["accent"])

    # -----------------------------------------------------------------------
    # ENCOUNTER (endgame)
    # -----------------------------------------------------------------------

    def show_encounter(self):
        ENCOUNTER_TEXTS = [
            "An overwhelming force has appeared on sensors. Classification unknown. "
            "Weapons output exceeds anything in the Starfleet database. They are hailing you.",
            "Something has emerged from the anomaly. It is not a ship. "
            "It fills the viewscreen. Shields are failing before a weapon has fired.",
            "Three vessels — configuration unknown. Long-range sensors show forty more behind them. "
            "There is no corridor of escape.",
        ]
        RESPONSES = [
            ("Fight — hold your ground", "fight", 30, 0),
            ("Surrender — protect the crew", "surrender", 70, 0),
            ("Negotiate — attempt contact", "negotiate", 60, 100),
            ("Sacrifice play — order crew to pods; you stay", "sacrifice", 85, 500),
            ("Self-destruct — deny them the ship", "self_destruct", 25, 200),
            ("Flee — emergency warp", "flee", 35, 0),
        ]

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "FINAL ENCOUNTER", "header")
        self._write(txt, "")
        self._write(txt, random.choice(ENCOUNTER_TEXTS), "failure")
        self._write(txt, "")
        self._write(txt, "There is no solution to this.", "dim")
        self._write(txt, "There is only the decision you make now.", "dim")

        self._action_header("FINAL ORDER")
        for label, resp, surv, bonus in RESPONSES:
            self._add_action_button(
                f"  {label}",
                lambda s=surv, b=bonus, l=label: self._resolve_encounter(s, b, l)
            )

    def _resolve_encounter(self, base_survival: int, bonus: int, label: str):
        gs = self.gs
        named = gs.roster.named_crew
        avg_loyalty = sum(c.loyalty for c in named) / len(named) if named else 50
        adjusted = min(95, int(base_survival * (avg_loyalty / 100.0) * 1.5))
        crew_total = len(named)
        crew_surviving = int(crew_total * (adjusted / 100))

        gs.score.crew_alive_at_encounter = crew_total
        gs.score.crew_survived_encounter = crew_surviving
        gs.score.encounter_bonus = bonus
        gs.score.years_reached = gs.clock.year

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "END OF SERVICE", "header")
        self._write(txt, "")
        self._write(txt, f"  {label}", "accent")
        self._write(txt, "")
        self._write(txt, f"  Crew survival: {crew_surviving}/{crew_total} ({adjusted}%)", "dim")
        if "sacrifice" in label.lower():
            self._write(txt, f"  Captain {gs.character['name']} did not survive.", "failure")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        for line in gs.score.breakdown():
            self._write(txt, line, "dim")

        self._action_header("SERVICE RECORD")
        self._add_action_button("  View Final Score", self.show_score, color=C["accent"])
        self._add_action_button("  Quit", self.root.quit, color=C["fg_dim"], small=True)

    # -----------------------------------------------------------------------
    # FREE TIME
    # -----------------------------------------------------------------------

    def show_free_time(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "FREE TIME", "header")
        self._write(txt, "")
        self._write(txt, "Between assignments, you have time to invest in yourself and your crew.", "dim")
        self._write(txt, "")
        for name, desc in FREE_TIME_OPTIONS:
            self._write(txt, f"  {name}", "accent")
            self._write(txt, f"  {desc}", "dim")
            self._write(txt, "")

        self._action_header("ACTIVITY")
        for name, desc in FREE_TIME_OPTIONS:
            self._add_action_button(f"  {name}",
                                    lambda n=name: self._do_free_time(n))
        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    def _do_free_time(self, activity: str):
        gs = self.gs
        msg = ""

        if activity == "Study":
            self._show_study()
            return

        elif activity == "Physical Training":
            gs.character["physical_training"] = gs.character.get("physical_training", 0) + 1
            msg = "Physical training logged."

        elif activity == "Crew Time":
            self._show_crew_time()
            return

        elif activity == "Rest":
            recovery = random.randint(8, 18)
            gs.crew_fatigue = max(0, gs.crew_fatigue - recovery)
            msg = f"Crew fatigue reduced to {gs.crew_fatigue}%."

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, f"FREE TIME — {activity.upper()}", "header")
        self._write(txt, "")
        self._write(txt, f"  {msg}", "success")
        self._action_header("DONE")
        self._add_action_button("  ← Bridge", self.show_bridge, color=C["accent"])

    def _show_study(self):
        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "FREE TIME — STUDY", "header")
        self._write(txt, "")
        self._write(txt, "Choose a stat to improve by 1 point.", "dim")
        self._write(txt, "")
        for stat, val in self.gs.character["stats"].items():
            self._write(txt, f"  {stat:<14}  {bar_str(val)}  {val}/10", "dim")

        self._action_header("CHOOSE STAT")
        for stat in STATS:
            val = self.gs.character["stats"][stat]
            if val < 10:
                self._add_action_button(
                    f"  {stat}  ({val} → {val+1})",
                    lambda s=stat: self._apply_study(s)
                )

    def _apply_study(self, stat: str):
        self.gs.character["stats"][stat] = min(10, self.gs.character["stats"][stat] + 1)
        self.gs.log_event("task", f"Studied {stat}", "completed",
                          f"now {self.gs.character['stats'][stat]}")
        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "STUDY COMPLETE", "header")
        self._write(txt, "")
        self._write(txt, f"  {stat} improved to {self.gs.character['stats'][stat]}.", "success")
        self._action_header("DONE")
        self._add_action_button("  ← Bridge", self.show_bridge, color=C["accent"])

    def _show_crew_time(self):
        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "FREE TIME — CREW TIME", "header")
        self._write(txt, "")
        self._write(txt, "Choose a crew member to spend time with.", "dim")
        self._write(txt, "")
        named = self.gs.roster.named_crew[:14]
        for m in named:
            self._write(txt, f"  {m.name:<22}  {m.rank:<16}  "
                             f"Loyalty {m.loyalty}  {loyalty_bar(m.loyalty)}", "dim")

        self._action_header("SELECT CREW")
        for m in named:
            self._add_action_button(
                f"  {m.name}  (loyalty {m.loyalty})",
                lambda crew=m: self._do_crew_time(crew),
                small=True
            )
        self._action_sep()
        self._add_action_button("  ← Back", self.show_free_time,
                                color=C["fg_dim"], small=True)

    def _do_crew_time(self, member):
        gain = random.randint(5, 12)
        member.loyalty = min(100, member.loyalty + gain)
        discovered = None
        if random.random() < 0.40 and member.undiscovered_hidden_count() > 0:
            discovered = member.discover_hidden_stat()

        self._clear_content()
        self._clear_actions()
        txt = self._make_text_area(self.content)
        self._write(txt, "FREE TIME — CREW TIME", "header")
        self._write(txt, "")
        self._write(txt, f"  Time with {member.name} was well spent.", "success")
        self._write(txt, f"  Loyalty: {member.loyalty} (+{gain})", "dim")
        if discovered:
            self._write(txt, "")
            self._write(txt, f"  ★ Hidden talent identified:", "accent")
            self._write(txt, f"    {member.name} has a natural aptitude for {discovered.stat}.", "accent")
        self._action_header("DONE")
        self._add_action_button("  ← Bridge", self.show_bridge, color=C["accent"])

    # -----------------------------------------------------------------------
    # CREW LOGS
    # -----------------------------------------------------------------------

    def show_crew_logs(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "CREW LOGS", "header")
        self._write(txt, "")

        depts = {}
        for m in self.gs.roster.named_crew:
            depts.setdefault(m.department, []).append(m)

        self._crew_list = []
        for dept in ["Command","Helm","Tactical","Science","Engineering","Medical","Operations"]:
            members = depts.get(dept, [])
            if not members:
                continue
            self._write(txt, f"  {dept.upper()}", "subhead")
            for m in sorted(members, key=lambda c: c.loyalty, reverse=True):
                strained = "  [strained]" if m.is_strained() else ""
                self._write(txt,
                    f"  {m.name:<22}  {m.rank:<16}  "
                    f"loyalty {m.loyalty}  {loyalty_bar(m.loyalty)}{strained}",
                    "dim")
                self._crew_list.append(m)
            self._write(txt, "")

        self._action_header("SELECT CREW")
        named = self.gs.roster.named_crew[:20]
        for m in named:
            self._add_action_button(
                f"  {m.name}",
                lambda crew=m: self._show_crew_profile(crew),
                small=True
            )
        self._action_sep()
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    def _show_crew_profile(self, member):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, f"CREW LOG — {member.name.upper()}", "header")
        self._write(txt, "")
        self._write(txt, f"  Rank:       {member.rank}", "dim")
        self._write(txt, f"  Species:    {member.species}", "dim")
        self._write(txt, f"  Department: {member.department}", "dim")
        self._write(txt, f"  Officer:    {'Yes' if member.is_officer else 'No'}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, f"  Loyalty   {loyalty_bar(member.loyalty)}  {member.loyalty}", "dim")
        self._write(txt, f"  Morale    {loyalty_bar(member.morale)}  {member.morale}", "dim")
        self._write(txt, f"  Stress    {loyalty_bar(member.stress)}  {member.stress}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "  STATS", "subhead")
        for stat, val in member.stats.items():
            self._write(txt, f"  {stat:<14}  {bar_str(val)}  {val}/10", "dim")

        discovered = [hs for hs in member.hidden_stats if hs.discovered]
        if discovered:
            self._write(txt, "")
            self._write_sep(txt)
            self._write(txt, "")
            self._write(txt, "  KNOWN APTITUDES", "subhead")
            for hs in discovered:
                self._write(txt, f"  ★  {hs.stat}: exceptional aptitude", "accent")

        fit_str = "natural fit" if member.department_fit() else "misassigned [*]"
        self._write(txt, "")
        self._write(txt, f"  Dept fit: {fit_str}", "dim")

        self._action_header("CREW")
        self._add_action_button("  ← Crew Logs", self.show_crew_logs, color=C["accent"])
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    # -----------------------------------------------------------------------
    # HISTORY LOG
    # -----------------------------------------------------------------------

    def show_history(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "MISSION HISTORY", "header")
        self._write(txt, "")

        log = self.gs.event_log
        if not log:
            self._write(txt, "  No events recorded yet.", "dim")
        else:
            visible = log[-50:]
            self._write(txt, f"  Showing {len(visible)} of {len(log)} events.", "dim")
            self._write(txt, "")
            type_icons = {"task":"·","project":"◆","mission":"★",
                          "voyage":"⬡","promotion":"▲","flag":"⚑","encounter":"✕"}
            tag_map = {"success":"success","partial":"partial","failure":"failure",
                       "promoted":"crit_s","flagged":"failure","completed":"success",
                       "full success":"success","full failure":"failure",
                       "critical success":"crit_s","critical failure":"crit_f"}
            for e in visible:
                icon = type_icons.get(e["type"], "·")
                tag = tag_map.get(e["outcome"], "dim")
                notes = f"  ({e['notes']})" if e.get("notes") else ""
                self._write(txt, f"  {e['date']:<18}  {icon}  "
                                 f"{e['title'][:34]:<34}  {e['outcome']}{notes}", tag)

        self._action_header("HISTORY")
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    # -----------------------------------------------------------------------
    # STATUS / SCORE
    # -----------------------------------------------------------------------

    def show_stats(self):
        self._clear_content()
        self._clear_actions()
        gs = self.gs

        txt = self._make_text_area(self.content)
        self._write(txt, f"OFFICER STATUS — {gs.character['name'].upper()}", "header")
        self._write(txt, "")
        self._write(txt, f"  Rank:        {gs.career.rank}", "dim")
        if gs.character.get("focus"):
            self._write(txt, f"  Focus:       {gs.character['focus']}", "dim")
        if gs.character.get("trait"):
            self._write(txt, f"  Trait:       {gs.character['trait']}", "dim")
        if gs.character.get("faction"):
            self._write(txt, f"  Faction:     {gs.character['faction'].title()}", "dim")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "  CAREER RECORD", "subhead")
        self._write(txt, f"  Tasks:       {gs.career.tasks_completed}  "
                         f"({int(gs.career.task_success_rate()*100)}% success)", "dim")
        if gs.career.projects_led:
            self._write(txt, f"  Projects:    {gs.career.projects_led} led  "
                             f"({gs.career.projects_succeeded} succeeded)", "dim")
        if gs.career.missions_commanded:
            self._write(txt, f"  Missions:    {gs.career.missions_commanded} commanded  "
                             f"({gs.career.missions_succeeded} succeeded)", "dim")
        if gs.career.voyages_completed:
            self._write(txt, f"  Voyages:     {gs.career.voyages_completed}", "dim")
        self._write(txt, "")
        self._write(txt, f"  Promotion:   {gs.career.promotion_progress()}", "accent")
        self._write(txt, "")
        self._write_sep(txt)
        self._write(txt, "")
        self._write(txt, "  STATS", "subhead")
        for stat, val in gs.character["stats"].items():
            prog = gs.character.get("stat_progress", {}).get(stat, 0.0)
            prog_str = f"  [{prog:.0%}]" if prog > 0 else ""
            self._write(txt, f"  {stat:<14}  {bar_str(val)}  {val}/10{prog_str}", "dim")

        if gs.career.career_flags:
            self._write(txt, "")
            self._write_sep(txt)
            self._write(txt, "")
            self._write(txt, "  CAREER FLAGS", "subhead")
            for flag in gs.career.career_flags:
                self._write(txt, f"  ⚑  {flag}", "failure")

        self._action_header("STATUS")
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)

    def show_score(self):
        self._clear_content()
        self._clear_actions()

        txt = self._make_text_area(self.content)
        self._write(txt, "CAREER SCORE", "header")
        self._write(txt, "")
        for line in self.gs.score.breakdown():
            self._write(txt, line, "dim")

        self._action_header("SCORE")
        self._add_action_button("  ← Bridge", self.show_bridge,
                                color=C["fg_dim"], small=True)


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    app = StarSleepApp()


if __name__ == "__main__":
    main()
