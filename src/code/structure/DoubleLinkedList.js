class ListNode {
  constructor(key) {
    // 指向前一个节点
    this.prev = null;
    // 指向后一个节点
    this.next = null;
    // 节点的数据(或者用于查找的键)
    this.key = key;
  }
}

/**
 * 双向链表
 */
class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null
    this.length = 0
  }

  static createNode(key) {
    return new ListNode(key);
  }

  /**
   * 头部添加
   * @param {{}} node 
   */
  insert(node) {
    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    } else {
      this.tail = node
    }
    this.head = node;
    this.length++
  }

  /**
   * 尾部添加
   * @param {{}}} node 
   */
  append(node) {
    let current

    if (this.head === null) {
      this.head = node
      this.tail = node
    } else {
      current = this.tail
      current.next = node
      node.prev = current
      this.tail = node
    }
    this.length++
  }

  insertAt(position, node) {
    if (position >= 0 && position <= this.length) {
      let current = this.head,
        previous,
        index = 0

      if (position === 0) {
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = current
          current.prev = node
          this.head = node
        }
      } else if (position === this.length) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
      }

      this.length++

      return true
    } else {
      return false
    }
  }

  find(key) {
    let node = this.head;
    while (node !== null && node.key !== key) {
      node = node.next;
    }
    return node;
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

  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head,
        previous,
        index = 0

      if (position === 0) {
        this.head = current.next

        if (this.length === 1) {
          this.tail = null
        } else {
          this.head.prev = null
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
      }

      this.length--

      return current.element
    } else {
      return null
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

export default DoubleLinkedList

export {
  ListNode
}