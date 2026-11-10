# Personal blog

Static blog interface inspired by the supplied PC-98 references. No artwork or editorial content is included. Interface code and these setup instructions were AI-assisted.

## Preview

Install Node.js, then run `npm start` in this folder and open http://127.0.0.1:4173. Run `npm run check` for syntax checks.

## Add your content

- Set `title` in `content.js` to your blog name.
- Write an HTML fragment in `posts/your-slug.html`, using your own headings and paragraphs. Add its slug, title, date (YYYY-MM-DD), and file path to the `posts` array in `content.js`. See the code comment for the field structure.
- Place your artwork in `assets/` and set `artwork` in `content.js` with its `src` and meaningful `alt` text. Leave it `null` for an empty slot.
- Within post HTML, use paths relative to the site root, e.g. `assets/photo.png`, rather than `/assets/photo.png`, so project Pages URLs work.
- Post HTML is trusted owner-authored content; do not paste untrusted scripts.

## Publish on GitHub Pages

1. Create an empty GitHub repository named `personalblog` under your account. Public repositories support Pages on GitHub Free; private repository availability depends on your plan.
2. Push this folder's separate repository, not its parent project. After replacing YOUR_USERNAME:

```sh
git remote add origin https://github.com/YOUR_USERNAME/personalblog.git
git push -u origin main
```

3. In the GitHub repository, open Settings → Pages. Choose Deploy from a branch, select `main` and `/(root)`, then Save.
4. GitHub will display the published URL, normally https://YOUR_USERNAME.github.io/personalblog/.

Subsequent commits pushed to main publish automatically. There is no build dependency or custom domain requirement.

Official setup guide: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
