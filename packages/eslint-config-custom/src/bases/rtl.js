/**
 * Opinionated config base for projects using react-testing-library
 * @see https://github.com/wayofdev/next-starter-tpl/tree/master/packages/eslint-config-custom
 */

const rtlPatterns = {
  files: ['**/?(*.)+(test).{js,jsx,ts,tsx}'],
}

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  overrides: [
    {
      // For performance enable react-testing-library only on test files
      files: rtlPatterns.files,
      extends: ['plugin:testing-library/react'],
    },
    {
      files: ['**/test-utils.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/export': 'off',
      },
    },
  ],
}
