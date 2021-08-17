require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const AWS = require('aws-sdk')
const PATH = require('path')

const S3 = new AWS.S3()

/**
 * Construct Bucket S3 Path with a specific extension
 * @param {String} extension
 * @param {[*]} param0 Array containing RowDataPacket object
 * @returns {String} Bucket S3 path to element
 */
const constructIGBucketS3Path =
  (
    extension,
    [{
      shortcode: shortcode,
      username: username,
      owner_id: ownerId,
      post_id: postId
    }]
  ) =>
    PATH.join(
      CFG.S3_IG_CHILD_BUCKET,
      ownerId + ' --=-- ' + username,
      postId + ' --=-- ' + shortcode + extension
    )

/**
 * @param {[*]} param0 Array containing RowDataPacket object
 * @returns {String} Bucket S3 path to element
 */
const constructIGChildBucket =
  (
    [{
      shortcode: shortcode,
      username: username,
      owner_id: ownerId,
      post_id: postId
    }]
  ) =>
    PATH.join(
      CFG.S3_IG_CHILD_BUCKET,
      ownerId + ' --=-- ' + username,
      postId + ' --=-- ' + shortcode
    )

/**
 * 
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const getS3Object =
  (bucketName, bucketS3Path) =>
    S3
      .getObject({ Bucket: bucketName, Key: bucketS3Path })
      .promise()
      .catch(H.trace)

/**
 * 
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const getS3FilesList =
  (bucketName, bucketS3Path) =>
    S3
      .listObjects({ Bucket: bucketName, Prefix: bucketS3Path })
      .promise()
      .catch(H.trace)

/**
 * Function return {Body} property of S3.GetObjectAclOutput or Nothing 
 * @param {AWS.S3.GetObjectAclOutput} s3Response 
 */
const maybeBody =
  (s3Response) =>
    R.has('Body')(s3Response)
      ? R.compose(JSON.parse, R.prop('Body'))(s3Response)
      : undefined

module.exports = {
  maybeBody,
  getS3Object: R.curry(getS3Object),
  getS3FilesList: R.curry(getS3FilesList),
  constructIGChildBucket,
  constructIGBucketS3Path: R.curry(constructIGBucketS3Path)
}
