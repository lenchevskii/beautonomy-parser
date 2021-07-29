require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CLI_COLOR = require('cli-color')

const S3Callback =
  (error, data) =>
    error
      ? H.trace(CLI_COLOR.red(error.message), 'S3Callback Error')
      : R.always()

module.exports = { S3Callback }
