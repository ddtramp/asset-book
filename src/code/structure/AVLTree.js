/**
 * AVL——Adelson-Velskii-Landi 自平衡二叉搜索树
 */
import BinarySearchTree, { Node } from './BSTree'

export {
  Node
}

/* eslint-disable no-useless-constructor */

class AVLTree extends BinarySearchTree {
  constructor() {
    super()
  }

  // 计算节点的高度
  getNodeHeight(node) {
    if (node === null) return 0;
    return Math.max(this.getNodeHeight(node.prev), this.getNodeHeight(node.next)) + 1
  };

  // 获取节点的平衡因子

  /**
   * LL旋转: 向右旋转
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                         /   / \
   *   c   d                       f   d   e
   *  /
   * f
   *
   * @param node Node<T>
   */
  rotationLL(node) {
    let tmp = node.prev
    node.prev = tmp.next
    tmp.next = node
    return tmp
  }

  /**
   * RR旋转: 向左旋转
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \   \
   *     d   e                      c   d   f
   *          \
   *           f
   *
   * @param node Node<T>
   */
  rotationRR(node) {
    let tmp = node.next
    node.next = tmp.prev
    tmp.prev = node
    return tmp
  }

  /**
   * LR旋转: 先向左旋转，然后再向右旋转
   * @param node Node<T>
   */
  rotationLR(node) {
    node.prev = this.rotationRR(node.prev)
    return this.rotationLL(node)
  }

  /**
   * RL旋转: 先向右旋转，然后再向左旋转
   * @param node Node<T>
   */
  rotationRL(node) {
    node.next = this.rotationLL(node.next)
    return this.rotationRR(node)
  }

  insert(key) {
    super.insert(key)

    // 左子树高度大于右子树高度
    if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
      if (key < this.root.prev.key) {
        this.root = this.rotationLL(this.root)
      }
      else {
        this.root = this.rotationLR(this.root)
      }
    }
    // 右子树高度大于左子树高度
    else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
      if (key > this.root.next.key) {
        this.root = this.rotationRR(this.root)
      }
      else {
        this.root = this.rotationRL(this.root)
      }
    }
  }

  remove(key) {
    super.remove(key)

    // 左子树高度大于右子树高度
    if (this.getNodeHeight(this.root.prev) - this.getNodeHeight(this.root.next) > 1) {
      if (key < this.root.prev.key) {
        this.root = this.rotationLL(this.root)
      }
      else {
        this.root = this.rotationLR(this.root)
      }
    }
    // 右子树高度大于左子树高度
    else if (this.getNodeHeight(this.root.next) - this.getNodeHeight(this.root.prev) > 1) {
      if (key > this.root.next.key) {
        this.root = this.rotationRR(this.root)
      }
      else {
        this.root = this.rotationRL(this.root)
      }
    }
  }
}

export default AVLTree