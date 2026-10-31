# Implementation and review record

Completed 31 October 2026 UTC. These are worker-run observations, not an independent certification. The reviewed product is `dist/index.html`, generated from `web/`. The original accepted report remains unchanged in `artifacts/` and is copied into `dist/archive/`.

| Area | Final result |
| --- | --- |
| Brief coverage | 21 grouped requirements met; 0 known missing; 0 faked |
| Broken features found and left unresolved | 0 in the tested scope |
| Product and primary action on first 390px screen | Yes; title, Follow the evidence and live alibi visible |
| Pinned taste@1 | 16 / 16 checks pass |
| Copy findings left open | 0 |
| Share card | Local 1200×630 PNG, title, favicon, description, og:title and og:image present |

**Visual idea:** a public-evidence investigation carried by paper clue cards, pinheads and red thread on a corkboard.

## Requirement coverage

| Brief requirement | Status and implementation |
| --- | --- |
| “one-page evidence-board website” | Met: a single static page with fragment navigation |
| “investigate the hamster and the system only, never people” | Met: species/system evidence; public role addresses only; no operator identification or account attribution |
| Squeektoshi page, care, WHEELY9000, whitepaper, llms.txt | Met: linked clues/ledger; public pages re-read; welfare assertions separated from inspection |
| Live API, runs/rests, distance, best day, busiest half hour | Met: live status; dated seven-day snapshot, source capture, coverage and UTC day boundaries |
| Four contracts, Reporter, relayer, Safe and API-followed core | Met: eight complete public addresses in the evidence drawer; original calls retained and eleven repeated |
| “the first disappearance” | Met: published core cutoff, API core distinction, transaction links, dated snapshot and explicit limit on the brief’s 30 October observation |
| SQK cap, premine, reward rates and no halvings | Met: stated as documentation claims; Sepolia’s no-premine exception and whitepaper disagreement visible |
| Five specified parody suspects | Met: cat, WHEELY9000, Pi, Reporter key and Hollywood hamster, each with a native alibi disclosure and source |
| “End with a verdict” / “verdict stamp” | Met: concluding stamped hamster verdict and evidence limits |
| “static one-page site that works from IPFS (relative URLs)” | Met: local paths relative; complete export tested under `/ipfs/case/`; no server rewrite or wallet/backend requirement |
| “each card opening its source” | Met: six primary clue cards and two field notes are native source links; whole-card activation tested |
| “reads /v1/status every 10 seconds (running, resting, stale or offline)” | Met: immediate read, 10s schedule, all four states, bounded timeout and retry; pause/hidden-tab behavior documented |
| “English, mobile first” and disclaimer footer | Met: English content, narrow-first layout and exact affiliation disclaimer |
| “usable website … working primary interactions and responsive layouts” | Met: 30 browser scenarios across Chromium/WebKit, keyboard and five widths |
| “dist/index.html and its assets … alongside the source and lockfile” | Met: complete `dist/`, `web/` source, new frontend manifest and lockfile ready for the submission bundle |
| “production build, typecheck and useful interaction validation” | Met: commands below ran successfully; failure fixes rechecked |
| Better Interface six-domain review, fixes and record | Met: coverage, findings and limitations below; final DESIGN.md reflects source |
| “first screen at 390 … title, favicon, description, og:title and og:image” | Met: screenshot and browser bounds; head checks and local share-image request pass |
| “DESIGN.md at the repository root” | Met: actual tokens, families, components, layout and behavior documented |
| “README explains how to install, preview and rebuild” | Met: dependency-free build/preview and externally installed locked compiler documented |
| 8 MiB budget and protected paths | Met: only allowed source/export/documentation files added or changed; no ignore edits, dependencies/caches/submodules or protected-path modifications |

Hosting/publication is **after review**, performed by the assignment publisher. No claim of a public deployment is made.

## Scope and assumptions

The existing implementation was HTML/CSS/JavaScript with a substantial research archive. That stack, the Wheel Inquiry identity and the original hamster illustration were retained. A small deterministic Node build and strict TypeScript checking of JavaScript were added. Browser dependencies were installed externally, not vendored. Wallet connection is not applicable to a read-only investigation.

Clue cards open sources in a new tab; suspects disclose their alibis inline. Statistics are frozen evidence, not pretend-live metrics. The live alibi is the only changing data. Running/resting interpret wheel speed, not animal identity. Project claims, direct readings, interpretations and unresolved conflicts stay distinguishable.

## Checks and actual results

| Command / procedure | Result |
| --- | --- |
| `npm --prefix web run build` | Exit 0; 19 complete exported files, 323,077 bytes |
| `PATH=<external compiler bin>:$PATH npm --prefix web run typecheck` | Exit 0; TypeScript 5.9.3 strict check, no emission |
| `npm --prefix web test` | Exit 0; 14/14 Node tests |
| `python3 scripts/check.py` | Exit 0; 275 original archive checks |
| `node --check artifacts/board.js` | Exit 0; archive script syntax valid |
| `node web/tests/browser.mjs`, external Playwright 1.56.1 / axe 4.11.0 | Exit 0; 15/15 scenarios in Chromium, 15/15 in WebKit |
| `IMD_PLAYWRIGHT=<external module> node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste` | Exit 0 **and** all 16 individual checks pass; final `checks[].passed` inspected |
| Real-API browser inspection | Repeated status HTTP 200s, real Resting reading, no console errors/warnings; every local runtime asset HTTP 200 |
| Read-only research recheck | Public docs, deployment, console and APIs retrieved; eleven pinned contract-call raw results and block hash match the original capture; live-core and API anchor receipts match their roles |

The browser suite uses a bounded foreground server at a nested subpath. Scenarios cover first-screen bounds, the production 10s timer using an accelerated clock, pause/resume and stale aging, running/resting/stale/offline, faulty/missing telemetry, invalid JSON, null responses, retry recovery, source popup destination, keyboard navigation and all five suspects, address disclosure, Markdown download, local resource resolution, no-JavaScript reading and absence of application exceptions. Synthetic network fixtures are limited to the test harness; the production export contains none.

Useful widths were 320, 390, 768, 1024 and 1440px, with the long evidence drawers open. No horizontal overflow was found after correction. Doubling root text size at 390px also passed. This is text enlargement, not browser-native zoom.

The supplied browser tool initially lacked its browser binary; installing the specified browser repaired it. WebKit host-package installation required unavailable system privileges. Public Debian libraries and software rendering support were unpacked into an external temporary directory; the standard Playwright WebKit binary then completed all scenarios through a local launcher. No browser, native library, npm registry or package cache is part of the deliverable.

Retained records: [browser results](browser-results.json), [Chromium axe](chromium-axe.json), [WebKit axe](webkit-axe.json), [taste results](taste-results.json), [research recheck](research-update.json), [chain recheck](chain-recheck.json). The taste record includes the reviewed production HTML’s SHA-256.

## Better Interface coverage

| Domain | Coverage and evidence | Limits / not applicable |
| --- | --- | --- |
| Accessibility | **Checked:** native links/buttons/details, one h1/main, alt text, decorative SVG exclusion, skip link, focus movement, Enter/Space disclosure, visible 3px focus ring, polite state announcements, pause and unknown/error semantics. Axe: 30 rules passed, zero violations in each engine. Primary focus also inspected in Chromium forced-colors mode. | No screen-reader or physical-device session; forced colors checked on the primary action, not every component. No forms, dialogs, transactions or destructive actions. |
| Layout | **Checked:** source DOM order, mobile action placement, five widths, expanded drawers, readable full addresses, 200% text enlargement, actual screenshots. Final taste: no horizontal scroll, text-box overlap, floating-control collision or clipped text. | Native browser zoom and RTL not tested; English only. No carousel or sticky overlay. |
| Writing | **Checked:** short explicit headline/description, source-oriented actions, error recovery, dated statistics, unknown ≠ zero, no person attribution, labelled parody and evidence limits. First-screen prose: 26 words at 390, 54 at 1440. | Deadpan humor is explicitly requested, so the guide’s general avoidance of humor does not override it. |
| Typography | **Checked:** five mobile/six desktop sizes, three font stacks and requested weights, normal casing/tracking, wrapping, numeric stability, selection and full-value address disclosure. | System fonts vary by device; no claim that Georgia is installed everywhere. Print styles reviewed in source, not printed. |
| Colors | **Checked:** shared tokens and actual rendered solid foreground/background pairs. Taste passes contrast. Cork asset rendered to canvas and all 32,400 pixels measured against the ink. Status uses text plus color. | Automated tools cannot resolve every textured background or decorative glyph; manual follow-up below. No theme variants are requested. |
| UI | **Checked:** pinned surfaces, whole-card source affordance, focus/hover/pressed/pending states, native disclosure, state transitions, no overlapping requests, timeout/cancellation/retry, no endless motion. Reduced-motion probe passes. | No animation timeline at 10% speed was needed: there are only 150ms button feedback transitions and no staged or continuous animation. |

### Contrast follow-up

Axe left nine nodes for manual review in each engine: five text elements on cork, plus four decorative arrow/reload glyphs. The cork nodes all use `--ink`; the exact local SVG tile rendered through Chromium gave **5.38:1 minimum** across every background pixel. Decorative glyphs use the same foreground/background pairs as their containing controls/text and carry no unique meaning. Primary-button contrast is **7.06:1**, dark alibi text **10.82:1**, ink/paper **13.03:1**. The remaining measured pairs are in DESIGN.md. The taste probe independently reports ten image/gradient-backed text boxes as unmeasured; its pass is not represented as coverage of those backgrounds.

The yellow focus ring on the dark alibi was visibly inspected after keyboard navigation; the light-surface primary ring was also visibly inspected in forced-colors mode. These observations do not establish every OS high-contrast configuration or screen-reader behavior.

## Findings, fixes and rechecks

| Finding | Source location and observed behavior | Correction and final evidence |
| --- | --- | --- |
| High: null response could leave a previous live state visible | `web/board.js:27` and `:36`, initial guard treated falsy payloads like “not loaded.” Reproduce with a successful HTTP response containing JSON null after a fresh reading. | Added independent `hasResponse`; malformed payloads go through `readAlibi` and visibly become Offline. Null-response and recovery scenarios pass in both engines. |
| High: enlarged text could force columns beyond the viewport | `web/styles.css:40`, `:70`, `:79`, `:96`, `:115`. At 390px and 200% root size, min-content widths of title, grid and live-state row overflowed. | Allowed emergency word wrapping, zero minimum text/grid widths and live-row wrapping. Five-width and enlargement checks pass in both engines with evidence drawers open. |
| Low: verdict’s rotated text boxes triggered overlap detection | `web/styles.css:176`–`:178`. Initial probe reported four intersections at 390/1440. Screenshot showed separated glyphs; the full-width rotated line boxes still intersected. | Made stamp lines content-sized and increased block spacing. Final probe reports zero overlapping text boxes; stamp screenshot inspected. |
| Low: navigation used both a shadow and a structural border | `web/styles.css:73`. Initial chrome probe identified the single border/shadow combination. | Removed its shadow and retained the separator. Final chrome check passes; paper elevation remains on evidence sheets. |
| Medium: unnecessary label on a generic stamp container | `web/index.html:161`. Axe flagged the generic div’s `aria-label` for manual ARIA review; the same words were already visible. | Removed the redundant attribute, preserving native text. ARIA review item no longer appears in either engine. |

No known high/medium findings remain open in the implemented scope. All final source changes preceded the last build, typecheck, unit/interaction checks and probe. Documentation and retained images describe that export.

## Visual evidence

- [390px first screen](screenshots/mobile-390.png): product title, primary action and live panel are visible. Captured with real API data; its reading is a dated screenshot, not a promise of current activity.
- [1440px first screen](screenshots/desktop-1440.png): identity, apparatus and live alibi occupy the board’s first row.
- [Complete desktop board](screenshots/desktop-full.png): all clues, core comparison, suspects, source disclosure and final verdict.

The screenshots were actually opened and inspected. The browser tool was also used to inspect the mobile verdict, live-panel keyboard focus and an expanded Raspberry Pi alibi. Temporary additional screenshots and raw probe geometry stay in `test/scratch/`, which the assignment removes.

## Research and delivery limits

The biography and care policy are project assertions. No physical animal identification, care inspection or authenticated livestream review was performed. A signature authorizes bytes; it cannot identify the animal or guarantee physical truth. The two core histories and conflicting reward policies remain unresolved.

The chain recheck is bounded. The older core’s historical transaction receipt returned null from the selected public RPC during this pass; the original accepted evidence was preserved, and its pinned state/configuration read matches. No exhaustive historical log scan, signature recovery, implementation/upgrade audit or Safe-control audit is claimed. External sources can change after the dated reads.

Native-device Safari, screen-reader sessions, native browser zoom, exhaustive forced-colors coverage and social-platform unfurling were not performed. The static export is supplied for publication, not claimed to be hosted. A full repository path/byte audit is recorded in `submission-budget.json`; no ignore file was changed.

**Complete for the stated scope**, with these explicit verification limits. Build, source/type integrity, meaningful interactions, responsive rendering and six-domain review were completed locally.
