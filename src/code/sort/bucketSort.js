// 桶排序

const bucketSort = (arr, bucketCount) => {
  if (arr.length <= 1) {
      return arr
  }

  let len = arr.length
  let buckets = []
  let result = []
  let min = arr[0]
  let max = arr[0]
  let regex = '/^[1-9]+[0-9]*$/'
  let bucketSize
  let n = 0
  
  bucketCount = bucketCount || ((bucketCount > 1 && regex.test(bucketCount)) ? bucketCount : 10)

  for (let i = 1; i < len; i++) {
      min = min <= arr[i] ? min : arr[i]
      max = max >= arr[i] ? max : arr[i]
  }

  bucketSize = (max - min + 1) / bucketCount

  for (let j = 0; j < len; j++) {
      let index = Math.floor((arr[j] - min) / bucketSize)
      if (buckets[index]) {
          let k = buckets[index].length - 1
          while(k >=0 && buckets[index][k] > arr[j]) {
              buckets[index][k + 1] = buckets[index][k]
              k--
          }
          buckets[index][k + 1] = arr[j]
      } else {
          buckets[index] = []
          buckets[index].push(arr[j])
      }
  }

  while (n < bucketCount) {
      result = result.concat(buckets[n])
      n++
  }
  return result
}


// second
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for(var i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while(preIndex >= 0 && arr[preIndex] > current) {
          arr[preIndex + 1] = arr[preIndex];
          preIndex--;
      }
      arr[preIndex + 1] = current;
  }
  return arr;
}

const bucketSort2 = (arr, bucketSize) => {
  if(arr.length === 0) {
    return arr;
  }

  let i;
  let minValue = arr[0];
  let maxValue = arr[0];
  for(i = 1; i < arr.length; i++) {
    if(arr[i] < minValue) {
        minValue = arr[i];                // 输入数据的最小值
    } else if(arr[i] > maxValue) {
        maxValue = arr[i];                // 输入数据的最大值
    }
  }

  // 桶的初始化
  let DEFAULT_BUCKET_SIZE = 5;            // 设置桶的默认数量为5
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;  
  let buckets = new Array(bucketCount);
  for(i = 0; i < buckets.length; i++) {
      buckets[i] = [];
  }

  // 利用映射函数将数据分配到各个桶中
  for(i = 0; i < arr.length; i++) {
      buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for(i = 0; i < buckets.length; i++) {
      insertionSort(buckets[i]);                      // 对每个桶进行排序，这里使用了插入排序
      for(let j = 0; j < buckets[i].length; j++) {
          arr.push(buckets[i][j]);                     
      }
  }

  return arr;
}

export default bucketSort

export {
  bucketSort,
  bucketSort2
}
