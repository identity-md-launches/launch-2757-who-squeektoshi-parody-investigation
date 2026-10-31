import { cp, mkdir, readdir, stat, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
// Only this generated directory is replaced. The accepted case-file archive stays intact.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'board.js', 'status.js', 'assets']) {
  await cp(resolve(root, 'web', file), resolve(output, file), { recursive: true });
}
for (const file of ['index.html', 'styles.css', 'board.js', 'case-file.md', 'evidence']) {
  await cp(resolve(root, 'artifacts', file), resolve(output, 'archive', file), { recursive: true });
}
async function bytes(dir) {
  let size = 0;
  for (const name of await readdir(dir)) {
    const path = resolve(dir, name);
    const info = await stat(path);
    size += info.isDirectory() ? await bytes(path) : info.size;
  }
  return size;
}
console.log(`Built dist/index.html and complete local assets (${await bytes(output)} bytes).`);
