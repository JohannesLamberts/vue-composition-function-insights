import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'

const DEVTOOLS_FN_IDENTIFIER = 'withDevtools.__wrapFunctionExpression'

export const createFunctionExpressionVisitor = ({
  types: t,
}: Babel): Visitor['FunctionExpression'] => {
  return function FunctionExpression(path) {
    // prevent infinite loop
    if (
      path.parent.type === 'CallExpression' &&
      path.parent.callee.type === 'Identifier' &&
      ['withDevtools', DEVTOOLS_FN_IDENTIFIER].includes(path.parent.callee.name)
    ) {
      return
    }

    let identifier: string | null = null

    if (path.node.id && 'name' in path.node.id) {
      identifier = path.node.id.name
    }

    path.replaceWith(
      t.callExpression(t.identifier(DEVTOOLS_FN_IDENTIFIER), [
        path.node,
        t.objectExpression([
          t.objectProperty(
            t.identifier('identifier'),
            identifier ? t.stringLiteral(identifier) : t.nullLiteral(),
          ),
        ]),
      ]),
    )
  }
}
