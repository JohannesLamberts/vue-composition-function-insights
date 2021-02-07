withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  const fn1 = function fn1Name() {
    return __withDevtoolsBoundContext.wrapFunctionExecution(
      () => {
        return 1
      },
      {
        arguments: Array.from(arguments),
        identifier: 'fn1Name',
      },
    )
  }

  __withDevtoolsBoundContext.registerConst('fn1', fn1)

  const obj = {
    fn3: function fn3Name() {
      return __withDevtoolsBoundContext.wrapFunctionExecution(
        () => {
          return fn1() * fn2() * 2
        },
        {
          arguments: Array.from(arguments),
          identifier: 'fn3Name',
        },
      )
    },
  }

  __withDevtoolsBoundContext.registerConst('obj', obj)

  return obj
})
