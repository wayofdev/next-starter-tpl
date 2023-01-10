/**
 * Custom config base for projects using mdx.
 * @see https://github.com/wayofdev/next-starter-tpl/tree/master/packages/eslint-config-custom
 */

const mdxPatterns = {
  files: ['**/*.mdx'],
}

module.exports = {
  extends: ['plugin:mdx/recommended'],
  // optional, if you want to lint code blocks at the same time
  settings: {
    'mdx/code-blocks': true,
    // optional, if you want to disable language mapper, set it to `false`
    // if you want to override the default language mapper inside, you can provide your own
    'mdx/language-mapper': {},
  },
  overrides: [
    {
      files: mdxPatterns.files,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'import/namespace': 'off',
        'import/order': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/consistent-type-exports': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
}
