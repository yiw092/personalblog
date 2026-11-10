// Content conversion only: the owner's HTML is preserved, never generated or rewritten.
export function compilePosts(entries, legacy = []) {
  const posts = [...legacy];
  const files = [];
  const used = new Set(legacy.map(post => post.slug.toLowerCase()));
  for (const { filename, data } of entries) {
    if (!filename.endsWith('.json') || /[/\\]/.test(filename)) throw new Error('Invalid post filename');
    const slug = filename.slice(0, -5);
    if (!slug || slug.startsWith('.') || used.has(slug.toLowerCase())) throw new Error(`Duplicate or invalid post slug: ${slug}`);
    for (const field of ['title', 'date', 'body']) {
      if (typeof data?.[field] !== 'string' || !data[field].trim()) throw new Error(`${filename}: ${field} is required`);
    }
    const date = data.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
      throw new Error(`${filename}: use a valid YYYY-MM-DD date`);
    }
    used.add(slug.toLowerCase());
    posts.push({ slug, title: data.title, date, file: `posts/${encodeURIComponent(slug)}.html` });
    files.push({ filename: `${slug}.html`, body: data.body });
  }
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return { posts, files };
}
