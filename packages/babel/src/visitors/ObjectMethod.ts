import type { Visitor } from '@babel/traverse'
import { Babel } from '../types'
import {
  isWrapperNodePath,
  wrapFunctionExecution,
} from '../wrapper/functionExecution'

export const createObjectMethodVisitor = (
  babel: Babel,
): Visitor['ObjectMethod'] => {
  return function ObjectMethod(path) {
    // prevent infinite loop
    if (isWrapperNodePath(path)) {
      return
    }

    wrapFunctionExecution(babel, path)
  }
}
