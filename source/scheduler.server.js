/**
 * Generate PATH variables for tools' execution with abbreviated names 
 * ! PATHs exist inside current session only - because of the spawn child Bash !
 * 
 * ! Commented for major server mode !
 * require('shelljs').exec('./tool.env.generator.sh')
 */

require('module-alias/register')
/**
 * Scheduler server autoremove tool clears previous server initialization (Redis DB)
 */
require('./scheduler-microservice/scheduler.server.autoremove.tool')

const M = require('monet')
const H = require('@general-helper')
const APP = require('express')()
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const WHITELIST = JSON.parse(require('fs').readFileSync('./configuration.json')).sources
const REDIS_CALL_MS = require('./redis-call-microservice/redis.scheduler.call')
const G_SERVER_HELPER = require('./utils/general-server-util/general.server.helper')
const G_SERVER_RESPONSE = require('./utils/general-server-util/general.server.response')
const SCHEDULER_SERVER_MODE = require('./scheduler-microservice/scheduler.server.mode')

APP.all(
  '/*',
  (_, response, next) =>
    G_SERVER_RESPONSE.allowCORS(WHITELIST, response, next)
)

APP.get(
  '/schedule/:service/:interval',
  (request, response) =>
    G_SERVER_HELPER.isService(request)
      && G_SERVER_HELPER.isInterval(request)
      ? M.IO(
        () => REDIS_CALL_MS.getProcessMetadata(request)
      ).bind(
        (redisResponse) => M.IO(
          async () => SCHEDULER_SERVER_MODE.runTargetedServiceIO(
            await redisResponse,
            request,
            response
          )
        )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        request.params.service,
        null,
        response,
        `illegal request parameters: (${Object.values(request.params)})`
      )
)

APP.get(
  '/kill/:service',
  async (request, response) =>
    G_SERVER_HELPER.isService(request)
      ? M.IO(
        () => REDIS_CALL_MS.getProcessMetadata(request)
      ).bind(
        (redisResponse) =>
          M.IO(
            async () => SCHEDULER_SERVER_MODE.killTargetedServiceIO(
              await redisResponse,
              request,
              response
            )
          )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        request.params.service,
        null,
        response,
        `illegal request parameters: (${Object.values(request.params)})`
      )
)

APP.all(
  '/*',
  (request, response) =>
    G_SERVER_RESPONSE.asteriskResponse(
      response,
      CFG.SCHEDULER,
      request.originalUrl,
      request.method
    )
)

APP.listen(
  CFG.SCHEDULER_PORT,
  () =>
    H.trace(
      CLI_COLOR.bgWhite(`|> Scheduler     <|server is listening on port:`),
      CFG.SCHEDULER_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${(new Date()).toLocaleString()}`,
      CLI_COLOR.bgWhite('|> Clean Redis   <|')
    )
)
