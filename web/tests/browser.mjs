import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Install browser tooling outside the repository; see README.
const playwright = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const AxeBuilder = process.env.AXE_PLAYWRIGHT_MODULE ? (await import(pathToFileURL(process.env.AXE_PLAYWRIGHT_MODULE).href)).default : null;
const root = fileURLToPath(new URL('../../', import.meta.url));
const dist = resolve(root, 'dist');
const output = resolve(root, 'test/scratch/browser-checks');
await mkdir(output, { recursive: true });
const missing = [];
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.md': 'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/ipfs/case/')) throw new Error('outside test export');
    let file = resolve(dist, decodeURIComponent(url.pathname.slice('/ipfs/case/'.length)) || 'index.html');
    if (!file.startsWith(dist + sep)) throw new Error('outside export');
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }); res.end(await readFile(file));
  } catch { missing.push(req.url); res.writeHead(404); res.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}/ipfs/case/`;
const results = [];
function note(engine, name, detail) { results.push({ engine, name, passed: true, detail }); console.log(`PASS ${engine}: ${name}`); }
function sample(overrides = {}) {
  const stamp = new Date().toISOString();
  return { schemaVersion: 1, generatedAt: stamp, measurement: { freshness: 'online', observedAt: stamp, receivedAt: stamp, staleAfterSeconds: 120, provenance: 'hardware', coreStatus: 'IDLE', rpmMilli: 0, ...overrides } };
}
try {
 for (const engine of (process.env.BROWSER_ENGINES || 'chromium,webkit').split(',')) {
  let browser;
  try { browser = await playwright[engine].launch({ headless: true, ...(engine === 'webkit' && process.env.WEBKIT_EXECUTABLE ? { executablePath: process.env.WEBKIT_EXECUTABLE } : {}) }); }
  catch (e) { results.push({ engine, name: 'launch', passed: false, detail: String(e) }); console.error(`${engine} unavailable: ${e.message}`); continue; }
  const bound = setTimeout(() => { console.error(`${engine}: browser check exceeded 60 seconds`); void browser.close(); }, 60000);
  try {
   const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
   const page = await context.newPage();
   const errors = [];
   page.on('pageerror', e => errors.push(e.message));
   let mode = 'resting', requests = 0;
   await context.route('https://api.squeekchain.com/v1/status', async route => {
    requests++;
    if (mode === 'offline') return route.abort('failed');
    let body = JSON.stringify(mode === 'null' ? null : sample(mode === 'running' ? { rpmMilli: 68249 } : mode === 'stale' ? { freshness: 'stale' } : mode === 'fault' ? { coreStatus: 'COUNTER_FAULT' } : mode === 'empty' ? { rpmMilli: null } : {}));
    if (mode === 'malformed') body = '{broken';
    await route.fulfill({ status: 200, headers: { 'Access-Control-Allow-Origin': '*' }, contentType: 'application/json', body });
   });
   await page.clock.install();
   await page.goto(base);
   await page.waitForFunction(() => document.querySelector('#alibi').dataset.state === 'resting');
   const first = await page.locator('.primary').boundingBox();
   assert.ok(first && first.y >= 0 && first.y + first.height < 844);
   assert.ok(await page.locator('#alibi-title').isVisible());
   assert.ok((await page.locator('#alibi-title').boundingBox()).y < 844);
   note(engine, '390px first screen', 'Product title, primary action and live panel visible.');
   const startRequests = requests;
   await page.clock.fastForward(10000);
   await page.waitForFunction(() => !document.querySelector('#refresh-status').disabled);
   assert.equal(requests, startRequests + 1);
   note(engine, 'production 10-second polling', 'Advanced browser clock 10,000ms; exactly one new request.');
   await page.locator('#pause-status').click();
   const pausedRequests = requests;
   await page.clock.fastForward(30000);
   assert.equal(requests, pausedRequests);
   await page.clock.fastForward(130000);
   await page.waitForFunction(() => document.querySelector('#alibi').dataset.state === 'stale');
   note(engine, 'pause and aging', 'Paused data ages to stale without network polling.');
   await page.clock.resume();
   // Reset the simulated clock before interpreting newly generated API fixtures.
   await page.clock.setSystemTime(new Date());
   await page.locator('#pause-status').click();
   await page.waitForFunction(() => document.querySelector('#alibi').dataset.state === 'resting');
   await page.locator('#pause-status').click();
   for (const [nextMode, expected] of [['running', 'running'], ['stale', 'stale'], ['fault', 'stale'], ['empty', 'stale'], ['offline', 'offline'], ['malformed', 'offline'], ['null', 'offline'], ['resting', 'resting']]) {
    mode = nextMode;
    await page.locator('#refresh-status').click();
    await page.waitForFunction(() => !document.querySelector('#refresh-status').disabled);
    assert.equal(await page.locator('#alibi').getAttribute('data-state'), expected);
    if (expected === 'offline' || expected === 'stale') assert.equal(await page.locator('#status-speed').textContent(), 'Wheel speed unknown');
   }
   note(engine, 'all alibi states and recovery', 'Running, resting, stale, sensor fault, missing speed, offline, invalid JSON, null JSON, then successful retry.');
   await page.locator('.primary').click();
   assert.equal(new URL(page.url()).hash, '#evidence');
   assert.equal(await page.evaluate(() => document.activeElement.id), 'evidence');
   note(engine, 'primary anchor', 'Navigates to and focuses the board without losing the hosting subpath.');
   await context.route('https://docs.squeekchain.com/system/squeektoshi/', route => route.fulfill({ contentType: 'text/html', body: '<title>Source navigation test</title>' }));
   const popupPromise = context.waitForEvent('page');
   await page.locator('#clue-identity').click();
   const popup = await popupPromise; await popup.waitForLoadState();
   assert.equal(popup.url(), 'https://docs.squeekchain.com/system/squeektoshi/'); await popup.close();
   note(engine, 'whole clue opens its source', 'Native anchor opens the exact biography URL in a new tab; external document response stubbed for this interaction.');
   await page.locator('a[href="#suspects"]').click();
   for (const details of await page.locator('.suspect').all()) {
    const summary = details.locator('summary'); await summary.focus(); await page.keyboard.press('Enter');
    assert.equal(await details.getAttribute('open'), '');
    assert.ok(await details.locator('.suspect-alibi').isVisible());
    await page.keyboard.press('Space'); assert.equal(await details.getAttribute('open'), null);
   }
   note(engine, 'five suspect alibis by keyboard', 'Enter opens and Space closes every native disclosure.');
   await page.locator('.evidence-drawer summary').click();
   assert.equal(await page.locator('.contract-list code').count(), 8);
   for (const code of await page.locator('.contract-list code').all()) assert.match(await code.innerText(), /^0x[0-9a-fA-F]{40}$/);
   await page.locator('.source-ledger summary').click();
   const downloadPromise = page.waitForEvent('download');
   await page.locator('a[download]').click(); const download = await downloadPromise;
   assert.equal(download.suggestedFilename(), 'case-file.md');
   note(engine, 'contract disclosure, source ledger and download', 'Eight complete addresses exposed; Markdown case file downloads.');
   for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
    assert.ok(overflow.document <= overflow.viewport, JSON.stringify({ width, ...overflow }));
   }
   note(engine, 'responsive reflow', 'No horizontal overflow at 320, 390, 768, 1024 or 1440px with evidence drawers open.');
   await page.setViewportSize({ width: 390, height: 844 });
   await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
   assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
   await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
   note(engine, '200% text enlargement', 'No horizontal overflow at 390px with doubled root text size; not a native browser-zoom claim.');
   await page.goto(base);
   await page.keyboard.press('Tab'); assert.equal(await page.locator('.skip-link').evaluate(el => el === document.activeElement), true);
   await page.keyboard.press('Enter'); assert.equal(await page.evaluate(() => document.activeElement.id), 'evidence');
   await page.keyboard.press('Tab');
   assert.equal(await page.evaluate(() => document.activeElement.id), 'refresh-status');
   const focus = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return { width: s.outlineWidth, style: s.outlineStyle }; });
   assert.equal(focus.width, '3px'); assert.equal(focus.style, 'solid');
   await page.screenshot({ path: resolve(output, `${engine}-keyboard-focus.png`) });
   note(engine, 'keyboard skip and focus', 'Skip link focuses the board; next Tab reaches Check again with a 3px solid outline.');
   await page.evaluate(() => { for (const d of document.querySelectorAll('details')) d.open = true; });
   if (AxeBuilder) {
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    await writeFile(resolve(output, `${engine}-axe.json`), JSON.stringify({ violations: audit.violations, incomplete: audit.incomplete.map(x => ({ id: x.id, nodes: x.nodes.length })), passes: audit.passes.length }, null, 2));
    assert.equal(audit.violations.length, 0, JSON.stringify(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))));
    note(engine, 'automated accessibility', `${audit.passes.length} axe rules passed; ${audit.incomplete.length} rules require manual review.`);
   }
   const localPaths = await page.evaluate(() => [...document.querySelectorAll('a[href], link[href], script[src], img[src], meta[property="og:image"]')].map(el => el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('content')).filter(x => x && !x.startsWith('#') && !x.startsWith('https:')));
   for (const path of new Set(localPaths)) { const response = await context.request.get(new URL(path, base).href); assert.equal(response.status(), 200, path); }
   note(engine, 'relative export resources', `${new Set(localPaths).size} local resources resolved below /ipfs/case/, including share image and archive.`);
   assert.equal(errors.length, 0, errors.join('\n'));
   note(engine, 'application exceptions', 'No pageerror events through tested interactions; network failures deliberately induced above.');
   await context.close();
   const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
   const staticPage = await noJS.newPage(); await staticPage.goto(base);
   assert.ok(await staticPage.locator('#identity-title').isVisible());
   assert.ok(await staticPage.locator('noscript').isVisible());
   assert.ok(!await staticPage.locator('#refresh-status').isVisible());
   await staticPage.locator('.suspect summary').first().click(); assert.ok(await staticPage.locator('.suspect-alibi').first().isVisible());
   await noJS.close();
   note(engine, 'no-JavaScript reading', 'Report, links and native suspect disclosure remain usable; live-panel limitation is explicit.');
  } catch (e) { results.push({ engine, name: 'interaction suite', passed: false, detail: e.stack }); console.error(e); }
  finally { clearTimeout(bound); await browser.close(); }
 }
 assert.equal(missing.length, 0, `Missing local files: ${missing.join(', ')}`);
} finally {
 server.closeAllConnections(); await new Promise(resolve => server.close(resolve));
 await writeFile(resolve(output, 'results.json'), JSON.stringify({ results, missing }, null, 2));
}
if (results.some(x => !x.passed)) process.exitCode = 1;
