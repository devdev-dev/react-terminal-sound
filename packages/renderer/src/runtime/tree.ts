import type { AnyInstance } from "../types"

function appendChild(parent: { children?: AnyInstance[] }, child: AnyInstance) {
  parent.children = parent.children || []
  parent.children.push(child)
}

function removeChild(parent: { children?: AnyInstance[] }, child: AnyInstance) {
  if (!parent.children) return
  parent.children = parent.children.filter((c) => c !== child)
}

function insertBefore(
  parent: { children?: AnyInstance[] },
  child: AnyInstance,
  beforeChild: AnyInstance
) {
  parent.children = parent.children || []
  const index = parent.children.indexOf(beforeChild)
  if (index === -1) {
    parent.children.push(child)
    return
  }
  parent.children.splice(index, 0, child)
}

function clearChildren(container: { children?: AnyInstance[] }) {
  container.children = []
}

export { appendChild, removeChild, insertBefore, clearChildren }
