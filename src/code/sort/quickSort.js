/**
 * 快速排序
 * @param {[]} arr 
 * @return {[]} arr
 */
const quickSort = (arr = []) => {
  const len = arr.length
  if (len <= 1) {
      return arr
  }
  const pivotIndex = Math.floor(len / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  for (let i = 0; i < len; i++) {
      if (arr[i] < pivot) {
          left.push(arr[i])
      } else {
          right.push(arr[i])
      }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}
export default quickSort