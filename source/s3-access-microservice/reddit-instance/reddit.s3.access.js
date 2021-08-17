const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const RD_S3_ACCESS_HELPER = require('./reddit.s3.access.helper')
const RD_S3_ACCESS_HANDLER = require('./reddit.s3.access.handler')
const RD_S3_ACCESS_MYSQL_API = require('./reddit.s3.access.mysql.API')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} postId 
 * @param {String} bucketName 
 * @param {String} extension 
 */
const getS3ObjectByIdIO =
  async (connection, postId, bucketName, extension) =>
    R_ASYNC.pipeAsync(
      RD_S3_ACCESS_MYSQL_API.getRecord(R.__, postId),
      R.head,
      RD_S3_ACCESS_HANDLER.getBucketS3PathObject(R.__, bucketName, extension),
      RD_S3_ACCESS_HELPER.maybeBody
    )(connection)

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} postId 
 * @param {String} bucketName 
 * @returns 
 */
const listAvailableObjectsIO =
  async (connection, postId, bucketName) =>
    R_ASYNC.pipeAsync(
      RD_S3_ACCESS_MYSQL_API.getRecord(R.__, postId),
      R.head,
      RD_S3_ACCESS_HANDLER.listBucketS3Objects(R.__, bucketName),
      R.prop('Contents'),
      R.map(R.prop('Key'))
    )(connection)

module.exports = {
  getS3ObjectByIdIO,
  listAvailableObjectsIO
}
