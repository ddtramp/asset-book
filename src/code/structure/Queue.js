class Queue  {
  constructor() {
    this._items = []
  }

  enqueue (item) {
    this._items.push(item)
  }

  dequeue () {
    return this._items.shift()
  }

  head () {
    return this._items[0]
  }

  tail () {
    return this._items[this._items.length - 1]
  }

  isEmpty () {
    return !this._items.length
  }

  size () {
    return this._items.length
  }

  clear () {
    this._items = []
  }
}

export default Queue