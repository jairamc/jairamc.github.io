# Blog Improvement Plan

## Visual / Content
- [ ] Publish the tech debt blog post (draft in content/posts/drafts/)
- [ ] Update author photo (img/author.png)
- [x] ~~Update favicons in static/~~ — JC monogram favicon generated from SVG
- [x] ~~Consider hiding Categories and Tags from nav~~ — commented out in menus.en.toml
- [x] ~~Custom 404 page~~ — network topology illustration with dry humour

## Analytics
- [x] ~~Set up analytics~~ — Umami Cloud (cookie-free, no consent banner needed)

## SEO
- [x] ~~Register site with Google Search Console~~ — verified via DNS TXT record
- [x] ~~Submit sitemap~~ — submit https://jairam.dev/sitemap.xml in Search Console
- [x] ~~Add meta descriptions to existing posts~~ — descriptions added to both published posts
- [ ] Add Open Graph images for social sharing

## Cleanup
- [x] ~~Add Hugo aliases to archive posts~~ — all 14 posts have aliases
- [x] ~~Verify RSS feed only includes posts/, not archive/~~ — archive excluded via build.list: local
- [ ] Configure a comments provider (showComments is enabled but no provider set)
