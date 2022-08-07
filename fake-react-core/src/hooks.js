export let currentRenderingFiber = null
export let workInProgressHook = null

export function renderWithHook(wip) {
  currentRenderingFiber = wip
  currentRenderingFiber.memorizedState = null
  workInProgressHook = null
}

export function updateWorkInProgressHook() {
  let hook

  const current = currentRenderingFiber.alternate
  if (current) {
    currentRenderingFiber.memorizedState = current.memorizedState

    if (workInProgressHook) {
      hook = workInProgressHook = workInProgressHook.next
    } else {
      hook = workInProgressHook = currentRenderingFiber.memorizedState
    }
  } else {
    hook = {
      memorizedState: null,
      next: null
    }

    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentRenderingFiber.memorizedState = hook
    }
  }

  return hook
}
