# meet-clone

Pixel-perfect clone of the Google Meet web app (pre-join + in-call screens).

## Stack
- **Framework:** TanStack Start (React 19, Vite, Nitro SSR) — file-based routing in `src/routes/`
- **Styling:** Tailwind CSS v4 (CSS-first config in `src/styles.css`, no `tailwind.config.js`)
- **Components:** shadcn/ui (radix base) in `src/components/ui/` — `components.json` configured, alias `@/*` → `src/*`
- **Icons:** Iconify via `@iconify/tailwind4` plugin. Use `class="icon-[material-symbols--mic]"` or `icon-[mdi--...]`. Enabled prefixes: `mdi`, `material-symbols` (in `styles.css` `@plugin` block — add a prefix there + install its `@iconify-json/<set>` before using).
- **Fonts:** Google Sans Flex (display/headings/buttons via `font-display` / `--font-display`), Roboto (body). Loaded from Google Fonts in `styles.css`.
- **Package manager:** bun

## Commands
- `bun run dev` — dev server on http://localhost:3000
- `bun run build` — production build (Nitro)
- `bunx tsc --noEmit` — typecheck

## Design tokens
Extracted live from meet.google.com via getComputedStyle. Documented in `docs/research/GLOBAL_TOKENS.md` (light/pre-join) and `docs/research/IN_CALL_TOKENS.md` (dark/in-call). Tokens live in `src/styles.css`:
- Light (pre-join): blue `#0b57d0`, text `rgba(0,0,0,.87)`, outline `#747775`.
- Dark (in-call): stage `#131314`, panel `#1e1f20`, surface-2 `#282a2c`, button `#333537`, on-dark `#e3e3e3`, muted `#8e918f`, red `#dc362e`. Applied via `.dark` class on the in-call wrapper.
- Meet utilities exposed as Tailwind colors: `bg-gm-stage`, `text-gm-on-dark`, `bg-gm-btn`, etc.

## Routes / structure
- `/` → `PreJoinScreen` (light): `meet-logo`, `account-chip`, `camera-preview` (live webcam via `use-media-stream`), `device-selectors`, `join-panel`.
- `/call` → `InCallScreen` (dark): `call/top-bar`, `call/video-stage` (spotlight + self-PiP), `call/control-bar` (`bar-button`, `split-control`), `call/side-panel` (chat).
- Mock data in `src/data/mock.ts`, types in `src/types/meeting.ts`.

## Notes
- Webcam uses `getUserMedia` (client-only, guarded for SSR in `use-media-stream.ts`); self-view is mirrored (`.video-mirror`). Falls back to an initial-avatar tile when camera is off/denied.
- Meet logo is recreated as inline SVG in `meet-logo.tsx`; avatars use shadcn `Avatar` initials (no external image assets needed).
