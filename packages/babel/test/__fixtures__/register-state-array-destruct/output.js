withDevtools('useCounter', () => {
  const [a, b] = [1, 2]
  withDevtools.__registerConst('a', a)
  withDevtools.__registerConst('b', b)
  console.log(a, b)
})
