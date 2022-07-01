import {
  updateClassComponent,
  updateFunctionComponent,
  updateHostComponent
} from './ReactFiberReconciller'
import { ClassComponent, FunctionComponent, HostComponent } from './ReactWorkTags'
import { isFunction, isString, Placement } from './utils'

let wip = null
let wipRoot = null

export const scheduleUpdateOnFiber = fiber => {
  wip = fiber
  wipRoot = fiber
}

export const performUnitOfWork = () => {
  if (!wip) return
  switch(wip.tag) {
    case HostComponent:
      updateHostComponent(wip)
      break
    case ClassComponent:
      updateClassComponent(wip)
      break
    case FunctionComponent:
      updateFunctionComponent(wip)
      break
  }

  if (wip.child) {
    wip = wip.child
    return
  }

  let next = wip
  while (next) {
    if (next.sibling) {
      wip = next.sibling
      return
    }
    next = next.return
  }

  wip = null
}

export const workLoop = IdleDeadline => {
  while (wip && IdleDeadline.timeRemaining() > 0) {
    performUnitOfWork()
  }

  if (!wip && wipRoot) {
    commitRoot()
  }
}

requestIdleCallback(workLoop)

const commitRoot = () => {
  console.log('finally', wipRoot)
  commitWorker(wipRoot)
  wipRoot = null
}

const commitWorker = wip => {
  if (!wip) return
  let parentEle = getParentNode(wip.return)
  const { stateNode, flags } = wip
  // self
  // 放置
  if (flags & Placement && stateNode) {
    parentEle.appendChild(stateNode)
  }
  // 更新
  // 删除

  // child
  commitWorker(wip.child)
  // sibling
  commitWorker(wip.sibling)
}

const getParentNode = wip => {
  let temp = wip
  while (temp) {
    if (temp.stateNode) {
      return temp.stateNode
    }
    temp = temp.return
  }
}
