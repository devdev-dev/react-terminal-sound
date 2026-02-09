import { beep } from "./audio"

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
    clearTimers(instance)
  },
  createInstance(type, props) {
    if (type !== "Tone" && type !== "Burst") {
      throw new Error("Unknown host component")
    }
    return { type, props, timers: [] as NodeJS.Timeout[] }
  },
  appendInitialChild(parent, child) {
    parent.children = parent.children || []
    parent.children.push(child)
  },
  finalizeInitialChildren() {
    return true
  },
  prepareUpdate() {
    return true
  },
  shouldSetTextContent() {
    return false
  },
  createTextInstance(text) {
    return { type: "TEXT", text }
  },
  appendChild(parent, child) {
    parent.children = parent.children || []
    parent.children.push(child)
  },
  appendChildToContainer(container, child) {
    container.children = container.children || []
    container.children.push(child)
  },
  removeChild(parent, child) {
    if (!parent.children) return
    parent.children = parent.children.filter((c) => c !== child)
  },
  removeChildFromContainer(container, child) {
    if (!container.children) return
    container.children = container.children.filter((c) => c !== child)
  },
  insertBefore(parent, child, beforeChild) {
    parent.children = parent.children || []
    const index = parent.children.indexOf(beforeChild)
    if (index === -1) {
      parent.children.push(child)
      return
    }
    parent.children.splice(index, 0, child)
  },
  insertInContainerBefore(container, child, beforeChild) {
    container.children = container.children || []
    const index = container.children.indexOf(beforeChild)
    if (index === -1) {
      container.children.push(child)
      return
    }
    container.children.splice(index, 0, child)
  },
  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.props = newProps
    if (type === "Tone") {
      if (newProps.on) beep()
    }
    if (type === "Burst") {
      clearTimers(instance)
      if (newProps.on) scheduleBurst(instance)
    }
  },
  commitMount(instance, type) {
    if (type === "Tone" && instance.props.on) beep()
    if (type === "Burst" && instance.props.on) scheduleBurst(instance)
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.text = newText
  },
  resetTextContent() {},
  clearContainer(container) {
    container.children = []
  },
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

function scheduleBurst(instance) {
  const count = Math.max(1, Number(instance.props.burst ?? 1))
  const gap = Math.max(20, Number(instance.props.gap ?? 60))
  beep()
  for (let i = 1; i < count; i += 1) {
    const id = setTimeout(() => beep(), i * gap)
    instance.timers.push(id)
  }
}

function clearTimers(instance) {
  if (!instance.timers) return
  for (const id of instance.timers) clearTimeout(id)
  instance.timers = []
}

export default hostConfig
