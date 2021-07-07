const R = require('ramda')
const MYSQL = require('mysql')
const YT_MYSQL_CALLBACK = require('./youtube.mysql.callback')

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {String} stringifiedCollection 
 */
const insertCollection =
  (connection, stringifiedCollection) =>
    connection.query(
      'INSERT INTO `processed_YouTube_links` (`link_id`, `channel`, `channel_id`, `upload_date`, `title`) VALUES'
      + `${stringifiedCollection}`,
      YT_MYSQL_CALLBACK.insertMySQLCallback
    )

module.exports = { insertCollection: R.curry(insertCollection) }
