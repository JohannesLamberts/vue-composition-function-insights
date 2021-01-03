export interface VarInsight {
  type: 'VarInsight'
  name: string
  value: any
}

export type Insight = VarInsight

export type FunctionCallData = any
export type FunctionCallSubscriber = (data: FunctionCallData) => void
