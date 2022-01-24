module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  globals: {
    $: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['import'],
  rules: {},
  settings: {
    'import/resolver': 'webpack',
  },
};
