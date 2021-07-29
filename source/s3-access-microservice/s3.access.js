require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql')
const R_ASYNC = require('ramda-async')
const S3_ACCESS_HELPER = require('./s3.access.helper')
const S3_ACCESS_HANDLER = require('./s3.access.handler')
const S3_ACCESS_MYSQL_API = require('./s3.access.mysql.API')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId 
 * @param {String} bucketName 
 * @param {String} extension 
 */
const getS3ObjectByIdIO =
  async (connection, linkId, bucketName, extension) =>
    R_ASYNC.pipeAsync(
      S3_ACCESS_MYSQL_API.getYTLinkRecord(R.__, linkId),
      R.head,
      S3_ACCESS_HANDLER.getBucketS3PathObject(R.__, bucketName, extension),
      S3_ACCESS_HELPER.maybeBody
    )(connection)

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId 
 * @param {String} bucketName 
 * @returns 
 */
const listAvailableYTObjectsIO =
  async (connection, linkId, bucketName) =>
    R_ASYNC.pipeAsync(
      S3_ACCESS_MYSQL_API.getYTLinkRecord(R.__, linkId),
      R.head,
      S3_ACCESS_HANDLER.listBucketS3Objects(R.__, bucketName)
      // S3_ACCESS_HELPER.maybeBody
    )(connection)

module.exports = {
  getS3ObjectByIdIO,
  listAvailableYTObjectsIO
}
