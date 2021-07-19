const MYSQL = require('mysql')
const S3_ACCESS_API = require('./s3.access.API')

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId 
 * @param {String} bucketName 
 * @returns 
 */
const getS3FileById =
  (connection, linkId, bucketName) =>
    S3_ACCESS_API.getYTLinkRecord(connection, linkId, bucketName)

module.exports = { getS3FileById }
