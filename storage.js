'use strict'

const { writeFile, readFile, unlink } = require('fs').promises

module.exports = {
  drop: path => unlink(path),
  save: path => data => writeFile(path, JSON.stringify(data)),
  open
}

async function open (path) {
  try {
    return JSON.parse(await readFile(path))
  } catch (e) {
    await writeFile(path, '[]')
    return []
  }
}
