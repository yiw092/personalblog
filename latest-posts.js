// Display only the owner's existing post titles and dates.
const latestPosts = [...window.BLOG.posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
document.getElementById('no-posts').hidden = latestPosts.length > 0;
for (const post of latestPosts) {
  const link = document.createElement('a');
  link.className = 'post-row';
  link.href = 'blog.html#post/' + encodeURIComponent(post.slug);
  const date = document.createElement('time');
  date.dateTime = post.date;
  date.textContent = post.date;
  const title = document.createElement('span');
  title.className = 'post-title';
  title.textContent = post.title;
  const arrow = document.createElement('span');
  arrow.className = 'post-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  link.append(date, title, arrow);
  document.getElementById('latest-posts').append(link);
}
