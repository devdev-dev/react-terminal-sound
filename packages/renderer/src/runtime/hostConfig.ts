import { createSoundInstance, createTextInstance } from "./instances"
import { commitToneMount, commitToneUpdate } from "../nodes/tone"
import { commitBurstMount, commitBurstUpdate, clearTimers } from "../nodes/burst"
import { appendChild, clearChildren, insertBefore, removeChild } from "./tree"

const NO_CONTEXT = {}

const hostConfig = {
  now: Date.now,
  getRootHostContext() {
    return NO_CONTEXT
  },
  getChildHostContext() {
    return NO_CONTEXT
  },
  getPublicInstance(instance) {
    return instance
  },
  prepareForCommit() {},
  resetAfterCommit() {},
  detachDeletedInstance(instance) {
    if (instance.type === "Burst") clearTimers(instance)
  },
  createInstance(type, props) {
    if (type !== "Tone" && type !== "Burst") {
      throw new Error("Unknown host component")
    }
    return createSoundInstance(type, props)
  },
  appendInitialChild: appendChild,
  finalizeInitialChildren() {
    return true
  },
  prepareUpdate() {
    return true
  },
  shouldSetTextContent() {
    return false
  },
  createTextInstance,
  appendChild,
  appendChildToContainer: appendChild,
  removeChild,
  removeChildFromContainer: removeChild,
  insertBefore,
  insertInContainerBefore: insertBefore,
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.props = newProps
    if (type === "Tone") {
      commitToneUpdate(instance)
    }
    if (type === "Burst") {
      commitBurstUpdate(instance)
    }
  },
  commitMount(instance, type) {
    if (type === "Tone") commitToneMount(instance)
    if (type === "Burst") commitBurstMount(instance)
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText
  },
  resetTextContent() {},
  clearContainer: clearChildren,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  isPrimaryRenderer: true,
  getCurrentEventPriority() {
    return 0
  },
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  supportsMicrotasks: true,
  scheduleMicrotask(fn) {
    queueMicrotask(fn)
  }
}

export default hostConfig
