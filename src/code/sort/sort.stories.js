import React, { useState, useRef } from 'react'
// import { linkTo } from '@storybook/addon-links'
// import { action } from '@storybook/addon-actions'
import { Button } from 'antd'
import 'antd/dist/antd.css'

import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'

import 'codemirror/theme/ambiance.css'

import { sortData } from '../../test'

import bubbleSort from './bubbleSort'
import quickSort from './quickSort'
import insertionSort from './insertionSort'
import selectionSort from './selectionSort'
import shellSort from './shellSort'
import mergeSort from './mergeSort'
import heapSort from './heapSort'
import countingSort from './countingSort'
import { bucketSort, bucketSort2 } from './bucketSort'
import radixSort from './radixSort'

const Options = {
  line: true,
  lineNumbers: true,                     //显示行号  
  mode: { name: "text/javascript" },          //定义mode  
  readOnly: true,
  extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置  
  theme: "ambiance"                  //选中的theme  
}

export default {
  title: 'Sort',
}

export const BuddleSort = () => {
  const [result, setResult] = useState(null)

  const codeMirrorRef = useRef(null)

  const sort = () => {
    const data = [...sortData]
    const res = bubbleSort(data)
    setResult(res)
    return res
  }


  return (
    <div>
      <CodeMirror ref={codeMirrorRef} value={bubbleSort.toString()} options={Options} />

      <code>
        <br />
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

BuddleSort.story = {
  name: '冒泡排序'
}

export const QuickSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = quickSort(data)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={quickSort.toString()} options={Options} />
      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

QuickSort.story = {
  name: '快速排序'
}

export const InsertionSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    insertionSort(data)
    setResult(data)
    return data
  }

  return (
    <div>
      <CodeMirror value={insertionSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

InsertionSort.story = {
  name: '插入排序'
}


export const SelSectionSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = selectionSort(data)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={selectionSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

SelSectionSort.story = {
  name: '选择排序'
}

export const ShellSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = shellSort(data)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={shellSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

ShellSort.story = {
  name: '希尔排序'
}

export const MergeSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = mergeSort(data)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={mergeSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

MergeSort.story = {
  name: '归并排序'
}

export const HeapSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    heapSort(data)
    setResult(data)
    return data
  }

  return (
    <div>
      <CodeMirror value={heapSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

HeapSort.story = {
  name: '堆排序'
}

export const CountingSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = countingSort(data)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={countingSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

CountingSort.story = {
  name: '计数排序'
}

export const BucketSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = bucketSort(data, 4)
    setResult(res)
    return res
  }

  const sort2 = () => {
    const data = [...sortData]
    const res = bucketSort2(data, 4)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={bucketSort.toString()} options={Options} />

      <CodeMirror value={bucketSort2.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
      <Button type="primary" onClick={sort2} style={{marginLeft: 10}}>Test2</Button>

    </div>
  )
}

BucketSort.story = {
  name: '桶排序'
}

export const RadixSort = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...sortData]
    const res = radixSort(data, 2)
    setResult(res)
    return res
  }

  return (
    <div>
      <CodeMirror value={radixSort.toString()} options={Options} />

      <code>
        origin: {sortData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test</Button>
    </div>
  )
}

RadixSort.story = {
  name: '基数排序'
}