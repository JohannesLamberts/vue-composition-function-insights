withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  const fn1 = async (a) => {
    return __withDevtoolsBoundContext.wrapFunctionExecution(
      async () => {
        if (a > 0) {
          await Promise.resolve()
          return a
        }

        return -a
      },
      {
        arguments: Array.from(arguments),
        identifier: 'fn1',
      },
    )
  }

  __withDevtoolsBoundContext.registerConst('fn1', fn1)

  const obj = {
    fn2: async (b) => {
      return (await fn1(b)) * 2
    },
  }

  __withDevtoolsBoundContext.registerConst('obj', obj)

  return obj
})
