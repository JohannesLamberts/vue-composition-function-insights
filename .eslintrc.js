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
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended',
  ],
}
