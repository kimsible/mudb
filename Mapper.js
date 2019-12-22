'use strict'

const isMatchWith = require('lodash.ismatchwith')
const compare = (src, str) => src.match(str)

module.exports = class Mapper {
  constructor (data) {
    this.data = data
  }

  get size () {
    return this.data.length
  }

  get (...queries) {
    return this.data.reduce((acc, item) => {
      const matched = queries.filter(query => isMatchWith(item, query, compare))
      if (matched.length > 0) {
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
    const index = this.data.findIndex(item => isMatchWith(item, query, compare))
    if (index > -1) {
      this.data.splice(index, 1)
    }
    return this
  }
}
