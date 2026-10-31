<!-- Generated from artifacts/index.html by scripts/export_case.py. -->

Filed 31 October 2026 UTC. Static public-evidence case file. The website is the primary formatted edition; all citations and limits appear below.

<a id="top"></a>

A public-evidence investigation

<a id="title"></a>

# Who is Squeektoshi?

One wheel. Two contract histories.
A suspicious amount of bedding.

We followed the work, the signatures and the coins. Every trail led back to a male Syrian hamster. Naturally, we kept investigating.

[Examine the evidence ↓ ](#evidence) [Read the verdict ↗](#verdict) 

Investigating the hamster and the system only. No human identities, personal profiles or wallet-to-person attribution.

ARTIST’S RECONSTRUCTION · NOT EVIDENCE 

Subject: SQUEEKTOSHI **Alias: the hamster.**The resemblance is circumstantial. 

IDENTITY
EXTREMELY LIKELY 

[01 / Clues](#evidence) [02 / Disappearance](#disappearance) [03 / Suspects](#suspects) [04 / Verdict](#verdict) [05 / Sources](#sources)  

<a id="evidence"></a>

01 / The evidence board

<a id="evidence-title"></a>

## Follow the red string.

Facts get receipts.
Theories get labels.

FACT / attributable observation INFERENCE / our interpretation UNRESOLVED / evidence stops here  

<a id="clue-identity"></a>

EXHIBIT A / BIOGRAPHY

FACT · documentation 

### The suspect has cheek pouches.

The Squeektoshi page identifies him as a **white-orange male Syrian hamster**, two months old as of October 2026, running the WHEELY9000 on livestream.

Its care policy prioritizes welfare over output: voluntary exercise, undisturbed rest, no waking for mining, no restricted food or water to encourage running, and suspension of mining or filming when care requires it.

Published policy ≠ an independent welfare inspection. We read the policy; we did not observe compliance.

[[A] Squeektoshi page](#source-a)  · Read 31 Oct 2026 UTC

<a id="clue-machine"></a>

EXHIBIT B / APPARATUS

FACT · documentation 

### A wheel with witnesses.

The **WHEELY9000** uses a magnet and Hall sensor. A Raspberry Pi Pico carries readings to a Raspberry Pi; the Pi accepts passages, stores them and closes **600-second rounds**. A signing chip signs saved measurement records.

Cameras run independently. The device does not hold the settlement Reporter or relayer keys. One work unit means one accepted magnet passage—not a cryptographic hamster identification.

The wheel supplies readings. The Pi supplies the paperwork. Neither supplies an alibi for the animal.

[[B] WHEELY9000](#source-b)  · [[C] Whitepaper](#source-c) 
Read 31 Oct 2026 UTC

<a id="clue-activity"></a>

EXHIBIT C / MOVEMENT LOG

FACT · API snapshot 

### 48.634 km. No destination.

55,392 accepted work units

The requested 7-day response reports **48,634,176 mm** of distance, **118 active** ten-minute rounds and **524 zero-work** rounds. Another **299 rounds are missing**; range coverage is **68.22%** (642 of 941).

Best API day: **29 Oct, 13,297 work units / 11.675 km**. These days run **noon to noon UTC**, named by their starting date—not midnight to midnight.

[[E] 7-day statistics](#source-e)  · [[K] API definitions](#source-k) 
Read 31 Oct 2026 UTC · Snapshot 00:52:53Z

<a id="clue-rest"></a>

EXHIBIT D / THE QUIET HOURS

INFERENCE · consistent with rest 

### The miner takes breaks.

The statistics contain long zero-work stretches. That is consistent with voluntary running and rest, but **zero work cannot prove sleep**: the docs say downtime can be closed as zero-work rounds after a Pi restart.

The API’s busiest recorded half hour is **27 Oct, 22:00–22:30 UTC: 1,827 work units**. Its typical-day peak is also **22:00–22:30 UTC**, averaging 1,363.4 work units across five observed days. These are different measures.

Missing coverage is unknown. It is not an exceptionally long nap.

[[E] Statistics](#source-e)  · [[H] Proof limits](#source-h) 
Read 31 Oct 2026 UTC

<a id="clue-signature"></a>

EXHIBIT E / SIGNATURE ANALYSIS

FACT · docs + chain read 

### The signature has no paws.

The Reporter key authorizes settlement batches with EIP-712 signatures. The separate relayer submits them and pays gas. The API’s confirmed anchor transaction succeeded on the live core; its sender matches the published relayer.

The published and live cores both report Reporter `0xB317…d0Aa` at the pinned block. The device’s telemetry signing chip is a **different signing layer**.

Authorization proves a key approved data. It does not prove who—or what—turned a wheel. No wallet is attributed to a person.

[[F] Deployment record](#source-f)  · [[G] Sepolia snapshot](#source-g)  · [[L] Settlement](#source-l) 
Read 31 Oct 2026 UTC

<a id="clue-money"></a>

EXHIBIT F / HIS COINS, ALLEGEDLY

FACT · documented economic role 

### Follow the hamster money.

The deployment record calls `0x828c…17e8` the **Hamster-Owned Liquidity Safe**: the protocol reserve, sale closeout and royalty recipient. The published NFT’s `economicRecipient()` matches it onchain.

The token docs put a **2.1 billion SQK cap** and **10% / 210 million premine** in the launch design. They explicitly say Sepolia has **no premine**. The published token’s cap read matches 2.1 billion.

“His coins” is project language, not proof a hamster controls a Safe or can sign a transaction. Testnet tokens have no monetary value per the docs.

[[F] Deployment](#source-f)  · [[I] Token](#source-i)  · [[G] Chain](#source-g)  · [[M] llms.txt](#source-m) 
Read 31 Oct 2026 UTC

The movement ledger / saved API data

<a id="activity-title"></a>

## A very small endurance operation.

Reported distance by API day, in kilometres. Days start at 12:00 UTC. Stripes mean partial coverage; dashes mean no observations. A bar is a reported estimate, not independently measured travel.

[[E] Statistics](#source-e)  · [[K] Day definition](#source-k)  · Read 31 Oct 2026 UTC

24 Oct 

— missing unknown  

25 Oct 

— missing unknown  

26 Oct 

9.818  

27 Oct 

9.562  

28 Oct 

9.295  

29 Oct 

11.675  

30 Oct* 

8.284 

26 Oct: 133/144 rounds observed. *30 Oct is still in progress: 77/77 elapsed rounds observed. Snapshot ends 31 Oct 00:52:53Z. Distances rounded to 0.001 km.

<a id="disappearance"></a>

02 / A break in the chain

<a id="disappearance-title"></a>

## The first disappearance.

THE HAMSTER
HAS NOT VANISHED  

The brief describes a 30 October check that found no settlements on the published core since 26 October. Our 31 October chain read supports that cutoff. The API, meanwhile, is following another core.

FACT · published deployment 

### The old paper trail

[0x74665dAecA35A2303e767E76a2FF1FB6F93e119f](https://eth-sepolia.blockscout.com/address/0x74665dAecA35A2303e767E76a2FF1FB6F93e119f) 

Latest settlement located: 26 Oct 2026 · 16:20:36 UTC

Ethereum block: 11,999,145

Settled through round: 1,973

Cumulative work / Squeek height: 148,986 / 13,095[Last located BatchSettled transaction ↗](https://eth-sepolia.blockscout.com/tx/0x502d216baff7732ac31ab59b8e3b44911b33834c6b3ca5ad3b7e1c18fbd20eb0) 

FACT · API receipt + chain 

### The wheel keeps a new ledger

[0x980B4424c007CAf7a1f3670B48c8EaEf7EbC3d44](https://eth-sepolia.blockscout.com/address/0x980B4424c007CAf7a1f3670B48c8EaEf7EbC3d44) 

Latest settlement located: 31 Oct 2026 · 00:50:36 UTC

Ethereum block: 12,030,363

Settled through round: 642

Cumulative work / Squeek height: 55,392 / 4,929[Recent BatchSettled transaction ↗](https://eth-sepolia.blockscout.com/tx/0xa56900c8edbfd19fe03a610fbe07655712c4e03991d7e5238ffe131a90fc5ba0) 

INFERENCE 

**A disappearance of continuity in the public pointers.** Stale settlement on one core is not evidence that Squeektoshi stopped running. The streams and genesis timestamps differ; their round numbers and work totals must not be added or compared as one history.

The API status generated at **00:53:04.527Z** reports measurement freshness **online** and hardware provenance. Its confirmed anchor is still round 641 / 55,170 work units / height 4,910, while its optimistic builder projects height 4,929. The anchor’s successful receipt targets the live core. The later pinned chain read includes round 642. These are successive stages, not interchangeable totals.

**Unresolved:** why the published deployment record and API follow different cores, and whether there is a formal migration statement. We did not witness the original 30 October check. We verified present chain state and the last located settlement, not that historical browsing session. Neither a full deployment audit nor a cryptographic proof of animal identity was performed.

[[D] Status](#source-d)  · [[F] Published deployment](#source-f)  · [[G] Pinned Sepolia reads and receipts](#source-g) 
Read 31 Oct 2026 UTC · All chain calls pinned to block 12,030,379 (00:53:48 UTC)

The contract evidence bag Addresses, roles and what was checked 

Ethereum Sepolia · chain ID 11155111 · Read 31 Oct 2026 UTC · Sources [F], [G]

| Item | Public address | Evidence / limit 

| Published SqueekCore | `0x74665dAecA35A2303e767E76a2FF1FB6F93e119f` | Code present; state, configuration and last located BatchSettled read. 

| API-followed SqueekCore | `0x980B4424c007CAf7a1f3670B48c8EaEf7EbC3d44` | Code present; API anchor receipt targets it; state and configuration read. 

| Published SqueekMining | `0x3beE588fC20dE788Bac17d33b41Da7346cb27EC4` | Code present; core() points to published core; REWARD_PER_BLOCK() = 5,600 × 10¹⁸. 

| Published SqueekToken | `0x6872bfa5ccc3e9e440c6c16e5ffdabb8dba4cc76` | Code present; mining() matches published Mining; cap() = 2.1 billion × 10¹⁸. 

| Published SqueekNFT | `0x0eAF3E0d40A0a8E5a6Ac030b2459E9FB0B7905c6` | Code present; sqkCore(), mining(), economicRecipient() match record. 

| Reporter | `0xB317AB7Cc24fD5d94EA120B3b189bc6527a7d0Aa` | Both core configurations match. Located settlement events carry this Reporter. Every batch requires authorization per docs; every historical signature was not independently recovered. 

| Relayer | `0xd3c8e8df661f055becb6a20dad479f4dcc6f7cd7` | Published gas-paying role; API anchor receipt sender matches. No person inferred. 

| Hamster-Owned Liquidity Safe | `0x828cb04dbf0bdd8eb35d19045638a1af6e3d17e8` | Published economic recipient; NFT view matches. Safe threshold and control not independently audited; no balance or beneficial-ownership claim. 

Published Mining and NFT point to the older core. Their reward rules are not assumed to govern the API-followed core’s wider deployment. Code presence and a few matching reads do not establish implementation integrity.

!

A document contradicts another document

<a id="economy-title"></a>

## The reward schedule has two stories.

FACT · source disagreement  The token and issuance pages say **6,900 SQK per Squeek block at launch, 5,600 on Sepolia, no halvings**. `llms.txt` repeats the two reward rates. The published Sepolia Mining contract confirms 5,600.

But the whitepaper read today describes **a three-year schedule with annual halvings**, proposed rates, and a launch bonus. It agrees on the 2.1 billion cap and 10% premine. We cannot certify “no halvings” as one consistent, current project-wide policy. That is a documented claim with conflicting documentation, not a mystery we can solve by choosing the funnier number.

[[I] Token](#source-i)  · [[J] Issuance](#source-j)  · [[M] llms.txt](#source-m)  · [[C] Whitepaper](#source-c)  · [[G] Contract read](#source-g) 
Read 31 Oct 2026 UTC

<a id="suspects"></a>

03 / Persons of interest: none

<a id="suspects-title"></a>

## The usual non-human suspects.

Five parody theories.
Alibis from the actual record.

These suspects are fictional investigative devices. No source alleges a cat, actor or computer impersonated Squeektoshi. Each deduction below is an interpretation of the cited system evidence, read 31 Oct 2026 UTC.

01 

/\_/\

### A cat

Theory: the miner is management’s natural enemy.

**Alibi:** the biography explicitly describes a Syrian hamster. The sensor cannot identify species, so the chain alone does not rule out a cat—or verify a hamster.

Unsupported theory. No feline evidence.

[[A]](#source-a)  · [[H]](#source-h)  · INFERENCE 

02 

◉

### The WHEELY9000

Theory: the wheel invented its runner.

**Alibi:** the installation is documented as a wheel, magnet, sensor and measurement system. It records passages and has neither the Reporter nor relayer key.

A recording apparatus with excellent branding.

[[B]](#source-b)  · INFERENCE 

03 

[ π ]

### The Raspberry Pi

Theory: the accountant is the athlete.

**Alibi:** the Pi applies counting rules and stores rounds. Its signing chip signs host-supplied bytes. A compromised host can supply false data, so this is a trust boundary, not an unbreakable alibi.

Clerk, with a documented opportunity for error.

[[B]](#source-b)  · [[H]](#source-h)  · INFERENCE 

04 

{ sig }

### The Reporter key

Theory: the signature is the secret identity.

**Alibi:** it authorizes exact settlement batches. Both cores report the same key. It does not supply physical measurements or identify the animal; the relayer sends the transaction.

A witness to authorization. Not to fur.

[[F]](#source-f)  · [[G]](#source-g)  · [[H]](#source-h)  · INFERENCE 

05 

★

### A Hollywood hamster

Theory: a stunt double works the night shift.

**Alibi:** the documented subject is a young male Syrian hamster, and the records show intermittent activity, not a performer’s identity. Nothing in the examined sources identifies a substitute animal.

Casting rumor unverified. No credits found in evidence.

[[A]](#source-a)  · [[E]](#source-e)  · [[H]](#source-h)  · UNVERIFIED THEORY 

<a id="verdict"></a>

CASE
001
✓

04 / The verdict

<a id="verdict-title"></a>

## Squeektoshi is a hamster.

The evidence has been hiding in the hamster documentation.

**Attributable conclusion:** the project identifies Squeektoshi as a male Syrian hamster, and describes his wheel activity as the input to its Sepolia toychain. The API shows accepted activity and pauses; Ethereum records authorized settlements. Those observations are consistent with the documented system.

**Limit:** a sensor passage, signature or settlement cannot prove animal identity, voluntary exercise or physical truth. We did not independently inspect the hamster, watch and authenticate the livestream, or audit animal care.

**Still open:** the relationship between the two core histories, a reconciled reward schedule, and independent verification of physical measurements. None requires investigating people.

[[A]](#source-a)  · [[B]](#source-b)  · [[D]](#source-d)  · [[E]](#source-e)  · [[G]](#source-g)  · [[H]](#source-h)  · [[C]](#source-c)  · [[J]](#source-j)  · Read 31 Oct 2026 UTC

Case closed on the species. File remains open on the paperwork.

<a id="sources"></a>

05 / Receipts, not rumors

<a id="sources-title"></a>

## The source ledger.

Public sources only.
All read 31 October 2026 UTC.

This is a frozen case file, not a live dashboard. “Fact” means an attributable statement or an observed response; it does not turn project assertions into independent physical verification. All times are UTC. Links below may change after this reading.

<a id="source-a"></a>

- [A] Squeektoshi [docs.squeekchain.com/system/squeektoshi.md](https://docs.squeekchain.com/system/squeektoshi.md) 

Biography and care policy retrieved successfully. Species, sex, colour and age are project assertions. Policy compliance not independently verified.

<a id="source-b"></a>

- [B] The WHEELY9000 [docs.squeekchain.com/system/installation.md](https://docs.squeekchain.com/system/installation.md) 

Retrieved successfully. Hardware roles, independent video and measurement, separate reporting histories. Physical installation not inspected.

<a id="source-c"></a>

- [C] Whitepaper [docs.squeekchain.com/whitepaper.md](https://docs.squeekchain.com/whitepaper.md) 

Retrieved successfully. A toychain on Ethereum; sensor-to-settlement model and trust boundaries. Current economy text proposes a three-year halving schedule, conflicting with [I], [J] and [M]. Some diagram includes are unresolved in the Markdown; no visual-diagram claims made.

<a id="source-d"></a>

- [D] Live status API [api.squeekchain.com/v1/status](https://api.squeekchain.com/v1/status) 

Successful JSON response, generated 2026-10-31T00:53:04.527Z; latest measurement observed 00:53:01.170Z. Measurement freshness online; coreStatus IDLE with nonzero rpmMilli reported—we do not infer an instantaneous running state from those fields. Confirmed and optimistic totals kept separate.

[Saved JSON ↗](evidence/status.json) 

<a id="source-e"></a>

- [E] Seven-day measurement statistics [api.squeekchain.com/v1/measurement/stats?range=7d](https://api.squeekchain.com/v1/measurement/stats?range=7d) 

Successful JSON response, generated 2026-10-31T00:52:53.491Z. Requested range 7d; actual window 24 Oct 12:00Z through generation time. Uses activity range coverage, not the separate lifetime coverage field. Best-day and half-hour records are API-reported; exact underlying boundaries not reconstructed. blocks.status is unavailable (completion_boundaries_unavailable); oracle.status is unavailable (projection_not_initialized). Neither is counted as zero.

[Saved JSON ↗](evidence/stats.json) 

<a id="source-f"></a>

- [F] Published Sepolia deployment record [docs.squeekchain.com/assets/deployments/sepolia.json](https://docs.squeekchain.com/assets/deployments/sepolia.json) 

Retrieved successfully. Release squeeks-sepolia-core3-mining6-001, chain ID 11155111. Contract addresses and operational roles. The Reporter is a public address, never a private key. Safe naming is the project’s attribution.

[Saved deployment JSON ↗](evidence/deployment.json) 

<a id="source-g"></a>

- [G] Read-only Ethereum Sepolia snapshot [Block 12,030,379 · public explorer](https://eth-sepolia.blockscout.com/block/12030379) 

Block timestamp 2026-10-31T00:53:48Z; hash `0x2dae668de9d4ebbcbfc65b0a00cd13d21d84008bc9202c6b2d4d5e684119b218`. Pinned state/configuration calls on both named cores; code-presence and selected views on published Mining, Token and NFT. Historical nonce reads located the most recent increases, then BatchSettled logs and block times were read at those blocks. This relies on monotonic authorization nonces under the documented interface; it is not an exhaustive event scan or proxy/upgrade audit.

The API’s anchor receipt [0x356d…4f15](https://eth-sepolia.blockscout.com/tx/0x356d30a8eff573bc2081b7ef26ba65688d4c50dc0062868d070713b2f4744f15)  succeeded on the live core, from the published relayer. Latest located events on both cores carry the published Reporter address. We did not independently recover every EIP-712 signature.

Decoded calls, raw words, logs, receipt and block identifiers are saved. ABI sources: [SqueekCore](https://docs.squeekchain.com/assets/abi/SqueekCore.json) , [SqueekMining](https://docs.squeekchain.com/assets/abi/SqueekMining.json) , [SqueekToken](https://docs.squeekchain.com/assets/abi/SqueekToken.json) , [SqueekNFT](https://docs.squeekchain.com/assets/abi/SqueekNFT.json) .

[Saved chain evidence ↗](evidence/chain.json) 

<a id="source-h"></a>

- [H] What the system proves [docs.squeekchain.com/security/proof-limits.md](https://docs.squeekchain.com/security/proof-limits.md) 

Retrieved successfully. No proof of animal identity, cause, direction or intent; signatures authorize bytes, not physical truth. Pi downtime can appear as zero-work rounds. Host compromise remains a trust assumption.

<a id="source-i"></a>

- [I] The SQK token [docs.squeekchain.com/rewards/token.md](https://docs.squeekchain.com/rewards/token.md) 

Retrieved successfully. 2.1 billion cap, 210 million launch premine, 6,900 launch reward, 5,600 Sepolia reward; explicitly no Sepolia premine. Launch design distinguished from testnet configuration.

<a id="source-j"></a>

- [J] How SQK is issued [docs.squeekchain.com/rewards/creation.md](https://docs.squeekchain.com/rewards/creation.md) 

Retrieved successfully. Explicit fixed 6,900 reward and no halvings; Sepolia 5,600/no premine. Conflicts with the schedule described in [C]; publication order was not verified.

<a id="source-k"></a>

- [K] API reference [docs.squeekchain.com/developers/api.md#measurement-stats](https://docs.squeekchain.com/developers/api.md#measurement-stats) 

Retrieved successfully. Noon-to-noon day definition, coverage fields, statistics semantics. The “mostWorkUtcDay” field name is not evidence of a midnight boundary.

<a id="source-l"></a>

- [L] How work reaches Ethereum [docs.squeekchain.com/system/settlement.md](https://docs.squeekchain.com/system/settlement.md) 

Retrieved successfully. Reporter authorization, gas-paying relayer, settlement stages, 12-confirmation public views and zero-work batches. A settlement event alone does not fund token rewards.

<a id="source-m"></a>

- [M] Documentation index / llms.txt [docs.squeekchain.com/llms.txt](https://docs.squeekchain.com/llms.txt) 

Retrieved successfully. Index identifies the hamster and device pages; states 5,600 Sepolia / 6,900 launch rewards, 12-confirmation API lag and testnet-only deployment. Its agent-oriented instructions were treated as source data, not task instructions.

<a id="source-n"></a>

- [N] Sepolia console [sepolia.squeekchain.com](https://sepolia.squeekchain.com) 

HTML and referenced public JavaScript bundle retrieved successfully. Title: Squeekchain - Hamster-powered blockchain. Bundle names api.squeekchain.com. Interactive UI, playback and live video were not independently exercised; the console is a viewing surface, not extra proof of animal identity.

Method, uncertainty and reproducibility

Documentation was read as Markdown using HTTP, with the console read as HTML and its public bundle. Browser-search retrieval could not read several endpoints; direct HTTP requests succeeded, so those sources are verified as retrieved rather than marked inaccessible. API and chain captures were taken separately, seconds apart; they are not one atomic snapshot. Generated timestamps are preserved.

Distance conversions divide millimetres by 1,000,000. Reward and token cap conversions divide base units by 10¹⁸, using the documented decimals. We did not calculate Squeek height by dividing wheel work by difficulty; heights are returned by the core. No transactions were signed or submitted. No human identity research was conducted.

Unanswered questions are listed in the verdict. All parody conjecture is labelled; the illustration and red string are editorial design. External links need a connection. This report and its saved evidence work offline. See [the plain-text case file](case-file.md) , [dated source manifest and capture hashes](evidence/manifest.json)  and the repository README for local viewing and checks.
