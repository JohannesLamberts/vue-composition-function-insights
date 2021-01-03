withDevtools('useCounter', () => {
  const state = {
    count: 0,
  }
  withDevtools.__registerConst('state', state)
})
