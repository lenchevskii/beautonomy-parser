require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql')
const CLI_COLOR = require('cli-color')
const G_S3_HANDLER = require('@general-s3-handler')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')

/**
 * @param {Function} processor Processing module
 * @param {String} bucketName 
 * @param {String} bucketS3Path
 * @param {MYSQL.MysqlError} error 
 * @param {[*]} frames 
 */
const GETMySQLCallback =
  (processor, bucketName, bucketS3Path, error, frames) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : YT_RESOLVER_HELPER
        .getS3Object(processor, frames, bucketName, bucketS3Path)

/**
 * @param {Function} processor Processing module
 * @param {[String]} infoFilePaths 
 * @param {String} bucketName 
 * @param {Boolean} isTmpMode 
 * @param {Error} error 
 * @param {[*]} frames 
 * @returns 
 */
const GETMySQLCallbackTmpMode =
  (directory, childBucketName, processor, infoFilePaths, bucketName, isTmpMode, error, frames) =>
    error
      ? H.trace(CLI_COLOR.red(error.message))
      : infoFilePaths.map(
        infoFilePath => YT_RESOLVER_HELPER.processInfoFile(
          infoFilePath,
          processor,
          frames,
          bucketName,
          G_S3_HANDLER.constructBucketS3Path(directory, childBucketName, infoFilePath),
          isTmpMode
        )
      )

module.exports = {
  GETMySQLCallback: R.curry(GETMySQLCallback),
  GETMySQLCallbackTmpMode: R.curry(GETMySQLCallbackTmpMode)
}
