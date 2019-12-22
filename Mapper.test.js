'use strict'

import test from 'ava'
import Mapper from './Mapper'

const data = [
  { name: 'marvin', body: 'lorem ipsum' },
  { name: 'toto', body: 'lorem ipsum' }
]

const mapper = data => new Mapper(data)

test('size', size, ['a', 'b'], 2)
test.serial('get', get, { body: 'lorem ipsum' }, [{ name: 'marvin', body: 'lorem ipsum' }, { name: 'toto', body: 'lorem ipsum' }])
test.serial('get-regexp', get, { name: /^marvi/ }, [{ name: 'marvin', body: 'lorem ipsum' }])
test.serial('put', put, { key: 'item', body: 'lorem ipsum' })
test.serial('del', del, { key: 'item' })

function size (t, input, expected) {
  t.is(mapper(input).size, expected)
}

function get (t, input, expected) {
  t.deepEqual(mapper(data).get(input), expected)
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
