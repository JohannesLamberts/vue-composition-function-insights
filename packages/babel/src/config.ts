const WITH_DEVTOOLS = 'withDevtools'
const BOUND_CONTEXT = '__withDevtoolsBoundContext'

export const IDENTIFIER = {
  WITH_DEVTOOLS,
  CREATE_BOUND_CONTEXT: `${WITH_DEVTOOLS}.__bindContext`,
  BOUND_CONTEXT,
  WRAP_FUNCTION: `${BOUND_CONTEXT}.wrapFunctionExecution`,
  REGISTER_CONST: `${BOUND_CONTEXT}.registerConst`,
}
