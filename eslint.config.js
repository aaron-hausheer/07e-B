import javascript from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['coverage/**'] },
  javascript.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: globals.mocha,
    },
  },
];
