withDevtools('useCounter', () => {
  const { a: aRenamed, b } = {
    a: 1,
    b: 2,
  }
  withDevtools.__registerConst('aRenamed', aRenamed)
  withDevtools.__registerConst('b', b)
  console.log(aRenamed, b)
})
