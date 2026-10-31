/** @typedef {'loading' | 'running' | 'resting' | 'stale' | 'offline'} AlibiState */
/** @typedef {{state: AlibiState, label: string, description: string, rpm: number | null, observedAt: string | null}} Alibi */
/** @param {unknown} value @returns {value is Record<string, unknown>} */
function record(value) { return typeof value === 'object' && value !== null && !Array.isArray(value); }
/** @param {unknown} value @returns {value is number} */
function finite(value) { return typeof value === 'number' && Number.isFinite(value); }
/** @param {unknown} value @returns {number} */
function timestamp(value) { return typeof value === 'string' ? Date.parse(value) : NaN; }
/** @param {string} description @returns {Alibi} */
export function offlineAlibi(description = 'Cannot reach the status API. Check your connection or try again.') {
  return { state: 'offline', label: 'Offline', description, rpm: null, observedAt: null };
}
/**
 * Interpret only documented public telemetry. Resting is a display shorthand for
 * zero wheel speed; it does not certify sleep, welfare, species or chain settlement.
 * Cumulative work remains untouched: uint-sized counters are never coerced to numbers.
 * @param {unknown} payload
 * @param {number} [now]
 * @returns {Alibi}
 */
export function readAlibi(payload, now = Date.now()) {
  if (!record(payload) || payload.schemaVersion !== 1 || !('measurement' in payload)) {
    return offlineAlibi('The status response could not be read. Try again or inspect the source.');
  }
  const m = payload.measurement;
  /** @type {Alibi} */
  const stale = { state: 'stale', label: 'Stale', description: 'No fresh measurement is available. The wheel’s activity is unknown.', rpm: null, observedAt: null };
  if (!record(m)) return stale;
  const observed = timestamp(m.observedAt);
  if (Number.isFinite(observed)) stale.observedAt = new Date(observed).toISOString();
  const received = timestamp(m.receivedAt);
  const generated = timestamp(payload.generatedAt);
  const threshold = m.staleAfterSeconds;
  if (m.freshness !== 'online' || !finite(threshold) || threshold <= 0 ||
      [observed, received, generated].some(time => !Number.isFinite(time) || now - time > threshold * 1000 || time - now > 10000)) {
    return stale;
  }
  if (m.provenance !== 'hardware') {
    return { ...stale, description: 'This reading is not marked as hardware telemetry. A physical alibi is unavailable.' };
  }
  if (m.coreStatus !== 'IDLE' && m.coreStatus !== 'ACTIVE') {
    return { ...stale, description: 'The device reports a fault or unknown state. Wheel activity cannot be established.' };
  }
  if (!finite(m.rpmMilli) || m.rpmMilli < 0 || !Number.isSafeInteger(m.rpmMilli)) {
    return { ...stale, description: 'Wheel speed is unavailable. A missing reading is not a rest period.' };
  }
  return m.rpmMilli > 0
    ? { state: 'running', label: 'Running', description: 'Motion reported. The biography supplies the occupant’s identity.', rpm: m.rpmMilli / 1000, observedAt: stale.observedAt }
    : { state: 'resting', label: 'Resting', description: 'Zero wheel speed. This suggests rest; it does not establish sleep.', rpm: 0, observedAt: stale.observedAt };
}

export const STATUS_URL = 'https://api.squeekchain.com/v1/status';
export const POLL_MS = 10000;
export const TIMEOUT_MS = 8000;

/**
 * Abortable polling with no overlapping requests. Time and network are injected
 * for meaningful deterministic tests without waiting through production timers.
 * @param {{onData: (data: unknown) => void, onError: (error: unknown) => void, onBusy: (busy: boolean) => void, fetcher?: typeof fetch, intervalMs?: number, timeoutMs?: number}} options
 */
export function createStatusPoller({ onData, onError, onBusy, fetcher = fetch, intervalMs = POLL_MS, timeoutMs = TIMEOUT_MS }) {
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let interval;
  /** @type {AbortController | null} */
  let controller = null;
  let destroyed = false;
  let enabled = false;
  async function refresh() {
    if (destroyed || controller) return;
    const request = new AbortController();
    controller = request;
    onBusy(true);
    const timeout = setTimeout(() => request.abort(new Error('Status request timed out')), timeoutMs);
    try {
      const response = await fetcher(STATUS_URL, { signal: request.signal, cache: 'no-store', credentials: 'omit', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Status API returned ${response.status}`);
      const payload = /** @type {unknown} */ (await response.json());
      if (controller === request && !destroyed && !request.signal.aborted) onData(payload);
    } catch (error) {
      if (controller === request && !destroyed) onError(error);
    } finally {
      clearTimeout(timeout);
      if (controller === request) { controller = null; onBusy(false); }
    }
  }
  function stop() {
    enabled = false;
    clearInterval(interval);
    interval = undefined;
    const pending = controller;
    controller = null;
    pending?.abort();
    onBusy(false);
  }
  function start() {
    if (destroyed || enabled) return;
    enabled = true;
    void refresh();
    interval = setInterval(() => { void refresh(); }, intervalMs);
  }
  return { start, stop, refresh, destroy() { stop(); destroyed = true; } };
}
