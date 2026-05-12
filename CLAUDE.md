# CLAUDE.md - Remotion Video Application Guide

## Core Concepts

**Project Structure**: Applications use a Root component defining `<Composition>` elements with properties like `durationInFrames`, `width` (1920), `height` (1080), and `fps` (30).

**Frame-Based Animation**: Components access current frame numbers via `useCurrentFrame()` hook, enabling deterministic animations where frame numbers start at 0.

## Media Elements

- **OffthreadVideo**: For video content with `startFrom`, `endAt`, and `volume` props
- **Img**: For static images
- **Gif**: For animated GIFs (requires @remotion/gif package)
- **Audio**: For sound with trimming and volume control

Assets come from remote URLs or the `public/` folder using `staticFile()`.

## Layout & Timing

- **AbsoluteFill**: Layers elements on top of each other
- **Sequence**: Places elements at specific frame numbers
- **Series**: Displays multiple elements sequentially
- **TransitionSeries**: Adds transitions between sequences using timing functions like `springTiming()` and `linearTiming()`

## Animation Helpers

- **interpolate()**: Maps frame ranges to value ranges
- **spring()**: Provides physics-based animations with configurable damping
- **random()**: Generates deterministic randomness using static seeds

## Critical Difference: Remotion vs. Interactive React

Remotion components are fundamentally different from standard React:
- Cannot use `useState` for interactivity
- Must be deterministic and frame-driven
- No event handlers or user input
- All animations based on frame numbers
