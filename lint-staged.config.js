// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')

const { json } = require('@wayofdev/lint-staged-config')
const { yaml } = require('@wayofdev/lint-staged-config')
const { secrets } = require('@wayofdev/lint-staged-config')
const { md } = require('@wayofdev/lint-staged-config')

const rules = {
  ...jsonRules,
  ...yamlRules,
  ...secretsRules,
  ...mdRules,
  '**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}': filenames => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`]
  },
}

console.log(rules);

// module.exports = rules
