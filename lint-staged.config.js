// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')

const json = { rules } = require('@wayofdev/lint-staged-config/json')
const yaml = { rules } = require('@wayofdev/lint-staged-config/yaml')
const secrets = { rules } = require('@wayofdev/lint-staged-config/secrets')
const md = { rules } = require('@wayofdev/lint-staged-config/md')


const rules = {
  ...json,
  ...yaml,
  ...secrets,
  ...md,
  '**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}': filenames => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`]
  },
}

console.log(rules);

// module.exports = rules
