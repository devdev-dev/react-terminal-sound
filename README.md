# react-terminal-sound

A custom React renderer that plays sound in the terminal using the ASCII bell (`\x07`). It demonstrates how React’s reconciler can target non-visual outputs.

## What’s Inside

- **Renderer package** (`packages/renderer`)
  - Host components: `Tone` (single beep) and `Burst` (multiple beeps)
  - Custom reconciler wired through `react-reconciler`
- **Example app** (`packages/example`)
  - Weather-driven sound (`interactivity/weather/WeatherSound.tsx`)
  - Interactive burst input (`interactivity/BurstFromInput.tsx`)
  - A simple rhythm pattern (`music/WeWillRockYou.tsx`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the example app:
   ```bash
   npm run start
   ```

3. Run in watch mode:
   ```bash
   npm run dev
   ```

## How It Works

The renderer exposes a small host API:

- `Tone` writes a single bell to `stdout` when `on` is true.
- `Burst` schedules multiple bells with `count` and `gap`.

The example app is standard React. It renders host elements, and the renderer’s host config translates those into terminal sound.

## Notes

- The renderer only recognizes `"Tone"` and `"Burst"` host types.
- The example app uses Node’s `readline` for terminal input.
