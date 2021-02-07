import type { Visitor } from '@babel/traverse'
import { VariableDeclarator } from '@babel/types'
import { IDENTIFIER } from '../config'
import { Babel } from '../types'
import { isDefined } from '../utils'

function getConstIdentifiers(declaration: VariableDeclarator): string[] {
  if ('properties' in declaration.id) {
    return declaration.id.properties
      .slice()
      .reverse()
      .map((property) => {
        if (!('value' in property && 'name' in property.value)) {
          return
        }
        return property.value.name
      })
      .filter(isDefined)
  }

  if ('elements' in declaration.id) {
    return declaration.id.elements
      .slice()
      .reverse()
      .map((element) => {
        if (!(element && 'name' in element)) {
          return
        }
        return element.name
      })
      .filter(isDefined)
  }

  if (!('name' in declaration.id)) {
    return []
  }

  return [declaration.id.name]
}

export const createVariableDeclaratorVisitor = ({
  types: t,
}: Babel): Visitor['VariableDeclaration'] => {
  return function VariableDeclaration(path) {
    if (path.node.kind !== 'const') {
      return
    }

    path.node.declarations
      .map(getConstIdentifiers)
      .flat()
      .filter((identifier) => ![IDENTIFIER.BOUND_CONTEXT].includes(identifier))
      .forEach((identifier) => {
        path.insertAfter(
          t.callExpression(t.identifier(IDENTIFIER.REGISTER_CONST), [
            t.stringLiteral(identifier),
            t.identifier(identifier),
          ]),
        )
      })
  }
}
