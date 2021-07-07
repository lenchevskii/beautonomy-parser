require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')
const YT_RESOLVER_HANDLER = require('./youtube.resolver.handler')

/**
 * 
 * @param {String} S3Object 
 * @param {[[String]]} frames 
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 * @returns 
 */
const extractProducts =
  (S3Object, frames, bucketName, bucketS3Path) =>
    JSON.parse(S3Object.Body).description.match(H.trace(YT_RESOLVER_HANDLER.getProductRegExp(frames)))

module.exports = { extractProducts }
