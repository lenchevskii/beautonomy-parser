require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const SNOOWRAP = require('snoowrap')
const RD_EXTRACTOR = require('./reddit-extractor/reddit.extractor')
const RD_S3_INSERT = require('./reddit-s3-insert/reddit.s3.insert')
const RD_MYSQL_INSERT = require('./reddit-mysql-insert/reddit.mysq.insert')

/**
 * @param {MYSQL.Connection}
 * @param {SNOOWRAP} oauthClient Reddit Authenticated Client
 * @param {String} subreddit Name of subreddit
 * @param {Number} lastPostsNumber The number of last posts that need to get
 * @param {String} flairName Category of posts (for isntance, `FOTD`)
 * @param {String} bucketName 
 * @param {String} bucketChildName 
 */
const redditServerProcessIO =
  (connection, oauthClient, subreddit, lastPostsNumber, flairName, bucketName, bucketChildName) =>
    R_ASYNC.pipeAsync(
      RD_EXTRACTOR.extractRedditData(R.__, subreddit, lastPostsNumber, flairName),
      RD_S3_INSERT.uploadStructureS3(bucketName, bucketChildName, R.__),
      R_ASYNC.traversePromises,
      R.last,
      RD_MYSQL_INSERT.insertRDPostCollectionIO(connection, R.__)
    )(oauthClient)

module.exports = {
  redditServerProcessIO
}
