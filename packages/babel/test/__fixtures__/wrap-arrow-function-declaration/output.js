withDevtools('useCounter', () => {
  const fn1 = withDevtools.__wrapArrowFunctionDeclaration(
    () => {
      return 1
    },
    {
      identifier: 'fn1',
    },
  )
  withDevtools.__registerConst('fn1', fn1)
  const obj = {
    fn2: withDevtools.__wrapArrowFunctionDeclaration(
      () => {
        return fn1() * 2
      },
      {
        identifier: null,
      },
    ),
  }
  withDevtools.__registerConst('obj', obj)
  return obj
})
