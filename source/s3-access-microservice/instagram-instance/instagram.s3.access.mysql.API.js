const R = require('ramda')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} shortcode Instagram post ID 
 */
const getIGLinkRecord =
  (connection, shortcode) =>
    connection.execute(
      `SELECT * FROM processed_instagram_links WHERE shortcode=${MYSQL.escape(shortcode)}`
    )

module.exports = {
  getIGLinkRecord: R.curry(getIGLinkRecord)
}
