import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'
import {
  isWrapperNodePath,
  wrapFunctionExecution,
} from '../wrapper/functionExecution'

export const createFunctionExpressionVisitor = (
  babel: Babel,
): Visitor['FunctionExpression'] => {
  return function FunctionExpression(path) {
    // prevent infinite loop
    if (isWrapperNodePath(path)) {
      return
    }

    wrapFunctionExecution(babel, path)
  }
}
