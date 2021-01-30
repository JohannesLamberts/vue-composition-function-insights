withDevtools('useCounter', () => {
  const fn1 = function fn1Name() {
    return 1
  }
  const obj = {
    fn3: function fn3Name() {
      return fn1() * fn2() * 2
    },
  }
  return obj
})
