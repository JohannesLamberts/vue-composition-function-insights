withDevtools('useCounter', () => {
  const fn1 = withDevtools.__wrapFunctionExpression(
    function fn1Name() {
      return 1
    },
    {
      identifier: 'fn1Name',
    },
  )
  withDevtools.__registerConst('fn1', fn1)
  const obj = {
    fn2: withDevtools.__wrapFunctionExpression(
      function () {
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
