class ListNode {
  constructor(key) {
    this.next = null;
    this.key = key;
  }
}

class LinkedList {
  constructor() {
    // 单项链表
    this.head = null;
    this.length = 0;
  }

  static createNode(key) {
    return new ListNode(key);
  }

  // 往头部插入数据
  insert(node) {
    // 如果head后面有指向的节点
    if (this.head) {
      node.next = this.head;
    } else {
      node.next = null;
    }
    this.head = node;
    this.length++;
  }

  append(node) { // 向链表尾部加一个元素
    let current

    if (this.head === null) {
      this.head = node
    } else {
      current = this.head

      while (current.next) {
        current = current.next
      }

      current.next = node
    }

    this.length++
  }

  find(key) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
  }

  removeAt (position = 0) { // 移除指定位置的元素
    if (position > -1 && position < this.length) {
      let current = this.head
      let previous
      let index = 0

      if (position === 0) {
        this.head = current.next
      } else {
        while (index++ < position) { 
          previous = current
          current = current.next
        }
        previous.next = current.next
      }

      this.length--

      return current.key
    } else {
      return null
    }
  }

  insertAt(position, node) { // 在任意位置插入元素
    if (position >= 0 && position <= this.length) {
      let current = this.head,
        previous,
        index = 0

      if (position === 0) {
        node.next = current
        this.head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }

      this.length++

      return true
    } else {
      return false
    }
  }

  toString() {
    let current = this.head,
      string = ''

    while (current) {
      string += current.element + (current.next ? ',' : '')
      current = current.next
    }
    return string
  }

  indexOf(key) {
    let current = this.head,
      index = 0

    while (current) {
      if (key === current.key) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  remove(node) {
    if (this.length === 0) {
      throw new Error({
        message: 'node is undefined'
      })
    }

    if (node === this.head) {
      this.head = node.next;
      this.length--;
      return;
    }

    let prevNode = this.head;

    while (prevNode.next !== node) {
      prevNode = prevNode.next;
    }

    if (node.next === null) {
      prevNode.next = null;
    }
    if (node.next) {
      prevNode.next = node.next;
    }
    this.length--;
  }

  isEmpty() {
    return this.length === 0
  }

  size () {
    return this.length
  }

  getHead() {
    return this.head
  }

}

export default LinkedList

export {
  ListNode
}