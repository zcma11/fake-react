import { createFiberNode } from './ReactFiber'
import { isArray, isNumber, isString } from './utils'

export const updateHostComponent = wip => {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, wip.props)
  }

  reconcileChildren(wip, wip.props.children)
}

export const updateFunctionComponent = wip => {
  const children = wip.type(wip.props)
  reconcileChildren(wip, children)
}

export const updateClassComponent = wip => {
  console.dir(wip.type)
  const children = new wip.type(wip.props)
  reconcileChildren(wip, children.render())
}

const updateNode = (ele, props) => {
  Object.keys(props).forEach(key => {
    if (key !== 'children') {
      ele[key] = props[key]
    }
  })
}

const reconcileChildren = (wip, children) => {
  if (isString(children) || isNumber(children)) {
    wip.stateNode.textContent = children
    return
  } else if (!isArray(children)) {
    children = [children]
  }

  wip.child = createFiberNode(children[0], wip)

  let lastFiber = wip.child
  for (let i = 1; i < children.length; i++) {
    const child = children[i]
    const fiber = createFiberNode(child, wip)
    lastFiber.sibling = fiber
    lastFiber = fiber
  }
}
