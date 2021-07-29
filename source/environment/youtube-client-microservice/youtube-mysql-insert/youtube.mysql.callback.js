require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CLI_COLOR = require('cli-color')

const insertMySQLCallback =
  (error, result) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : R.always()

module.exports = { insertMySQLCallback }
