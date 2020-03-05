// 归并排序
const merge = (left, right) => {
  let result = []
  console.time('merge sort time')
  while (left.length && right.length) {
      if (left[0] <= right[0]) {
          result.push(left.shift())
      } else {
          result.push(right.shift())
      }
      

  }
  while(left.length) {
      result.push(left.shift())
  }
  while(right.length) {
      result.push(right.shift())
  }
  console.timeEnd('merge sort time')
  return result
}

const mergeSort = (arr) => {
  const len = arr.length
  if (len < 2) {
      return arr
  }
  let middle = Math.floor(len / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
}

export default mergeSort