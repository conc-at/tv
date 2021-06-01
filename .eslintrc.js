module.exports = {
  plugins: ['graphql', 'import', 'jsx-a11y', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/indent': 'off',
    // 'graphql/template-strings': [
    //   'error',
    //   {
    //     env: 'apollo',
    //     schemaJson: require('./schema.json'),
    //   },
    // ],
    'import/no-unresolved': [2, { commonjs: true, amd: true }],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    indent: [2, 2],
    'linebreak-style': [2, 'unix'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    semi: [2, 'always'],
  },
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
      typescript: {
        project: './',
      },
    },
    react: {
      version: 'detect',
    },
  },
};
