import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';

test('production output includes assets and editor entry, not source or fixtures', () => {
  execFileSync(process.execPath, ['scripts/build.mjs']);
  for (const name of ['index.html', 'home.css', 'home.js', 'blog.html', 'app.js', 'style.css', 'admin/index.html', 'assets/venice_the_dogana_and_san_giorgio_maggiore_1942.9.85.jpg']) {
    assert.ok(existsSync('dist/' + name), name);
  }
  for (const name of ['tests', '.pages.yml', 'content', 'scripts', '.git', 'README.md']) {
    assert.equal(existsSync('dist/' + name), false, name);
  }
  const context = { window: {} };
  vm.runInNewContext(readFileSync('dist/content.js', 'utf8'), context);
  assert.ok(Array.isArray(context.window.BLOG.posts));
  assert.match(context.window.BLOG.artwork.src, /venice/);
});
