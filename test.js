'use strict'

import test from 'ava'
import mudb from '.'

const items = ['item-1', 'item-2', 'item-3']
const path = '/tmp/test.json'

test.serial('put item', async t => {
  const db = await mudb.open(path)
  await db.put(items[0]).save()
  const newDb = await mudb.open(path)
  t.deepEqual(newDb.get(items[0]), [items[0]])
})

test.serial('delete item', async t => {
  const db = await mudb.open(path)
  await db.del(items[0]).save()
  const newDb = await mudb.open(path)
  t.deepEqual(newDb.get(items[0]), [])
})

test.serial('put items', async t => {
  const db = mudb.openSync(path)
  await db.put(items[0]).put(items[1]).put(items[2]).save()
  const newDb = await mudb.open(path)
  t.deepEqual(newDb.size, 3)
  t.deepEqual(items.filter(item => newDb.get(item)), items)
})

test.serial('delete items', async t => {
  const db = mudb.openSync(path)
  await db.del(items[0]).del(items[1]).del(items[2]).save()
  const newDb = await mudb.open(path)
  t.deepEqual(newDb.size, 0)
  t.notDeepEqual(items.filter(item => newDb.get(item).length), items)
})

test.after.always(async () => {
  await mudb.drop(path).catch(() => {})
})
