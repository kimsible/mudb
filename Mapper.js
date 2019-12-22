'use strict'

const isMatchWith = require('lodash.ismatchwith')

module.exports = class Mapper {
  constructor (data) {
    this.data = data
  }

  get size () {
    return this.data.length
  }

  get (query) {
    return this.data.reduce((acc, item) => {
      if (isMatchWith(item, query, (src, str) => src.match(str))) {
        return [...acc, item]
      } else {
        return acc
      }
    }, [])
  }

  put (item) {
    this.data.push(item)
    return this
  }

  del (query) {
    const index = this.data.findIndex(item => isMatchWith(item, query, (src, str) => src.match(str)))
    if (index > -1) {
      this.data.splice(index, 1)
    }
    return this
  }
}
