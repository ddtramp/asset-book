const a = [1,3,5,7,9]
const b = [2,4,6,8]

/**
 * 两个升序数组合并为一个升序数组
 * @param {Array} a [1, 3, 5, 7, 9]
 * @param {Array} b [2, 4, 6, 8]
 * @return {Array} [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const sort = (a = [], b = []) => {
  let i = j = 0, c = [], aLength = a.length, bLength = b.length
  while(i < aLength || j < bLength){
      if(b[j] > a[i] && a[i] || !b[j]){
          c.push(a[i])
          i++
      }else if(b[j] <= a[i] && b[j] || !a[i]){
          c.push(b[j])
          j++
      }
  }
  return c
}

const res = sort(a, b)
console.log('sort', res)
