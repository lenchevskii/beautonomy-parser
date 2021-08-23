require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const SCHEDULER_HANDLER = require('./youtube.scheduler.handler')

/**
 * Function takes service for scheduling 
 * @param  {MYSQL.Connection} connection  
 * @param {Function} service 
 * @param {Number|String} interval Interval for repetition *(min)*
 */
const scheduleYTServiceIO =
  (connection, service, interval) =>
    Promise.resolve(
      setInterval(
        () =>
          R_ASYNC.pipeAsync(
            SCHEDULER_HANDLER.findLastChannelUpdatesIO,
            SCHEDULER_HANDLER.serviceMapper(R.__, service)
          )(connection),
        interval * 60000
      )
    ).catch(H.trace)

module.exports = {
  scheduleYTServiceIO: R.curry(scheduleYTServiceIO)
}
