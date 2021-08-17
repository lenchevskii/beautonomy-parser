require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const AWS = require('aws-sdk')
const PATH = require('path')
const R_ASYNC = require('ramda-async')

const S3 = new AWS.S3()

/**
 * @param {String} bucketName Bucket name to store
 * @param {String} bucketChildName Name of a child directory to store
 * @param {Array} collection Structure to store
 */
const uploadStructureS3 =
  (bucketName, childBucketName, collection) =>
    [
      Promise.all(        // or R_ASYNC.traversePromises
        collection.map(
          (
            [
              { author: author },
              { id: id },
              ...tail
            ]
          ) =>
            S3.upload(
              {
                Bucket: bucketName,
                Key: PATH.join(childBucketName, author.name, String(id) + '.json'),
                Body: JSON.stringify(tail)
              }
            ).promise().catch(H.trace)
        )
      ),
      collection
    ]

module.exports = {
  uploadStructureS3: R.curry(uploadStructureS3)
}
