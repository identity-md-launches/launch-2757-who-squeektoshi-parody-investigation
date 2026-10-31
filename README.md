# Who is Squeektoshi?

A sourced, one-page parody investigation into the hamster and SqueekChain. The production site is [dist/index.html](dist/index.html): pinned clue cards and red string, a live alibi, five expandable non-human suspects, a source ledger, and a verdict. The footer identifies it as an unofficial fan parody, not affiliated with SqueekChain.

The accepted research remains intact in [artifacts/index.html](artifacts/index.html), [the Markdown case file](artifacts/case-file.md), and [the evidence manifest](artifacts/evidence/manifest.json). The build includes this complete archive in `dist/archive/`. The existing illustrated hamster was reused and is explicitly labelled as an illustration, not evidence.

## Preview and rebuild

Requires Node.js 22 or newer. The production build and preview have **no package dependencies**. From the repository root:

```sh
npm --prefix web run build
npm --prefix web run preview
```

Open `http://127.0.0.1:4173/preview/`. Stop the preview with Ctrl+C. A different port can be supplied with `npm --prefix web run preview -- 8080`.

`web/build.mjs` replaces only `dist/`, copies the source and local assets, then copies the accepted archive. It performs no network requests. Publish the contents of `dist/`; all local links, scripts, images and styles are relative, and navigation uses fragments. The site was exercised under `/ipfs/case/`, without server routing fallbacks. Hosting/publication is left to the assignment’s publisher.

Opening HTML directly from disk preserves the readable report, but browsers may block JavaScript modules on `file:` URLs. Use HTTP preview or a static/IPFS gateway for the live panel. After a page is loaded, losing network access leaves the static evidence available and changes the live panel to Offline. No service worker or first-visit offline cache is implied.

## Install the typechecking tool

The project retains its original HTML/CSS/JavaScript approach. JavaScript is strictly checked with TypeScript/JSDoc. The new frontend manifest and lockfile live in `web/`; no existing build configuration or dependency file was changed.

Install the locked development dependency **outside the repository**, keeping dependency/cache directories out of the submission:

```sh
tool_dir="$(mktemp -d /tmp/squeektoshi-tools.XXXXXX)"
cp web/package.json web/package-lock.json "$tool_dir/"
npm ci --prefix "$tool_dir" --ignore-scripts --no-audit --no-fund
PATH="$tool_dir/node_modules/.bin:$PATH" npm --prefix web run typecheck
npm --prefix web test
```

The typecheck uses `tsc --noEmit -p web/jsconfig.json` through the project script. Runtime JavaScript needs no compilation or framework. Keep the whole `dist/` export in the submission together with `web/`, its manifest and lockfile. No ignore file was changed. No npm tarballs, registry mirrors, node_modules, submodules or browser binaries belong in this repository.

## Live alibi and research

`web/status.js` reads `https://api.squeekchain.com/v1/status` immediately and every **10 seconds** while the page is visible, online and updates are enabled. Requests time out after 8 seconds, never overlap, send no credentials, and can be retried manually. Pause/resume controls are available. No wallet connection or transaction code is included.

- **Running:** fresh hardware telemetry with positive wheel speed.
- **Resting:** fresh hardware telemetry with zero wheel speed; an inference, not proof of sleep.
- **Stale:** old, absent, faulty, non-hardware or otherwise unusable measurements. Observation, receipt and generation times are checked against the API threshold, currently 120 seconds. Implausible future timestamps fail closed.
- **Offline:** transport, HTTP, JSON or root-schema failure. Previous measurements are never displayed as fresh fallback data.

The API can report `coreStatus: IDLE` alongside positive `rpmMilli`; the display deliberately interprets the documented speed field, after freshness/provenance/fault checks. Cumulative integer counters are not converted to floating point. Response text is never inserted as HTML. A polite live region announces state changes, not every polling tick.

The seven-day clues remain the **31 October 2026, 00:52:53 UTC snapshot**, separate from live readings. They include incomplete coverage, noon-to-noon UTC day boundaries and unknown gaps. The deployment/core mismatch and conflicting halving descriptions remain explicit. “His coins” is project terminology, not proof of animal control. Addresses identify only public system roles; no human identities, locations, social profiles or wallet-to-person links were investigated.

Documentation, deployment, API and console availability were rechecked. See [research-update.json](artifacts/research-update.json) and [chain-recheck.json](artifacts/chain-recheck.json). The latter repeats eleven pinned contract calls and confirms the API anchor receipt. The public RPC returned null for the older core’s historical transaction receipt in this recheck; its original saved logs/receipt-era evidence remain unchanged. The original 30 October observation was supplied by the brief, not personally witnessed.

## Checks actually run

All final checks ran on 31 October 2026 UTC against the built export. These are worker-run results, not independent certification.

| Check | Result |
| --- | --- |
| `npm --prefix web run build` | Pass; complete export, 323,077 bytes |
| `npm --prefix web run typecheck` with the installed compiler on PATH | Pass; strict JavaScript typecheck, no emission |
| `npm --prefix web test` | 14 tests pass: interpretation, freshness, malformed data, polling, timeout, cancellation and recovery |
| `python3 scripts/check.py` | Original 275 archive integrity/arithmetic checks pass |
| `node --check artifacts/board.js` | Original archive script passes syntax check |
| `node web/tests/browser.mjs` with browser-tool module paths | 15 scenarios pass in Chromium and 15 in WebKit |
| axe on both engines, with disclosures open | Zero violations in the selected WCAG rules; contrast review limitations documented |
| Pinned `taste.mjs --out test/scratch/taste` | 16/16 checks pass |
| Browser inspection of the real API | Repeated HTTP 200 responses; no application console warnings/errors or missing local assets |

The browser suite tests 320, 390, 768, 1024 and 1440px layouts, 200% text enlargement, keyboard skip/focus and disclosures, source opening, downloads, relative resources, no-JavaScript reading and all live-panel states. Polling time is accelerated; test fixtures are confined to the test harness. The independent live-API inspection uses real responses.

To rerun browser checks, install optional tooling into an external directory:

```sh
browser_dir="$(mktemp -d /tmp/squeektoshi-browser.XXXXXX)"
npm install --prefix "$browser_dir" --no-audit --no-fund playwright@1.56.1 @axe-core/playwright@4.11.0
node "$browser_dir/node_modules/playwright/cli.js" install chromium webkit
PLAYWRIGHT_MODULE="$browser_dir/node_modules/playwright/index.mjs" \
AXE_PLAYWRIGHT_MODULE="$browser_dir/node_modules/@axe-core/playwright/dist/index.mjs" \
node web/tests/browser.mjs
```

Playwright needs the browser’s host libraries. In this run, system installation lacked privileges; WebKit was successfully exercised using public Debian libraries unpacked into an external temporary directory and a launcher that supplied their paths. `WEBKIT_EXECUTABLE` optionally selects such a launcher. The suite itself supplies a bounded local server, closes browsers, and writes temporary results only to `test/scratch/browser-checks/`. `BROWSER_ENGINES=chromium` selects one engine.

While the pinned probe is present, run:

```sh
IMD_PLAYWRIGHT="$browser_dir/node_modules/playwright/index.mjs" \
node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste
```

The assignment removes `.imd/reads/` and `test/scratch/`; they are not build dependencies. Retained results and screenshots are in [artifacts/validation.md](artifacts/validation.md), with the six-domain review and fixes. [DESIGN.md](DESIGN.md) documents the final implementation.

Not performed: physical-device Safari, a screen-reader session, native browser zoom (text enlargement was tested separately), exhaustive forced-colors testing, real social-platform unfurling, physical hamster/welfare verification, authenticated livestream review, exhaustive contract/upgrade/Safe/signature audits, or public-host deployment. A visitor’s incorrect clock can conservatively mark telemetry stale. External services can change after capture.

To regenerate the **original archived** Markdown edition, use `python3 scripts/export_case.py`; it reads `artifacts/index.html`, not the new board. Rebuild afterward if the archive is intentionally updated.
