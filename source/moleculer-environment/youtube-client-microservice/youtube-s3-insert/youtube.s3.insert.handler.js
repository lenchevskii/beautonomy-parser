require('module-alias/register')

const R = require('ramda')
const FS = require('fs')
const YT_S3_CALLBACK = require('./youtube.s3.insert.callback')
const GENERAL_S3_HANDLER = require('@general-s3-handler')

/**
 * 
 * @param {String} directory Relative path to the temporary directory for a listening
 * @param {String} bucketName Bucket name inside the S3
 * @param {String} childBucketName Subdirectory name for saving
 * @param {[String]} filePathCollection The path to the file you want to upload
 */
const uploadFileCollecton =
  (directory, bucketName, childBucketName, filePathCollection) =>
    filePathCollection.map(
      filePath => FS.readFile(
        filePath,
        YT_S3_CALLBACK.readFileCallback(
          bucketName,
          GENERAL_S3_HANDLER.constructBucketS3Path(directory, childBucketName, filePath),
          R.__,
          R.__
        )
      )
    )

module.exports = { uploadFileCollecton: R.curry(uploadFileCollecton) }
