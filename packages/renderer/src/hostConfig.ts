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
  detachDeletedInstance() {},
  createInstance(type, props) {
    if (type !== "Tone") {
      throw new Error("Unknown host component")
    }
    return { type, props }
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
    if (type === "Tone") beep()
  },
  commitMount(instance, type) {
    if (type === "Tone") beep()
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

export default hostConfig
