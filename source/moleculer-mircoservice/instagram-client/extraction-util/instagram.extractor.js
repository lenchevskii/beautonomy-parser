require('module-alias/register')

const { trace } = require('@helper')

const { extractMedia, fetchJson } = require('@instagram-helper')

const { extractDisplayResources } =
  require('./pipe-handler/media.extractor')

const { template, pattern, resolveUrl } =
  require('./pipe-profile/instagram.profile')

const { extractCaptions } = require('./pipe-handler/caption.extractor')

const R = require('ramda')

const resolveInstagramUrl = R.curry(resolveUrl)(template, pattern)

const getInstagramMedia =
  (instagramUrl) =>
    R.compose(
      extractDisplayResources,
      extractMedia,
      fetchJson,
      resolveInstagramUrl
    )(instagramUrl)

const getInstagramCaptions =
  (instagramUrl) =>
    R.compose(
      extractCaptions,
      extractMedia,
      fetchJson,
      resolveInstagramUrl
    )(instagramUrl)

module.exports = { getInstagramMedia, getInstagramCaptions }
