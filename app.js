const config = window.BLOG;
const byId = id => document.getElementById(id);
const posts = [...config.posts].sort((a, b) => b.date.localeCompare(a.date));
const siteTitle = config.title || 'Blog';
byId('site-name').textContent = siteTitle;
document.title = siteTitle;
byId('post-count').textContent = String(posts.length).padStart(2, '0');
byId('empty-state').hidden = posts.length > 0;
for (const post of posts) {
  const link = document.createElement('a');
  link.className = 'post-link';
  link.href = '#post/' + encodeURIComponent(post.slug);
  const date = document.createElement('time');
  date.dateTime = post.date;
  date.textContent = post.date;
  const title = document.createElement('span');
  title.className = 'post-label';
  title.textContent = post.title;
  link.append(date, title);
  byId('post-list').append(link);
}
if (config.artwork) {
  const img = document.createElement('img');
  img.src = config.artwork.src;
  img.alt = config.artwork.alt;
  byId('artwork').removeAttribute('aria-label');
  byId('artwork').append(img);
}
let request;
async function route() {
  request?.abort();
  request = new AbortController();
  const signal = request.signal;
  const isPost = location.hash.startsWith('#post/');
  byId('post-index').hidden = isPost;
  byId('reading').hidden = !isPost;
  byId('panel-title').textContent = isPost ? 'Reading' : 'Posts';
  byId('home-link').setAttribute('aria-current', isPost ? 'false' : 'page');
  document.title = siteTitle;
  byId('status-text').textContent = 'Ready';
  if (!isPost) return;
  let slug;
  try { slug = decodeURIComponent(location.hash.slice(6)); } catch { slug = ''; }
  const post = posts.find(item => item.slug === slug);
  byId('post-body').replaceChildren();
  byId('post-date').textContent = post?.date || '';
  byId('post-title').textContent = post?.title || 'Post not found';
  if (!post) return;
  byId('post-date').dateTime = post.date;
  document.title = post.title + ' — ' + siteTitle;
  byId('status-text').textContent = 'Loading';
  try {
    const response = await fetch(post.file, { signal });
    if (!response.ok) throw new Error('Post unavailable');
    const html = await response.text();
    if (signal.aborted) return;
    // Only trusted HTML written by the blog owner belongs in post files.
    byId('post-body').innerHTML = html;
    byId('status-text').textContent = 'Ready';
    byId('reading').focus({ preventScroll: true });
  } catch (error) {
    if (signal.aborted) return;
    byId('post-body').textContent = 'This post could not be loaded. Please try again.';
    byId('status-text').textContent = 'Load error';
  }
}
function toggle(id, className) {
  byId(id).addEventListener('click', () => {
    const active = document.body.classList.toggle(className);
    byId(id).setAttribute('aria-pressed', String(active));
  });
}
toggle('size-toggle', 'large-text');
toggle('theme-toggle', 'light-reading');
window.addEventListener('hashchange', route);
route();
