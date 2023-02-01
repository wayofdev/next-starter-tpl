/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 * @see https://github.com/wayofdev/next-starter-tpl/blob/master/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@wayofdev/eslint-config-custom/patch/modern-module-resolution')

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
    '@wayofdev/eslint-config-custom/regexp',
    '@wayofdev/eslint-config-custom/sonar',
    '@wayofdev/eslint-config-custom/jest',
    '@wayofdev/eslint-config-custom/rtl',
    '@wayofdev/eslint-config-custom/react',
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
