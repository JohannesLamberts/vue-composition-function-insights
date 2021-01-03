import type { Visitor } from '@babel/traverse'
import { WITH_DEVTOOLS_FN_NAME } from './config'
import { Babel } from './types'
import { createArrowFunctionExpressionVisitor } from './visitors/ArrowFunctionExpression'
import { createFunctionExpressionVisitor } from './visitors/FunctionExpression'
import { createVariableDeclaratorVisitor } from './visitors/VariableDeclaration'

const createWithDevtoolsVisitor = (babel: Babel): Visitor => ({
  VariableDeclaration: createVariableDeclaratorVisitor(babel),
  ArrowFunctionExpression: createArrowFunctionExpressionVisitor(babel),
  FunctionExpression: createFunctionExpressionVisitor(babel),
})

export default function ssrRefPlugin(babel: Babel) {
  const visitor: Visitor = {
    CallExpression(path) {
      if (!('name' in path.node.callee)) return

      if (path.node.callee.name !== WITH_DEVTOOLS_FN_NAME) {
        return
      }

      path.traverse(createWithDevtoolsVisitor(babel))
    },
  }
  return { visitor }
}
