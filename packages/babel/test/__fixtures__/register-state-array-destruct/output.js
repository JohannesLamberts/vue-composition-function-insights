withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  const [a, b] = [1, 2]

  __withDevtoolsBoundContext.registerConst('a', a)

  __withDevtoolsBoundContext.registerConst('b', b)

  console.log(a, b)
})
