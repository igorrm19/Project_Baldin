const ts = require('@typescript-eslint/eslint-plugin');
module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { '@typescript-eslint': ts },
    extends: [ts.configs.recommended, ts.configs['recommended-requiring-type-checking']],
  },
];
