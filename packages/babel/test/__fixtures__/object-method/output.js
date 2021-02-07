withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  return {
    fn3() {
      return __withDevtoolsBoundContext.wrapFunctionExecution(
        () => {
          return 5
        },
        {
          arguments: Array.from(arguments),
          identifier: 'fn3',
        },
      )
    },
  }
})
