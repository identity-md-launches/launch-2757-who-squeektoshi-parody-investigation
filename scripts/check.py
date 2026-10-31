#!/usr/bin/env python3
"""Offline structural and arithmetic checks. These do not establish research truth."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from decimal import Decimal
import hashlib
import json
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / 'artifacts'
checks = 0

def check(condition, description):
    global checks
    if not condition: raise AssertionError(description)
    checks += 1

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = []
        self.links = []
        self.assets = []
        self.articles = []
        self.lang = None
        self.viewports = 0
        self.headings = []
        self.article_stack = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'meta' and a.get('name') == 'viewport': self.viewports += 1
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'a' and 'href' in a: self.links.append(a['href'])
        if tag in ('script', 'img') and a.get('src'): self.assets.append(a['src'])
        if tag == 'link' and a.get('rel') == 'stylesheet': self.assets.append(a['href'])
        if tag in ('h1','h2','h3'): self.headings.append(tag)

page = Page()
html = (SITE / 'index.html').read_text()
page.feed(html)
check(page.lang == 'en', 'English page language')
check(page.viewports == 1, 'responsive viewport')
check(page.headings.count('h1') == 1, 'single primary heading')
check(len(page.ids) == len(set(page.ids)), 'unique element IDs')
for href in page.links:
    u = urlsplit(href)
    if u.scheme:
        check(u.scheme == 'https', 'public external links use HTTPS: '+href)
        continue
    dest = SITE / unquote(u.path) if u.path else SITE / 'index.html'
    check(dest.is_file(), 'local link exists: '+href)
    if u.fragment and dest.suffix == '.html':
        p = Page();p.feed(dest.read_text())
        check(unquote(u.fragment) in p.ids, 'fragment target exists: '+href)
for asset in page.assets:
    check(not urlsplit(asset).scheme and (SITE / asset).is_file(), 'local runtime asset: '+asset)
css = (SITE / 'styles.css').read_text()
js = (SITE / 'board.js').read_text()
check(not re.search(r'@import|url\(\s*[\'"]?https?://', css), 'no external CSS dependency')
check(not re.search(r'\bfetch\s*\(|XMLHttpRequest|import\s*\(', js), 'no runtime network requests')
check('@media print' in css and 'prefers-reduced-motion' in css, 'print and reduced-motion styles')
check('Skip to the evidence' in html and ':focus-visible' in css, 'keyboard navigation affordances')
for ident in ['evidence','disappearance','suspects','verdict','sources']:
    check(ident in page.ids, 'required section: '+ident)
for source in 'abcdefghijklmn':
    check('source-'+source in page.ids, 'source ledger entry: '+source)
check(html.count('class="suspect"') == 5, 'five parody suspects')
check(html.count('class="clue ') == 6, 'six pinned clues')
for phrase in ['UNRESOLVED', 'INFERENCE', 'UNVERIFIED THEORY', 'no halvings', 'annual halvings', 'noon to noon UTC', 'zero work cannot prove sleep']:
    check(phrase in html, 'required distinction: '+phrase)

manifest = json.loads((SITE / 'evidence/manifest.json').read_text())
for f in manifest['captures']:
    data = (SITE / 'evidence' / f['path']).read_bytes()
    check(len(data) == f['bytes'], 'capture length: '+f['path'])
    check(hashlib.sha256(data).hexdigest() == f['sha256'], 'capture hash: '+f['path'])
for source in manifest['sources']:
    check(source['readDateUtc'] == '2026-10-31', 'dated source: '+source['id'])
    check(urlsplit(source['url']).scheme == 'https', 'public source URL: '+source['id'])

stats = json.loads((SITE / 'evidence/stats.json').read_text())
summary = stats['activity']['summary']
rounds = stats['rounds']
check(summary['observedWorkUnits'] == '55392' and summary['observedDistanceMm'] == '48634176', 'activity totals')
check(rounds['activeCount'] + rounds['zeroWorkCount'] == rounds['observedCount'] == 642, 'observed rounds add up')
check(rounds['missingCount'] + rounds['observedCount'] == stats['activity']['coverage']['expectedRoundCount'] == 941, 'expected round coverage')
check(stats['activity']['coverage']['coverageBps'] == 6822, 'coverage percentage field')
check(int(Decimal(summary['observedDistanceMm']) / 1000) == 48634, 'distance conversion')
for day in stats['activity']['days']:
    if day['distanceMm'] is not None:
        km = Decimal(day['distanceMm']) / 1000000
        check(f'{km:.3f}' in html, 'rounded chart distance: '+day['date'])
check(stats['records']['mostWorkHalfHour']['value'] == '1827', 'busiest individual half hour')
check(stats['records']['mostWorkHalfHour']['occurredAt'] == '2026-10-27T22:00:00.000Z', 'busiest half-hour timestamp')
check(summary['mostActiveDate'] == '2026-10-29' and summary['mostActiveDateWorkUnits'] == '13297', 'best API day')
peak = max(stats['activity']['typicalDay'], key=lambda x:int(x['meanWorkMilli']))
check(peak['startMinuteUtc'] == 1320 and peak['meanWorkMilli'] == '1363400', 'typical-day peak differs from individual record')
status = json.loads((SITE / 'evidence/status.json').read_text())
chain = json.loads((SITE / 'evidence/chain.json').read_text())
deploy = json.loads((SITE / 'evidence/deployment.json').read_text())
check(chain['chainId'] == deploy['chainId'] == 11155111, 'Sepolia chain identity')
check(int(chain['block']['number'],16) == 12030379, 'pinned snapshot block')
check(chain['block']['hash'] in html, 'block hash in report')
old = deploy['contracts']['SqueekCore']['address']
live = '0x980B4424c007CAf7a1f3670B48c8EaEf7EbC3d44'
check(old != live and old in chain['contracts'] and live in chain['contracts'], 'two distinct cores')
for address,c in chain['contracts'].items():
    check(c['codePresent'], 'core code present: '+address)
    check(c['configuration']['decoded']['reporter'].lower() == deploy['operational']['reporter']['address'].lower(), 'reported Reporter: '+address)
    check(c['latestBatchSettledLogs'][0]['address'] == address.lower(), 'event belongs to core')
    check(c['state']['decoded']['settledThroughRound'] in html.replace(',',''), 'frontier displayed')
check(int(chain['contracts'][old]['latestBatchBlock']['timestamp'],16) == 1793031636, 'old core last settlement timestamp')
check(chain['apiAnchorReceipt']['to'] == live.lower(), 'API anchor receipt targets live core')
check(chain['apiAnchorReceipt']['transactionHash'] == status['builder']['anchor']['transactionHash'], 'receipt traces API confirmed anchor')
check(chain['apiAnchorReceipt']['status'] == '0x1', 'anchor transaction succeeded')
check(chain['apiAnchorReceipt']['from'] == deploy['operational']['relayer']['address'].lower(), 'relayer sender matches')
check(chain['publishedContracts']['SqueekMining']['calls']['REWARD_PER_BLOCK']['decoded'] == str(5600*10**18), 'published reward amount')
check(chain['publishedContracts']['SqueekToken']['calls']['cap']['decoded'] == str(2100000000*10**18), 'published cap amount')
check(chain['publishedContracts']['SqueekNFT']['calls']['economicRecipient']['decoded'] == deploy['operational']['economicRecipient']['address'].lower(), 'economic recipient matches')
for item in ['SqueekCore','SqueekMining','SqueekToken','SqueekNFT']:
    check(deploy['contracts'][item]['address'] in html, 'full contract address disclosed: '+item)
for item in ['reporter','relayer','economicRecipient']:
    check(deploy['operational'][item]['address'] in html, 'full system-role address disclosed: '+item)
for p in [SITE/'index.html',SITE/'case-file.md',SITE/'evidence/chain.json',SITE/'evidence/manifest.json',ROOT/'README.md']:
    text = p.read_text()
    check('127.0.0.1:35689' not in text and 'HTTP_PROXY' not in text, 'no machine-specific endpoint/configuration in '+p.name)
    check(not re.search(r'0x0{40}\b|0x0{36}dead\b', text, re.I), 'no placeholder address in '+p.name)

before = (SITE / 'case-file.md').read_bytes()
subprocess.run([sys.executable,str(ROOT/'scripts/export_case.py')],check=True)
check(before == (SITE/'case-file.md').read_bytes(), 'Markdown export is current')
print(f'PASS: {checks} offline structural, integrity and arithmetic checks.')
