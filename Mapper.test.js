'use strict'

import test from 'ava'
import Mapper from './Mapper'

const data = [
  { name: 'marvin', body: 'lorem ipsum', date: 10000 },
  { name: 'toto', body: 'lorem ipsum', date: 27000, active: true }
]

const mapper = data => new Mapper(data)

test('size', size, ['a', 'b'], 2)
test.serial('get-string', get, { body: 'lorem ipsum' }, data)
test.serial('get-regexp', get, { name: /^marvi/ }, [data[0]])
test.serial('get-boolean', get, { active: true }, [data[1]])
test.serial('get-function', get, { date: date => date < 20000 }, [data[0]])
test.serial('get-multiple', getMultiple, { name: /^marvi/ }, { name: 'toto' }, data)
test.serial('get-filterKeys', getMultiple, ['date', 'body'], { name: /^marvi/ }, [{ body: 'lorem ipsum', date: 10000 }])
test.serial('put', put, { key: 'item', body: 'lorem ipsum' })
test.serial('del', del, { key: 'item' })

function size (t, input, expected) {
  t.is(mapper(input).size, expected)
}

function get (t, input, expected) {
  t.deepEqual(mapper(data).get(input), expected)
}

function getMultiple (t, input, input2, expected) {
  t.deepEqual(mapper(data).get(input, input2), expected)
}

function put (t, input) {
  const ref = mapper(data)
  const expected = ref.size + 1
  t.deepEqual(ref.put(input).size, expected)
  t.deepEqual(ref.get(input), [input])
}

function del (t, input) {
  const ref = mapper(data)
  const expected = ref.size - 1
  t.deepEqual(ref.del(input).size, expected)
  t.deepEqual(ref.get(input), [])
}
