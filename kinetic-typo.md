# kinetic-typo

**Location:** `Projects/kinetic-typo/`
**Type:** Remotion video project — renders animated kinetic typography as MP4
**Stack:** Remotion 4 · React 19 · TypeScript · Tailwind (via @remotion/tailwind)

---

## What it is

A **video rendered by code**. Using Remotion, you build your animation as React components — every frame is just React output — and then render it to an MP4. This project animates the words `CREATE`, `ANIMATE`, `INSPIRE` with spring + interpolation-based motion.

## The mental shift (if you're coming from normal React)

Remotion components look like React but are **fundamentally different**:

- **No `useState`** — components must be deterministic. The same frame number must always produce the same output (so rendering can be parallelized).
- **No event handlers / user input** — it's a video, not an interactive app.
- **Animation is frame-driven**, not time-driven. You read the current frame with `useCurrentFrame()` and derive all visual state from it.

## Core Remotion APIs used

- `useCurrentFrame()` — current frame number, starting at 0.
- `useVideoConfig()` — returns `{ fps, width, height, durationInFrames }`.
- `interpolate(frame, [0, 10], [0, 1])` — maps a frame range to a value range. Add `extrapolateRight: "clamp"` to hold the end value.
- `spring({ frame, fps, config: { damping, stiffness } })` — physics-based animation.
- `<AbsoluteFill>` — layers children on top of each other, full-screen.
- `<Sequence from={n}>` — places children starting at frame `n`.

## Layout

```
src/
  Root.tsx        registers <Composition> (width/height/fps/duration)
  KineticTypo.tsx the actual animation component
  index.ts        exports
public/           static assets available via staticFile()
```

Default composition: **1920×1080 @ 30 fps**.

## Commands

```bash
npm start         # opens Remotion Studio (browser preview + scrubber)
npm run build     # renders the video → out/video.mp4
npm run upgrade   # Remotion upgrade helper
```

## Workflow

1. `npm start` — Remotion Studio opens. You can scrub the timeline, tweak props, and see changes live.
2. When it looks right, `npm run build` to render the MP4.

## Adding media

- **Images**: `<Img src={staticFile("cover.jpg")} />` (served from `public/`).
- **Video clips**: `<OffthreadVideo src="..." startFrom={...} endAt={...} />`.
- **Audio**: `<Audio src="..." volume={...} />` — trim with `startFrom` / `endAt`.
- **GIFs**: `<Gif src="..." />` — requires `@remotion/gif`.
