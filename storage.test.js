'use strict'

import test from 'ava'
import fs from 'fs'
import { save, open } from './storage'

const { access, readFile, writeFile, unlink } = fs.promises
const name = 'storage.test'
const data = [{ test: 'test' }, 'test']

test('save', async t => {
  await save(`${name}-save.json`)(data)
  const saved = JSON.parse(await readFile(`${name}-save.json`))
  t.deepEqual(saved, data)
})

test('open-new', async t => {
  const opened = await open(`${name}-open-new.json`)
  await access(`${name}-open-new.json`, fs.constants.F_OK)
  t.deepEqual(opened, [])
})

test('open-existing', async t => {
  await writeFile(`${name}-open-existing.json`, JSON.stringify(data))
  const opened = await open(`${name}-open-existing.json`)
  t.deepEqual(opened, data)
})

test.after.always(async t => {
  await unlink(`${name}-save.json`).catch(() => {})
  await unlink(`${name}-open-new.json`).catch(() => {})
  await unlink(`${name}-open-existing.json`).catch(() => {})
})
