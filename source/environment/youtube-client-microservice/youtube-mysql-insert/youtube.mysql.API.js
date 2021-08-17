const R = require('ramda')
const MYSQL = require('mysql')
const G_MYSQL_CALLBACK = require('@general-mysql-callback')

/**
 * Insertion proceeds in a single connetion in a single transaction
 * @param {MYSQL.Connection} connection 
 * @param {[String]} valuesYTCollection 
 */
const insertYTCollection =
  (connection, valuesYTCollection) =>
    connection.query(
      'INSERT INTO `processed_youtube_links` (`link_id`, `channel`, `channel_id`, `upload_date`, `title`) VALUES'
      + `${valuesYTCollection.toLocaleString()}`,
      G_MYSQL_CALLBACK.insertMySQLCallback
    )

/**
 * Insertion proceeds in a single connection by the line per transaction
 * @param {MYSQL.Connection} connection 
 * @param {[String]} valuesYTCollection 
 */
const insertYTCollectionByRow =
  (connection, valuesYTCollection) =>
    valuesYTCollection.map(
      stringifiedValue =>
        connection.query(
          'INSERT INTO `processed_youtube_links` (`link_id`, `channel`, `channel_id`, `upload_date`, `title`) VALUES'
          + `${stringifiedValue}`,
          G_MYSQL_CALLBACK.insertMySQLCallback
        )
    )

module.exports = {
  insertYTCollection: R.curry(insertYTCollection),
  insertYTCollectionByRow: R.curry(insertYTCollectionByRow)
}
