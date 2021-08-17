const H =  require('@general-helper')
const R = require('ramda')
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
const constructBucketS3Path =
  (
    extension,
    [{
      post_id: postId,
      author: author
    }]
  ) =>
    PATH.join(
      CFG.S3_RD_CHILD_BUCKET,
      author,
      postId + extension
    )

/**
 * @param {[*]} param0 Array containing RowDataPacket object
 * @returns {String} Bucket S3 path to element
 */
const constructAuthorStorage =
(
  [{
    post_id: postId,
    author: author
  }]
) =>
  H.trace(PATH.join(
    CFG.S3_RD_CHILD_BUCKET,
    author
  ))

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
      .catch(error => error.message)

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

/**
 * Function return { Body } property of S3.GetObjectAclOutput or Nothing 
 * @param {AWS.S3.GetObjectAclOutput} s3Response 
 */
const maybeBody =
  (s3Response) =>
    R.has('Body')(s3Response)
      ? R.prop('Body')(s3Response)
      : undefined

module.exports = {
  maybeBody,
  getS3Object: R.curry(getS3Object),
  getS3FilesList: R.curry(getS3FilesList),
  constructAuthorStorage: constructAuthorStorage,
  constructBucketS3Path: R.curry(constructBucketS3Path)
}
