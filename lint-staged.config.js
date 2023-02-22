// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')

const { json } = require('@wayofdev/lint-staged-config/bases')
const { yaml } = require('@wayofdev/lint-staged-config/bases')
const { secrets } = require('@wayofdev/lint-staged-config/bases')
const { md } = require('@wayofdev/lint-staged-config/bases')

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
