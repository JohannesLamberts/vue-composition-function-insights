withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  function fn1() {
    return __withDevtoolsBoundContext.wrapFunctionExecution(
      () => {
        return 2
      },
      {
        arguments: Array.from(arguments),
        identifier: 'fn1',
      },
    )
  }

  return fn1()
})
