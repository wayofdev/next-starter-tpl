// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')


const jsonRules = require('@wayofdev/lint-staged-config/json')
const secretsRules = require('@wayofdev/lint-staged-config/secrets')
const mdRules = require('@wayofdev/lint-staged-config/md')
const yamlRules = require('@wayofdev/lint-staged-config/yaml')

console.log(...yamlRules);

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
