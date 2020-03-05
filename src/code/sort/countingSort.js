// 计数排序

const countingSort = arr => {
  let len = arr.length
  let B = []
  let C = []
  let min = arr[0]
  let max = arr[0]

  console.time('counting sort time')

  for (let i = 0; i < len; i++) {
      min = min <= arr[i] ? min : arr[i]
      max = max >= arr[i] ? max : arr[i]
      C[arr[i]] = C[arr[i]] ? C[arr[i]] + 1 : 1
  }

  for ( let j = min; j < max; j++) {
      C[j + 1] = (C[j + 1] || 0) + (C[j] + 0)
  }

  for (let k = len - 1; k >= 0; k--) {
      B[C[arr[k]] - 1] = arr[k]
      C[arr[k]]--
  }

  console.timeEnd('counting sort time')
  return B
}

export default countingSort