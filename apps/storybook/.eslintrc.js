/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 * @see https://github.com/wayofdev/next-starter-tpl/blob/master/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@wayofdev/eslint-config-bases/patch/modern-module-resolution')

const { getDefaultIgnorePatterns } = require('@wayofdev/eslint-config-bases/helpers')

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), '/storybook-static'],
  extends: [
    '@wayofdev/eslint-config-bases/typescript',
    '@wayofdev/eslint-config-bases/regexp',
    '@wayofdev/eslint-config-bases/sonar',
    '@wayofdev/eslint-config-bases/jest',
    '@wayofdev/eslint-config-bases/rtl',
    '@wayofdev/eslint-config-bases/storybook',
    '@wayofdev/eslint-config-bases/react',
    '@wayofdev/eslint-config-bases/tailwind',
    '@wayofdev/eslint-config-bases/mdx',
    // Apply prettier and disable incompatible rules
    '@wayofdev/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['src/stories/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
}
