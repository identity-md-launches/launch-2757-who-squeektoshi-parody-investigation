import test from 'node:test';
import assert from 'node:assert/strict';
import { readAlibi, createStatusPoller, STATUS_URL, POLL_MS, TIMEOUT_MS } from '../status.js';
const now = Date.parse('2026-10-31T00:00:00Z');
function reading(changes = {}, root = {}) {
  return { schemaVersion: 1, generatedAt: new Date(now).toISOString(), measurement: { freshness: 'online', observedAt: new Date(now - 2000).toISOString(), receivedAt: new Date(now - 1000).toISOString(), staleAfterSeconds: 120, provenance: 'hardware', coreStatus: 'IDLE', rpmMilli: 68249, cumulativeWorkUnits: '900719925474099399999', ...changes }, ...root };
}
test('fresh speed determines running even when device state is IDLE (observed real API combination)', () => {
  const result = readAlibi(reading(), now);
  assert.equal(result.state, 'running'); assert.equal(result.rpm, 68.249);
});
test('fresh zero speed is labelled resting, with an explicit inference limit', () => {
  const result = readAlibi(reading({ rpmMilli: 0 }), now);
  assert.equal(result.state, 'resting'); assert.match(result.description, /does not establish sleep/);
});
test('API stale flags and aged response, observation or receipt each defeat the running label', () => {
  assert.equal(readAlibi(reading({ freshness: 'stale' }), now).state, 'stale');
  for (const field of ['receivedAt', 'observedAt']) assert.equal(readAlibi(reading({ [field]: new Date(now - 121000).toISOString() }), now).state, 'stale');
  assert.equal(readAlibi(reading({}, { generatedAt: new Date(now - 121000).toISOString() }), now).state, 'stale');
  assert.equal(readAlibi(reading(), now + 121000).state, 'stale');
});
test('honors the API threshold rather than assuming fresh for 120 seconds', () => {
  assert.equal(readAlibi(reading({ staleAfterSeconds: 1 }), now).state, 'stale');
  assert.equal(readAlibi(reading({ staleAfterSeconds: 0 }), now).state, 'stale');
});
test('absent, invalid, or future timestamps cannot establish a fresh alibi', () => {
  for (const value of [null, '', 'nonsense', new Date(now + 30000).toISOString()]) {
    assert.equal(readAlibi(reading({ observedAt: value }), now).state, 'stale');
  }
});
test('null measurements, sensor faults, simulated readings and missing speeds never mean resting', () => {
  assert.equal(readAlibi(reading({}, { measurement: null }), now).state, 'stale');
  for (const patch of [{ coreStatus: 'COUNTER_FAULT' }, { coreStatus: 'UNKNOWN' }, { provenance: 'simulated' }, { provenance: 'replay' }, { rpmMilli: null }, { rpmMilli: -1 }, { rpmMilli: '0' }, { rpmMilli: NaN }]) {
    const result = readAlibi(reading(patch), now); assert.equal(result.state, 'stale'); assert.equal(result.rpm, null);
  }
});
test('malformed payloads fail visibly instead of preserving an apparently live value', () => {
  for (const value of [null, false, [], {}, { measurement: {} }, reading({}, { schemaVersion: 2 })]) assert.equal(readAlibi(value, now).state, 'offline');
});
test('does not mutate payload or coerce cumulative counters', () => {
  const data = reading(); const before = JSON.stringify(data); readAlibi(data, now); assert.equal(JSON.stringify(data), before);
});
test('production interval is ten seconds, timeout is bounded below it', () => {
  assert.equal(POLL_MS, 10000); assert.equal(TIMEOUT_MS, 8000); assert.equal(STATUS_URL, 'https://api.squeekchain.com/v1/status');
});
test('polls repeatedly, sends no credentials and never overlaps pending requests', async () => {
  let calls = 0; let active = 0; let maximum = 0; let received = 0;
  let finish;
  const done = new Promise(resolve => { finish = resolve; });
  const poller = createStatusPoller({ intervalMs: 5, timeoutMs: 100, onData() { received++; if (received === 3) finish(); }, onError: assert.fail, onBusy() {}, async fetcher(url, init) {
    assert.equal(url, STATUS_URL); assert.equal(init.credentials, 'omit'); assert.equal(init.cache, 'no-store');
    calls++; active++; maximum = Math.max(maximum, active);
    await new Promise(resolve => setTimeout(resolve, 15)); active--;
    return new Response(JSON.stringify(reading()));
  } });
  poller.start(); poller.start();
  try { await done; } finally { poller.destroy(); }
  assert.equal(maximum, 1); assert.equal(calls, 3);
});
test('HTTP failure and invalid JSON are reported, and manual retry can recover', async () => {
  let attempt = 0; let errors = 0; let success = 0;
  const poller = createStatusPoller({ onBusy() {}, onError() { errors++; }, onData() { success++; }, async fetcher() {
    attempt++; return attempt === 1 ? new Response('', { status: 503 }) : attempt === 2 ? new Response('{broken') : new Response(JSON.stringify(reading()));
  } });
  await poller.refresh(); await poller.refresh(); await poller.refresh(); poller.destroy();
  assert.equal(errors, 2); assert.equal(success, 1);
});
test('a hung fetch is aborted at timeout and a later request can recover', async () => {
  let calls = 0; let errors = 0; let successes = 0; let aborted = false;
  const poller = createStatusPoller({ timeoutMs: 10, onBusy() {}, onError() { errors++; }, onData() { successes++; }, async fetcher(_, init) {
    calls++;
    if (calls > 1) return new Response(JSON.stringify(reading()));
    return new Promise((resolve, reject) => init.signal.addEventListener('abort', () => { aborted = true; reject(init.signal.reason); }));
  } });
  await poller.refresh(); await poller.refresh(); poller.destroy();
  assert.ok(aborted); assert.equal(errors, 1); assert.equal(successes, 1);
});
test('stop cancels an in-flight fetch without replacing a known alibi with a false failure', async () => {
  let errors = 0; let received = 0; let aborted = false;
  const poller = createStatusPoller({ onBusy() {}, onError() { errors++; }, onData() { received++; }, async fetcher(_, init) {
    return new Promise((resolve, reject) => init.signal.addEventListener('abort', () => { aborted = true; reject(init.signal.reason); }));
  } });
  const pending = poller.refresh(); poller.stop(); await pending; poller.destroy();
  assert.ok(aborted); assert.equal(errors, 0); assert.equal(received, 0);
});
test('destroyed polling cannot restart or refresh', async () => {
  let calls = 0;
  const poller = createStatusPoller({ onBusy() {}, onError() {}, onData() {}, async fetcher() { calls++; return new Response('{}'); } });
  poller.destroy(); poller.start(); await poller.refresh(); assert.equal(calls, 0);
});
