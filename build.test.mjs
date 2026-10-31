import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from './build.mjs';
import { WORLDS } from './world-math.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const fixture = await mkdtemp(path.join(tmpdir(), 'opdrift-static-build-'));
await buildSite(fixture);
after(() => rm(fixture, { recursive: true, force: true }));

test('Vercel explicitly builds a static site instead of executing browser code as a function', async () => {
  const config = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(config.outputDirectory, 'dist');
  const html = await readFile(path.join(fixture, 'index.html'), 'utf8');
  assert.match(html, /type="module" src="game\.js"/);
});

test('every production module import and every world asset resolves without node_modules hosting', async () => {
  const visited = new Set();
  async function visit(file) {
    if (visited.has(file)) return;
    visited.add(file);
    const source = await readFile(file, 'utf8');
    assert.doesNotMatch(source, /from\s*['"]\.\/node_modules\//);
    for (const [, specifier] of source.matchAll(/\bfrom\s*['"]([^'"]+)['"]/g)) {
      if (!specifier.startsWith('.')) continue;
      await visit(path.resolve(path.dirname(file), specifier));
    }
  }
  await visit(path.join(fixture, 'game.js'));
  assert.ok(visited.has(path.join(fixture, 'vendor', 'gsap', 'gsap-core.js')));
  assert.ok(visited.has(path.join(fixture, 'vendor', 'gsap', 'CSSPlugin.js')));
  for (const world of WORLDS) await access(path.join(fixture, 'assets', `${world.asset}.png`));
  for (const file of ['balloon.png', 'clouds-v2.png', 'lilita-one.ttf', 'nunito-regular.ttf', 'nunito-bold.ttf']) {
    await access(path.join(fixture, 'assets', file));
  }
});

test('the published folder contains only the browser game and its public assets', async () => {
  const files = await readdir(fixture);
  for (const name of ['app.js', 'server.mjs', 'dev-server.mjs', 'build.mjs', 'tests.mjs', '.agents', '.git', 'node_modules', 'package.json']) {
    assert.ok(!files.includes(name), `${name} must not be deployed`);
  }
});
