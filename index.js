'use strict'

const { open, openSync, save, drop } = require('./storage')
const Mapper = require('./Mapper')

module.exports = {
  open: async path => {
    const data = await open(path)
    class Db extends Mapper {
      save () {
        return save(path)(this.data)
      }
    }
    return new Db(data)
  },
  openSync: path => {
    const data = openSync(path)
    class Db extends Mapper {
      save () {
        return save(path)(this.data)
      }
    }
    return new Db(data)
  },
  drop
}
