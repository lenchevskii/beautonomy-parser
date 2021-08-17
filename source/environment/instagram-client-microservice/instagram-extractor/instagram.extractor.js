const H = require('@general-helper')
const R = require('ramda')
const R_ASYNC = require('ramda-async')
const IG_EXTRACTOR_HELPER = require('./instagram.extractor.helper')
const IG_EXTRACTOR_HANDLER = require('./instagram.extractor.handler')

/**
 * Construct IG structure via `GraphAPI` 
 * @param {String} shortcode 
 */
const constructIGStructure =
  (shortcode) =>
    R_ASYNC.pipeAsync(
      IG_EXTRACTOR_HANDLER.fetchInstagramPostJson,
      post => [
        { username: IG_EXTRACTOR_HELPER.extractMedia(post).owner.username },
        { shortcode: shortcode },
        { ownerId: IG_EXTRACTOR_HELPER.extractMedia(post).owner.id },
        { postId: IG_EXTRACTOR_HELPER.extractMedia(post).id },
        { post: post },
        { media: IG_EXTRACTOR_HANDLER.getInstagramMedia(post) },
        { comments: IG_EXTRACTOR_HANDLER.getInstagramCaptions(post) }
      ],
    )(shortcode)

module.exports = {
  constructIGStructure
}
