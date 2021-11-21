module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 'off',
    'comma-dangle': 'off',
    'no-unused-vars': 1,
    'camelcase': 'off',
    'quote-props': 'off',
    'no-multiple-empty-lines': 'off',
    'padded-blocks': 'off',
    'no-trailing-spaces': 'off',
    'no-return-assign': 'off',
    'dot-notation': 'off',
    'prefer-const': 'off',
    'vue/no-unused-components': 'off',
    'no-unreachable': 'off',
    'indent' : 'off',
    'spaced-comment': 'off',
    'eqeqeq': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
  }
};
