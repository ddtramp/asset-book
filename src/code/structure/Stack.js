/**
 * 给定一个函数，输入目标数值和进制基数，输出对应的进制数（最大为16进制）
 * 分析：进制转换的本质——将目标值一次一次除以进制基数，得到的取整值为新目标值，记录下余数，直到目标值小于0，最后将余数逆序组合即可。利用栈，记录余数入栈，组合时出栈。
 */
class Stack {

  constructor() {
    this._items = []; // 储存数据
  }

  // 向栈内压入一个元素
  push(item) {
    this._items.push(item);
  }

  // 把栈顶元素弹出
  pop() {
    return this._items.pop();
  }

  // 返回栈顶元素
  peek() {
    return this._items[this._items.length - 1];

  }

  // 判断栈是否为空
  isEmpty() {
    return !this._items.length;
  }

  // 栈元素个数
  size() {
    return this._items.length;
  }

  // 清空栈
  clear() {
    this._items = [];
  }
}

export default Stack