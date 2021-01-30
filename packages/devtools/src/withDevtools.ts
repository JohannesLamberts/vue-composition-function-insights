import { getCurrentInstance } from '@vue/runtime-core'
import { SetupTracker } from './setupTracker'
import { addSetupTrackerToComponent, currentSetup, setupStack } from './state'
import { FunctionCallData, FunctionCallSubscriber } from './types'

type TFunc = (...args: any[]) => any

const functionCallSubscribers: FunctionCallSubscriber[] = []

export function subscribeToFunctionCalls(cb: FunctionCallSubscriber) {
  functionCallSubscribers.push(cb)
}

function trackFunctionCall(data: FunctionCallData) {
  functionCallSubscribers.forEach((cb) => cb(data))
}

export function withDevtools<TFunction extends TFunc>(
  name: string,
  fn: TFunction,
): TFunction {
  return function wrappedWithDevtools(this: any, ...args: any[]) {
    const vm = getCurrentInstance()
    if (!vm) {
      return fn.call(this, args)
    }
    const tracker = new SetupTracker(name)
    addSetupTrackerToComponent(vm, tracker)
    setupStack.unshift(tracker)
    try {
      return fn.apply(this, args)
    } finally {
      setupStack.shift()
    }
  } as TFunction
}

withDevtools.__registerConst = function (identifier: string, value: any) {
  if (!getCurrentInstance()) {
    return
  }
  currentSetup().addInsight({
    type: 'VarInsight',
    name: identifier,
    value,
  })
}

withDevtools.__wrapFunctionExecution = function (fn: TFunc) {
  const vm = getCurrentInstance()
  if (!vm) {
    return fn()
  }
  return () => {
    try {
      const result = fn()
      trackFunctionCall({
        vm,
        result,
      })
      return result
    } catch (error) {
      trackFunctionCall({
        vm,
        error,
      })
    }
  }
}
