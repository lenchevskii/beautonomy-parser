require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const UUID = require('uuid')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const G_SERVER_HELPER = require('@general-server-helper')
const IG_SCHEDULER_API = require('./instagram.scheduler.API')
const IG_SCHEDULER_HELPER = require('./instagram.scheduler.helper')

/**
 * @param {MYSQL.Connection} connection 
 * @returns {Array<Object>} Channels updates of type `[{ channel_id, upload_date }]`
 */
const findLastUserUpdatesIO =
  (connection) =>
    R_ASYNC.pipeAsync(
      IG_SCHEDULER_API.listPostIDs,
      R.head,
      IG_SCHEDULER_HELPER.findLastUserDBUpdates,
      IG_SCHEDULER_HELPER.findPostsForUpdate
    )(connection)

/**
 * Function which run service for each channel in collection
 * @param {Array<Object>} userUpdates collection to update
 * @param {Function} service 
 */
const serviceMapper =
  (userUpdates, service) =>
    userUpdates.map(
      ({ username: username, post_id: postId }, index) =>
        setTimeout(
          () => service(
            
          ),
          index * 2000
        )
    )

module.exports = {
  serviceMapper: R.curry(serviceMapper),
  findLastUserUpdatesIO
}
