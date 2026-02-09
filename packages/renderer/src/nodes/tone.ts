import { beep } from "../audio"
import type { ToneInstance } from "../types"

function commitToneUpdate(instance: ToneInstance) {
  if (instance.props.on) beep()
}

function commitToneMount(instance: ToneInstance) {
  if (instance.props.on) beep()
}

export { commitToneUpdate, commitToneMount }
