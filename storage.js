'use strict'

const { writeFile, readFile, unlink } = require('fs').promises
const { readFileSync, writeFileSync } = require('fs')

module.exports = {
  drop: path => unlink(path),
  save: path => data => writeFile(path, JSON.stringify(data)),
  openSync,
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

function openSync (path) {
  try {
    return JSON.parse(readFileSync(path))
  } catch (e) {
    writeFileSync(path, '[]')
    return []
  }
}
