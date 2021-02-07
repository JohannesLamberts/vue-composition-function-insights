export interface VarInsight {
  type: 'VarInsight'
  name: string
  value: any
}

export type Insight = VarInsight

type FunctionExceptionResult = {
  type: 'error'
  error: Error
}

type FunctionReturnResult = {
  type: 'return'
  value: any
}

export interface FunctionCallContext {
  arguments: any[]
  identifier: string | null
}

export type FunctionCallData = {
  context: FunctionCallContext
  result: FunctionExceptionResult | FunctionReturnResult
}
