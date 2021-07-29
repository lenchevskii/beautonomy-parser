const R = require('ramda')
const YT_PROCESSOR_HELPER = require('./youtube.processor.helper')
const YT_PROCESSOR_HANDLER = require('./youtube.processor.handler')

/**
 * Main processing function (read from S3 + resolve: extract products + save into S3)
 * @param {Object} file Data object from S3 storage
 * @param {[[String]]} frames Boundary words (aka trigger words)
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 * @param {Boolean} isTmpMode Flag initiates `temporary mode`
 */
const processProducts =
  (file, frames, bucketName, bucketS3Path, isTmpMode) =>
    R.compose(
      YT_PROCESSOR_HANDLER.saveProductsS3(R.__, bucketName, bucketS3Path),
      (
        isTmpMode
          ? YT_PROCESSOR_HANDLER.constructProductObjectTmpMode(file, R.__)
          : YT_PROCESSOR_HANDLER.constructProductObject(file, R.__)
      ),
      YT_PROCESSOR_HELPER.createUniqueTriggerWords,
      YT_PROCESSOR_HELPER.unwrapMySQLCollection
      // YT_PROCESSOR_HANDLER.getProductRegExp
    )(frames)

module.exports = { processProducts: R.curry(processProducts) }
