withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  const { a: aRenamed, b } = {
    a: 1,
    b: 2,
  }

  __withDevtoolsBoundContext.registerConst('aRenamed', aRenamed)

  __withDevtoolsBoundContext.registerConst('b', b)

  console.log(aRenamed, b)
})
