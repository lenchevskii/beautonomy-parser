require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql')
const G_HANDLER = require('@general-handler')
const MYSQL_CONNECTION = require('./youtube.resolver.connection')
const YT_RESOLVER_API = require('./youtube.resolver.API')
const YT_RESOLVER_HANDLER = require('./youtube.resolver.handler')
const YT_RESOLVER_PROCESSOR = require('./youtube.resolver.processor')

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId YouTube link ID to process
 * @param {Function} processor Sequence of extraction actions
 */
const extractProductsIO =
  (connection, processor, bucketName, bucketS3Path) =>
    YT_RESOLVER_API.getAllDescriptionFrames(connection, processor, bucketName, bucketS3Path)

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

module.exports = { insertDescriptionBeginningSetIO, insertDescriptionEndingSetIO, extractProductsIO }

extractProductsIO(
  MYSQL_CONNECTION.CONNECTION,
  YT_RESOLVER_PROCESSOR.extractProducts,
  'beautonomy-parser',
  'youtube/Mariah Leonard/20210331 -- The Makeup Techniques That Never Fail Me - My Signature Look _ Mariah Leonard/Kuk07Y8DdAY.info.json'
)

const startsWith = [['Benefit'], ['MERIT'], ['Danessa'], ['UD']]
const endsWith = [['Corrector'], ['Concealer'], ['Shadowstick'], ['Liner'], ['Bronzer']]

// startsWith.map(x => YT_RESOLVER_API.insertDescriptionBeginning(MYSQL_CONNECTION.CONNECTION, x))
// endsWith.map(x => YT_RESOLVER_API.insertDescriptionEnding(MYSQL_CONNECTION.CONNECTION, x))
