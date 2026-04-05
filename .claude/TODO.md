# Blog Improvement Plan

## Visual / Content
- [ ] Publish the tech debt blog post (full draft in ~/Downloads/jairam-brand-context.md)
- [ ] Update author photo (img/author.png)
- [x] ~~Update favicons in static/~~ — JC monogram favicon generated from SVG
- [x] ~~Consider hiding Categories and Tags from nav~~ — commented out in menus.en.toml
- [ ] Custom 404 page (Blowfish supports this)

## Analytics
- [ ] Set up Fathom or Plausible analytics (Blowfish has built-in support, just needs site ID in params.toml)

## SEO
- [ ] Register site with Google Search Console
- [ ] Add verification token to params.toml [verification] section
- [ ] Submit sitemap (verify jairam.dev/sitemap.xml generates correctly)
- [ ] Add meta descriptions to existing posts (front matter `description` field)
- [ ] Add Open Graph images for social sharing

## Cleanup
- [ ] Add Hugo aliases to archive posts to redirect old /posts/... URLs
- [ ] Verify RSS feed only includes posts/, not archive/
- [ ] Configure a comments provider (showComments is enabled but no provider set)
- [ ] Merge blowfish-migration branch to master when ready
