/**
 * 插入排序
 * @param {[]} params 
 * @return {[]}
 */
const insertionSort = (params = []) => {
  const arr = [...params]
  const len = arr.length
  for (let i = 1; i < len; i++) {
    // 升序
    if (arr[i] < arr[i - 1]) {
      const guard = arr[i]
      let j = i - 1
      arr[i] = arr[j]
      while (j >= 0 && guard < arr[j]) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = guard
    }
  }
  return arr
}
export default insertionSort