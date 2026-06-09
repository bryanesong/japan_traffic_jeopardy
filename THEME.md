# Japan Traffic Jeopardy — Theme & Asset Guide

Visual direction for the **Japan Traffic Jeopardy** trivia game: classic Jeopardy game-show energy
(deep electric blue + gold) crossed with Japanese travel motifs (torii vermilion, Mt. Fuji, rising sun,
seigaiha waves) and a motorcycle-trip theme.

All assets in `public/` are **original, hand-authored SVG** — no copyrighted logos or trademarked marks.
They are self-contained, use a `viewBox`, and scale cleanly from favicon to hero sizes.

---

## Color Palette

| Role | Name | Hex | Notes |
|------|------|-----|-------|
| Primary | Jeopardy Blue | `#060CE9` | The signature board blue. Matches `jeopardy.blue` in `tailwind.config.ts`. |
| Primary (deep) | Blue Dark | `#0B0F5A` | Backgrounds, gradients, deep shadow. Matches `jeopardy.dark`. |
| Primary (board) | Board Blue | `#0A0E8C` | Clue-tile fill / board cells. Matches `jeopardy.board`. |
| Gradient top | Blue Bright | `#0A12C8` | Top stop of blue badge gradients. |
| Accent | Jeopardy Gold | `#E8B923` | Dollar-value gold; primary accent. Matches `jeopardy.value`. |
| Accent (deep) | Gold Deep | `#D4A017` | Lower gold gradient stop / borders. Matches `jeopardy.gold`. |
| Accent (light) | Gold Light | `#FFE08A` | Top highlight of gold gradients / shine. |
| Japan accent | Torii Vermilion | `#E03A2F` | Shrine-gate red — the distinctive Japan accent. Use sparingly. |
| Mountain | Fuji Indigo | `#1B2A78` | Mt. Fuji body, mid-tone fills. |
| Neutral | Snow White | `#FFFFFF` | Text on blue, snow caps, sign text. |
| Sign red | Signal Red | `#D7282F` | Official-style road-sign red (stop sign interior). |

**Suggested usage:** Blue for surfaces, gold for headings/borders/values, white for body text on blue,
vermilion as a small high-impact accent (active state, logo torii, "host" highlights). Keep vermilion and
gold from competing — pick one as the dominant accent per screen.

---

## Recommended Fonts

The actual Jeopardy! board uses **Swiss 911** (not free); the closest free, web-loadable substitutes are
condensed/heavy sans-serifs from Google Fonts. Pair a bold display face with a Japanese-capable face.

| Use | Font | License | Import |
|-----|------|---------|--------|
| Logo / big numbers / headings | **Anton** | SIL OFL (free) | `https://fonts.google.com/specimen/Anton` |
| Board tiles / values (condensed) | **Oswald** | SIL OFL (free) | `https://fonts.google.com/specimen/Oswald` |
| Heavy alt display | **Archivo Black** | SIL OFL (free) | `https://fonts.google.com/specimen/Archivo+Black` |
| Clue-card serif (optional) | **Libre Baskerville** | SIL OFL (free) | `https://fonts.google.com/specimen/Libre+Baskerville` |
| Japanese text (kanji/kana) | **Noto Sans JP** | SIL OFL (free) | `https://fonts.google.com/noto/specimen/Noto+Sans+JP` |

Example CSS `@import` (developer can add to global styles — not added by the art role):

```css
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;600;700&family=Noto+Sans+JP:wght@400;700&display=swap');
```

The SVGs reference `Anton`/`Archivo Black` (display) and `Noto Sans JP` (the stop sign kanji) with
system fallbacks, so they degrade gracefully if the fonts are not loaded.

---

## Assets Created (`public/`)

| File | Use |
|------|-----|
| `logo.svg` | Primary game logo / wordmark — blue show-card badge with rising-sun + Fuji + torii emblem, a gold motorcycle, and "JAPAN TRAFFIC / JEOPARDY" wordmark. Headers, splash, title bar. |
| `motorcycle.svg` | Clean motorcycle silhouette icon (indigo with gold accents). Category icon, list bullets, loading state. |
| `torii.svg` | Vermilion torii-gate icon on transparent ground. Category/section marker, decorative accent. |
| `fuji.svg` | Stylized Mt. Fuji with rising sun on a blue gradient sky. Backgrounds, section headers, scene art. |
| `road-sign-stop.svg` | Japanese 止まれ (tomare / stop) inverted-triangle sign. Traffic-rule categories, "wrong answer" cue. |
| `helmet.svg` | Full-face motorcycle helmet with gold trim and rising-sun emblem. Player avatar, score chip, safety category. |
| `favicon.svg` | Compact rounded-square favicon: gold torii + rising sun on Jeopardy blue. Browser tab / PWA icon. |
| `bg-pattern.svg` | Seamless seigaiha (wave) pattern in indigo on deep blue. Tileable page/board background texture. |
| `og-image.svg` | 1200x630 social-share / Open Graph image with full branding. Link previews, share cards. |

All use the palette above. The logo and og-image share the same emblem construction for consistency.

---

## Optional External Resources (FREE / open-licensed — recommended, NOT downloaded)

The developer may optionally add these later. Verify the license on each file's page before use.

### Official Japanese road signs (public domain)
Japanese government works cannot assert copyright, so these Wikimedia SVGs are public domain — ideal for
authentic road-rule categories.

- **Category: SVG road signs in Japan** — full set of official sign SVGs.
  `https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Japan` — License: Public Domain.
- **File: Japan road sign 330-A.svg** (止まれ / Stop) — official stop sign.
  `https://commons.wikimedia.org/wiki/Category:Road_signs_in_Japan` (browse to 330-A) — Public Domain.
- **File: Japan road sign 208.svg / 209.svg / 407-A.svg** — assorted regulatory/warning signs.
  `https://commons.wikimedia.org/wiki/File:Japan_road_sign_208.svg` — Public Domain.
- **Wikipedia: Road signs in Japan** — reference overview with embedded SVGs and meanings.
  `https://en.wikipedia.org/wiki/Road_signs_in_Japan` — text CC BY-SA; sign SVGs Public Domain.

### Fonts (SIL Open Font License — free for web & bundling)
- **Anton** — `https://fonts.google.com/specimen/Anton`
- **Oswald** — `https://fonts.google.com/specimen/Oswald`
- **Archivo Black** — `https://fonts.google.com/specimen/Archivo+Black`
- **Noto Sans JP** — `https://fonts.google.com/noto/specimen/Noto+Sans+JP`
- **Libre Baskerville** (optional clue-card serif) — `https://fonts.google.com/specimen/Libre+Baskerville`

### Background textures (CC0 / public domain)
For an optional photographic asphalt look instead of the SVG seigaiha pattern:
- **ambientCG — Road001 / asphalt materials** — `https://ambientcg.com/view?id=Road001` — License: CC0.
- **OpenGameArt — Asphalt Road Texture (free)** — `https://opengameart.org/content/asphalt-road-texture-free` — License: CC0 / Public Domain (check page).
- **rawpixel — asphalt road CC0 backgrounds** — `https://www.rawpixel.com/search/asphalt%20road%20texture%20background%20cc0` — License: CC0.

> Note: Avoid the actual "Jeopardy!" logo font (Gyparody) and any official Jeopardy! trademarks/logos in a
> public build — the assets here are deliberately original and trademark-safe.

---

## Sources
- Road signs in Japan (Wikipedia): https://en.wikipedia.org/wiki/Road_signs_in_Japan
- Category: SVG road signs in Japan (Wikimedia Commons): https://commons.wikimedia.org/wiki/Category:SVG_road_signs_in_Japan
- Game show / Jeopardy typography: https://www.designyourway.net/blog/what-font-does-jeopardy-use/ and https://fontsinuse.com/uses/5507/jeopardy-game-show
- Noto Sans JP (Google Fonts): https://fonts.google.com/noto/specimen/Noto+Sans+JP
- ambientCG free CC0 textures: https://ambientcg.com/view?id=Road001
- OpenGameArt asphalt texture: https://opengameart.org/content/asphalt-road-texture-free
