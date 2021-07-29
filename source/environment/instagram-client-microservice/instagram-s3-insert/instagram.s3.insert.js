require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const AWS = require('aws-sdk')
const PATH = require('path')
const IG_EXTRACTOR = require('../instagram-extractor/instagram.extractor')
const GENERAL_S3_CALLBACK = require('@general-s3-callback')

const S3 = new AWS.S3()

/**
 * 
 * @param {String} bucketName Bucket name to store
 * @param {String} bucketChildName Name of a child directory to store
 * @param {Promise} collection Promised structure to store
 * @returns 
 */
const uploadStructureS3 =
  (bucketName, bucketChildName, collection) =>
    collection.then(
      (
        [
          { author: author },
          { id: id },
          ...tail
        ]
      ) =>
        S3.putObject(
          {
            Bucket: bucketName,
            Key: PATH.join(bucketChildName, author, String(id) + '.json'),
            Body: JSON.stringify(tail)
          },
          GENERAL_S3_CALLBACK.S3Callback
        )
    )

const uploadInstagramStructureS3 =
  (bucketName, bucketChildName, instagramUrl) =>
    R.compose(
      R.curry(uploadStructureS3)(bucketName, bucketChildName, R.__),
      IG_EXTRACTOR.constructInstagramStructure
    )(instagramUrl)

module.exports = { uploadInstagramStructureS3 }
