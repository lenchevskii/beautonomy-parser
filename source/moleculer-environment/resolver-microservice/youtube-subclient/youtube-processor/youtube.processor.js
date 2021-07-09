const R = require('ramda')
const YT_PROCESSOR_HANDLER = require('./youtube.processor.handler')

/**
 * Main processing function (read from S3 + resolve: extract products + save into S3)
 * @param {Object} S3Object Data object from S3 storage
 * @param {[[String]]} frames Boundary words (aka trigger words)
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const processProducts =
  (S3Object, frames, bucketName, bucketS3Path) =>
    R.compose(
      YT_PROCESSOR_HANDLER.saveProductsS3(R.__, bucketName, bucketS3Path),
      YT_PROCESSOR_HANDLER.constructProductObject(S3Object, R.__),
      YT_PROCESSOR_HANDLER.getProductRegExp
    )(frames)

module.exports = { processProducts }
