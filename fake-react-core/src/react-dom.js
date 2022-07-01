import { createFiberNode } from './ReactFiber'
import { scheduleUpdateOnFiber } from './ReactFiberWorkLoop'

export class ReactDOMRoot {
  constructor(root) {
    this._internalRoot = root
  }

  render(children) {
    updateContainer(children, this._internalRoot)
  }

  unmount() {}
}

const updateContainer = (element, root) => {
  const { containerInfo } = root
  const rootFiber = createFiberNode(element, {
    type: containerInfo,
    stateNode: containerInfo
  })
  scheduleUpdateOnFiber(rootFiber)
}

export const createRoot = container => {
  const root = {
    containerInfo: container
  }
  return new ReactDOMRoot(root)
}
