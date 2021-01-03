withDevtools('useCounter', () => {
  const { a: aRenamed, b } = { a: 1, b: 2 }
  console.log(aRenamed, b)
})
