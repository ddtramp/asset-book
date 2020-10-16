const a = [1,3,5,7,9]
const b = [2,4,6,8]

const sort = (a = [], b = []) => {
  let i = j = 0, c = [], a_length = a.length, b_length = b.length
  while(i<a_length || j<b_length){
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
