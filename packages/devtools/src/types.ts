interface VarInsight {
  type: 'VarInsight'
  name: string
  value: any
}

type Insight = VarInsight

interface Func {
  insights: Insight[]
}

type FunctionCallData = any
type FunctionCallSubscriber = (data: FunctionCallData) => void

type FunctionThis<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
