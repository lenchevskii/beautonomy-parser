require('module-alias/register')

const R = require('ramda')
const MYSQL = require('mysql')
const G_MYSQL_CALLBACK = require('@general-mysql-callback')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')
const YT_RESOLVER_CALLBACK = require('./youtube.resolver.callback')

/**
 * Cross JOIN + Processing of returning permutations of two tables
 * @param {MYSQL.Connection} connection 
 * @param {Function} processor Processing module (callback)
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 * @returns 
 */
const getAllDescriptionFrames =
  (connection, processor, bucketName, bucketS3Path) =>
    connection.query(
      'SELECT * FROM product_description_beginning, product_description_ending',
      // equivalent to 'SELECT p1.*, p2.* FROM product_description_beginning p1 cross join product_description_ending p2'
      YT_RESOLVER_CALLBACK
        .GETMySQLCallback(processor, bucketName, bucketS3Path, R.__, R.__)
    )

/**
 * Cross JOIN + Processing of returning permutations of two tables
 * @param {String} directory 
 * @param {String} childBucketName
 * @param {MYSQL.Connection} connection 
 * @param {Function} processor Processing module (callback)
 * @param {[String]} infoFilePaths Collection of temporary file paths
 * @param {String} bucketName 
 * @param {Boolean} isTmpMode 
 * @returns 
 */
const getAllDescriptionFramesTmpMode =
  (directory, childBucketName, connection, processor, infoFilePaths, bucketName, isTmpMode) =>
    connection.query(
      'SELECT * FROM product_description_beginning, product_description_ending',
      // equivalent to 'SELECT p1.*, p2.* FROM product_description_beginning p1 cross join product_description_ending p2'
      YT_RESOLVER_CALLBACK
        .GETMySQLCallbackTmpMode(directory, childBucketName, processor, infoFilePaths, bucketName, isTmpMode, R.__, R.__)
    )

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} word 
 */
const insertDescriptionBeginning =
  (connection, word) =>
    connection.query(
      'INSERT INTO `product_description_beginning` (`starts_with`) VALUES'
      + `${YT_RESOLVER_HELPER.expandTriggerWordSet(word)}`,
      G_MYSQL_CALLBACK.insertMySQLCallback
    )

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} word 
 */
const insertDescriptionEnding =
  (connection, word) =>
    connection.query(
      'INSERT INTO `product_description_ending` (`ends_with`) VALUES'
      + `${YT_RESOLVER_HELPER.expandTriggerWordSet(word)}`,
      G_MYSQL_CALLBACK.insertMySQLCallback
    )

module.exports = {
  getAllDescriptionFrames: R.curry(getAllDescriptionFrames),
  insertDescriptionBeginning: R.curry(insertDescriptionBeginning),
  insertDescriptionEnding: R.curry(insertDescriptionEnding),
  getAllDescriptionFramesTmpMode: R.curry(getAllDescriptionFramesTmpMode)
}
