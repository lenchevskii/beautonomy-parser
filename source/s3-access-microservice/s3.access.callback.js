require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CLI_COLOR = require('cli-color')
const S3_ACCESS_HANDLER = require('./s3.access.handler')

const mysqlAccessCallback =
  (bucketName, error, data) =>
    error
      ? H.trace(CLI_COLOR.red('MySQL Access MS Error'), error)
      : S3_ACCESS_HANDLER.getBucketS3PathFiles(data, bucketName)

module.exports = { mysqlAccessCallback: R.curry(mysqlAccessCallback) }
