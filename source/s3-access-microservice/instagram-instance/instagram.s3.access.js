const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const IG_S3_ACCESS_HELPER = require('./instagram.s3.access.helper')
const IG_S3_ACCESS_HANDLER = require('./instagram.s3.access.handler')
const IG_S3_ACCESS_MYSQL_API = require('./instagram.s3.access.mysql.API')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} shortcode 
 * @param {String} bucketName 
 * @param {String} extension 
 */
const getS3ObjectByIdIO =
  (connection, shortcode, bucketName, extension) =>
    R_ASYNC.pipeAsync(
      IG_S3_ACCESS_MYSQL_API.getIGLinkRecord(R.__, shortcode),
      R.head,
      IG_S3_ACCESS_HANDLER.getBucketS3PathObject(R.__, bucketName, extension),
      IG_S3_ACCESS_HELPER.maybeBody
    )(connection)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} shortcode 
 * @param {String} bucketName 
 * @returns {Promise<Array}
 */
const listAvailableObjectsIO =
  (connection, shortcode, bucketName) =>
    R_ASYNC.pipeAsync(
      IG_S3_ACCESS_MYSQL_API.getIGLinkRecord(R.__, shortcode),
      R.head,
      IG_S3_ACCESS_HANDLER.listBucketS3Objects(R.__, bucketName),
      R.prop('Contents'),
      R.map(R.prop('Key'))
    )(connection)

module.exports = {
  getS3ObjectByIdIO,
  listAvailableObjectsIO
}
