/**
 * 希尔排序
 * @param {[]} arr
 * @return {[]} 
 */
const shellSort = (arr) => {
  const len = arr.length
  for(let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
      // 注意：这里和动图演示的不一样，动图是分组执行，实际操作是多个分组交替执行
      for(let i = gap; i < len; i++) {
          let j = i;
          let current = arr[i]
          while(j - gap >= 0 && current < arr[j - gap]) {
               arr[j] = arr[j - gap]
               j = j - gap
          }
          arr[j] = current
      }
  }
  return arr
}

export default shellSort