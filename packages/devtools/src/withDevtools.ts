import { getCurrentInstance } from '@vue/runtime-core'
import { SetupTracker } from './setupTracker'
import { addSetupTrackerToComponent, currentSetup, setupStack } from './state'
import { FunctionCallContext } from "./types";

type TFunc = (...args: any[]) => any

export function withDevtools<TFunction extends TFunc>(
  name: string,
  fn: TFunction,
): TFunction {
  return function wrappedWithDevtools(this: any, ...args: any[]) {
    const vm = getCurrentInstance()
    if (!vm) {
      return fn.call(this, args)
    }
    const tracker = new SetupTracker(name, vm)
    addSetupTrackerToComponent(vm, tracker)
    setupStack.unshift(tracker)
    try {
      return fn.apply(this, args)
    } finally {
      setupStack.shift()
    }
  } as TFunction
}

withDevtools.__bindContext = function () {
  const vm = getCurrentInstance()

  if (!vm) {
    return
  }

  const setup = currentSetup()

  return {
    wrapFunctionExecution(fn: TFunc, context: FunctionCallContext) {
      try {
        const result = fn()
        setup.trackFunctionResult({
          context,
          result: {
            type: 'return',
            value: result,
          },
        })
        return result
      } catch (error) {
        setup.trackFunctionResult({
          context,
          result: {
            type: 'error',
            error,
          },
        })
        throw error
      }
    },
    registerConst(identifier: string, value: any) {
      setup.addInsight({
        type: 'VarInsight',
        name: identifier,
        value,
      })
    },
  }
}
