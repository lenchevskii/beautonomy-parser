require('module-alias/register')

const R = require('ramda')
const G_S3_HANDLER = require('@general-s3-handler')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')

/**
 * 
 * @param {[[String]]} triggerWordCollection 
 * @returns {String} Expanded trigger word set for MySQL insertion
 */
const constructTriggerWordSet =
  (triggerWordCollection) =>
    R.compose(
      YT_RESOLVER_HELPER.expandTriggerWordSet
    )(triggerWordCollection)

/**
 * @param {String} directory Temporary directory to read
 * @param {String} childBucketName 
 * @param {[String]} infoFilePaths Info file paths collection
 * @returns {[String]} Bucket S3 paths collection
 */
const constructBucketS3PathCollection =
  (directory, childBucketName, infoFilePaths) =>
    infoFilePaths.map(
      infoFilePath =>
        G_S3_HANDLER.constructBucketS3Path(directory, childBucketName, infoFilePath)
    )

module.exports = { 
  constructTriggerWordSet,
  constructBucketS3PathCollection: R.curry(constructBucketS3PathCollection)
}
