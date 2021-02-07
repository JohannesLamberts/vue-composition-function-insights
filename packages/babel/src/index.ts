import { NodePath } from '@babel/traverse'
import type { Visitor } from '@babel/traverse'
import {
  ArrowFunctionExpression,
  BlockStatement,
  CallExpression,
  FunctionExpression,
} from '@babel/types'
import assert from 'assert'
import { IDENTIFIER } from './config'
import { Babel } from './types'
import { createArrowFunctionExpressionVisitor } from './visitors/ArrowFunctionExpression'
import { createFunctionDeclarationVisitor } from './visitors/FunctionDeclaration'
import { createFunctionExpressionVisitor } from './visitors/FunctionExpression'
import { createObjectMethodVisitor } from './visitors/ObjectMethod'
import { createVariableDeclaratorVisitor } from './visitors/VariableDeclaration'

const createWithDevtoolsVisitor = (babel: Babel): Visitor => ({
  VariableDeclaration: createVariableDeclaratorVisitor(babel),
  ArrowFunctionExpression: createArrowFunctionExpressionVisitor(babel),
  FunctionExpression: createFunctionExpressionVisitor(babel),
  FunctionDeclaration: createFunctionDeclarationVisitor(babel),
  ObjectMethod: createObjectMethodVisitor(babel),
})

function assertIsCompositionFunction(
  babel: Babel,
  nodePath: NodePath<any>,
): asserts nodePath is
  | NodePath<FunctionExpression>
  | NodePath<ArrowFunctionExpression> {
  const { types: t } = babel

  assert(
    t.isArrowFunctionExpression(nodePath) || t.isFunctionExpression(nodePath),
    `Second argument of "withDevtools" is neither a "ArrowFunctionExpression", nor a "FunctionExpression"`,
  )
}

function insertBoundContext(babel: Babel, path: NodePath<CallExpression>) {
  const { types: t } = babel

  const compositionFunctionNodePath = path.get('arguments')[1]

  assertIsCompositionFunction(babel, compositionFunctionNodePath)

  const compositionFunctionBlock = compositionFunctionNodePath.get(
    'body',
  ) as NodePath<BlockStatement>

  compositionFunctionBlock.unshiftContainer(
    'body',
    t.variableDeclaration('const', [
      t.variableDeclarator(
        t.identifier(IDENTIFIER.BOUND_CONTEXT),
        t.callExpression(t.identifier(IDENTIFIER.CREATE_BOUND_CONTEXT), []),
      ),
    ]),
  )
}

export default function ssrRefPlugin(babel: Babel) {
  const visitor: Visitor = {
    CallExpression(path) {
      if (!('name' in path.node.callee)) return

      if (path.node.callee.name !== IDENTIFIER.WITH_DEVTOOLS) {
        return
      }

      insertBoundContext(babel, path)
      path.traverse(createWithDevtoolsVisitor(babel))
    },
  }
  return { visitor }
}
