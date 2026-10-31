# The Wheel Inquiry: implemented design

## Overview

A deadpan evidence board for readers investigating Squeektoshi and the system. The original Wheel Inquiry name, hamster illustration, paper/cork palette and sourced research are retained. The visual idea is physical evidence pinned to a corkboard: quiet paper surfaces, a red thread, small pinheads and a concluding stamp. Illustrations are labelled and never presented as photographs.

The canonical source is `web/index.html`, `web/styles.css`, `web/board.js` and `web/status.js`. `dist/` is generated. The original report in `artifacts/` is a preserved archive with its own older styles, not the current component system.

## Colors

The canonical format is hex. Shared tokens are at `web/styles.css:1`; illustrated objects retain their own small local palettes.

| Token | Value | Implemented role |
| --- | --- | --- |
| `--paper` | `#f6f0e2` | Header, narrative paper, footer; primary text on the dark alibi |
| `--paper-white` | `#fffcf4` | Identity/signature/suspect sheets, verdict; primary button text |
| `--paper-blue` | `#e3e9e3` | Apparatus sheet |
| `--paper-yellow` | `#eee0a6` | Movement and care notes |
| `--cork` | `#b59b78` | Board ground, with the local cork SVG texture |
| `--ink` | `#292820` | Primary text and line illustrations |
| `--muted` | `#5d594e` | Captions, qualifiers, dates and secondary text |
| `--line` | `#cdc3af` | Structural separators |
| `--accent`, `--accent-hover` | `#9b332b`, `#78251f` | Primary button, annotation ink, pinheads, verdict |
| `--string` | `#a3372c` | Decorative connecting thread |
| `--dark`, `--dark-muted` | `#26392f`, `#d0d8cc` | Live-panel ground and secondary text |
| `--signal`, `--warning` | `#bad68f`, `#f2d184` | Fresh/unknown status dots; warning also supplies the dark-panel focus ring |
| `--focus` | `#173f82` | Focus on light paper and cork |

The coins sheet uses `#f0e4cd`; chart bars use `#727657`, with the accent on the best day and stripes for partial days. All statuses have text as well as color. There is one intentional light theme; the green alibi is a local contrast surface, not a dark-mode variant.

Measured pairs on the rendered export: ink/paper 13.03:1; muted/paper 6.15:1; primary button 7.06:1; alibi primary text 10.82:1; alibi muted text 8.41:1; ink/yellow paper 11.17:1; muted/white paper 6.82:1. Rendering the exact cork SVG tile to canvas and measuring every background pixel gave a minimum 5.38:1 for `--ink`. See validation for scope and remaining automated contrast limitations.

## Typography

Three system stacks; no downloaded fonts or CDN dependencies:

- `--font-heading`: Georgia, Times New Roman, serif. Main headings, narrative headings, italic annotations and the stamp.
- `--font-body`: Apple/BlinkMac system, Segoe UI, sans-serif. Prose, labels and controls.
- `--font-data`: ui-monospace, SFMono-Regular, Consolas, monospace. Full addresses and chart dates, not prose.

The six-size scale is `--text-small` 0.875rem / 14px; `--text-body` 1rem / 16px; `--text-lead` 1.25rem / 20px; `--text-heading` 1.75rem / 28px; `--text-section` 2.5rem / 40px; `--text-display` 4rem / 64px at the default root size. Five sizes appear on mobile; six on desktop. CSS requests weights 400, 600 and 700. Actual glyphs and available weights depend on installed system fonts.

Body line-height is 1.55. Headings use 1.1, card headings 1.15, status labels 1.2, annotations 1.4. Main-title tracking is −0.045em; section headings −0.025em; card headings −0.02em. Labels use natural spacing and case. Heading text balances, paragraphs use pretty wrapping, and narrative measures are mostly 64–75ch. Addresses wrap anywhere and remain selectable. Tabular numbers keep live data stable.

## Layout

`web/styles.css:63` onward defines the page primitives. The content envelope is 1280px. Mobile sections use 16px outer margins; paper and card padding is 24px. Spacing follows a 4px base with declared `--space-1/2/3/4/6/8/12/16` values of 4/8/12/16/24/32/48/64px. Rules generally express these values directly in rem; the board also uses 28px mobile gaps and 40px desktop gaps.

- Below 40rem: one column. The live alibi leads the board in DOM order; all cards remain upright. The header and navigation wrap. Main title 40px, section headings 28px.
- From 40rem: two board columns, with subject left and alibi right. Notes, core comparison and suspects use two columns. Contract rows separate role from address. Verdict uses two columns.
- From 64rem: three board columns, with alibi at right. The title is 64px and section headings 40px. Suspects use five columns. Small paper rotations (−1° to +0.8°) establish the pinned character; the alibi rotates +0.6°.

`minmax(0, 1fr)`, flexible text containers, wrapping live-state rows and `overflow-wrap: anywhere` support enlargement. Layouts were exercised at 320, 390, 768, 1024 and 1440px, and at 200% root text size. There is no sticky chrome or horizontal carousel. Section anchors move keyboard focus to the destination.

## Elevation & depth

`--shadow` is `0 3px 4px #37241318, 1px 8px 15px #37241322`. Paper sheets use this shadow without decorative borders. Borders divide comparisons and disclosure rows. The verdict has a double red border and no shadow of its own. The navigation uses a separator without a shadow.

The board creates an isolated stacking context. Decorative SVG thread sits behind the cards, has no pointer events and is hidden from accessibility. `ResizeObserver` joins actual pin coordinates after layout changes. Pinheads are 12px circles with small inset/highlight shadows. Cork texture is a locally bundled SVG. No animated grain, parallax or entrance effects are present.

## Shapes

Sheets are square. The primary action has a 3px radius; live controls have a 2px radius. The signature, wheel/Pi diagram and five suspect drawings are decorative vectors. `web/assets/hamster.svg` comes from the accepted report. `favicon.svg` uses the wheel; `share.svg` is the editable source for the 1200×630 `share.png`.

The verdict stamp rotates −5°. Its text uses content-sized lines and 16px block margins around “Hamster.”, keeping the rotated line bounds separate. No clipping hides critical text.

## Components

| Pattern | Source / classes | Behavior |
| --- | --- | --- |
| Primary action | `.primary`, `web/index.html:31` | Native link to the board, 48px minimum height, red hover state, visible focus |
| Clue sheet | `.clue.pinned` with identity/apparatus/movement/signature/coins variants | Entire card opens its cited source; heading and source label provide its accessible name; no nested controls |
| Field note | `.field-note` | Whole-note source link, care or rest qualifier |
| Live alibi | `#alibi`, `web/board.js:15`, `web/status.js:21` | Initial checking, running, resting, stale and offline; retry, pause/resume, last-reading time and disclosed interpretation |
| Suspect | `details.suspect`, `summary`, `.suspect-alibi` | Native Enter/Space toggling; visible plus/cross cue; source link inside the expanded alibi |
| Evidence drawer | `.evidence-drawer`, `.source-ledger` | Native progressive disclosure; full addresses, sources and limits remain readable |
| Core comparison | `.core-comparison`, `.address` | Same field order in both columns; full public values wrap; comparison collapses vertically |
| Verdict | `.verdict-section`, `.verdict-stamp` | Concluding paper with an obvious species verdict and explicit evidence limits |

Controls use a 3px focus outline with 5px offset; the dark panel switches to yellow. Forced-colors CSS uses system Highlight and adds sheet borders. Primary/live controls have 150ms color/transform transitions and 0.96 press scale only when reduced motion is not requested. Hover styles run only on hover-capable devices. There are no endless animations.

The live region starts empty and announces state transitions. Poll timestamps are not live-announced. Failed/unknown data never masquerades as zero. Manual refresh is disabled while the request is pending. Native disclosures and source links work without JavaScript; the live panel explains its JavaScript requirement.

## Do’s and don’ts

Reuse the existing paper classes, six type sizes and source-link placement. Add an exhibit as a semantic source anchor, with a plain heading, attributed claim, meaningful limitation and local asset if needed. Add its full citation to the ledger and retain dated source captures when reporting snapshot values. Keep narrative sources and live telemetry visibly separate.

Preserve full addresses and UTC dates. Never infer a person from a system address, invent an alibi for missing data, turn an illustration into photographic evidence, or present the reward-policy conflict as resolved. Avoid extra font families, tracked uppercase kickers, simulated counters and wallet infrastructure. Any new surface should still work at 320px and with enlarged text.

Design review followed the pinned [Better Interface](https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills/better-interface) guidance (MIT). This document’s structure adapts the pinned [Impeccable documentation method](https://github.com/pbakaus/impeccable/blob/9d715cc4f5564a990ca8345abfdd5df6dc9b41c8/skill/reference/document.md) (Apache-2.0). Included notices are preserved in [artifacts/design-guidance-LICENSE.txt](artifacts/design-guidance-LICENSE.txt).
