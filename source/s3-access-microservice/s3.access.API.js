const R = require('ramda')
const MYSQL = require('mysql-promise')
const UTIL = require('util')
const S3_ACCESS_CALLBACK = require('./s3.access.callback')

MYSQL

/**
 * @param {MYSQL.} connection 
 * @param {String} linkId YouTube link ID 
 * @param {String} bucketName 
 */
const getYTLinkRecord =
  (connection, bucketName, linkId) =>
    UTIL.promisify(connection.query).apply(
      `SELECT * FROM processed_YouTube_links WHERE link_id=${MYSQL.escape(linkId)}`,
      S3_ACCESS_CALLBACK.mysqlAccessCallback(bucketName, R.__, R.__)
    )

module.exports = { getYTLinkRecord }
