require('module-alias/register')

const R = require('ramda')
const AWS = require('aws-sdk')
const PATH = require('path')
const OAUTH = require('../reddit-oauth/reddit.oauth')
const REDDIT_EXTRACTOR = require('../reddit-extractor/reddit.extractor')
const GENERAL_S3_CALLBACK = require('@general-s3-callback')

const Snoowrap = require('snoowrap')

const S3 = new AWS.S3()

/**
 * 
 * @param {String} bucketName Bucket name to store
 * @param {String} bucketChildName Name of a child directory to store
 * @param {Promise} collection Promised structure to store
 * @returns 
 */
const uploadStructureS3 =
  (bucketName, childBucketName, collection) =>
    collection.then(
      data => data.map(
        (
          [
            { author: author },
            { id: id },
            ...tail
          ]
        ) =>
          S3.putObject(
            {
              Bucket: bucketName,
              Key: PATH.join(childBucketName, author.name, String(id) + '.json'),
              Body: JSON.stringify(tail)
            },
            GENERAL_S3_CALLBACK.S3Callback
          )
      )
    )

/**
 * 
 * @param {String} bucketName Bucket name to store
 * @param {String} bucketChildName Name of a child directory to store
 * @param {Snoowrap} oauthClient Reddit Authenticated Client
 * @param {String} subreddit Name of subreddit
 * @param {Number} lastPostsNumber The number of last posts that need to get
 * @param {String} flairName Category of posts (for isntance, 'FOTD')
 */
const uploadRedditStructureS3 =
  (bucketName, bucketChildName, oauthClient, subreddit, lastPostsNumber, flairName) =>
    R.compose(
      R.curry(uploadStructureS3)(bucketName, bucketChildName, R.__),
      REDDIT_EXTRACTOR.extractRedditData
    )(oauthClient, subreddit, lastPostsNumber, flairName)

module.exports = { uploadRedditStructureS3 }

uploadRedditStructureS3('beautonomy-parser', 'reddit', OAUTH.REDDIT, 'MakeupAddiction', 10, 'FOTD')
