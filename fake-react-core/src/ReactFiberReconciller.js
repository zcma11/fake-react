import { createFiberNode } from './ReactFiber'
import { isArray, isNumber, isString } from './utils'
import { renderWithHook } from './hooks'

export const updateHostComponent = wip => {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, wip.alternate?.props, wip.props)
  }

  reconcileChildren(wip, wip.props.children)
}

export const updateFunctionComponent = wip => {
  renderWithHook(wip)
  const children = wip.type(wip.props)
  reconcileChildren(wip, children)
}

export const updateClassComponent = wip => {
  const children = new wip.type(wip.props)
  reconcileChildren(wip, children.render())
}

export const updateTextComponent = wip => {
  wip.stateNode = document.createTextNode(wip.props.children)
}

export const updateFragmentComponent = wip => {
  reconcileChildren(wip, wip.props.children)
}

const updateNode = (ele, preProps, props) => {
  Object.keys(props).forEach(key => {
    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase()
      if (preProps && preProps[key] !== props[key]) {
        ele.removeEventListener(eventName, preProps[key])
      }
      ele.addEventListener(eventName, props[key])
    } else if (key !== 'children') {
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
