import { beep } from "../audio"
import type { BurstInstance } from "../types"

function commitBurstUpdate(instance: BurstInstance) {
  clearTimers(instance)
  if (instance.props.on) scheduleBurst(instance)
}

function commitBurstMount(instance: BurstInstance) {
  if (instance.props.on) scheduleBurst(instance)
}

function clearTimers(instance: BurstInstance) {
  for (const id of instance.timers) clearTimeout(id)
  instance.timers = []
}

function scheduleBurst(instance: BurstInstance) {
  const count = Math.max(1, Number(instance.props.burst ?? 1))
  const gap = Math.max(20, Number(instance.props.gap ?? 60))
  beep()
  for (let i = 1; i < count; i += 1) {
    const id = setTimeout(() => beep(), i * gap)
    instance.timers.push(id)
  }
}

export { commitBurstUpdate, commitBurstMount, clearTimers }
