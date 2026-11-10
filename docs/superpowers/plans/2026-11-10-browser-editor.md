# Browser editor implementation plan

Goal: let the owner write formatted posts and upload images without editing code.
Design: Pages CMS hosted editor, GitHub authentication scoped by the owner to personalblog, title/date/rich-text fields, save-to-publish. Preserve the existing design, artwork and manually indexed posts. No invented editorial content.
Architecture: JSON post collection in content/posts, HTML rich-text body, dependency-free Node build that combines CMS posts with the existing configuration; GitHub Actions builds and deploys only dist. The browser keeps its existing post reader.
Alternative considered: Markdown files edited in GitHub. User selected browser editing instead.

- [ ] Test post validation, ordering, Unicode, duplicate slugs, preserved HTML, empty collection, and no source/test files in deployment.
- [ ] Add build script, CMS configuration, editor entry link and instructions.
- [ ] Run tests and production build, push, change Pages to Actions, verify deployment.
- [ ] Hand off GitHub App installation to owner, then verify the editor after authorization.

Constraints: no tokens in source; existing artwork remains unchanged. Saved posts are public immediately after deployment. Public repository history is public too. Do not create a fake post on production to test the integration.
