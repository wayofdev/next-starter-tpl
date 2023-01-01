module.exports = {
  root: true,
  extends: ['@wayofdev/custom'],
  plugins: ['import'],
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['@wayofdev/eslint-config/'],
    },
  ],
  rules: {
    'import/extensions': 'off',
  },
  ignorePatterns: ['dist/**', '.next/**'],
}
