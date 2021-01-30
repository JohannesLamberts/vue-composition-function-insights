import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'
import {
  isWrapperNodePath,
  wrapFunctionExecution,
} from '../wrapper/functionExecution'

export const createFunctionDeclarationVisitor = (
  babel: Babel,
): Visitor['FunctionDeclaration'] => {
  return function FunctionDeclaration(path) {
    // prevent infinite loop
    if (isWrapperNodePath(path)) {
      return
    }

    wrapFunctionExecution(babel, path)
  }
}
