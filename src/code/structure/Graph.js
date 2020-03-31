/**
 * 图和图算法 https://segmentfault.com/a/1190000002410553
 * 图（Graph）是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G表示一个图，V是图G中顶点的集合，E是图G中边的集合
 * 
 * 有序图 -> 有向边：若从顶点Vi到Vj的边有方向，则称这条边为有向边，也成为弧(Arc)，用有序偶<Vi,Vj>来表示，Vi称为弧尾，Vj称为弧头
 * 无序图 -> 无向边：**若顶点Vi到Vj之间的边没有方向，则称这条边为无向边(Edge)，用无序偶(Vi,Vj)来表示。
    一个图G = (V,E)由以下元素组成：
　　　　V：一组顶点。
　　　　E：一组边，链接V中的顶点
 */

import Stack from './Stack'
import Queue from './Queue'

export class Vertex {
  constructor(data) {
    this.data = data
    this.wasVisited = false
  }

  /**
   * toString method
   */
  toString() {
    // custom toString
    return this.data.toString()
  }
}

/**
 * 无需图
 */
export default class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Map();
  }

  /**
   * 添加顶点
   * @param {Vertex} v 
   */
  addVertices(v) {
    // 存放到顶点数组中
    this.vertices.push(v)
    // 生成一个还没有邻接顶点列表的Map，因为这时我们已经有顶点了，所以要生成以待使用
    this.adjList.set(v, [])
  }

  /**
   * 添加边
   * 这里有个小细节我们需要注意，哦对，这是为图添加边的方法。要注意的是，实际上，在代码中，我们是没有一个东西（变量或者其他什么）来代表边的
   * 我们为两个顶点之间添加一个边实际上只是为两个顶点的邻接表中加入彼此。这样就代表了这两个顶点是相邻的。
   * @param {Vertex} v 
   * @param {Vertex} w 
   */
  addEdge(v, w) {
    // 而这里我们所实现的图是无向图，所以需要给两个顶点所对应的邻接表加入彼此
    // 而如果是有向图的话，只需要根据方向添加一个就可以了
    this.adjList.get(v).push(w)
    this.adjList.get(w).push(v)
  }

  /**
   * toString
   * 为了方便观察，我们再实现一个toString方法
   * 没啥好说的，双重循环遍历两个数组
   * @return {string} 
   */
  toString() {
    let s = ""
    const length = this.vertices.length
    for (let i = 0; i < length; i++) {
      s += this.vertices[i].toString() + "->"
      let neighbors = this.adjList.get(this.vertices[i])
      const len = neighbors.length
      for (var j = 0; j < len; j++) {
        s += neighbors[j].toString() + '  '
      }
      s += '\n'
    }
    return s
  }

  /**
   * 初始化图中各顶点的状态（颜色）的私有方法，并返回该状态数组
   * init: white
   * wait: gray 
   * handled: black
   */
  _initializeColor() {
    let color = []
    const length = this.vertices.length
    for (var i = 0; i < length; i++) {
      color[this.vertices[i]] = 'white'
    }
    return color
  }

  /**
   * 简单的广度优先搜索算法，传入参数v是图中的某一个顶点，从此顶点开始探索整个图
   * @param {Vertex} v 
   * @param {function} callback 
   */
  bfs(v, callback) {
    // 为color状态数组赋值，初始化一个队列    
    const color = this._initializeColor()
    const queue = new Queue()

    // 将我们传入的顶点v入队。    
    queue.enqueue(v)
    // 如果队列非空，也就是说队列中始终有已发现但是未探索的顶点，那么执行逻辑
    while (!queue.isEmpty()) {
      // 队列遵循先进先出的原则，所以我们声明一个变量来暂时保存队列中的第一个顶点元素
      var u = queue.dequeue()
      // adjList是我们的邻接表，从邻接表中拿到所有u的邻接顶点
      const neighbors = this.adjList.get(u)
      const neighborsLen = neighbors.length
      // 并把状态数组中的u的状态设置未已发现但是未完全探索的灰色状态
      color[u] = 'grey'
      // 我们循环当前的u的所有的邻接顶点，并循环访问每一个邻接顶点并改变它的状态为灰色
      for (let i = 0; i < neighborsLen; i++) {
        let w = neighbors[i];
        if (color[w] === "white") {
          color[w] = 'grey'
          // 入队每一个w，这样while循环会在队列中没有任何元素，也就是完全访问所有顶点的时候结束    
          queue.enqueue(w)
        }
      }
      // 完全访问后设置color状态
      color[u] = 'black'
      // 如果存在回调函数，那么就执行回掉函数
      if (callback) {
        callback(u)
      }
    }
  }

  /**
   * 改进后计算最短路径的 BFS
   * 其实这里改进后的BFS并没有什么特别复杂，只是在原有的 bfs 的基础上，增加了一些需要计算和储存的状态值。
   * 也就是我们在函数结束后所返回的
   * @param {Vertex} v 
   */
  BFS(v) {
    // d 是你传入的顶点 v 距离每一个顶点的距离（这里的距离仅为边的数量）
    // pred 就是当前顶点沿着路径找到的前一个顶点是什么。没有就是null
    const color = this._initializeColor()
    const queue = new Queue()
    const d = []
    const pred = []

    // 我们把v入队。
    queue.enqueue(v)
    const length = this.vertices.length

    // 初始化距离和前置点数组。一个都为0，一个都为null，无需解释。
    for (let i = 0; i < length; i++) {
      d[this.vertices[i]] = 0;
      pred[this.vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      const neighbors = this.adjList.get(u)
      const length = neighbors.length
      color[u] = 'grey';

      for (let i = 0; i < length; i++) {
        let w = neighbors[i]
        if (color[w] === "white") {
          color[w] = 'grey'
          // 到这里都和bfs方法是一样的，只是多了下面这两个
          // 这里容易让人迷惑的是 w 和 u 分别是啥？弄清楚了其实也就没啥了
          // u 是队列中出列的一个顶点，也就是通过 u 来对照邻接表找到所有的 w
          // 那么因为是d（距离，初始为0）。所以我们只要在 d 的数组中 w 的值设为比u大1也就是d[u] + 1就可以了
          d[w] = d[u] + 1
          // 而这个就不用说了，理解了上面的，这个自然就很好懂了。
          pred[w] = u
          // 这里可能大家会问，循环不会重复加入么？不会！
          // 注意看这里if (color[w] === "white")这句，如果是white状态才会执行后面的逻辑，
          // 而进入逻辑后，状态就随之改变了，不会再次访问到访问过的顶点。
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }
    return {
      distances: d,
      predecessors: pred
    }
  }

  /**
   * 深度优先搜索
   * 这个没啥东西大家自己看一下就可以了
   * @param {function} callback 
   */
  dfs(callback) {
    const color = this._initializeColor()
    const length = this.vertices.length

    for (var i = 0; i < length; i++) {
      if (color[this.vertices[i]] === 'white') {
        // 这里调用我们的私有方法
        this.dfsVisit(this.vertices[i], color, callback)
      }
    }
  }

  /**
   * 深度优先搜索私有方法
   * 从dfs中传入的三个参数
   * @param {Vertex} u 
   * @param {array} color 
   * @param {function} callback 
   */
  _dfsVisit(u, color, callback) {
    // 改变u的颜色状态
    color[u] = 'grey'

    if (callback) {
      callback(u)
    }
    // 获取所有u的邻接顶点
    const neighbors = this.adjList.get(u)
    const length = neighbors.length
    // 循环    
    for (let i = 0; i < length; i++) {
      //w 为 u 的每一个邻接顶点的变量
      const w = neighbors[i]
      // 如果是白色的我们就递归调用 dfsVisit
      if (color[w] === 'white') {
        this.dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }

  /**
   * 改进后的DFS，其实也就是加入了更多的概念和要记录的值
   * @return {object}
   {
      discovery: d, // 发现一个顶点所用的时间
      finished: f, // 完全探索一个顶点所用的时间
      predecessors: p // 前溯点
    }
   */
  DFS() {
    const color = this._initializeColor()
    const d = []
    const f = []
    const p = []

    // 初始化时间为0;
    const timer = { _time: 0 }
    const length = this.vertices.length

    // 初始化所有需要记录的对象的值/
    for (var i = 0; i < length; i++) {
      f[this.vertices[i]] = 0;
      d[this.vertices[i]] = 0;
      p[this.vertices[i]] = null;
    }


    for (let i = 0; i < length; i++) {
      if (color[this.vertices[i]] === 'white') {
        this._DFSVisit(this.vertices[i], color, d, f, p, timer);
      }
    }

    return {
      discovery: d, // 发现一个顶点所用的时间
      finished: f, // 完全探索一个顶点所用的时间
      predecessors: p // 前溯点
    }
  }

  /**
   * @param {Vertex} u 
   * @param {array} color 
   * @param {array} d 
   * @param {array} f 
   * @param {array} p 
   * @param {object} { _timer: 0 } cache time, should be reference type.
   */
  _DFSVisit(u, color, d, f, p, timer) {
    color[u] = 'grey'
    d[u] = ++timer._time

    const neighbors = this.adjList.get(u)
    const length = neighbors.length
    for (let i = 0; i < length; i++) {
      let w = neighbors[i]
      if (color[w] === 'white') {
        p[w] = u
        this._DFSVisit(w, color, d, f, p, timer);
      }
    }

    color[u] = 'black'
    f[u] = ++timer._time
  }

  /**
   * 查找最短路径 to TOP
   * return latest top
    {
      distances: [A: 0, B: 1, C: 1, D: 1, E: 2, F:2,G:2,H:2,I:3],
      predecessors: [A: null, B: "A", C: "A", D: "A", E: "B", F:"B",G:"C",H:"D",I:"E"]
    }
   * @return {array}
   */
  shortestPathAll() {
    const shortestPath = this.BFS(this.vertices[0])
    const length = this.vertices.length
    const resArr = []

    for (let i = 1; i < length; i++) {
      let fromVertex = this.vertices[0]
      // 到达的定点不定
      const toVertex = this.vertices[i]
      //声明路径为一个初始化的栈。
      const path = new Stack()
      for (let v = toVertex; v !== fromVertex; v = shortestPath.predecessors[v]) {
        if (v) { // null
          path.push(v)
        } else {
          fromVertex = null
          break
        }
      }
      fromVertex && path.push(fromVertex)
      resArr.push(path)
    }
    return resArr
  }

  /**
   * get shortest path
   * @param {Vertex} from 
   * @param {Vertex} to 
   * @return {Stack}
   */
  shortestPath(from, to) {
    const shortestPath = this.BFS(this.vertices[0])
    const toVertex = to
    //声明路径为一个初始化的栈。
    const path = new Stack()
    for (let v = toVertex; v !== from; v = shortestPath.predecessors[v]) {
      if (v) {
        path.push(v)
      } else {
        return path
      }
    }
    path.push(from)
    return path
  }

  /**
   * 拓扑排序 https://www.jianshu.com/p/f10b89f76389
   * 拓扑排序是一个有向无环图的所有顶点的线性序列，且该序列必须满足
   * - 每个顶点有且只出现一次
   * - 若存在一条从顶点 A 到顶点 B 的路径，那么在序列中顶点 A 出现在顶点 B 的前面
   * 有向无环图（DAG）才有拓扑排序，非DAG图没有拓扑排序这一说
   * use discovery or finished key to order
   */
  toplogicalSort() {
    return this.DFS()
  }

}
