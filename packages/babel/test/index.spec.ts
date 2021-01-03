import pluginTester, { TestObject } from 'babel-plugin-tester'
import plugin from '../src'

function inOutFixture(name: string) {
  return {
    fixture: `__fixtures__/${name}/code.js`,
    outputFixture: `__fixtures__/${name}/output.js`,
  }
}

function fixtureTest(name: string, overrides: TestObject = {}) {
  return {
    title: name,
    ...inOutFixture(name),
    ...overrides,
  }
}

pluginTester({
  plugin,
  pluginName: 'withDevtools',
  filename: __filename,
  tests: [
    fixtureTest('register-state'),
    fixtureTest('register-state-array-destruct'),
    fixtureTest('register-state-obj-destruct'),
    fixtureTest('without-devtools'),
    fixtureTest('wrap-arrow-function-expression'),
    fixtureTest('wrap-function-expression'),
  ],
})
