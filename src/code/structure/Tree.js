import Queue from './Queue'

class Node {
  constructor (data) {
    this.data = data
    this.parent = null
    this.children = null
  }
}

const _isFunction = params => {
  return typeof params === 'function'
}

const isArray = params => {
  return Array.isArray(params)
}

class Tree {
  constructor(data) {
    this._root = new Node(data)
  }

  /**
   * Depth First Search(DFS) 深度优先搜索
   * @param {function} callback 
   */
  traverseDF(callback) {
    if (!_isFunction(callback)) {
      throw new Error({
        message: 'type error, params callback must be function'
      })
    }
    // step 1 recurse function
    (function recurse(currentNode) {
      // step 2
      if (isArray(currentNode.children)) {
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
          // step 3
          recurse(currentNode.children[i])
        }
      }
     
      // step 4
      callback(currentNode)
      // 首先执行
    })(this._root)
  }

  /**
   * Breadth First Search(BFS) 宽度优先搜索
   * @param {function} callback 
   */
  traverseBF(callback) {
    if (!_isFunction(callback)) {
      throw new Error({
        message: 'type error, params callback must be function'
      })
    }
    const queue = new Queue()
    queue.enqueue(this._root)
    let currentNode = queue.dequeue()

    while(currentNode){
        for (let i = 0, length = currentNode.children.length; i < length; i++) {
            queue.enqueue(currentNode.children[i]);
        }
        callback(currentNode);
        currentNode = queue.dequeue();
    }
  }

  /**
   * search method
   * @param {function}} callback 
   * @param {function} traversal 
   * @example
    tree.contains(node => {
        if (node.data === 'two') {
            console.log(node)
        }
    }, tree.traverseBF)
   */
  contains(callback, traversal = this.traverseDF, ...rest) {
    traversal.call(this, callback, ...rest);
  }

  /**
   * append data
   * @param {any} data 
   * @param {any} toData 
   * @param {function} traversal default this.traverseDF
   */
  add(data, toData, traversal) {
    let child = new Node(data)
    let parent = null
    /**
     * simple find parent 
     * @param {{}} node 
     */
    const defaultCallback = node => {
      if (node.data === toData) {
          parent = node;
      }
    }
    // exec search method
    this.contains(defaultCallback, traversal = this.traverseDF);
    
    if (parent) {
      if (!isArray(parent.children)) {
        parent.children = []
      }
      parent.children.push(child);
      child.parent = parent;
    } else {
      throw new Error('Cannot add node to a non-existent parent.');
    }
  }

  /**
   * find index
   * @param {*} node 
   * @param {*} data 
   */
  findIndex(node, data) {
    let index;
    const length = node.length
    for (let i = 0; i < length; i++) {
        if (node[i].data === data) {
            index = i;
        }
    }
    return index;
  }

  remove (data, fromData, traversal = this.traverseDF) {
    let parent = null 
    let childToRemove = null 
    let index
      
    const callback = node => {
        if (node.data === fromData) {
            parent = node;
        }
    }
    this.contains(callback, traversal)

    if (parent) {
        index = this.findIndex(parent.children, data)
        if (index === undefined) {
            throw new Error('Node to remove does not exist.')
        } else {
            childToRemove = parent.children.splice(index, 1)
        }
    } else {
        throw new Error('Parent does not exist.')
    }
    return childToRemove;
  }


}

export default Tree