withDevtools('useCounter', () => {
  return {
    fn3() {
      return withDevtools.__wrapFunctionExecution(
        () => {
          return 5
        },
        {
          identifier: 'fn3',
        },
      )
    },
  }
})
