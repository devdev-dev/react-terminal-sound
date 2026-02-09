import type { SoundInstance, ToneProps, BurstProps, TextInstance } from "../types"

function createSoundInstance(type: "Tone", props: ToneProps): SoundInstance
function createSoundInstance(type: "Burst", props: BurstProps): SoundInstance
function createSoundInstance(type: "Tone" | "Burst", props: ToneProps | BurstProps): SoundInstance {
  return { type, props, timers: [] }
}

function createTextInstance(text: string): TextInstance {
  return { type: "TEXT", text }
}

export { createSoundInstance, createTextInstance }
