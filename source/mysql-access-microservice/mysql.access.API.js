const R = require('ramda')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listYTChannels =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT channel_id FROM processed_YouTube_links`
    ).catch(R.identity)

/**
 * @param {MYSQL.Connection} connection 
 */
const listLastYTChannelsUpdates =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT channel_id FROM processed_YouTube_links`
    ).catch(R.identity)

module.exports = { 
  listYTChannels,
  listLastYTChannelsUpdates
}
