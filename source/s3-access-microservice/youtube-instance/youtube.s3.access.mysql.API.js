const R = require('ramda')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} linkId YouTube link ID 
 */
const getYTLinkRecord =
  (connection, linkId) =>
    connection.execute(
      `SELECT * FROM processed_youtube_links WHERE link_id=${MYSQL.escape(linkId)}`
    )

module.exports = {
  getYTLinkRecord: R.curry(getYTLinkRecord)
}

