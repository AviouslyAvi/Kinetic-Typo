# src/ — the Remotion composition

## Load

- `Root.tsx` — registers `<Composition>`s. Holds width/height/fps/durationInFrames.
- `KineticTypo.tsx` — the animation component. Reads `useCurrentFrame()` and `useVideoConfig()`, drives the `CREATE → ANIMATE → INSPIRE` motion.
- `index.ts` — barrel export consumed by Remotion's entry.

## Skip

`node_modules/`, `out/`, `public/` (only reference via `staticFile()`).

## Core APIs

- `useCurrentFrame()` — current frame, starting at 0.
- `useVideoConfig()` → `{ fps, width, height, durationInFrames }`.
- `interpolate(frame, [in0, in1], [out0, out1], { extrapolateRight: "clamp" })` — frame range → value range.
- `spring({ frame, fps, config: { damping, stiffness } })` — physics-based animation.
- `<AbsoluteFill>` — full-screen layered children.
- `<Sequence from={n}>` — places children at frame `n`.
- `<Series>` / `<TransitionSeries>` — sequential layout, with `springTiming()` / `linearTiming()`.

## Adding media

- Images: `<Img src={staticFile("cover.jpg")} />`
- Video: `<OffthreadVideo src="..." startFrom={...} endAt={...} volume={...} />`
- Audio: `<Audio src="..." volume={...} startFrom={...} endAt={...} />`
- GIFs: `<Gif src="..." />` — requires `@remotion/gif`.

Files in `public/` are served as static assets — reference them with `staticFile("filename")`.

## Pipeline

1. `npm start` opens Remotion Studio — scrub timeline, tweak props, see changes live.
2. When it looks right, `npm run build` renders the MP4 to `out/video.mp4`.

## Rules

- Determinism only. No `useState`, no `Date.now()`, no unseeded random.
- Frame-driven everything. If you reach for a setTimeout, you're in the wrong tool.

## Skills/MCP

None required.
