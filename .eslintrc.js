module.exports = {
  root: true,
  env: {
    'browser': true,
    'es6': true,
    'node': true,
    'jest/globals': true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['jest'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-inferrable-types': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
  ],
}
