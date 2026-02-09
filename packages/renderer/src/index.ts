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

export { render }
