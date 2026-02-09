export type ToneProps = { on?: boolean }
export type BurstProps = { on?: boolean; burst?: number; gap?: number }

export type ToneInstance = {
  type: "Tone"
  props: ToneProps
  timers: NodeJS.Timeout[]
}

export type BurstInstance = {
  type: "Burst"
  props: BurstProps
  timers: NodeJS.Timeout[]
}

export type SoundInstance = ToneInstance | BurstInstance

export type TextInstance = {
  type: "TEXT"
  text: string
}

export type AnyInstance = SoundInstance | TextInstance
