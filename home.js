// Preserve previously shared links to posts at the former blog homepage.
function preservePostLink() {
  if (location.hash.startsWith('#post/')) {
    location.replace('blog.html' + location.search + location.hash);
  }
}
preservePostLink();
window.addEventListener('hashchange', preservePostLink);
