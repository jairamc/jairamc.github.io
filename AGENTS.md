# Repository Guidelines

## Project Structure & Module Organization
This repository is a Hugo static site for `jairam.dev`.
- `content/`: Markdown pages and posts (use section folders like `content/posts/technology/`).
- `config/_default/`: Site and theme configuration (`config.toml`, params, menus, languages).
- `assets/`: Custom pipeline assets (for example `assets/css/custom.css`, images).
- `layouts/`: Site-specific template overrides and shortcodes.
- `static/`: Files served as-is (favicons, verification files, `about.txt`).
- `themes/congo/`: Congo theme submodule. Treat as upstream code; prefer overrides in top-level folders.
- `public/`: Generated output; do not hand-edit.

## Build, Test, and Development Commands
- `git submodule update --init --recursive`: Fetch the Congo theme after clone.
- `hugo server -D`: Run local dev server with drafts.
- `hugo --gc --minify`: Production build (mirrors CI behavior).
- `hugo --cleanDestinationDir`: Rebuild `public/` from scratch when validating deploy output.

## Coding Style & Naming Conventions
- Use Markdown with YAML/TOML front matter and keep keys consistent (`title`, `date`, `tags`, `categories`).
- Prefer lowercase, hyphenated content slugs (example: `content/posts/technology/my-new-post.md`).
- Use 2-space indentation in TOML blocks and list values.
- Keep custom CSS in `assets/css/custom.css`; avoid editing generated files under `public/`.

## Testing Guidelines
There is no unit-test suite in this repo. Validation is build-based:
- Run `hugo --gc --minify` before opening a PR.
- Start `hugo server -D` and verify changed pages, menus, and links.
- For template/style changes, include visual checks on desktop and mobile layouts.

## Commit & Pull Request Guidelines
Git history favors short, imperative commit subjects (examples: `Upgrade to Hugo 0.150.0`, `Update congo theme`).
- Commit format: `Verb + scope` (optional), under ~72 chars.
- Keep commits focused (content, config, and theme bumps in separate commits when possible).
- PRs should include: summary of changes, affected paths, local validation steps, and screenshots for UI/layout edits.
- Link related issue(s) when applicable and note any follow-up tasks.
