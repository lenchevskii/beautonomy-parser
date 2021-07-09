require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql')
const CLI_COLOR = require('cli-color')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')

/**
 * 
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
      : YT_RESOLVER_HELPER.getS3Object(processor, frames, bucketName, bucketS3Path)

module.exports = {
  GETMySQLCallback: R.curry(GETMySQLCallback)
}
