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

type ToneProps = { active?: "on" | "off" }
type BurstProps = { active?: "on" | "off"; count?: number; gap?: number }

function Tone({ active = "off" }: ToneProps) {
  return React.createElement("Tone", { active })
}

function Burst({ active = "off", count, gap }: BurstProps) {
  return React.createElement("Burst", { active, burst: count, gap })
}

export { render, Tone, Burst }
