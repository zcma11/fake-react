import {
  ClassComponent,
  FunctionComponent,
  HostComponent
} from './ReactWorkTags'
import { isFunction, isString, Placement } from './utils'

export const createFiberNode = (vnode, returnFiber = null) => {
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

  const { type } = vnode
  if (isString(type)) {
    fiber.tag = HostComponent
  } else if (isFunction(type)) {
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent
  }

  return fiber
}
