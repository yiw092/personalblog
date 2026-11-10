import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import { compilePosts } from './posts.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
const context = { window: {} };
vm.runInNewContext(await readFile(path.join(root, 'content.js'), 'utf8'), context);
const entries = [];
for (const file of await readdir(path.join(root, 'content/posts'))) {
  if (file.endsWith('.json')) entries.push({ filename: file, data: JSON.parse(await readFile(path.join(root, 'content/posts', file), 'utf8')) });
}
const compiled = compilePosts(entries, context.window.BLOG.posts);
// Fixed child output path only; never clean the repository or caller-selected paths.
if (path.dirname(output) !== root.slice(0, -1) && path.dirname(output) !== root) throw new Error('Unexpected output path');
await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, 'posts'), { recursive: true });
for (const name of ['index.html', 'home.css', 'home.js', 'blog.html', 'style.css', 'app.js', '.nojekyll', 'assets', 'admin', 'posts']) {
  await cp(path.join(root, name), path.join(output, name), { recursive: true });
}
for (const file of compiled.files) await writeFile(path.join(output, 'posts', file.filename), file.body);
await writeFile(path.join(output, 'content.js'), 'window.BLOG = ' + JSON.stringify({ ...context.window.BLOG, posts: compiled.posts }, null, 2) + ';\n');
// Pages caches static assets. Fingerprint local CSS/JS references after generating
// content.js so a new deployment never mixes a new page with stale assets.
for (const page of ['index.html', 'blog.html']) {
  let html = await readFile(path.join(output, page), 'utf8');
  for (const match of [...html.matchAll(/(?:href|src)="([\w.-]+\.(?:css|js))"/g)]) {
    const asset = match[1];
    const version = createHash('sha256').update(await readFile(path.join(output, asset))).digest('hex').slice(0, 12);
    html = html.replaceAll(`"${asset}"`, `"${asset}?v=${version}"`);
  }
  await writeFile(path.join(output, page), html);
}
console.log(`Built blog with ${compiled.posts.length} posts in dist/`);
