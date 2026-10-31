import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const browserFiles = [
  'index.html', 'game.js', 'style.css', 'world.js', 'world-math.js',
  'engine.js', 'bank.js', 'data.js', 'icon.svg',
];

export async function buildSite(output = path.join(root, 'dist')) {
  if (path.resolve(output) === root) throw new Error('Build output must be separate from the source directory.');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });

  for (const file of browserFiles) await cp(path.join(root, file), path.join(output, file));
  await cp(path.join(root, 'assets'), path.join(output, 'assets'), {
    recursive: true,
    filter: file => !path.basename(file).startsWith('.'),
  });

  // Vercel does not publish node_modules as static assets. Ship only the GSAP
  // browser modules this game imports, retaining their embedded license notices.
  const vendor = path.join(output, 'vendor', 'gsap');
  await mkdir(vendor, { recursive: true });
  for (const file of ['index.js', 'gsap-core.js', 'CSSPlugin.js']) {
    await cp(path.join(root, 'node_modules', 'gsap', file), path.join(vendor, file));
  }
  const worldPath = path.join(output, 'world.js');
  const world = await readFile(worldPath, 'utf8');
  await writeFile(worldPath, world.replace('./node_modules/gsap/index.js', './vendor/gsap/index.js'));
  return output;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  console.log(`Static site built: ${await buildSite()}`);
}
