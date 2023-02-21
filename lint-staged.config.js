// @ts-check

const {
  concatFilesForPrettier,
  jsonRules,
  secretsRules,
  mdRules,
  yamlRules,
} = require('@wayofdev/lint-staged-config')

const rules = {
  ...jsonRules,
  ...yamlRules,
  ...secretsRules,
  ...mdRules,
  '**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}': filenames => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`]
  },
}

module.exports = rules
