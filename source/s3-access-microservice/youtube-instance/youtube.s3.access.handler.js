require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const YT_S3_ACCESS_HELPER = require('./youtube.s3.access.helper')

/**
 * @param {*} rowDataPacket MySQL data output form
 * @param {String} bucketName
 * @param {String} extension
 * @returns {String} YouTube S3 bucket path
 */
const getBucketS3PathObject =
  (rowDataPacket, bucketName, extension) =>
    R.isEmpty(rowDataPacket)
      ? undefined
      : R.compose(
        YT_S3_ACCESS_HELPER.getS3Object(bucketName, R.__),
        YT_S3_ACCESS_HELPER.constructYTBucketS3Path(extension, R.__)
      )(rowDataPacket)

/**
 * @param {*} rowDataPacket MySQL data output form
 * @param {String} bucketName
 * @param {String} link_id
 * @returns {String} YouTube S3 bucket path
 */
const listBucketS3Objects =
  (rowDataPacket, bucketName) =>
    R.isEmpty(rowDataPacket)
      ? undefined
      : R.compose(
        YT_S3_ACCESS_HELPER.getS3FilesList(bucketName, R.__),
        YT_S3_ACCESS_HELPER.constructYTChildBucket
      )(rowDataPacket)

module.exports = {
  listBucketS3Objects: R.curry(listBucketS3Objects),
  getBucketS3PathObject: R.curry(getBucketS3PathObject)
}
