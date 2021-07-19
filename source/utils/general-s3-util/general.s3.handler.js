const R = require('ramda')
const V4_REGEXP = new RegExp(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}\//i)

/**
 * Bucket S3 path constructor
 * @param {String} directory Relative path to the temporary directory
 * @param {String} childBucketName Subdirectory name to save 
 * @param {String} filePath Path to file which have to be treated
 * @returns {String} 
 */
const constructBucketS3Path =
  (directory, childBucketName, filePath) =>
    R.replace(
      directory,
      childBucketName,
      filePath
    )

/**
 * 
 * @param {[String]} paths 
 * @returns 
 */
const removeUuidFromPathCollection =
  (paths) =>
    paths.map(path => path.replace(V4_REGEXP, ''))

module.exports = {
  constructBucketS3Path: R.curry(constructBucketS3Path)
  // removeUuidFromPathCollection
}
