import { Placement } from "./utils"

export const createFiberNode = (vnode, returnFiber) => {
  const fiber = {
    type: vnode.type,
    props: vnode.props,
    key: vnode.key,
    return: returnFiber,
    stateNode: null,
    child: null,
    sibling: null,
    flags: Placement,
    index: null
  }

  return fiber
}