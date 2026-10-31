'use strict';
// The complete report is static. JavaScript only improves printing.
const printButton = document.querySelector('.print-button');
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener('click', () => window.print());
}
let closedDrawers = [];
window.addEventListener('beforeprint', () => {
  closedDrawers = [...document.querySelectorAll('details:not([open])')];
  closedDrawers.forEach(drawer => { drawer.open = true; });
});
window.addEventListener('afterprint', () => {
  closedDrawers.forEach(drawer => { drawer.open = false; });
  closedDrawers = [];
});
