withDevtools('useCounter', () => {
  const fn1 = async (a) => {
    return withDevtools.__wrapFunctionExecution(
      async () => {
        if (a > 0) {
          await Promise.resolve()
          return a
        }

        return -a
      },
      {
        identifier: 'fn1',
      },
    )
  }

  withDevtools.__registerConst('fn1', fn1)
  const obj = {
    fn2: async (b) => {
      return withDevtools.__wrapFunctionExecution(
        async () => {
          return (await fn1(b)) * 2
        },
        {
          identifier: null,
        },
      )
    },
  }
  withDevtools.__registerConst('obj', obj)
  return obj
})
