import { NodePath } from '@babel/traverse'
import {
  ArrowFunctionExpression,
  BlockStatement,
  FunctionDeclaration,
  FunctionExpression,
  ObjectMethod,
} from '@babel/types'
import { IDENTIFIER } from '../config'
import { Babel } from '../types'

type Path =
  | NodePath<ArrowFunctionExpression>
  | NodePath<FunctionExpression>
  | NodePath<FunctionDeclaration>
  | NodePath<ObjectMethod>

export function isWrapperNodePath(path: Path) {
  return (
    path.parent.type === 'CallExpression' &&
    path.parent.callee.type === 'Identifier' &&
    [IDENTIFIER.WITH_DEVTOOLS, IDENTIFIER.WRAP_FUNCTION].includes(
      path.parent.callee.name,
    )
  )
}

export function wrapFunctionExecution({ types: t }: Babel, path: Path) {
  let identifier: string | null = null

  const { node } = path

  if ('id' in node && node.id && 'name' in node.id) {
    identifier = node.id.name
  } else if (t.isVariableDeclarator(path.parent) && 'name' in path.parent.id) {
    identifier = path.parent.id.name
  } else if ('key' in node && 'name' in node.key) {
    identifier = node.key.name
  }

  if (!identifier) {
    return
  }

  const body = path.get('body') as NodePath<BlockStatement>

  body.replaceWith(
    t.blockStatement([
      t.returnStatement(
        t.callExpression(t.identifier(IDENTIFIER.WRAP_FUNCTION), [
          t.arrowFunctionExpression([], body.node, node.async),
          t.objectExpression([
            t.objectProperty(
              t.identifier('arguments'),
              t.callExpression(t.identifier('Array.from'), [
                t.identifier('arguments'),
              ]),
            ),
            t.objectProperty(
              t.identifier('identifier'),
              identifier ? t.stringLiteral(identifier) : t.nullLiteral(),
            ),
          ]),
        ]),
      ),
    ]),
  )
}
