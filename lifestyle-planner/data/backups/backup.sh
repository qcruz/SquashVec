#!/bin/bash
# Run from project root: bash data/backups/backup.sh
SRC="$(dirname "$0")/../planner.db"
DEST="$(dirname "$0")/planner_$(date +%Y-%m-%d_%H%M).db"
cp "$SRC" "$DEST"
echo "Backed up to $DEST"
# Keep only last 10 backups
ls -t "$(dirname "$0")"/planner_*.db | tail -n +11 | xargs rm -f
