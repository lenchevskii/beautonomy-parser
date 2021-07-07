require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const G_HANDLER = require('@general-handler')
const YT_S3_HANDLER = require('./youtube.s3.handler')

/**
 * 
 * @param {String} directory Local directory in which updates are checked 
 * @param {String} bucketName S3 bucket name for uploading
 * @param {String} chiledBucketName Child bucket name for uploading
 */
const uploadYouTubeCollectionIO =
  (directory, bucketName, chiledBucketName) =>
    H.catchError(
      R.compose(
        YT_S3_HANDLER.uploadFileCollecton(directory, bucketName, chiledBucketName, R.__),
        G_HANDLER.getAllFilePaths
      ),
      directory
    )

module.exports = { uploadYouTubeCollectionIO }
