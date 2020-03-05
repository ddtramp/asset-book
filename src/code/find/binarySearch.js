// 递归方法
const binarySearchRecursive = (data, dest, start, end) => {
    const endIndex = end || data.length - 1
    const startIndex = start || 0
    const m = Math.floor((startIndex + endIndex) / 2)

    if (data[m] === dest) {
        return m
    }

    if (dest < data[m]) {
        return binarySearch(data, dest, 0, m - 1)
    } else {
      return binarySearch(data, dest, m + 1, endIndex)
    }
}

// 非递归方法

const binarySearch = (data, dest) => {
    let h = data.length - 1
    let l = 0
    while (l <= h) {
        const m = Math.floor((h + l) / 2)
        if (data[m] === dest) {
            return m
        }
        if (dest > data[m]) {
            l = m + 1
        } else {
            h = m - 1
        }
    }
    return false
}

export default binarySearchRecursive

export {
  binarySearchRecursive,
  binarySearch,
}