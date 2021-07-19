require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql')
const G_HANDLER = require('@general-handler')
const YT_RESOLVER_API = require('./youtube.resolver.API')
const YT_RESOLVER_HANDLER = require('./youtube.resolver.handler')

/**
 * Find and save products from description into S3
 * @param {MYSQL.Connection} connection 
 * @param {Function} processor Sequence of extraction actions
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const insertProductsFoundIO =
  (connection, processor, bucketName, bucketS3Path) =>
    YT_RESOLVER_API
      .getAllDescriptionFrames(connection, processor, bucketName, bucketS3Path)

/**
 * Find and save products from description into S3 (temporary directory mode)
 * @param {MYSQL.Connection} connection 
 * @param {Function} processor Sequence of extraction actions
 * @param {String} bucketName 
 * @param {String} childBucketName
 * @param {String} directory Temporary directory to read
 * @param {Boolean} isTmpMode 
 */
const insertProductsFoundTmpIO =
  (connection, processor, bucketName, childBucketName, directory, isTmpMode) =>
    R.compose(
      YT_RESOLVER_API
        .getAllDescriptionFramesTmpMode(directory, childBucketName, connection, processor, R.__, bucketName, isTmpMode),
      G_HANDLER.getInfoFilePaths,
      G_HANDLER.getAllFilePaths,
    )(directory)

/**
 * Insert Beginning trigger word collection for process products
 * @param {MYSQL.Connection} connection 
 * @param {[[String]]} set Set of values for insertion
 */
const insertDescriptionBeginningSetIO =
  (connection, set) =>
    set.map(
      word =>
        YT_RESOLVER_API.insertDescriptionBeginning(
          connection,
          YT_RESOLVER_HANDLER.constructTriggerWordSet(word)
        )
    )

/**
 * Insert Ending trigger word collection for process products
 * @param {MYSQL.Connection} connection 
 * @param {[[String]]} set Set of values for insertion
 */
const insertDescriptionEndingSetIO =
  (connection, set) =>
    set.map(
      word =>
        YT_RESOLVER_API.insertDescriptionEnding(
          connection,
          YT_RESOLVER_HANDLER.constructTriggerWordSet(word)
        )
    )

module.exports = {
  insertDescriptionBeginningSetIO,
  insertDescriptionEndingSetIO,
  insertProductsFoundTmpIO,
  insertProductsFoundIO
}

// insertProductsFoundIO(
//   MYSQL_CONNECTION.CONNECTION,
//   YT_PROCESSOR.processProducts,
//   'beautonomy-parser',
//   'youtube/Mariah Leonard/20210331 -- The Makeup Techniques That Never Fail Me - My Signature Look _ Mariah Leonard/Kuk07Y8DdAY.info.json'
// )

// const startsWith = [['Tinkle'], ['KVD'], ['Sleek'], ['Glossier'], ['Kash Beauty'], ['Nudestix'], ['Revolution'], ['Kiko'], ['Tatcha'], ['Catrice'], ['Coty'], ['Patrick Ta'], ['Ardell'], ['Pixi + Louise Roe']]
// const endsWith = [['Wispies'], ['Primer']]

// startsWith.map(x => YT_RESOLVER_API.insertDescriptionBeginning(MYSQL_CONNECTION.CONNECTION, x))
// endsWith.map(x => YT_RESOLVER_API.insertDescriptionEnding(MYSQL_CONNECTION.CONNECTION, x))
