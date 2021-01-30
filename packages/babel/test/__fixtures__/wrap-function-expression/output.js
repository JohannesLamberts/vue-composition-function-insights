withDevtools('useCounter', () => {
  const fn1 = function fn1Name() {
    return withDevtools.__wrapFunctionExecution(
      () => {
        return 1
      },
      {
        identifier: 'fn1Name',
      },
    )
  }

  withDevtools.__registerConst('fn1', fn1)
  const obj = {
    fn3: function fn3Name() {
      return withDevtools.__wrapFunctionExecution(
        () => {
          return fn1() * fn2() * 2
        },
        {
          identifier: 'fn3Name',
        },
      )
    },
  }
  withDevtools.__registerConst('obj', obj)
  return obj
})
