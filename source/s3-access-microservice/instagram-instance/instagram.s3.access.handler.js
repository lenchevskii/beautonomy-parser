require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const IG_S3_ACCESS_HELPER = require('./instagram.s3.access.helper')

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
        IG_S3_ACCESS_HELPER.getS3Object(bucketName, R.__),
        IG_S3_ACCESS_HELPER.constructIGBucketS3Path(extension, R.__)
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
        IG_S3_ACCESS_HELPER.getS3FilesList(bucketName, R.__),
        IG_S3_ACCESS_HELPER.constructIGChildBucket
      )(rowDataPacket)

module.exports = {
  listBucketS3Objects: R.curry(listBucketS3Objects),
  getBucketS3PathObject: R.curry(getBucketS3PathObject)
}
