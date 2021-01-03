import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'

const DEVTOOLS_FN_IDENTIFIER = 'withDevtools.__wrapArrowFunctionDeclaration'

export const createArrowFunctionExpressionVisitor = ({
  types: t,
}: Babel): Visitor['ArrowFunctionExpression'] => {
  return function ArrowFunctionExpression(path) {
    // prevent infinite loop
    if (
      path.parent.type === 'CallExpression' &&
      path.parent.callee.type === 'Identifier' &&
      ['withDevtools', DEVTOOLS_FN_IDENTIFIER].includes(path.parent.callee.name)
    ) {
      return
    }

    let identifier: string | null = null

    if (t.isVariableDeclarator(path.parent) && 'name' in path.parent.id) {
      identifier = path.parent.id.name
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
