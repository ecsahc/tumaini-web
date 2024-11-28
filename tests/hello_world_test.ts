import { test } from 'japa'

test('hello world!', (assert: { equal: (arg0: string, arg1: string) => void }) => {
  assert.equal('Hello World', 'Hello World')
})
