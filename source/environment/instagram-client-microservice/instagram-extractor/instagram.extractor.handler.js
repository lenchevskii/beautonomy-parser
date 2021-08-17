const R = require('ramda')
const R_ASYNC = require('ramda-async')
const IG_EXTRACTOR_HELPER = require('./instagram.extractor.helper')

/**
* @param {Object} post 
* @returns {[Object]} 
*/
const getInstagramMedia =
  (post) =>
    R.compose(
      IG_EXTRACTOR_HELPER.extractDisplayResources,
      IG_EXTRACTOR_HELPER.extractMedia
    )(post)

/**
* @param {Object} post 
* @returns {[Object]} Captions 
*/
const getInstagramCaptions =
  (post) =>
    R.compose(
      IG_EXTRACTOR_HELPER.extractCaptions,
      IG_EXTRACTOR_HELPER.extractMedia
    )(post)

/**
* @param {String} postGraphAPIUrl 
* @returns {Object} `GraphAPI` JSON object 
*/
const fetchInstagramPostJson =
  (postGraphAPIUrl) =>
    R_ASYNC.pipeAsync(
      IG_EXTRACTOR_HELPER.constructIGUrlAPI,
      IG_EXTRACTOR_HELPER.fetchJson
    )(postGraphAPIUrl)

module.exports = {
  fetchInstagramPostJson,
  getInstagramCaptions,
  getInstagramMedia
}
