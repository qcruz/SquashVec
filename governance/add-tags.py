#!/usr/bin/env python3
"""One-time script: rebuild all tags on every card in js/cards.js. Delete after use."""

import re, sys, os

FILE = os.path.join(os.path.dirname(__file__), 'js', 'cards.js')

CATEGORIES = ['governance','economy','culture','military','technology','environment']

# ── Semantic tag rules ─────────────────────────────────────────────────────────
TAG_OVERRIDES = {
    'alliance':               ['exchange'],
    'free_trade_agreement':   ['exchange'],
    'tax_collection':         ['exchange'],
    'efficient_administration': ['exchange'],
    'loyalists':              ['exchange'],
    'civic_charter':          ['exchange'],
    'artistic_movement':      ['exchange'],
    'scientific_breakthrough':['exchange'],
    'direct_attack':          ['exchange', 'hostile'],
    'arms_package':           ['exchange', 'hostile'],
    'sanctions':              ['exchange', 'hostile'],
    'destabilization':        ['exchange', 'hostile'],
    'occupation':             ['policy', 'hostile'],
    'incursion':              ['policy', 'hostile'],
    'military_exercise':      ['policy'],
    'forest_fire':            ['instability', 'event'],
    'environmental_collapse': ['instability', 'event'],
    'indecisiveness':         ['instability', 'event'],
    'immigration':            ['resource'],
    'martial_law':            ['policy'],
    'consolidation':          ['policy'],
    'structural_consolidation': ['policy'],
    'managed_decline':        ['policy'],
    'rationalization':        ['policy'],
    'austerity':              ['policy'],
    'preparedness':           ['policy'],
    'crisis_protocol':        ['policy'],
    'grand_strategy':         ['policy'],
    'redundancy_systems':     ['policy'],
    'adaptive_management':    ['policy'],
    'revisionist_history':    ['policy'],
    'contingency_planning':   ['policy'],
    'cultural_exchange':      ['policy'],
    'peace_treaty':           ['policy'],
    'diplomatic_mission':     ['policy'],
    'census':                 ['policy'],
    'disarmament':            ['policy'],
    'restitution':            ['policy'],
    # New exchange cards
    'heritage_fund':          ['exchange'],
    'cultural_diplomacy':     ['exchange'],
    'land_reclamation':       ['exchange'],
    'conservation_program':   ['exchange'],
    'conscription':           ['exchange'],
    'arms_trade':             ['exchange'],
    'patent_license':         ['exchange'],
    'venture_capital':        ['exchange'],
    'technology_transfer':    ['exchange'],
    'automation_drive':       ['exchange'],
}

def semantic_tags(card_id, card_type, card_subtype):
    if card_id in TAG_OVERRIDES:
        return list(TAG_OVERRIDES[card_id])
    if card_type == 'category':
        return ['identity']
    if card_type == 'event':
        if card_subtype == 'stacking': return ['resource']
        if card_subtype == 'hazard':   return ['instability']
        if card_subtype == 'utility':  return ['policy']
    return ['policy']

def category_tags(block):
    """Return sorted list of category names that appear as quoted values in the block."""
    found = set()
    for cat in CATEGORIES:
        if re.search(rf"'{cat}'", block):
            found.add(cat)
    return sorted(found)

def build_tags(card_id, card_type, card_subtype, block):
    sem = semantic_tags(card_id, card_type, card_subtype)
    cats = category_tags(block)
    return sem + [c for c in cats if c not in sem]

# ── Pass 1: collect full block text for each unique card id ────────────────────
with open(FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Strip existing tags lines
content = re.sub(r"^    tags: \[[^\]]*\],\n", "", content, flags=re.MULTILINE)

# Parse full card blocks (greedy between top-level { } entries)
full_block_tags = {}  # card_id -> tags list (using full block)

for m in re.finditer(r"\n  \{(.*?)(?=\n  [,{]|\n\];)", content, re.DOTALL):
    block = m.group(1)
    id_m = re.search(r"id: '([^']+)'", block)
    if not id_m:
        continue
    card_id = id_m.group(1)
    type_m = re.search(r"\btype:\s*'([^']+)'", block)
    sub_m  = re.search(r"\bsubtype:\s*'([^']+)'", block)
    card_type    = type_m.group(1) if type_m else None
    card_subtype = sub_m.group(1)  if sub_m  else None
    full_block_tags[card_id] = build_tags(card_id, card_type, card_subtype, block)

# ── Pass 2: insert tags line after value: ─────────────────────────────────────
VALUE_RE = re.compile(r'\bvalue:\s*\d+')
ID_RE    = re.compile(r"^    id: '([^']+)'")

result = []
current_id   = None
tag_inserted = False

for line in content.split('\n'):
    m = ID_RE.match(line)
    if m:
        current_id   = m.group(1)
        tag_inserted = False

    result.append(line)

    if (not tag_inserted
            and current_id
            and re.match(r'^    \S', line)
            and VALUE_RE.search(line)):
        tags    = full_block_tags.get(current_id, ['policy'])
        tag_str = ', '.join(f"'{t}'" for t in tags)
        result.append(f"    tags: [{tag_str}],")
        tag_inserted = True

output = '\n'.join(result)

id_count  = len(re.findall(r"^    id: '", content, re.MULTILINE))
tag_count = len(re.findall(r"^    tags: \[", output, re.MULTILINE))
print(f"Cards found: {id_count}  |  Tags inserted: {tag_count}")
if id_count != tag_count:
    print("MISMATCH — aborting.")
    sys.exit(1)

with open(FILE, 'w', encoding='utf-8') as f:
    f.write(output)
print("Done.")
