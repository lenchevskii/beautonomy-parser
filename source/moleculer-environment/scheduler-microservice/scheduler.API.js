const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const getYTChannels =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT channel_id FROM processed_YouTube_links`
    )

module.exports = { getYTChannels }
