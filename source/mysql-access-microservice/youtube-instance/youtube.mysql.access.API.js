require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listChannels =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT channel_id FROM processed_youtube_links`
    ).catch(H.trace)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} channelId
 */
const listVideosByChannelId =
  (connection, channelId) =>
    connection.execute(
      `SELECT * FROM processed_youtube_links WHERE channel_id=${MYSQL.escape(channelId)}`
    ).catch(H.trace)

module.exports = {
  listChannels,
  listVideosByChannelId: R.curry(listVideosByChannelId)
}
