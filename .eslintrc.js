module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  globals: {},
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import'],
  rules: {
    'no-console': 1,
  },
  settings: {
    'import/resolver': 'webpack',
  },
};
