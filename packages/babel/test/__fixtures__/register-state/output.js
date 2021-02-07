withDevtools('useCounter', () => {
  const __withDevtoolsBoundContext = withDevtools.__bindContext()

  const state = {
    count: 0,
  }

  __withDevtoolsBoundContext.registerConst('state', state)
})
