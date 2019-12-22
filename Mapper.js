'use strict'

const isMatchWith = require('lodash.ismatchwith')
const compare = (src, obj) => {
  if (typeof obj === 'function') {
    return obj(src)
  }
  if (['boolean', 'number', 'string'].includes(typeof obj)) {
    return obj === src
  }
  if (obj instanceof RegExp) {
    return obj.test(src)
  }
}

module.exports = class Mapper {
  constructor (data) {
    this.data = data
  }

  get dump () {
    return this.data
  }

  get size () {
    return this.data.length
  }

  get (...filters) {
    const keys = Array.isArray(filters[0]) && filters.shift()
    return this.data.reduce((accData, item) => {
      const matched = filters.filter(filter => isMatchWith(item, filter, compare))
      if (matched.length > 0) {
        const reducedItem = keys && keys.reduce((accItem, key) => ({ ...accItem, [key]: item[key] }), {})
        return [...accData, reducedItem || item]
      } else {
        return accData
      }
    }, [])
  }

  put (item) {
    this.data.push(item)
    return this
  }

  del (filter) {
    const index = this.data.findIndex(item => isMatchWith(item, filter, compare))
    if (index > -1) {
      this.data.splice(index, 1)
    }
    return this
  }
}
