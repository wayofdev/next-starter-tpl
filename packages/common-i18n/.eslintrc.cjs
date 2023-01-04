/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/wayofdev/next-starter-tpl/blob/master/docs/about-linters.md
 */

const { getDefaultIgnorePatterns } = require('@wayofdev/eslint-config-custom/helpers')

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@wayofdev/eslint-config-custom/typescript',
    // Apply prettier and disable incompatible rules
    '@wayofdev/eslint-config-custom/prettier',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
}
