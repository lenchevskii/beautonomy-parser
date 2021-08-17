require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const AWS = require('aws-sdk')
const PATH = require('path')
const MYSQL = require('mysql2/promise')

const S3 = new AWS.S3()

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} bucketName Bucket name to store
 * @param {String} bucketChildName Name of a child directory to store
 * @param {Promise} collection Promised structure to store 
 * @returns Array with `upload Promise` and metainformation for MySQL 
 */
const uploadStructureS3 =
  async (
    bucketName,
    bucketChildName,
    [
      { username: username },
      { shortcode: shortcode },
      { ownerId: ownerId },
      { postId: postId },
      ...tail
    ]
  ) => [
      await S3.upload(
        {
          Bucket: bucketName,
          Key: PATH.join(bucketChildName, ownerId + ' -- ' + username, postId + ' -- ' + shortcode + '.json'),
          Body: JSON.stringify(tail)
        }
      ).promise().catch(H.trace),
      [
        username,
        shortcode,
        ownerId,
        postId
      ]
    ]

module.exports = {
  uploadStructureS3: R.curry(uploadStructureS3)
}
