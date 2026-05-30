# Page Topology — Meet Clone

Two routes:

## Route `/` (or `/landing`) — optional, skip unless time. Not in scope per user.

## Route `/:code` Pre-join (LIGHT theme)  — e.g. `/vdb-mjjc-dsi`
Layout: white page. Two-column centered on desktop; stacked on mobile.
- **Header** (top, full width): logo (left), account chip (right).
- **Left column:** camera preview tile (16:9, r16) with overlays:
  - name label (top-left), 3-dot menu (top-right)
  - bottom cluster: more `•••` (bottom-left, blue), mic + cam circles (center), effects (bottom-right)
  - device selector pills row beneath tile (mic / speaker / camera)
- **Right column:** "Ready to join?" heading, primary button ("Ask to join" / "Join now"), "Other ways to join" outlined dropdown.
- Mobile (<~700px): tile full-width on top, panel stacked below, pills hidden.

Interaction model: mostly static. Live: webcam via getUserMedia in tile; mic/cam toggle buttons flip on/off state (outline↔red fill); join button → navigate to in-call route.

## Route `/:code/call` In-call (DARK theme `#131314`)
Layout: full-viewport dark. Fixed overlays over video stage.
- **TopBar** (fixed top): time | code + info (left); participant chip (right).
- **VideoStage** (fills): grid of ParticipantTile; self-view PiP floats bottom-right; flexes when SidePanel open.
- **ControlBar** (fixed bottom): centered button cluster + right group (chat, activities).
- **SidePanel** (conditional, right): Chat / People / Activities — slides in, stage shrinks.

Interaction model: click-driven (toggle mic/cam, open/close panels, leave). Auto-hide bars on idle (optional). Mock participants data.

## Z-index layers
- stage video: 0
- tile overlays (labels, badges): 1
- self PiP: 5
- side panel: 10
- top/bottom bars: 20
- tooltips/menus: 30
