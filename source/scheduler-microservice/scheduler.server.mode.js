const R = require('ramda')
const M = require('monet')
const CP = require('child_process')
const EXPRESS = require('express')
const G_SERVER_RESPONSE = require('../utils/general-server-util/general.server.response')
const SHEDULER_REDIS_CALL_MS = require('../redis-call-microservice/redis.scheduler.call')

/**
 * Monad runs `Child Process` if it doesn't exist yet 
 * @param {String} redisResponse 
 * @param {EXPRESS.Request} request
 * @param {EXPRESS.Response} response
 */
const runTargetedServiceIO =
  (redisResponse, request, response) =>
    !redisResponse
      ? M.IO(
        () => CP.fork(
          `source/scheduler-microservice/${request.params.service}-instance/${request.params.service}.scheduler.tool.js`,
          [request.params.interval]
        )
      ).bind(
        (childProcess) =>
          M.IO(
            () => SHEDULER_REDIS_CALL_MS.setProcessMetadata(childProcess, request)
          )
      ).bind(
        ([_, pid]) => M.IO(
          () => G_SERVER_RESPONSE.successfulResponse(
            request.params.service,
            Number(pid),
            response,
            `${request.params.service} service scheduled with an interval: ${request.params.interval} min`
          )
        )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        request.params.service,
        null,
        response,
        `${request.params.service} service was already scheduled`
      )

/**
 * Monad kills service `process` and removes it from Redis 
 * @param {String} redisResponse 
 * @param {EXPRESS.Request} request 
 * @param {EXPRESS.Response} response 
 */
const killTargetedServiceIO =
  async (redisResponse, request, response) =>
    redisResponse
      ? M.IO(
        () => R.compose(process.kill, Number, R.head, (x) => x.split(':'))(redisResponse)
      ).takeRight(
        M.IO(
          async () => await SHEDULER_REDIS_CALL_MS.delProcessMetadata(request)
        )
      ).takeRight(
        M.IO(
          () => G_SERVER_RESPONSE.successfulResponse(
            request.params.service,
            R.head(redisResponse.split(':')),
            response,
            `${request.params.service} scheduler was successfully killed`
          )
        )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        request.params.service,
        null,
        response,
        `${request.params.service} scheduler doesn't exist yet`
      )

module.exports = {
  runTargetedServiceIO,
  killTargetedServiceIO
}
