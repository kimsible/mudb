'use strict'

const { open, save, drop } = require('./storage')
const Mapper = require('./Mapper')

module.exports = {
  open: async path => {
    let data = await open(path)
    class Db extends Mapper {
      save () {
        return save(path)(this.data)
      }
    }
    return new Db(data)
  },
  drop
}
