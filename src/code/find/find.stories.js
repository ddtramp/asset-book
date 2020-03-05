import React, { useState } from 'react'
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

import { binarySearch as binarySearchData } from '../../test'

import { binarySearch, binarySearchRecursive } from './binarySearch'

const Options = {
  line: true,
  lineNumbers: true,                     //显示行号  
  mode: { name: "text/javascript" },          //定义mode  
  readOnly: true,
  extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置  
  theme: "ambiance"                  //选中的theme  
}

export default {
  title: 'Find',
}

export const BinarySearch = () => {
  const [result, setResult] = useState(null)

  const sort = () => {
    const data = [...binarySearchData]
    const res = binarySearchRecursive(data, 4)
    setResult(res)
    return res
  }

  const sort2 = () => {
    const data = [...binarySearchData]
    const res = binarySearch(data, 4)
    console.log(data, res)
    setResult(res)
    return res
  }


  return (
    <div>
      <CodeMirror value={binarySearchRecursive.toString()} options={Options} />

      <CodeMirror value={binarySearch.toString()} options={Options} />

      <code>
        origin: {binarySearchData.toString()}
        <br />
        result: {result && result.toString()}
      </code>

      <br />

      <Button type="primary" onClick={sort}>Test 1</Button>
      <Button type="primary" onClick={sort2} style={{marginLeft: 10}}>Test 2</Button>
    </div>
  )
}

BinarySearch.story = {
  name: '二分查找'
}