require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const IG_SCHEDULER_HANDLER = require('./instagram.scheduler.handler')

/**
 * Function takes service for scheduling 
 * @param  {MYSQL.Connection} connection  
 * @param {Function} service 
 * @param {Number} interval Interval for repetition *(min)*
 */
const scheduleIGServiceIO =
  (connection, service, interval) =>
    Promise.resolve(
      setTimeout(
        () =>
          R_ASYNC.pipeAsync(
            IG_SCHEDULER_HANDLER.findLastUserUpdatesIO,
            // IG_SCHEDULER_HANDLER.serviceMapper(R.__, service)
          )(connection),
        // interval * 60000
        interval
      )
    ).catch(H.trace)

module.exports = {
  scheduleIGServiceIO: R.curry(scheduleIGServiceIO)
}
