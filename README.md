# Kinetic-Typo

A short kinetic-typography video **rendered by code** — not edited in a video tool. Built with Remotion 4, React 19, TypeScript, and Tailwind (via `@remotion/tailwind`). The composition animates the words `CREATE`, `ANIMATE`, `INSPIRE` using spring + interpolation-based motion and renders to `out/video.mp4` at 1920×1080 @ 30 fps.

Because it's Remotion, the code looks like React but behaves differently: components are deterministic and frame-driven (no `useState`, no event handlers, no real-time clock), so every frame can be rendered in parallel.

## Quick start

```bash
npm install
npm start         # Remotion Studio — browser preview with scrubber
npm run build     # render the video to out/video.mp4
npm run upgrade   # Remotion upgrade helper
```

Studio runs locally and gives you a live, scrubable preview as you edit `src/KineticTypo.tsx`.

## Project structure

```
src/
  Root.tsx          Registers the <Composition>
  KineticTypo.tsx   The animation component
  index.ts          Remotion entry
public/             Static assets reachable via staticFile("name.ext")
```

For the full routing map and the "Remotion mental model" rules (no state, no random without a seed, frame numbers not seconds), see `CLAUDE.md` at the repo root and `src/CONTEXT.md`. Longer-form notes live in `kinetic-typo.md`.

## Stack

- [Remotion 4](https://www.remotion.dev/) — programmatic video
- React 19 + TypeScript 5
- `@remotion/tailwind` for utility-class styling inside compositions

## Output

Render output is written to `out/video.mp4` (gitignored). Don't commit it.
