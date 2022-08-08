import {
  updateClassComponent,
  updateFragmentComponent,
  updateFunctionComponent,
  updateHostComponent,
  updateNode,
  updateTextComponent
} from './ReactFiberReconciller'
import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText
} from './ReactWorkTags'
import { unstable_scheduleCallback as scheduleCallback } from './scheduler'
import { Placement, Update } from './utils'

let wip = null
let wipRoot = null

export const scheduleUpdateOnFiber = fiber => {
  wip = fiber
  wipRoot = fiber
  scheduleCallback(workLoop)
}

export const performUnitOfWork = () => {
  if (!wip) return
  switch (wip.tag) {
    case HostComponent:
      updateHostComponent(wip)
      break
    case ClassComponent:
      updateClassComponent(wip)
      break
    case FunctionComponent:
      updateFunctionComponent(wip)
      break
    case HostText:
      updateTextComponent(wip)
      break
    case Fragment:
      updateFragmentComponent(wip)
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

export const workLoop = () => {
  while (wip) {
    performUnitOfWork()
  }

  if (!wip && wipRoot) {
    commitRoot()
  }
}

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
  if (flags & Update && stateNode) {
    updateNode(stateNode, wip.alternate.props, wip.props)
  }
  // 删除
  if (wip.deletions) {
    commitDeletion(wip.deletions, stateNode || parentEle)
    wip.deletion = null
  }

  // child
  commitWorker(wip.child)
  // sibling
  commitWorker(wip.sibling)
}

const commitDeletion = (deletions, parentEle) => {
  for (let i = 0; i < deletions.length; i++) {
    const deletion = deletions[i]
    parentEle.removeChild(getChildNode(deletion))
  }
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

const getChildNode = wip => {
  let temp = wip
  while (!temp.stateNode) {
    temp = temp.child
  }

  return temp.stateNode
}
