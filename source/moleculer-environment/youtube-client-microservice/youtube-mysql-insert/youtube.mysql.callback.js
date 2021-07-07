require('module-alias/register')

const H = require('@general-helper')
const CLI_COLOR = require('cli-color')

const insertMySQLCallback =
  (error, result) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : H.trace(CLI_COLOR.green('YouTube insertion proccessed successfully:'), result.message)

module.exports = { insertMySQLCallback }
