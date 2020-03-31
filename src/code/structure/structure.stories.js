import React, { useRef } from 'react'
import { Button } from 'antd'
// import { linkTo } from '@storybook/addon-links'
// import { action } from '@storybook/addon-actions'
import 'antd/dist/antd.css'

import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint.js'

import 'codemirror/theme/ambiance.css'

import Stack from './Stack'
import Queue from './Queue'

import LinkedList, { ListNode } from './LinkedList'
import DoubleLinkedList, { ListNode as DoubleLinkedListNode } from './DoubleLinkedList'
import CircleLinkedList, { ListNode as CircleLinkedListNode } from './CircleLinkedList'

import Tree from './Tree'
import BinarySearchTree from './BSTree'
import AVLTree from './AVLTree'

import Graph, { Vertex } from './Graph'

/* eslint-disable no-unused-expressions */

`
README 
https://www.jianshu.com/p/6db9933af715
`

const Options = {
  line: true,
  lineNumbers: true,                     //显示行号  
  mode: { name: "text/javascript" },          //定义mode  
  readOnly: true,
  scrollbarStyle: null,
  extraKeys: { "Ctrl": "autocomplete" },   //自动提示配置  
  theme: "ambiance"                  //选中的theme  
}

export default {
  title: 'Structure',
}

const baseConverter = (delNumber, base) => {
  `
  十进制转任意进制
  给定一个函数，输入目标数值和进制基数，输出对应的进制数（最大为16进制）
  `
  const stack = new Stack();
  let rem = null;
  let ret = [];

  // 十六进制中需要依次对应A~F
  const digits = '0123456789ABCDEF';

  while (delNumber > 0) {
    rem = Math.floor(delNumber % base);
    stack.push(rem);
    delNumber = Math.floor(delNumber / base);
  }

  while (!stack.isEmpty()) {
    ret.push(digits[stack.pop()]);
  }

  return ret.join('');
}

const clacExp = (exp) => {
  `
  逆波兰表达式计算
  逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式，例如 (a+b)*(c+d)转换为 a b+c d+*
  `

  const isOperator = (str) => {
    return ['+', '-', '*', '/'].includes(str);
  }

  const stack = new Stack();
  for (let i = 0; i < exp.length; i++) {
    const one = exp[i];
    if (isOperator(one)) {
      const operatNum1 = stack.pop();
      const operatNum2 = stack.pop();
      const expStr = `${operatNum2}${one}${operatNum1}`;
      const res = eval(expStr); // eslint-disable-line
      stack.push(res);
    } else {
      stack.push(one);
    }
  }
  return stack.peek();
}

class MinStack {
  // 利用普通栈实现一个有 min方法的栈 
  // 使用两个栈来存储数据，其中一个命名为 dataStack，专门用来存储数据，另一个命名为 minStack，专门用来存储栈里最小的数据。始终保持两个栈中的元素个数相同，压栈时判别压入的元素与 minStack栈顶元素比较大小，如果比栈顶元素小，则直接入栈，否则复制栈顶元素入栈；弹出栈顶时，两者均弹出即可。这样 minStack的栈顶元素始终为最小值。
   constructor() {
  
     this._dataStack = new Stack();
     this._minStack = new Stack();
   }
  
   push(item) {
     this._dataStack.push(item);
     // 为空或入栈元素小于栈顶元素，直接压入该元素
     if (this._minStack.isEmpty() || this._minStack.peek() > item) {
       this._minStack.push(item);
     } else {
       this._minStack.push(this._minStack.peek());
     }
   }
  
   pop() {
     this._dataStack.pop();
     return this._minStack.pop();
   }

   min() {
     return this._minStack.peek();
   }
}
 
export const StackStories = () => {
  const codeMirrorRef = useRef(null)
  const minstack = new MinStack()
  return (
    <div>
      <h2>Stack</h2>
      <CodeMirror value={Stack.toString()} options={Options} />
      <br/>
      <h2>进制转换</h2>
      <CodeMirror ref={codeMirrorRef} value={Stack.toString()} options={Options} />

      <h2>十进制转任意进制</h2>
      <CodeMirror value={`
const baseConverter = ${baseConverter.toString()}
      `} options={Options} />

      <code>
        <br />
            baseConverter(100345, 2) | {baseConverter(100345, 2)}
        <br />
            baseConverter(100345, 8) | {baseConverter(100345, 8)}
        <br />
            baseConverter(100345, 16) | {baseConverter(100345, 16)}
      </code>

      <br />
      <h2>逆波兰表达式计算</h2>
      <CodeMirror value={`
const clacExp = ${clacExp.toString()}
      `} options={Options} />
      <code>
      <br />
      clacExp(["4", "13", "5", "/", "+"]) | {clacExp(["4", "13", "5", "/", "+"])}
      </code>

      <br/>
      <h3>利用普通栈实现一个有 min方法的栈</h3>
      <CodeMirror value={`
${MinStack.toString()}
      `} options={Options} />
      <code>
      const minstack = new MinStack();
      <br/>
      minstack.push(3); | { minstack.push(3) }
      <br/>

      minstack.push(4); | { minstack.push(4) }
      <br/>

      minstack.push(8); | { minstack.push(8) }
      <br/>

      console.log(minstack.min()); |  { minstack.min() }
      <br/>

      minstack.push(2); | { minstack.push(2) }
      <br/>

      console.log(minstack.min()); | { minstack.min() }
      <br/>

      </code>

    </div>
  )
}

StackStories.story = {
  name: 'Stack 栈'
}


function delRing(list = []) {
  `
  约瑟夫环（普通模式）
  有一个数组 a[100]存放0~99；要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数。
  `
 const queue = new Queue();
 list.forEach(e => { queue.enqueue(e); });
 let index = 0;
 while (queue.size() !== 1) {
   const item = queue.dequeue();
   index += 1;
   if (index % 3 !== 0) {
     queue.enqueue(item);
   }
 }
 return queue.tail();
}

function fibonacci(n) {
  `
  菲波那切数列（普通模式）
  使用队列计算斐波那契数列的第n项
  斐波那契数列的前两项固定为1，后面的项为前两项之和，依次向后，这便是斐波那契数列。
  `
  const queue = new Queue();
  queue.enqueue(1);
  queue.enqueue(2);
  let index = 0;
  while(index < n - 2) {
     index += 1;
     // 出队列一个元素
     const delItem = queue.dequeue();
     // 获取头部值
     const headItem = queue.head();
     const nextItem = delItem + headItem;
     queue.enqueue(nextItem);
  }
  return queue.tail();
}

class QueueStack {
   constructor() {
    `
    用两个队列实现一个栈

    分析： 使用队列实现栈最主要的是在队列中找到栈顶元素并对其操作。具体的思路如下：

      1、两个队列，一个备份队列 emptyQueue，一个是数据队列 dataQueue；

      2、在确认栈顶时，依次 dequeue至备份队列，置换备份队列和数据队列的引用即可。
    `
     this.queue_1 = new Queue();
     this.queue_2 = new Queue();
     this._dataQueue = null; // 放数据的队列
     this._emptyQueue = null; // 空队列,备份使用
   }
  
   // 确认哪个队列放数据,哪个队列做备份空队列
   _initQueue() {
     if (this.queue_1.isEmpty() && this.queue_2.isEmpty()) {
       this._dataQueue = this.queue_1;
       this._emptyQueue = this.queue_2;
     } else if (this.queue_1.isEmpty()) {
       this._dataQueue = this.queue_2;
       this._emptyQueue = this.queue_1;
     } else {
       this._dataQueue = this.queue_1;
       this._emptyQueue = this.queue_2;
     }
   };
  
   push(item) {
     this.init_queue();
     this._dataQueue.enqueue(item);
   };

   peek() {
     this.init_queue();
     return this._dataQueue.tail();
   }
   pop() {
     this.init_queue();
     while (this._dataQueue.size() > 1) {
       this._emptyQueue.enqueue(this._dataQueue.dequeue());
     }
     return this._dataQueue.dequeue();
   };
  };
  
class QueueStack2 {

 constructor() {
  `
  一个队列也能实现栈
  `
   this.queue = new Queue();
 }
 push(item) {
   this.queue.enqueue(item);
 }

 pop() {
   // 向队列末尾追加 队列长度-1 次，后弹出队列头部
   for(let i = 1; i < this.queue.size(); i += 1) {
     this.queue.enqueue(this.queue.dequeue());
   }
   return this.queue.dequeue();
 }

 peek() {
   return this.queue.tail();
 }
}
    
export const QueueStories = () => {

  const arr_100 = Array.from({ length: 100 }, (_, i) => i*i);
  return (
    <div>
      <h2>Queue</h2>
      <CodeMirror value={Queue.toString()} options={Options} />
      <br/>

      <h3>约瑟夫环（普通模式）</h3>
      <CodeMirror value={delRing.toString()} options={Options} />

      <code>
        {arr_100.toString()} | {delRing(arr_100)}
      </code>

      <h3>菲波那切数列（普通模式）</h3>
      <CodeMirror value={delRing.toString()} options={Options} />

      <code>
        <span>1, 2, 3, 5, 8, 13...</span> 
        <br/>
        fibonacci(9) | {fibonacci(9)}
      </code>

      <h3>用队列实现一个栈</h3>
      <CodeMirror value={QueueStack.toString()} options={Options} />
     
      <h3>队列也能实现栈</h3>
      <CodeMirror value={QueueStack2.toString()} options={Options} />
     
    </div>
  )
}

QueueStories.story = {
  name: 'Queue 队列'
}


export const LinkedListStories = () => {

  return (
    <div>    
      <h3>单向链表</h3>

      <CodeMirror value={`
${ListNode.toString()}
${LinkedList.toString()}     
      `} options={Options} />

    </div>
  )
}

LinkedListStories.story = {
  name: 'LinkedList 单向链表'
}

export const DoubleLinkedListStories = () => {

  return (
    <div>
      <h3>双向链表</h3>
      <CodeMirror value={`
${DoubleLinkedListNode.toString()}
${DoubleLinkedList.toString()}     
      `} options={Options} />
    </div>
  )
}

DoubleLinkedListStories.story = {
  name: 'DoubleLinkedList 双向链表'
}


export const CircleLinkedListStories = () => {

  return (
    <div>
      <h3>循环链表</h3>
      <CodeMirror value={`
${CircleLinkedListNode.toString()}
${CircleLinkedList.toString()}     
      `} options={Options} />
    </div>
  )
}

CircleLinkedListStories.story = {
  name: 'CircleLinkedList List 循环链表'
}


export const TreeStories = () => {
  const data = {value: 101}

  const tree = useRef(new Tree(data))

  const testContains = () => {
    tree.current.contains((node) => {
      console.log(node)
      if (node.data.value === data.value) {
        console.log(true)
      }
    })
  }

  const testAdd = () => {
    tree.current.add({value: 1}, data)
    console.log(tree)
  }

  return (
    <div>
      <h2>树</h2>
      <CodeMirror value={Tree.toString()} options={Options} />

      <br/>

      <div>
        <Button type="default" onClick={testContains}>contains</Button>
        <Button type="primary" onClick={testAdd} style={{marginLeft: 20}}>add</Button>

      </div>
    </div>
  )
}

TreeStories.story = {
  name: 'Tree 树'
}


export const BinarySearchTreeStories = () => {

  return (
    <div>
      <h2>Binary Search Tree(BST) 二叉树搜索树</h2>
      <CodeMirror value={BinarySearchTree.toString()} options={Options} />
      <br/>

      <div>
        example
      </div>
    </div>
  )
}

BinarySearchTreeStories.story = {
  name: 'BSTree 二叉搜索树'
}


export const AVLTreeStories = () => {
  return (
    <div>
      <h2>AVL——Adelson-Velskii-Landi 自平衡二叉搜索树</h2>
      <CodeMirror value={AVLTree.toString()} options={Options} />
      <br/>

      <div> 
        example
      </div>
    </div>
  )
}

AVLTreeStories.story = {
  name: 'AVL Tree 自平衡二叉搜索树'
}

export const GraphStories = () => {
  const len = 10
  const graph = new Graph()
  for (let i = 0; i < len; i++) {
    const vertex = new Vertex(i)
    graph.addVertices(vertex)
  }

  graph.addEdge(graph.vertices[0], graph.vertices[1])
  graph.addEdge(graph.vertices[0], graph.vertices[2])
  graph.addEdge(graph.vertices[0], graph.vertices[3])
  graph.addEdge(graph.vertices[0], graph.vertices[4])
  graph.addEdge(graph.vertices[1], graph.vertices[2])
  graph.addEdge(graph.vertices[9], graph.vertices[4])
  graph.addEdge(graph.vertices[6], graph.vertices[4])
  graph.addEdge(graph.vertices[8], graph.vertices[9])
  graph.addEdge(graph.vertices[9], graph.vertices[3])

  console.log('vertices', graph.vertices)
  console.log('BFS', graph.BFS(graph.vertices[0]))
  console.log('DFS', graph.DFS())

  console.table('shortestPath', graph.shortestPath(graph.vertices[5], graph.vertices[8]))

  console.table('shortestPathAll', graph.shortestPathAll())


  //重新声明一个图并所有的顶点加入图中。
  const DFSGraph = new Graph()
  const DFSarray = ["a","b","c","d","e","f"];
  for (var i = 0; i < DFSarray.length; i++) {
      DFSGraph.addVertices(DFSarray[i])
  }
  //我们为图加上边。
  DFSGraph.addEdge("a","c")
  DFSGraph.addEdge("a","d")
  DFSGraph.addEdge("b","d")
  DFSGraph.addEdge("b","e")
  DFSGraph.addEdge("c","f")
  DFSGraph.addEdge("f","e")
  const result = DFSGraph.DFS()
  console.log('拓扑排序', result)

  return (
    <div>
      <h2>图和图算法</h2>
      <CodeMirror value={ `
${Vertex.toString()}
${Graph.toString()}
         `} options={Options} />

      <br/>

      <div>
        example
      </div>
    </div>
  )
}

GraphStories.story = {
  name: 'Graph 图'
}