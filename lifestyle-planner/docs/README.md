# docs/

Project documentation for **Day Planner — Austin TX**.

---

## Files

| File | Purpose | Edit? |
|------|---------|-------|
| **[confirmed-features.md](confirmed-features.md)** | Master feature list — what's built, what's planned, and what's been confirmed for implementation. **This is the primary planning document.** | ✏️ Yes |
| **[features.md](features.md)** | Feature tracker table (older format, predates confirmed-features.md) | Optional |
| **[roadmap.md](roadmap.md)** | Phase-by-phase product roadmap (Phase 0 → Phase 3) | Optional |
| **[architecture.md](architecture.md)** | Production system architecture notes (DB, hosting, background jobs) | Reference |
| **[deployment.md](deployment.md)** | Deployment notes for Railway / Fly.io | Reference |

---

## How to update the planned features list

Open **`confirmed-features.md`** and use the status markers:

| Marker | Meaning |
|--------|---------|
| `✅` | Built and in the codebase |
| `🔨` | Currently in progress |
| `🔲` | Confirmed — build this next |
| _(no entry)_ | Idea only — not yet confirmed |

To request a feature be built: add it to the relevant section with `🔲` and a brief description of what it should do. The more detail, the better.

---

## Project structure

```
lifestyle-planner/
├── app/
│   ├── __init__.py          Flask app factory
│   ├── routes.py            All URL routes
│   ├── db.py                SQLite helpers (schema, queries)
│   ├── planner.py           Itinerary generation algorithm
│   ├── seed_data.py         214 tags, events, categories, colors
│   ├── templates/
│   │   ├── base.html        Nav, dark mode, layout shell
│   │   ├── day.html         Daily brief + multi-day view
│   │   ├── calendar.html    Full-year calendar
│   │   └── profile.html     Settings, interests, history
│   └── static/
│       └── style.css        All styles (tokens, dark mode, components)
├── data/
│   └── planner.db           SQLite database (not in git)
├── docs/                    ← You are here
├── research/                Background research and algorithm notes
├── requirements.txt
└── run.py
```
