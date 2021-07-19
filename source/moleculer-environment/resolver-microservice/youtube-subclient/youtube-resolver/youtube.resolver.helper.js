require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const FS = require('fs')
const AWS = require('aws-sdk')
const MYSQL = require('mysql')
const CLI_COLOR = require('cli-color')

const S3 = new AWS.S3()

/**
 * 
 * @param {Function} processor Processing module (e.g., Products extraction fnc)
 * @param {[[String]]} frames Collection with trigger words
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 * @param {Boolean} isTmpMode Flag initiates `temporary mode`
 */
const getS3Object =
  (processor, frames, bucketName, bucketS3Path, isTmpMode) =>
    S3.getObject(
      { Bucket: bucketName, Key: bucketS3Path },
      (error, S3Object) =>
        error
          ? H.trace(CLI_COLOR.red('RESOLVER error:', error.message))
          : processor(S3Object, frames, bucketName, bucketS3Path, isTmpMode)
    )

/**
 * 
 * @param {[[String]]} collection 
 * @returns Expanded Trigger Word set ready for insertion
 */
const expandTriggerWordSet =
  (collection) =>
    collection.map(word => `(${MYSQL.escape(word)})`).toLocaleString()

/**
 * @param {String} infoFilePath 
 * @param {Function} processor 
 * @param {[*]} frames 
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 * @param {Boolean} isTmpMode 
 */
const processInfoFile =
  (infoFilePath, processor, frames, bucketName, bucketS3Path, isTmpMode) =>
    R.compose(
      processor(R.__, frames, bucketName, bucketS3Path, isTmpMode),
      H.trace,
      JSON.parse,
      FS.readFileSync
    )(infoFilePath)

module.exports = {
  expandTriggerWordSet,
  getS3Object,
  processInfoFile
}
