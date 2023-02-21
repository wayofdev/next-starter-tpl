// @ts-check

/**
 * This files overrides the base lint-staged.config.js present in the root directory.
 * It allows to run eslint based the package specific requirements.
 * {@link https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo}
 * {@link https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-lint-staged.md}
 */

const {
  getEslintFixCmd,
  jsonRules,
  secretsRules,
  mdRules,
  yamlRules,
  htmlRules,
} = require('@wayofdev/lint-staged-config')

/**
 * @typedef {Record<string, (filenames: string[]) => string | string[] | Promise<string | string[]>>} LintRule
 */
const rules = {
  '**/*.{js,jsx,ts,tsx}': (/** @type {any} */ filenames) => {
    return getEslintFixCmd({
      cwd: __dirname,
      fix: true,
      cache: true,
      // when autofixing staged-files a good tip is to disable react-hooks/exhaustive-deps, cause
      // a change here can potentially break things without proper visibility.
      rules: ['react-hooks/exhaustive-deps: off'],
      maxWarnings: 25,
      files: filenames,
    })
  },
  ...jsonRules,
  ...secretsRules,
  ...mdRules,
  ...yamlRules,
  ...htmlRules,
}

module.exports = rules
