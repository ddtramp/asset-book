/**
 * Binary Search Tree(BST) 二叉树搜索树
 */
export class Node {
  constructor(key, data) {
    this.key = key
    this.data = data
    this.prev = null
    this.next = null
  }
}


// 通过先序遍历方式遍历树中的所有节点
const preOrderTraverseNode = (node, callback) => {
  if (node !== null) {
    callback(node.element);
    preOrderTraverseNode(node.prev, callback);
    preOrderTraverseNode(node.next, callback);
  }
}

  // 通过中序遍历方式遍历树中的所有节点
const inOrderTraverseNode = (node, callback) => {
  if (node !== null) {
    inOrderTraverseNode(node.prev, callback);
    callback(node.element);
    inOrderTraverseNode(node.next, callback);
  }
}

// 通过后序遍历方式遍历树中的所有节点
const postOrderTraverseNode = (node, callback) => {
  if (node !== null) {
    postOrderTraverseNode(node.prev, callback);
    postOrderTraverseNode(node.next, callback);
    callback(node.element);
  }
}

  
const minNode = node => {
  if (node === null) return null;

  while (node && node.prev !== null) {
      node = node.prev;
  }
  return node;
}

const maxNode = node => {
  if (node === null) return null;

  while (node && node.next !== null) {
      node = node.next;
  }
  return node;
}

const searchNode = (node, key) => {
  if (node === null) {
    return null
  }

  if (key < node.key) {
    return searchNode(node.prev, key)
  } else if (key > node.key) {
    return searchNode(node.next, key)
  } else {
    return node
  }
}

const removeNode = (node, key) => {
  if (node === null) {
    return null
  }

  if (key < node.key) {
    node.prev = removeNode(node.prev, key);
    return node
  } else if (key > node.key) {
    node.next = removeNode(node.next, key);
    return node
  } else {
      // 第一种情况：一个叶子节点（没有子节点）
      if (node.prev === null && node.next === null) {
        node = null
        return node
      }
      // 第二种情况：只包含一个子节点
      if (node.prev === null) {
        node = node.next
        return node
      }
      else if (node.next === null) {
        node = node.prev
        return node
      }

      // 第三种情况：有两个子节点
      let aux = minNode(node.next)
      node.key = aux.key
      node.next = removeNode(node.next, aux.key)
      return node
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  /**
   * inset
   * @param {number|string|Symbol} key 
   * @param {*} data 
   */
  insert(key, data) {
    let newNode = new Node(key, data);

    if (this.root === null) {
        this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  /**
   * inset Node
   * @param {*} node 
   * @param {*} newNode 
   */
  insertNode (node, newNode) {
    if (newNode.key < node.key) {
        if (node.prev === null) {
          node.prev = newNode
        } else {
          this.insertNode(node.prev, newNode)
        }
    }
    else {
        if (node.next === null) {
          node.next = newNode
        } else {
          this.insertNode(node.next, newNode)
        }
    }
}

  search(key) {
    return searchNode(this.root, key)
  }

  preOrderTraverse (callback) {
    preOrderTraverseNode(this.root, callback);
  }

  inOrderTraverse (callback) {
    inOrderTraverseNode(this.root, callback);
  }

  postOrderTraverse (callback) {
    postOrderTraverseNode(this.root, callback);
  }

  min () {
    return minNode(this.root)
  }

  max () {
    return maxNode(this.root)
  }

  remove (key) {
    this.root = removeNode(this.root, key)
  }

}

export default BinarySearchTree