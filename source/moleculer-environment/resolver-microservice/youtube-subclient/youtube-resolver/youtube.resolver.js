require('module-alias/register')

const MYSQL = require('mysql')
const YT_RESOLVER_API = require('./youtube.resolver.API')
const YT_RESOLVER_HANDLER = require('./youtube.resolver.handler')

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId YouTube link ID to process
 * @param {Function} processor Sequence of extraction actions
 */
const insertProductsFoundIO =
  (connection, processor, bucketName, bucketS3Path) =>
    YT_RESOLVER_API
      .getAllDescriptionFrames(connection, processor, bucketName, bucketS3Path)

/**
 * 
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
 * 
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

module.exports = { insertDescriptionBeginningSetIO, insertDescriptionEndingSetIO, insertProductsFoundIO }

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
