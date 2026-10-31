import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.md': 'text/plain; charset=utf-8' };
const port = Number(process.argv[2] || 4173);
const server = createServer(async (request, response) => {
  try {
    let path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (path === '/') { response.writeHead(302, { Location: '/preview/' }); response.end(); return; }
    if (!path.startsWith('/preview/')) throw new Error('Outside preview');
    path = resolve(root, '.' + path.slice('/preview'.length));
    if (path !== root.replace(/\/$/, '') && !path.startsWith(root.replace(/\/$/, '') + sep)) throw new Error('Outside export');
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const data = await readFile(path);
    response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' });
    response.end(data);
  } catch { response.writeHead(404); response.end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}/preview/`));
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
