import {
  ClassComponent,
  Fragment,
  FunctionComponent,
  HostComponent,
  HostText
} from './ReactWorkTags'
import { isFunction, isString, isSymbol, isUndefined, Placement } from './utils'

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
    index: null,
    tag: undefined
  }

  const { type } = vnode
  if (isString(type)) {
    fiber.tag = HostComponent
  } else if (isFunction(type)) {
    fiber.tag = type.prototype.isReactComponent
      ? ClassComponent
      : FunctionComponent
  } else if (isUndefined(type)) {
    fiber.tag = HostText
    fiber.props = { children: vnode }
  } else if (isSymbol(type)) {
    if (type.description === 'react.fragment') {
      fiber.tag = Fragment
    }
  }

  return fiber
}
