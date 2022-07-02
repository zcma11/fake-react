import { peek, pop, push } from './SchedulerMinHeap'

// Times out immediately
const IMMEDIATE_PRIORITY_TIMEOUT = -1
// Eventually times out
const USER_BLOCKING_PRIORITY_TIMEOUT = 250
const NORMAL_PRIORITY_TIMEOUT = 5000
const LOW_PRIORITY_TIMEOUT = 10000

const taskQueue = []
const timerQueue = []
let currentTask = null
let isSchedulerPaused = true
let isMessageLoopRunning = false
let scheduledHostCallback = null
let taskIdCounter = 1

export const unstable_scheduleCallback = (
  /* priorityLevel, */ callback,
  options
) => {
  // 时间，生成任务
  const currentTime = getCurrentTime()
  // delay
  // if (options.delay) {}

  const startTime = currentTime
  // priorityLevel switch
  const timeout = IMMEDIATE_PRIORITY_TIMEOUT
  const expirationTime = startTime + timeout
  const task = {
    id: taskIdCounter++,
    /* priorityLevel */
    callback,
    startTime,
    expirationTime,
    sortIndex: -1
  }
  // render触发
  push(taskQueue, task)
  // 注册
  requestHostCallback(flushWork)
}
// 注册任务
const requestHostCallback = callback => {
  scheduledHostCallback = callback
  // 通知任务
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true
    port.postMessage(null)
  }
}

const channel = new MessageChannel()
const port = channel.port2
channel.port1.onmessage = () => {
  // 执行任务
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime()
    const hasTimeRemaining = true
    try {
      scheduledHostCallback(hasTimeRemaining, currentTime)
    } finally {
      isMessageLoopRunning = false
    }
  } else {
    isMessageLoopRunning = false
  }
}

const flushWork = (hasTimeRemaining, intialTime) => {
  // 异步
  // 同步
  try {
    workLoop(hasTimeRemaining, intialTime)
  } finally {
    currentTask = null
  }
}

const workLoop = (hasTimeRemaining, intialTime) => {
  currentTask = peek(taskQueue)
  while (currentTask !== null && isSchedulerPaused) {
    const callback = currentTask.callback
    if (typeof callback === 'function') {
      // 检查时间
      currentTask.callback = null
      callback()
      pop(taskQueue)
    } else {
      pop(taskQueue)
    }
    currentTask = peek(taskQueue)
  }

  if (currentTask !== null) {
    return true
  } else {
    // timerQueue
    const timerTask = peek(timerQueue)
    if (timerTask !== null) {
      requestHostTimeout()
    }
    return false
  }
}

const requestHostTimeout = () => {}

export const getCurrentTime = () => performance.now()
