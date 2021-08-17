const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const IG_S3_MS = require('./instagram-s3-insert/instagram.s3')
const IG_EXTRACTOR = require('./instagram-extractor/instagram.extractor')
const IG_MYSQL_API = require('./instagram-mysql-insert/instagram.mysql.API')
const IG_AGGREGATOR = require('./instagram-aggregator/instagram.aggregator')

/**
 * Main **Instagram** post pipe
 * @param {MYSQL.Connection} connection 
 * @param {String} bucketName 
 * @param {String} bucketChildName 
 * @param {String} shortcode 
 */
const instagramPostServerProcessIO =
  (connection, bucketName, bucketChildName, shortcode) =>
    R_ASYNC.pipeAsync(
      IG_EXTRACTOR.constructIGStructure,
      IG_S3_MS.uploadInstagramStructureS3(bucketName, bucketChildName, R.__),
      R.last,
      IG_MYSQL_API.insertIGPost(connection, R.__)
    )(shortcode)

/**
 * Main **Instagram** user pipe
 * @param {MYSQL.Connection} connection 
 * @param {String} bucketName 
 * @param {String} bucketChildName 
 * @param {String} username 
 */
const instagramUserServerProcessIO =
  async (connection, bucketName, bucketChildName, username) =>
    R_ASYNC.traversePromises(
      R.map(
        postServerProcessResponse =>
          instagramPostServerProcessIO(
            connection,
            bucketName,
            bucketChildName,
            postServerProcessResponse.shortcode
          )
      )(await IG_AGGREGATOR.getAvailablePostMetadataIO(username))
    )

module.exports = {
  instagramPostServerProcessIO,
  instagramUserServerProcessIO
}
