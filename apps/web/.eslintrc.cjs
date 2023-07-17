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
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    '@wayofdev/eslint-config-bases/typescript',
    '@wayofdev/eslint-config-bases/regexp',
    '@wayofdev/eslint-config-bases/sonar',
    '@wayofdev/eslint-config-bases/jest',
    '@wayofdev/eslint-config-bases/rtl',
    '@wayofdev/eslint-config-bases/react',
    '@wayofdev/eslint-config-bases/react-query',
    '@wayofdev/eslint-config-bases/tailwind',
    '@wayofdev/eslint-config-bases/mdx',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    '@wayofdev/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // https://medium.com/@steven-lemon182/are-typescript-barrel-files-an-anti-pattern-72a713004250
    'import/no-cycle': 2,
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['next.config.mjs'],
      rules: {
        'import/order': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['tailwind.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
  ],
}
