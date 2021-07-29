require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const AWS = require('aws-sdk')
const CLI_COLOR = require('cli-color')
const GENERAL_S3_CALLBACK = require('@general-s3-callback')

const S3 = new AWS.S3()

const readFileCallback =
  (bucketName, bucketS3Path, error, data) =>
    error
      ? H.trace(CLI_COLOR.red(error))
      : S3.upload(
        { Bucket: bucketName, Key: bucketS3Path, Body: Buffer.from(data, 'binary') },
        GENERAL_S3_CALLBACK.S3Callback
      )

module.exports = { readFileCallback: R.curry(readFileCallback) }
