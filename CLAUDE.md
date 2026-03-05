# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Site

Personal website/blog for Jairam Chandar, available at [jairam.dev](https://jairam.dev). Built with [Hugo](https://gohugo.io/) using the [Congo theme](https://jpanther.github.io/congo/) (via git submodule at `themes/congo`).

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

The Congo theme submodule must be initialized before running Hugo:
```bash
git submodule update --init --recursive
```

## Architecture

- **`config/_default/`** — Hugo configuration split across multiple TOML files:
  - `hugo.toml` — base URL, theme, pagination settings
  - `params.toml` — Congo theme options (appearance, layout, article settings)
  - `menus.en.toml` — navigation menu items
  - `languages.en.toml` — language/author metadata
  - `markup.toml` — Markdown rendering settings
- **`content/`** — Markdown content organized by section:
  - `posts/` — Blog posts grouped by category (e.g., `technology/`, `music/`)
  - `about/` — Single page (serves as CV/resume)
- **`layouts/`** — Hugo template overrides on top of the Congo theme:
  - `partials/comments.html` — Custom comments partial
  - `shortcodes/columns.html` — Multi-column layout shortcode
- **`assets/css/custom.css`** — Site-specific CSS overrides
- **`static/`** — Static files copied as-is to `public/` (favicons, manifests, etc.)
- **`public/`** — Hugo build output (do not edit directly)

## Deployment

Pushes to `master` automatically trigger the GitHub Actions workflow (`.github/workflows/hugo.yml`), which builds with Hugo 0.150.0 (extended) and deploys to GitHub Pages.

## Content Authoring

Posts use standard Hugo front matter. The Congo theme supports:
- `draft: true` to hide from production
- `showComments: false` to disable comments on a page
- Categories and tags via front matter taxonomies

The `{{% columns %}}` shortcode (defined in `layouts/shortcodes/columns.html`) creates multi-column layouts using `<--->` as a column separator.
