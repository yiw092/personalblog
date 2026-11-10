import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

test('old post URLs redirect to the blog with query and hash preserved', () => {
  let destination;
  const context = { location: { hash: '#post/a%20post', search: '?ref=shared', replace: value => { destination = value; } }, window: { addEventListener() {} } };
  vm.runInNewContext(readFileSync('home.js', 'utf8'), context);
  assert.equal(destination, 'blog.html?ref=shared#post/a%20post');
});
test('homepage stays put without a post hash', () => {
  vm.runInNewContext(readFileSync('home.js', 'utf8'), { location: { hash: '#', replace: () => assert.fail('Unexpected redirect') }, window: { addEventListener() {} } });
});
