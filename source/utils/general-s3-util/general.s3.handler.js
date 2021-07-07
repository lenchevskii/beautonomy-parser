const R = require('ramda')

/**
 * 
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

module.exports = { constructBucketS3Path: R.curry(constructBucketS3Path) }
