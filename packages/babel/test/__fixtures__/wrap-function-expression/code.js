withDevtools('useCounter', () => {
  const fn1 = function fn1Name() {
    return 1
  }
  const obj = {
    fn2: function () {
      return fn1() * 2
    },
  }
  return obj
})
