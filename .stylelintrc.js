// https://github.com/wayofdev/npm-shareable-configs/blob/master/packages/stylelint-config/README.md
module.exports = {
  // ignore linting in dist bundle output folder
  ignoreFiles: ['dist/**'],
  extends: '@wayofdev/stylelint-config/scss',
  overrides: [
    {
      files: ['**/*.css'],
      extends: '@wayofdev/stylelint-config',
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
  },
}
