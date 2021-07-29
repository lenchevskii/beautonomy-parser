require('module-alias/register')

const M = require('monet')
const R = require('ramda')
const H = require('@general-helper')
const CP = require('child_process')
const APP = require('express')()
const CFG = require('dotenv').config().parsed
const UTIL = require('util')
const REDIS = require('redis')
const FIND_CP = require('find-process')
const CLI_COLOR = require('cli-color')

const DATE = new Date()

const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST
})

APP.all(
  '/',
  (request, response) =>
    response.header("Access-Control-Allow-Origin", "*")
)

APP.get(
  '/schedule/:service/:interval',
  (request, response) =>
    M.IO(
      async () => await UTIL
        .promisify(REDIS_CLIENT.get)
        .bind(REDIS_CLIENT)(`${request.params.service}_process_pid`)
    ).bind(
      (redisResponse) => M.IO(
        async () => H.trace(await redisResponse)
          ? undefined
          : M.IO(
            () => CP.exec(
              `node source/scheduler-microservice/scheduler.youtube.tool.js ${Number(request.params.interval)}`,
              (error, stdout, stderr) =>
                error
                  ? H.trace(CLI_COLOR.red('Scheduler Error.'))
                  : H.trace(CLI_COLOR.green('YouTube Service schedule successfully.'))
            )
          ).bind(
            (child) =>
              M.IO(() => REDIS_CLIENT.set(`${request.params.service}_process_pid`, child.pid.toString()))
          ).run()
      )
    ).bind(
      (maybeRedisResponse) =>
        M.IO(
          async () => await maybeRedisResponse
            ? response
              .status(200)
              .send(
                H.trace({
                  message: `${request.params.service} service scheduled successfully`,
                  interval: Number(request.params.interval)
                })
              )
            : response
              .status(400)
              .send(H.trace({ message: `${request.params.service} service was already scheduled` }))
        )
    ).run()
)

// add find-process
APP.get(
  '/stop/:service',
  async (request, response) =>
    M.IO(
      async () =>
        await UTIL
          .promisify(REDIS_CLIENT.get)
          .bind(REDIS_CLIENT)(`${request.params.service}_process_pid`)
    ).bind(
      (redisResponse) =>
        M.IO(
          async () => H.trace(await redisResponse)
            ? M.IO(
              async () => await UTIL
                .promisify(REDIS_CLIENT.del)
                .bind(REDIS_CLIENT)(`${request.params.service}_process_pid`)
            ).takeRight(
              M.IO(
                () =>
                  response.status(200).send(
                    H.trace({
                      message: `'${request.params.service}' scheduler was successfully stopped`,
                      time: `${(new Date()).toLocaleString()}`
                    })
                  )
              )
            ).run()
            : response.status(400).send(
              H.trace({
                message: `'${request.params.service}' scheduler doesn't exist yet`,
                time: `${(new Date()).toLocaleString()}`
              })
            )
        )
    ).run()
)

APP.listen(
  CFG.SCHEDULER_PORT,
  () =>
    H.trace(
      CLI_COLOR.greenBright(`Scheduler server is listening on port:`),
      CFG.SCHEDULER_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${DATE.toLocaleString()}`
    )
)
