require('module-alias/register')

const H = require('@helper')
const R = require('ramda')
const AWS = require('aws-sdk')
const CLICOLOR = require('cli-color')

const S3 = new AWS.S3()

const S3CallBack =
  (error, data) =>
    error
      ? H.trace(CLICOLOR.red(error))
      : H.trace(CLICOLOR.green('Upload completed.'))

const readFileCallback =
  (bucketName, key, error, data) =>
    error
      ? H.trace(CLICOLOR.red(error))
      : S3.upload(
        { Bucket: bucketName, Key: key, Body: Buffer.from(data, 'binary') },
        S3CallBack
      )

module.exports = { readFileCallback: R.curry(readFileCallback) }
