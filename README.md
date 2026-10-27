# Max Longman — UGC portfolio site

A one-page static site, modelled on the layout of zacksammons.com. No build step: open `index.html`.

| File | What it is |
| --- | --- |
| `site.config.js` | **Edit this.** Name, email, socials, videos, optional stats and rate |
| `index.html` | Page structure and copy |
| `styles.css` | Look and feel. `--accent` at the top recolours the whole site |
| `script.js` | Fills the page from the config, the video strip, the form |
| `assets/videos/` | Put your 9:16 `.mp4` files here |
| `assets/img/` | Favicon, video posters, headshot |

## Adding a video

1. Copy the file into `assets/videos/`, e.g. `assets/videos/protein.mp4`. Keep it under ~8 MB (720×1280 is plenty).
2. In `site.config.js`, set `src: "assets/videos/protein.mp4"` on a card and change its `label` to the brand.
3. Put your best one in `heroVideo` too.

Cards with an empty `src` show a placeholder.

## Sections

1. **Hero:** headline, two buttons, phone mockup playing your hero video.
2. **About:** why native-feeling UGC works, plus what you offer. Stats only appear once you add real ones.
3. **Work:** lime band, "Built to stop the SCROLL / THUMB / SKIP", auto-scrolling strip of videos with a Pause button.
4. **Contact:** form that opens the visitor's email app addressed to you, plus your email shown directly.

## Not done yet (on purpose)

- Not published anywhere. Hosting (GitHub Pages or Netlify) and a domain come after your revisions.
- No real videos, socials, stats or brand names yet; nothing was invented to fill them.
