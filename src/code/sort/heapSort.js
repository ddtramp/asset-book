// 堆排序

const heapify = (arr, x, len) => {
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array' && typeof x === 'number') {
      let l = 2 * x + 1
      let r = 2 * x + 2
      let largest = x
      let temp

      if ( l < len && arr[l] > arr[largest]) {
          largest = l
      }

      if (r < len && arr[r] > arr[largest]) {
          largest = r
      }

      if (largest !== x) {
          temp = arr[x]
          arr[x] = arr[largest]
          arr[largest] = temp
          heapify(arr, largest, len)
      }
  } else {
      return 'arr is not an Array or x i not a number'
  }
}

const heapSort = arr => {
  console.time('heap sort time')
  if (Object.prototype.toString.call(arr).slice(8, -1) === 'Array') {
      let heapSize = arr.length
      let temp

      for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
          heapify(arr, i, heapSize)
      }

      for (let j = heapSize - 1; j >= 1; j--) {
          temp = arr[0]
          arr[0] = arr[j]
          arr[j] = temp
          heapify(arr, 0, --heapSize)
      }
      return arr
  } else {
      return 'arr is not an Array'
  }
}

export default heapSort