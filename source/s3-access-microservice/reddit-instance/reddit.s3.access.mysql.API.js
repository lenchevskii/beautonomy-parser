const R = require('ramda')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} postId 
 */
const getRecord =
  (connection, postId) =>
    connection.execute(
      `SELECT * FROM processed_reddit_links WHERE post_id=${MYSQL.escape(postId)}`
    )

module.exports = {
  getRecord: R.curry(getRecord)
}

