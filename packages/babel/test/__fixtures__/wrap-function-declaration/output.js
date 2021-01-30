withDevtools('useCounter', () => {
  function fn1() {
    return withDevtools.__wrapFunctionExecution(
      () => {
        return 2
      },
      {
        identifier: 'fn1',
      },
    )
  }

  return fn1()
})
