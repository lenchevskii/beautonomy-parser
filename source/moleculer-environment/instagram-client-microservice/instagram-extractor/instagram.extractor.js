require('module-alias/register')

const R = require('ramda')
const M = require('monet')
const H = require('@general-helper')
const IG_HELPER = require('./pipe-helper/instagram.helper')
const IG_PROFILE = require('./pipe-profile/instagram.profile')
const DATA_EXTRACTOR = require('./pipe-handler/data.extractor')

/**
 * Load Instagram specified profile to introduce IG unofficial API access
 * @param {String} instagramUrl Post URL
 * @returns Resolved URL with IG API access
 */
const resolveInstagramUrl =
  (instagramUrl) =>
    IG_PROFILE.resolveUrl(IG_PROFILE.template, IG_PROFILE.pattern, instagramUrl)

const getInstagramMedia =
  (post) =>
    R.compose(
      DATA_EXTRACTOR.extractDisplayResources,
      IG_HELPER.extractMedia
    )(post)

const getInstagramCaptions =
  (post) =>
    R.compose(
      DATA_EXTRACTOR.extractCaptions,
      IG_HELPER.extractMedia
    )(post)

const fetchInstagramPostJson =
  (instagramUrl) =>
    R.compose(IG_HELPER.fetchJson, resolveInstagramUrl)(instagramUrl)

/**
 * 
 * @param {String} instagramUrl Instagram post URL to parse
 * @returns Instagram structure Array
 */
const constructInstagramStructure =
  (instagramUrl) =>
    M.IO(
      () => fetchInstagramPostJson(instagramUrl)
    ).bind(
      (promisedPost) => M.IO(
        () => promisedPost.then(
          post => [
            { author: IG_HELPER.extractMedia(post).owner.username },
            { id: IG_HELPER.extractMedia(post).shortcode },
            { post: post },
            { media: getInstagramMedia(post) },
            { comments: getInstagramCaptions(post) }
          ]
        ))
    ).run()

module.exports = { constructInstagramStructure }
