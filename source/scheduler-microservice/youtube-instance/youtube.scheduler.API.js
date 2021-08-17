const R = require('ramda')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listYTChannelDates =
  (connection) =>
    connection.execute(
      'SELECT channel_id, upload_date FROM processed_youtube_links'
    ).catch(R.identity)

module.exports = { listYTChannelDates }
