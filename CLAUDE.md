# Kinetic-Typo — router (Layer 1)

A **video rendered by code**: Remotion 4 + React 19 + TypeScript + Tailwind (via `@remotion/tailwind`). Animates the words `CREATE`, `ANIMATE`, `INSPIRE` with spring + interpolation-based motion. Renders to `out/video.mp4` at 1920×1080 @ 30 fps.

## The mental shift

Remotion components look like React but are **fundamentally different**:
- No `useState` — components must be deterministic so frames can render in parallel.
- No event handlers, no user input — it's a video, not an app.
- Animation is **frame-driven**, not time-driven. Read the current frame with `useCurrentFrame()` and derive all visuals from it.

## Floor plan

| Folder      | What lives there                                      | Room file              |
| ----------- | ----------------------------------------------------- | ---------------------- |
| `src/`      | The Remotion composition (Root) + animation component | `src/CONTEXT.md`       |
| `public/`   | Static assets reachable via `staticFile("name.ext")`  | —                      |

Root-level: `kinetic-typo.md` (longer-form notes), `package.json`, `tsconfig.json`.

## Routing table

| Task                                          | Read                                                  | Skip                   |
| --------------------------------------------- | ----------------------------------------------------- | ---------------------- |
| Edit the animation                            | `src/CONTEXT.md`, `src/KineticTypo.tsx`               | `node_modules/`, `out/`|
| Add a new `<Composition>` / change duration   | `src/CONTEXT.md`, `src/Root.tsx`                      | `out/`                 |
| Add static media (img/audio/gif/video)        | `src/CONTEXT.md`, `public/`                           | `out/`                 |
| Background context / longer reference         | `kinetic-typo.md`                                     | —                      |

## Naming conventions

- One composition per file under `src/`. Export the default React component, register it in `Root.tsx` via `<Composition id="..." component={...} />`.
- Frame numbers, not seconds. Treat `fps` as a knob you read from `useVideoConfig()`, never hard-code.

## Commands

```bash
npm start         # Remotion Studio (browser preview + scrubber)
npm run build     # render → out/video.mp4
npm run upgrade   # Remotion upgrade helper
```

## Hard rules

- No `useState`, no event handlers, no `Date.now()`, no `Math.random()` without a seed.
- All randomness via Remotion's `random("seed")` so frames stay reproducible.
- Don't commit `out/`.
