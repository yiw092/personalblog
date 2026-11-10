# Personal blog

Live blog: https://yiw092.github.io/personalblog/

## Write and publish — no code editing

Open https://yiw092.github.io/personalblog/admin/ (or https://app.pagescms.org/).

### One-time connection

1. Sign in with GitHub.
2. Install/authorize the Pages CMS GitHub App. Choose **Only select repositories** and select **yiw092/personalblog**.
3. Open **personalblog**, choose the **main** branch, then **Blog posts**. The editor configuration is already included; do not create a new configuration.

### Add a post

1. In **Blog posts**, create a new entry.
2. Enter **Title**, choose **Date**, and write in **Post**. Use the toolbar for formatting, links and image uploads.
3. Save. Saving publishes; GitHub builds the site and updates the post list automatically, normally within a few minutes.
4. Refresh the blog after the **Publish blog** workflow finishes: https://github.com/yiw092/personalblog/actions

Edit an existing entry and save to update it. Delete an entry to remove it after the next deployment. No HTML, filenames or content.js edits are needed. The date is a display date, not a publishing schedule.

This is a public repository: saved content and Git history are public. The editor is for publishing, not private drafts. Write private drafts elsewhere until ready. Your words and uploaded artwork are preserved; the integration does not generate content.

## Development

Node.js 22 or newer; no package installation needed.

- `npm test`: check content conversion and deployment output.
- `npm run check`: JavaScript syntax checks.
- `npm run build`: build the site in `dist/`.
- `npm start`: build and preview at http://127.0.0.1:4173/personalblog/.

CMS entries are JSON files in content/posts, with title, date and an HTML rich-text body. The build preserves the owner's body, creates post HTML, and generates the deployed post list. Existing legacy entries in content.js remain supported. Media uploads are in assets/uploads. The supplied artwork stays in assets.

GitHub Pages uses **GitHub Actions** as its publishing source. The workflow tests, builds and deploys dist on main updates. Source configurations and test fixtures are excluded from deployment. No secrets are stored in site code.

Editor documentation: https://pagescms.org/docs/quick-start/
