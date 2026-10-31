import { readAlibi, offlineAlibi, createStatusPoller } from './status.js';

/** @param {string} id @returns {HTMLElement} */
function element(id) {
  const found = document.getElementById(id);
  if (!found) throw new Error(`Missing element: ${id}`);
  return found;
}
/** @param {string} id @returns {HTMLButtonElement} */
function button(id) {
  const found = element(id);
  if (!(found instanceof HTMLButtonElement)) throw new Error(`Missing button: ${id}`);
  return found;
}
const panel = element('alibi');
const label = element('status-label');
const speed = element('status-speed');
const description = element('status-description');
const observed = element('status-observed');
const checked = element('status-checked');
const announcement = element('status-announcement');
const refreshButton = button('refresh-status');
const pauseButton = button('pause-status');
refreshButton.hidden = false;
pauseButton.hidden = false;
/** @type {unknown} */
let payload = null;
let hasResponse = false;
/** @type {import('./status.js').Alibi | null} */
let failure = null;
let checkedAt = 0;
let paused = false;
let lastState = 'loading';
const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const dateTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' });
function renderStatus() {
  if (!hasResponse && !failure) return;
  const state = failure ?? readAlibi(payload);
  panel.dataset.state = state.state;
  label.textContent = state.label;
  speed.textContent = state.rpm === null ? 'Wheel speed unknown' : `${state.rpm.toFixed(1)} rpm reported`;
  description.textContent = state.description;
  const lastObservation = state.observedAt ?? (payload ? readAlibi(payload).observedAt : null);
  observed.textContent = lastObservation ? `Last reading: ${dateTime.format(new Date(lastObservation))} UTC` : 'No reading available';
  checked.textContent = paused ? 'Updates paused · resume below' : checkedAt ? `Checked ${time.format(checkedAt)} UTC · every 10s` : 'Refreshes every 10 seconds';
  // Announce state transitions, not every repeated timestamp or speed tick.
  if (state.state !== lastState) {
    announcement.textContent = `${state.label}. ${state.description}`;
    lastState = state.state;
  }
}
const poller = createStatusPoller({
  onData(data) { hasResponse = true; payload = data; failure = null; checkedAt = Date.now(); renderStatus(); },
  onError() { failure = offlineAlibi(); checkedAt = Date.now(); renderStatus(); },
  onBusy(busy) { refreshButton.disabled = busy; refreshButton.setAttribute('aria-busy', String(busy)); }
});
function syncPolling() {
  if (!paused && !document.hidden && navigator.onLine) poller.start();
  else poller.stop();
}
refreshButton.addEventListener('click', () => { void poller.refresh(); });
pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Resume updates' : 'Pause updates';
  announcement.textContent = paused ? 'Automatic updates paused.' : 'Automatic updates resumed.';
  syncPolling();
  renderStatus();
});
document.addEventListener('visibilitychange', () => { renderStatus(); syncPolling(); });
window.addEventListener('online', syncPolling);
window.addEventListener('offline', () => { poller.stop(); failure = offlineAlibi(); renderStatus(); });
// Age previously fresh readings even when updates are paused or a response is cached.
const ageTimer = setInterval(renderStatus, 1000);
if (!navigator.onLine) { failure = offlineAlibi(); renderStatus(); }
syncPolling();

// String is purely decorative. It connects actual pin positions after responsive layout.
const board = element('clue-board');
const stringSvg = board.querySelector('svg.strings');
const stringPath = stringSvg?.querySelector('path');
let drawFrame = 0;
function drawStrings() {
  if (!stringSvg || !stringPath) return;
  const origin = board.getBoundingClientRect();
  const ids = ['clue-identity', 'clue-machine', 'alibi', 'clue-money', 'clue-signature', 'clue-activity', 'clue-identity'];
  const points = ids.map(id => {
    const pin = element(id).querySelector('.pin');
    const box = pin?.getBoundingClientRect();
    return box ? [box.left + box.width / 2 - origin.left, box.top + box.height / 2 - origin.top] : [0, 0];
  });
  stringSvg.setAttribute('viewBox', `0 0 ${origin.width} ${origin.height}`);
  stringPath.setAttribute('d', points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));
}
const observer = new ResizeObserver(() => {
  cancelAnimationFrame(drawFrame);
  drawFrame = requestAnimationFrame(drawStrings);
});
observer.observe(board);
window.addEventListener('load', drawStrings);
// Native fragment links work without JS. Move keyboard focus along with in-page navigation.
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href')?.slice(1);
    const target = id && document.getElementById(id);
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  });
}
window.addEventListener('pagehide', () => { poller.stop(); });
window.addEventListener('pageshow', () => { syncPolling(); });
window.addEventListener('unload', () => { poller.destroy(); clearInterval(ageTimer); cancelAnimationFrame(drawFrame); observer.disconnect(); });
