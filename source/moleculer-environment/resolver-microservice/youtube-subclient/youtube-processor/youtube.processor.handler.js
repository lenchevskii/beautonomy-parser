require('module-alias/register')

const R = require('ramda')
const G_S3_CALLBACK = require('@general-s3-callback')
const YT_PROCESSOR_HELPER = require('./youtube.processor.helper')
const AWS = require('aws-sdk')

const S3 = new AWS.S3()

/**
 * Save Product JSON as `.product.json` file 
 * @param {Object} products Products used object
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const saveProductsS3 =
  (products, bucketName, bucketS3Path) =>
    S3.putObject(
      {
        Bucket: bucketName,
        Key: bucketS3Path.replace('info', 'product'),
        Body: JSON.stringify(products)
      },
      G_S3_CALLBACK.S3Callback
    )

/**
* @param {Object} S3Object Data object from S3 storage
* @param {RegExp} frameRegExp Boundary words Regular Expression
* @returns {Object} Products used object
*/
const constructProductObject =
  (S3Object, frameRegExp) =>
    new Object({
      products: JSON
        .parse(S3Object.Body)
        .description
        .match(frameRegExp)
    })

/**
 * 
 * @param {[[String]]} frames Boundary words (aka trigger words)
 * @returns 
 */
const getProductRegExp =
  (frames) =>
    R.compose(
      YT_PROCESSOR_HELPER.constructRegExp,
      YT_PROCESSOR_HELPER.formUniqueTriggerWordCollection,
      YT_PROCESSOR_HELPER.unwrapMySQLCollection
    )(frames)

module.exports = {
  saveProductsS3: R.curry(saveProductsS3),
  getProductRegExp,
  constructProductObject: R.curry(constructProductObject),
}
