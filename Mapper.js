'use strict'

const isMatch = require('lodash.ismatch')

module.exports = class Mapper {
  constructor (data) {
    this.data = data
  }

  get size () {
    return this.data.length
  }

  get (query) {
    return this.data.reduce((acc, item) => {
      if (isMatch(item, query)) {
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
    const index = this.data.findIndex(item => isMatch(item, query))
    if (index > -1) {
      this.data.splice(index, 1)
    }
    return this
  }
}
