# Who is Squeektoshi?

A one-page English evidence board investigating the hamster and SqueekChain, filed **31 October 2026 UTC**. Open [artifacts/index.html](artifacts/index.html), or serve the repository with:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000/`. The page also opens directly from disk. There is no build, package installation, external font, CDN, browser API request or runtime dependency. The report and saved JSON work without network access; external citations require a connection. Responsive CSS, keyboard links, a skip link, reduced-motion support and print styles are included. JavaScript only reveals the print button and expands evidence drawers for printing; the full report remains readable without it.

The deliverable includes the [plain-text case file](artifacts/case-file.md), [dated source manifest](artifacts/evidence/manifest.json), saved API responses, the public deployment record, the core ABI, and raw/decoded Sepolia reads, receipts, logs and block identifiers. The original hamster drawing is an illustration, not evidence. No external assets or installed dependencies are required.

The report separates project assertions, direct API/chain observations, inferences and unverified theories. It highlights the published/live core mismatch, the documented fixed-reward versus whitepaper-halving conflict, incomplete API coverage, noon-to-noon day boundaries and why zero-work rounds do not prove rest. Contract addresses identify system roles only. No human identities, profiles, locations, or wallet-to-person links are investigated.

Research limits: documentation is not independent proof of animal identity or welfare compliance; no livestream authentication or physical inspection was performed. The chain work is a bounded read-only snapshot, not a full implementation, upgrade, Safe-control or historical-signature audit. The 30 October observation described in the brief was not personally witnessed; the last located settlement supports its stated cutoff. No deployment credentials were supplied, so the website is delivered ready for static hosting, not represented as uploaded to a public host.

Check offline with the Python standard library and, optionally, Node:

```sh
python3 scripts/check.py
node --check artifacts/board.js
```

`check.py` validates local files and fragment links, evidence hashes, captured values and conversions, declared addresses, evidence/uncertainty sections, dependency-free assets and Markdown export consistency. It does not certify the underlying research or substitute for a browser or independent review. The page was checked locally; see [artifacts/check-results.md](artifacts/check-results.md) for what was and was not exercised.

The Markdown edition is generated from the page, so changes stay aligned:

```sh
python3 scripts/export_case.py
```
