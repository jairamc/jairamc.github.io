# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Site

Personal website/blog for Jairam Chandar, available at [jairam.dev](https://jairam.dev). Built with [Hugo](https://gohugo.io/) using the [Blowfish theme](https://blowfish.page/) (via git submodule at `themes/blowfish`).

## Commands

```bash
# Serve locally with live reload
hugo server

# Serve including draft posts
hugo server -D

# Build for production
hugo --gc --minify

# Create a new post
hugo new content/posts/<category>/<slug>.md
```

The Blowfish theme submodule must be initialized before running Hugo:
```bash
git submodule update --init --recursive
```

## Architecture

- **`config/_default/`** — Hugo configuration split across multiple TOML files:
  - `hugo.toml` — base URL, theme, pagination, taxonomy settings
  - `params.toml` — Blowfish theme options (appearance, layout, article, homepage settings)
  - `menus.en.toml` — navigation menu items (main and footer)
  - `languages.en.toml` — language/author metadata, social links
  - `markup.toml` — Markdown rendering settings
- **`content/`** — Markdown content organized by section:
  - `posts/` — Current blog posts (appears in homepage recent posts, categories, and tags)
  - `archive/` — Pre-2018 posts, moved here to separate from current writing. Taxonomies (categories/tags) have been stripped so they don't appear in taxonomy pages
  - `about/` — Narrative about page with link to downloadable CV PDF
- **`layouts/`** — Hugo template overrides on top of the Blowfish theme:
  - `partials/comments.html` — Custom comments partial
  - `shortcodes/columns.html` — Multi-column layout shortcode
- **`assets/`** — Theme asset overrides:
  - `css/custom.css` — Site-specific CSS overrides
  - `js/email.js` — Override of Blowfish's email link handler (custom subject line)
  - `img/hero.svg` — Network topology SVG used as homepage and article background
  - `img/author.png` — Author profile image
- **`static/`** — Static files copied as-is to `public/`:
  - `cv.pdf` — Downloadable CV, generated from `~/workspace/personal/cv.md` using `/md2pdf` skill
  - Favicons, manifests, etc.
- **`public/`** — Hugo build output (do not edit directly)

## Deployment

Pushes to `master` automatically trigger the GitHub Actions workflow (`.github/workflows/hugo.yml`), which builds with Hugo 0.150.0 (extended) and deploys to GitHub Pages.

## Content Authoring

Posts use standard Hugo front matter. The Blowfish theme supports:
- `draft: true` to hide from production
- `showComments: false` to disable comments on a page
- Categories and tags via front matter taxonomies
- `description` in front matter for SEO meta descriptions

Two post structures exist:
- **Simple posts**: a single `.md` file at `content/posts/<category>/<slug>.md`
- **Page bundles**: a directory at `content/posts/<category>/<slug>/index.md` with images alongside — use this when the post includes images

Cross-posted articles use `canonicalUrl` in front matter to point to the original source.

## Theme Configuration

- **Homepage**: `background` layout with custom SVG hero image, recent posts in card view
- **Colour scheme**: `slate` with dark mode default, auto-switch enabled
- **Articles**: background hero style using `defaultBackgroundImage`, no per-article author display (single-author blog)
- **Social links**: GitHub, LinkedIn, Mastodon, Keybase, email (contact@jairam.dev)

## Key Files Outside This Repo

- **`~/obsidian/Notes/04 Craft/cv.md`** — Maintainable markdown CV. Use `/md2pdf` skill to regenerate `static/cv.pdf`
- **`~/Downloads/jairam-brand-context.md`** — Brand voice, content pillars, and blog post drafts

## Notes

- The `public/` directory is gitignored and regenerated on every build
- Archive posts have no categories or tags — this is intentional to keep taxonomy pages clean
- The `mainSections` param in `languages.en.toml` is set to `["posts"]` so only current posts appear on the homepage
