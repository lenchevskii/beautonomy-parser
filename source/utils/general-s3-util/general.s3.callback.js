require('module-alias/register')

const H = require('@general-helper')
const CLI_COLOR = require('cli-color')

const S3Callback =
  (error, data) =>
    error
      ? H.trace(CLI_COLOR.red(error.message), 'S3Callback Error')
      : H.trace(CLI_COLOR.green('S3 processed successfully. S3 ETag:'), data.ETag)

module.exports = { S3Callback }
