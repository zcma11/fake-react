export const push = (heap, node) => {
  const size = heap.push(node)
  siftUp(heap, node, size - 1)
}
export const pop = heap => {
  if (heap.length === 0) return
  const head = heap[0]
  const last = heap.pop()
  if (heap.length > 0) {
    heap[0] = last
    siftDown(heap, last, 0)
  }

  return head
}

export const peek = heap => (heap.length > 0 ? heap[0] : null)
export const siftUp = (heap, node, i) => {
  while (i > 0) {
    const parentIndex = i >> 1
    const parent = heap[parentIndex]
    if (compare(node, parent) < 0) {
      heap[i] = parent
      heap[parentIndex] = node
      i = parentIndex
    } else {
      break
    }
  }
}
export const siftDown = (heap, node, i) => {
  const len = heap.length
  const halfIndex = len >> 1
  // 如果比一半大，那么没有子节点
  while (i < halfIndex) {
    const leftIndex = 2 * i + 1
    const rightIndex = leftIndex + 1
    const left = heap[leftIndex]
    const right = heap[rightIndex]
    let temp = i
    // 比较出最大的往下移动
    if (leftIndex < len && compare(left, node) < 0) {
      if (rightIndex < len && compare(right, left) < 0) {
        temp = rightIndex
      } else {
        temp = leftIndex
      }
    } else if (rightIndex < len && compare(right, node) < 0) {
      temp = leftIndex
    }

    if (temp !== i) {
      heap[i] = heap[temp]
      heap[temp] = node
      i = temp
    } else {
      break
    }
  }
}

export const compare = (a, b) => {
  const diff = a.sortIndex - b.sortIndex
  return diff !== 0 ? diff : a.id - b.id
}
