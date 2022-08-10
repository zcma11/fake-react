import { createFiberNode } from './ReactFiber'
import { isArray, isNumber, isString, sameNode, Update } from './utils'
import { renderWithHook } from './hooks'

// 调度会传不同的 wip，可以是上一次保存下来的
export const updateHostComponent = wip => {
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, {}, wip.props)
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

export const updateNode = (ele, preProps, props) => {
  Object.keys(preProps).forEach(key => {
    if (!(key in props)) {
      if (key.startsWith('on')) {
        ele.removeEventListener(key.slice(2), preProps[key])
      } else {
        props[key] = ''
      }
    }
  })

  Object.keys(props).forEach(key => {
    if (key.startsWith('on')) {
      const eventName = key.slice(2).toLowerCase()
      if (preProps?.[key] && preProps[key] !== props[key]) {
        ele.removeEventListener(eventName, preProps[key])
      }
      ele.addEventListener(eventName, props[key])
    } else if (key === 'children') {
      if (isString(props.children) || isNumber(props.children)) {
        ele.textContent = props.children
      }
    } else {
      ele[key] = props[key]
    }
  })
}

export const reconcileChildren = (wip, children) => {
  if (isString(children) || isNumber(children)) {
    return
  } else if (!isArray(children)) {
    children = [children]
  }

  let oldFiber = wip.alternate?.child
  let lastFiber = null
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    const fiber = createFiberNode(child, wip)
    const isSame = sameNode(oldFiber, fiber)

    if (isSame) {
      Object.assign(fiber, {
        stateNode: oldFiber.stateNode,
        alternate: oldFiber,
        flags: Update
      })
    }

    if (!isSame && oldFiber) {
      deleteChild(wip, oldFiber)
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (lastFiber === null) {
      wip.child = fiber
    } else {
      lastFiber.sibling = fiber
    }

    lastFiber = fiber
  }
}

export const deleteChild = (returnFiber, childFiber) => {
  const deletions = returnFiber.deletions

  if (deletions) {
    deletions.push(childFiber)
  } else {
    returnFiber.deletions = [childFiber]
  }
}
