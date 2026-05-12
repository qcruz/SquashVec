# DED Status Files — Real-World Data Tracking

This directory contains regularly-updated snapshots of current economic,
industrial, and infrastructure data. These ground the contingency plans in
real numbers rather than theoretical assumptions.

**Update frequency:** Review at the start of each session. Update any file
where the data is more than 6 months old or where a major change has occurred.

**Data sources:** USDA, EIA (Energy Information Administration), IEA,
BLS (Bureau of Labor Statistics), USGS, Federal Reserve, industry reports.

---

## Files and Update Schedule

| File | Data Type | Update Trigger |
|---|---|---|
| [energy/oil-global.md](energy/oil-global.md) | Oil production, SPR levels, prices | Quarterly or on major event |
| [energy/renewables.md](energy/renewables.md) | Installed capacity, generation share | Annually |
| [food/crop-yields.md](food/crop-yields.md) | USDA yield data by crop | Annually (post-harvest) |
| [food/fertilizer.md](food/fertilizer.md) | Prices, import volumes, reserve levels | Quarterly |
| [transportation/ev-adoption.md](transportation/ev-adoption.md) | Sales, fleet share, charging infra | Quarterly |
| [transportation/freight.md](transportation/freight.md) | Rail, truck, port throughput | Quarterly |
| [manufacturing/semiconductors.md](manufacturing/semiconductors.md) | Fab capacity, lead times, inventories | Quarterly |
| [labor/remote-work.md](labor/remote-work.md) | Remote work rates by sector | Annually |

---

## How to Use Status Files in Analysis

When writing or updating a scenario or supply chain file:
1. Check the relevant status file for current baseline data
2. Reference it explicitly: "As of [date], [metric] is [value] — see status/energy/oil-global.md"
3. Update the status file if the data is outdated before using it in analysis
