import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'
import {
  isWrapperNodePath,
  wrapFunctionExecution,
} from '../wrapper/functionExecution'

export const createArrowFunctionExpressionVisitor = (
  babel: Babel,
): Visitor['ArrowFunctionExpression'] => {
  return function ArrowFunctionExpression(path) {
    // prevent infinite loop
    if (isWrapperNodePath(path)) {
      return
    }

    wrapFunctionExecution(babel, path)
  }
}
