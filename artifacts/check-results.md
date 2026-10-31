# Local checks

Run on 31 October 2026 UTC. These are contributor-run checks, not independent certification of behavior or research.

- `python3 scripts/check.py`: **PASS — 275 checks** covering local links and anchors, source dates, capture hashes, key API totals, coverage arithmetic, distance conversions, contract addresses, receipt linkage, reward/cap values, uncertainty labels, offline assets and Markdown consistency.
- `node --check artifacts/board.js`: **PASS**.
- HTML element nesting check: **PASS**, no mismatched or unclosed elements in the page (HTML void elements and SVG primitives handled separately).
- A temporary standard-library HTTP server and client in the same process: **PASS**, HTTP 200 and exact file-byte matches for the root entry, report, CSS, JavaScript, Markdown report, source manifest, status, statistics and chain snapshot. Server shut down after the check.

Documentation, API responses and read-only chain calls were retrieved successfully. The report describes source conflicts, partial coverage and the limits of those observations. Saved response hashes certify only the bytes in this submission.

Not performed: browser rendering/screenshots, browser accessibility automation, console playback authentication, independent welfare inspection, complete proxy/implementation audit, every historical signature recovery, or public-host deployment. Responsive layouts and print styles are implemented but not represented as visually verified in a browser. No external packages were installed or are required.
