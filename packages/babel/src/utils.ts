export const isDefined = (val: unknown): val is Exclude<any, undefined> =>
  typeof val !== 'undefined'
