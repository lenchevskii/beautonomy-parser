require('module-alias/register')

const H = require('@general-helper')
const CLI_COLOR = require('cli-color')

const getMySQLCallback =
  (error, result) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : H.trace(CLI_COLOR.green('Selection proccessed successfully:'), result)

const insertMySQLCallback =
  (error, result) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : H.trace(CLI_COLOR.green('Insertion proccessed successfully.'))

module.exports = { insertMySQLCallback, getMySQLCallback }
