require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const R_ASYNC = require('ramda-async')
const MYSQL = require('mysql2/promise')
const SCHEDULER_HANDLER = require('./scheduler.handler')

/**
 * Function takes service for scheduling 
 * @param  {MYSQL.Connection} connection  
 * @param {Function} service 
 * @param {Number} interval Interval for repetition *(ms)*
 * @returns {NodeJS.Timeout} `Timeout` object 
 */
const scheduleYTServiceIO =
  async (connection, service, interval) =>
    Promise.resolve(
      setInterval(
        async () =>
          await R_ASYNC.pipeAsync(
            SCHEDULER_HANDLER.findLastChannelUpdatesIO,
            SCHEDULER_HANDLER.serviceMapper(R.__, service)
          )(connection),
        interval
      )
    ).catch(R.identity)

module.exports = {
  scheduleYTServiceIO: R.curry(scheduleYTServiceIO)
}
