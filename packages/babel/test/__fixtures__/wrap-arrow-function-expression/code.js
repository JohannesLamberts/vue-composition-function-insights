withDevtools('useCounter', () => {
  const fn1 = () => {
    return 1
  }
  const obj = {
    fn2: () => {
      return fn1() * 2
    },
  }
  return obj
})
