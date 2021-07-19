require('module-alias/register')

const R = require('ramda')
const G_MYSQL_HELPER = require('@general-mysql-helper')
const S3_ACCESS_HELPER = require('./s3.access.helper')

/**
 * 
 * @param {*} rowDataPacket MySQL data output form
 * @returns {String} YouTube S3 bucket path
 */
const getBucketS3PathFiles =
  (rowDataPacket, bucketName) =>
    R.compose(
      S3_ACCESS_HELPER.getS3Object(bucketName, R.__),
      S3_ACCESS_HELPER.constructYTBucketS3Path,
      G_MYSQL_HELPER.unwrapRowDataPacket
    )(rowDataPacket)

module.exports = { getBucketS3PathFiles }
