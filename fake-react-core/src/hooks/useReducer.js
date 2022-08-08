import { updateWorkInProgressHook, currentRenderingFiber } from '../hooks'
import { scheduleUpdateOnFiber } from '../ReactFiberWorkLoop'

export const useReducer = (reducer, initArg, init) => {
  const hook = updateWorkInProgressHook()

  if (!currentRenderingFiber.alternate) {
    hook.memorizedState = initArg
  }

  const fiber = currentRenderingFiber
  const dispatch = newVal => {
    hook.memorizedState = reducer ? reducer(hook.memorizedState) : newVal
    fiber.alternate = { ...fiber }
    fiber.sibling = null
    scheduleUpdateOnFiber(fiber)
  }

  return [hook.memorizedState, dispatch]
}
