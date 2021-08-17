require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const YT_S3_ACCESS_HELPER = require('./youtube.s3.access.helper')
const YT_S3_ACCESS_HANDLER = require('./youtube.s3.access.handler')
const YT_S3_ACCESS_MYSQL_API = require('./youtube.s3.access.mysql.API')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId 
 * @param {String} bucketName 
 * @param {String} extension 
 */
const getS3ObjectByIdIO =
  (connection, linkId, bucketName, extension) =>
    R_ASYNC.pipeAsync(
      YT_S3_ACCESS_MYSQL_API.getYTLinkRecord(R.__, linkId),
      R.head,
      YT_S3_ACCESS_HANDLER.getBucketS3PathObject(R.__, bucketName, extension),
      YT_S3_ACCESS_HELPER.maybeBody
    )(connection)

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId 
 * @param {String} bucketName 
 * @returns 
 */
const listAvailableObjectsIO =
  (connection, linkId, bucketName) =>
    R_ASYNC.pipeAsync(
      YT_S3_ACCESS_MYSQL_API.getYTLinkRecord(R.__, linkId),
      R.head,
      YT_S3_ACCESS_HANDLER.listBucketS3Objects(R.__, bucketName),
      s3Object => s3Object ? R.prop('Contents', s3Object) : null,
      s3Collection => s3Collection ? R.map(R.prop('Key'), s3Collection) : null
    )(connection)

module.exports = {
  getS3ObjectByIdIO,
  listAvailableObjectsIO
}
