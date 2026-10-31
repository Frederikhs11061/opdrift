import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ttf': 'font/ttf' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const name = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).slice(1);
    if (name.split('/').some(part => part.startsWith('.')) || !['.html','.css','.js','.svg','.png','.ttf'].includes(path.extname(name))) { res.writeHead(404); return res.end('Siden findes ikke.'); }
    const resolved = path.resolve(root, name);
    if (!resolved.startsWith(root + path.sep)) { res.writeHead(403); return res.end('Ingen adgang'); }
    const body = await readFile(resolved);
    res.writeHead(200, { 'Content-Type': types[path.extname(resolved)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(404); res.end('Siden findes ikke.'); }
});
server.listen(Number(process.env.PORT) || 4173, '127.0.0.1', () => console.log('OPDRIFT: http://127.0.0.1:' + server.address().port));
