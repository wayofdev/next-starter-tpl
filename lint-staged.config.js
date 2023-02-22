// @ts-check

const { concatFilesForPrettier } = require('@wayofdev/lint-staged-config')

const rules = {
  ...require('@wayofdev/lint-staged-config/json'),
  ...require('@wayofdev/lint-staged-config/yaml'),
  ...require('@wayofdev/lint-staged-config/secrets'),
  ...require('@wayofdev/lint-staged-config/md'),
  '**/*.{js,jsx,cjs,mjs,ts,tsx,mts,cts}': filenames => {
    return [`prettier --write ${concatFilesForPrettier(filenames)}`]
  },
}

module.exports = rules
