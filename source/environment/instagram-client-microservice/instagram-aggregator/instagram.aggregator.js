const R_ASYNC = require('ramda-async')
const IG_AGGREGATOR_HELPER = require('./instagram.aggregator.helper')
const IG_AGGREGATOR_HANDLER = require('./instagram.aggregator.handler')

/**
 * @param {String} username 
 * @returns Array type of `[{ shortcode,  postId}]`
 */
const getAvailablePostMetadataIO =
  (username) =>
    R_ASYNC.pipeAsync(
      IG_AGGREGATOR_HELPER.constructUserGraphLink,
      IG_AGGREGATOR_HANDLER.getAvailablePostMetadata
    )(username)

module.exports = {
  getAvailablePostMetadataIO
}
