const CP = require('child_process')
const CFG = require('dotenv').config().parsed

/**
 * Main monad for processing **Instagram**: spawn a suicide process
 * @param {String} shortcode 
 */
const instagramPostServerModeIO =
  (shortcode) =>
    CP.fork(
      'source/environment/instagram-client-microservice/instagram.server.post.tool.js',
      [
        CFG.S3_BUCKET,
        CFG.S3_IG_CHILD_BUCKET,
        shortcode
      ]
    )

const instagramUserServerModeIO =
  (username) =>
    CP.fork(
      'source/environment/instagram-client-microservice/instagram.server.user.tool.js',
      [
        CFG.S3_BUCKET,
        CFG.S3_IG_CHILD_BUCKET,
        username
      ]
    )

module.exports = {
  instagramPostServerModeIO,
  instagramUserServerModeIO
}
