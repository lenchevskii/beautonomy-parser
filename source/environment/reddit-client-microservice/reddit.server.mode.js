require('module-alias/register')

const H = require('@general-helper')
const CP = require('child_process')
const CFG = require('dotenv').config().parsed

/**
 * Main monad for processing **Reddit**: spawn a suicide process
 * @param {Number|String} lastPostsNumber 
 */
const redditServerModeIO =
  (lastPostsNumber) =>
    CP.fork(
      'source/environment/reddit-client-microservice/reddit.server.processing.tool.js'
      [
        CFG.REDDIT_SUBREDDIT,
        lastPostsNumber,
        CFG.REDDIT_FLAIR_NAME,
        CFG.S3_BUCKET,
        CFG.S3_RD_CHILD_BUCKET
      ]
    )

module.exports = {
  redditServerModeIO
}
