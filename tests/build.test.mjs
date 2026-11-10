import test from 'node:test';
import assert from 'node:assert/strict';
import { compilePosts } from '../scripts/posts.mjs';

const entry = (filename, overrides = {}) => ({ filename, data: { title: 'Test fixture', date: '2026-11-10', body: '<p>Fixture &amp; <strong>formatting</strong></p>', ...overrides } });
test('empty CMS leaves legacy posts intact', () => {
  const legacy = [{ slug: 'old', title: 'Old fixture', date: '2025-01-01', file: 'posts/old.html' }];
  assert.deepEqual(compilePosts([], legacy).posts, legacy);
});
test('creates stable Unicode links and preserves rich HTML and media URLs', () => {
  const body = '<p>中文 &amp; café</p><img src="/personalblog/assets/uploads/test.jpg" alt="">';
  const result = compilePosts([entry('笔记.json', { body })]);
  assert.equal(result.posts[0].slug, '笔记');
  assert.equal(result.posts[0].file, 'posts/' + encodeURIComponent('笔记') + '.html');
  assert.equal(result.files[0].body, body);
});
test('orders posts newest first', () => {
  const result = compilePosts([entry('older.json', { date: '2025-01-01' }), entry('newer.json')]);
  assert.deepEqual(result.posts.map(p => p.slug), ['newer', 'older']);
});
test('rejects missing title, empty body and impossible dates', () => {
  for (const change of [{ title: '' }, { body: '' }, { date: '2026-02-30' }, { date: 'bad' }]) {
    assert.throws(() => compilePosts([entry('invalid.json', change)]));
  }
});
test('rejects path traversal and collisions with existing posts', () => {
  assert.throws(() => compilePosts([entry('../escape.json')]));
  assert.throws(() => compilePosts([entry('same.json')], [{ slug: 'same' }]));
});
