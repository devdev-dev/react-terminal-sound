import React from "react"
import reconciler from "./reconciler"

const container = { type: "ROOT", children: [] }
const root = reconciler.createContainer(
  container,
  0,
  null,
  false,
  null,
  "",
  (error) => {
    throw error
  },
  null
)

function render(element: any) {
  reconciler.updateContainer(element, root, null, null)
}

type ToneProps = { on?: boolean }
type BurstProps = { on?: boolean; count?: number; gap?: number }

function Tone({ on = false }: ToneProps) {
  return React.createElement("Tone", { on })
}

function Burst({ on = false, count, gap }: BurstProps) {
  return React.createElement("Burst", { on, burst: count, gap })
}

export { render, Tone, Burst }
