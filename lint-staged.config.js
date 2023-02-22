// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')

const { rules: jsonRules } = require('@wayofdev/lint-staged-config/json')
// const { rules: yamlRules } = require('@wayofdev/lint-staged-config/yaml')
// const { rules: secretsRules } = require('@wayofdev/lint-staged-config/secrets')
// const { rules: mdRules } = require('@wayofdev/lint-staged-config/md')

console.log(jsonRules);

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
