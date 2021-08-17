const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const YT_MYSQL_ACCESS_API = require('./youtube.mysql.access.API')
const G_MYSQL_HANDLER = require('@general-mysql-handler')

/**
 * @param {MYSQL.Connection} connection 
 */
const listChannelsIO =
  async (connection) =>
    R_ASYNC.pipeAsync(
      YT_MYSQL_ACCESS_API.listChannels,
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(connection)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} channelId
 */
const listVideosByChannelIdIO =
  (connection, channelId) =>
    R_ASYNC.pipeAsync(
      YT_MYSQL_ACCESS_API.listVideosByChannelId(R.__, channelId),
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(connection)

module.exports = {
  listChannelsIO, 
  listVideosByChannelIdIO
}
