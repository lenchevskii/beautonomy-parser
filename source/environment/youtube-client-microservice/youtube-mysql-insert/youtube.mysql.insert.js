require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql')
const YT_MYSQL_API = require('./youtube.mysql.API')
const YT_MYSQL_HANDLER = require('./youtube.mysql.handler')

/**
 * Insert YouTube link's collection into the processed_YouTube_links table
 * @param {MYSQL.Connection} connection 
 * @param {String} directory Temporary directory for listening
 */
const insertYTCollectionIO =
  (connection, directory) =>
    H.catchError(
      R.compose(
        YT_MYSQL_API.insertYTCollection(connection, R.__),
        YT_MYSQL_HANDLER.constructYTLinkEntitySet
      ),
      directory
    )

/**
 * Insert YouTube link's collection into the processed_YouTube_links table
 * @param {MYSQL.Connection} connection 
 * @param {String} directory Temporary directory for listening
 */
const insertYTCollectionByRowIO =
  (connection, directory) =>
    H.catchError(
      R.compose(
        YT_MYSQL_API.insertYTCollectionByRow(connection, R.__),
        YT_MYSQL_HANDLER.constructYTLinkEntitySet
      ),
      directory
    )

module.exports = {
  insertYTCollectionByRowIO,
  insertYTCollectionIO
}
