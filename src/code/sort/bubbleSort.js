/**
 * 冒泡排序
 * @param {[]} arr 
 * @return {[]} new sorted array
 */
const bubbleSort = (arr = []) => {
  const res = [...arr]
  for (let i = 0; i < res.length - 1; i++) {
      for (let j = 0; j < res.length - i - 1; j++) {
          if (res[j] > res[j + 1]) {
              const  swap = res[j]
              res[j] = res[j + 1]
              res[j + 1] = swap
          }
      }
  }
  return res
}

export default bubbleSort