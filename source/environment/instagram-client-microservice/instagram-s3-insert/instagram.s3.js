require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const IG_S3_HANDLER = require('./instagram.s3.handler')

/**
 * @param {Object} structure `Instagram` structure
 * @param {String} bucketName 
 * @param {String} bucketChildName
 */
const uploadInstagramStructureS3 =
  async (bucketName, bucketChildName, structure) =>
      await IG_S3_HANDLER.uploadStructureS3(bucketName, bucketChildName, structure)

module.exports = { 
  uploadInstagramStructureS3: R.curry(uploadInstagramStructureS3)
}
