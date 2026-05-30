# Google Meet — In-Call (Dark Theme) Tokens & Components

Extracted live from an active call, 2026-05-30.

## Dark theme color tokens
| Token | Value | Usage |
|---|---|---|
| `--gm-stage` | `rgb(19,19,20)` `#131314` | in-call page/stage background |
| `--gm-surface-1` | `rgb(30,31,32)` `#1E1F20` | side panel surface |
| `--gm-surface-2` | `rgb(40,42,44)` `#282A2C` | combo/settings buttons, info cards |
| `--gm-btn` | `rgb(51,53,55)` `#333537` | default control-bar button bg |
| `--gm-on-dark` | `rgb(227,227,227)` `#E3E3E3` | icons/text on dark |
| `--gm-on-dark-muted` | `rgb(142,145,143)` `#8E918F` | inactive icon / secondary text |
| `--gm-danger` | `rgb(220,54,46)` `#DC362E` | hangup/leave button |
| `--gm-tile-camoff` | per-user pastel, e.g. `#C4B3DC` | camera-off tile bg (generate per name) |
| `--gm-scrim` | `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.1) 70%,transparent)` | name-label scrim over tiles |

## Layout (desktop)
Full-viewport dark stage `#131314`. Three regions:
1. **Top bar** (h ~64, transparent over stage)
2. **Video stage** (fills middle; flexes when a side panel opens)
3. **Bottom control bar** (centered cluster + right-aligned chat/activities)

### Top bar
- Left: `11:25 AM` `|` `vdb-mjjc-dsi` + info (i) icon. Code text = Google Sans 16/500 white. Divider `|` muted.
- Right: participant count chip (rounded pill, avatar + count "2"). Also host-controls shield icon when present.

### Video tiles
- border-radius **24px**, overflow hidden, `object-fit: cover`, self-view mirrored (`transform: scaleX(-1)`).
- **Camera-off state:** solid pastel bg (per-user color) + centered circular avatar **96px** + name label bottom-left.
- **Name label:** Google Sans 16/500 white, bottom-left ~16px inset, over bottom scrim gradient.
- **Mic-muted badge:** small filled circle top-right with muted-mic glyph (blue/dark `#3c4043`/accent).
- 1 participant => single full tile. 2 => one big remote tile + **self-view PiP** floating bottom-right.
- Self-view PiP: rounded (~12px), ~234×132, subtle shadow; reflows above bar / left of open panel.
- N participants => responsive grid (gap ~8px, equal cells, br24).

### Bottom control bar (left→right, centered group)
Pill/circle buttons, **h48, radius 24**, bg `#333537`, icon `#E3E3E3`, gap ~8px:
1. `•••` more/host (52)
2. **Mic** split-button: settings/chevron part (bg `#282A2C`, w~40, inactive icon `#8E918F`) + toggle (48). Combined ~88.
3. **Camera** split-button (same pattern, ~88)
4. Share screen / present (56)
5. Send a reaction (emoji) (56)
6. Turn on captions (CC) (56)
7. Raise hand (56)
8. `⋮` More options (56)
9. **Leave call** — bg `#DC362E`, white icon, **72×48 radius 24** (wider pill)
- **OFF states** (mic/cam off): button bg becomes `#DC362E` (red-ish `#5c1414`/filled), icon white.

Right-aligned (separate group, far right): **Chat** + **Activities (3×3 grid)** — 48×48, **transparent bg**, icon white, radius 24.

### Side panel (Chat / People / Activities)
- Surface `#1E1F20`, floating card radius **16px**, width **~360px**, top/right/bottom margin ~12-16px, height = stage minus margins.
- Header: title (e.g. "In-call messages") Google Sans **18/400** color `#E3E3E3`, with close `×` (right).
- Info/banner card: bg `#282A2C`, radius **8px**, padding **12px**, centered icon + title + body.
- Message input (bottom): rounded container, placeholder "Send a message" Google Sans 14 `#E3E3E3`, trailing send (paper-plane) icon button.

## Waiting room (bonus state)
- Dark stage, centered illustration (person + dog + cat), text "Please wait until a meeting host brings you into the call" (Google Sans, blue-grey), self PiP bottom-right, simplified bottom bar (more, mic, cam-combo, more-opts, red hangup).

## Behaviors
- Control bar + top bar auto-hide after idle, reappear on mouse move (fade ~0.3s). (Implement optional.)
- Hover on control buttons: lighter state-layer overlay; tooltip after delay.
- Opening a side panel animates stage width shrink; tiles reflow.
- Self PiP draggable (optional — skip for clone, keep fixed bottom-right).
