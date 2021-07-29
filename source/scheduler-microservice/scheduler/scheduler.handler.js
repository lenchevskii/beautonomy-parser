require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const UUID = require('uuid')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const G_SERVER_HELPER = require('@general-server-helper')
const SCHEDULER_API = require('./scheduler.API')
const SCHEDULER_HELPER = require('./scheduler.helper')
const YT_AUTOMATON_HELPER = require('../../environment/youtube-client-microservice/youtube-automaton/youtube.automaton.helper')

/**
 * @param {MYSQL.Connection} connection 
 * @returns {[*]} Channels updates collection of type [{ channel_id, upload_date }]
 */
const findLastChannelUpdatesIO =
  async (connection) =>
    R_ASYNC.pipeAsync(
      SCHEDULER_API.listYTChannelDates,
      R.head,
      SCHEDULER_HELPER.findLastChannelUpdates
    )(connection)

/**
 * Function which run service for each channel in collection
 * @param {[*]} channelUpdates collection to update
 * @param {Function} service 
 * @returns 
 */
const serviceMapper =
  (channelUpdates, service) =>
    channelUpdates.map(
      ({ channel_id: channelId, upload_date: uploadDate }, index) =>
        setTimeout(
          () => service(
            G_SERVER_HELPER.constructYTChannelLinkFromID(channelId),
            YT_AUTOMATON_HELPER.constructTemporaryDirectory(UUID.v4()),
            true,
            uploadDate
          ),
          index * 2000
        )
    )

module.exports = {
  serviceMapper: R.curry(serviceMapper),
  findLastChannelUpdatesIO
}
