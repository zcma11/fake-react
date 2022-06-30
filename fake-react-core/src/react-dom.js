export let rootState = null
export let wid = null
export const createRoot = (root) => {
  rootState = root
  wid = root

  return render
}

export const render = (nodes) => {
  console.log(nodes)
}
