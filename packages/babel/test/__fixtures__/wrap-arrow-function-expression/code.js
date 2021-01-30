withDevtools('useCounter', () => {
  const fn1 = async (a) => {
    if (a > 0) {
      await Promise.resolve()
      return a
    }

    return -a
  }
  const obj = {
    fn2: async (b) => {
      return (await fn1(b)) * 2
    },
  }
  return obj
})
