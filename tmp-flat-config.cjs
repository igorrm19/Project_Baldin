module.exports = [
  {
    files: ['**/*.ts'],
    parser: '@typescript-eslint/parser',
    plugins: { '@typescript-eslint': require('@typescript-eslint/eslint-plugin') },
    extends: ['plugin:@typescript-eslint/recommended'],
  },
];
