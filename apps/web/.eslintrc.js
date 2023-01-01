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
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    '@wayofdev/eslint-config-custom/typescript',
    '@wayofdev/eslint-config-custom/sonar',
    '@wayofdev/eslint-config-custom/regexp',
    '@wayofdev/eslint-config-custom/jest',
    '@wayofdev/eslint-config-custom/react',
    '@wayofdev/eslint-config-custom/tailwind',
    '@wayofdev/eslint-config-custom/rtl',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@wayofdev/eslint-config-custom/prettier',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ],
}
