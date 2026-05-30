# Google Meet — Global Design Tokens

Extracted via getComputedStyle on https://meet.google.com (pre-join screen), 2026-05-30.

## Fonts
- **Display / headings / buttons / labels:** `"Google Sans", Roboto, Arial, sans-serif`
  - Map to **Google Sans Flex** (public Google Fonts equivalent) per user instruction.
- **Body / secondary text:** `Roboto, RobotoDraft, Helvetica, Arial, sans-serif`
- Root font-size: 16px. Body font-size: 14.4px (0.9rem), color `rgba(0,0,0,0.87)`.

## Color tokens
| Token | Value | Usage |
|---|---|---|
| `--gm-blue` | `rgb(11,87,208)` `#0B57D0` | primary button bg, link/secondary text |
| `--gm-on-primary` | `#FFFFFF` | text on blue button |
| `--gm-text` | `rgba(0,0,0,0.87)` | primary text, headings |
| `--gm-text-secondary` | `#5F6368` (approx) | secondary labels |
| `--gm-outline` | `rgb(116,119,117)` `#747775` | button outlines |
| `--gm-surface` | `#FFFFFF` | page background |
| `--gm-on-dark` | `#FFFFFF` | text/icons on video tile |
| `--gm-tile-bg` | `#202124` / dark | video tile fallback bg |
| `--gm-mic-off` / red | `#EA4335` (Google red) | mic/cam OFF state fill |

## Component primitives (pre-join)
### Heading "Ready to join?"
- font: Google Sans, 28px, weight 400, line-height 36px, color rgba(0,0,0,.87), text-align center

### Primary button ("Ask to join" / "Join now")
- bg `#0B57D0`, label Google Sans 14px/500 white
- border-radius 28px, height 56px, min-width 240px, padding 0 24px, no border, no shadow
- hover: slight elevation/overlay (Material state layer)

### Outlined button ("Other ways to join")
- bg transparent, border 1px solid `#747775`, border-radius 20px, height 40px, padding 0 16px 0 24px
- label Google Sans 14px/500, color `#0B57D0`; trailing dropdown chevron

### Camera preview tile
- border-radius 16px, aspect 16:9 (740×416 at desktop), overflow hidden, position relative
- contains: video (object-fit cover, mirrored via transform), name label top-left, 3-dot menu top-right, control cluster bottom-center, effects button bottom-right, more(•••) bottom-left

### Name label (on tile)
- Google Sans 14px/500, white, letter-spacing 0.25px

### Circular control buttons (mic / cam / effects)
- 56×56, border-radius 50%, transparent bg, 1px solid white border, white icon (ACTIVE/on state)
- OFF state: filled Google red `#EA4335`, white icon, no border
- spacing ~24px gap between mic & cam

### Device selector pills (mic / speaker / camera)
- height ~40px, rounded (~40px radius / pill), subtle border, label Google Sans 14px, leading device icon + trailing chevron
- row centered under tile, ~gap 8-12px

### Account chip (top-right)
- email text small grey + "Switch account" link + avatar circle

### Logo (top-left)
- Google Meet camera glyph (multicolor) + "Google Meet" wordmark, Product Sans style, dark grey text
