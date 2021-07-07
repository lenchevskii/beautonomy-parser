const R = require('ramda')
const MYSQL = require('mysql')
const YT_MYSQL_HANDLER = require('./youtube.mysql.handler')
const YT_MYSQL_API = require('./youtube.mysql.API')

/**
 * Insert YouTube link's collection into the processed_YouTube_links table
 * @param {MYSQL.Connection} connection 
 * @param {String} directory Temporary directory for listening
 */
const insertYouTubeCollectionIO =
  (connection, directory) =>
    R.compose(
      YT_MYSQL_API.insertCollection(connection, R.__),
      YT_MYSQL_HANDLER.constructYTLinkEntitySet
    )(directory)

module.exports = { insertYouTubeCollectionIO }
