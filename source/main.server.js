require('module-alias/register')

const H = require('@general-helper')
const M = require('monet')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const UUID = require('uuid')
const REDIS = require('redis')
const CLI_COLOR = require('cli-color')
const YT_SERVER_MODE = require('./environment/youtube-client-microservice/youtube.server.mode')
const G_SERVER_HELPER = require('@general-server-helper')
const G_SERVER_HANDLER = require('@general-server-handler')
const YT_AUTOMATON_HELPER = require('./environment/youtube-client-microservice/youtube-automaton/youtube.automaton.helper')

const DATE = new Date()
const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST,
  password: CFG.REDIS_PASSWORD
})

APP.all(
  '/',
  (request, response) =>
    response.header("Access-Control-Allow-Origin", "*")
)

APP.post(
  '/parse/youtube/channel/:id',
  async (request, response) =>
    await G_SERVER_HANDLER.isYTChannel(request.params.id)
      ? M.IO(
        () =>
          response
            .status(200)
            .send(
              H.trace(
                { message: `Channel with ID: '${request.params.id}' for listening.` },
                CLI_COLOR.bold('Request time:'),
                `-- ${(new Date).toLocaleString()}`
              )
            )
      ).takeRight(
        M.IO(
          async () =>
            await YT_SERVER_MODE.youTubeServerModeIO(
              G_SERVER_HELPER.constructYTChannelLinkFromID(request.params.id),
              YT_AUTOMATON_HELPER.constructTemporaryDirectory(UUID.v4()),
              true,
              CFG.YOUTUBE_DEFAULT_DATEAFTER
            )
        )
      ).bind(
        (IOresult) =>
          M.IO(
            async () =>
              (await IOresult).on(
                'exit',
                (code) =>
                  code === 0
                    ? REDIS_CLIENT.publish(
                      CFG.REDIS_YT_SUCCESS_CHANNEL,
                      request.params.id
                    )
                    : REDIS_CLIENT.publish(
                      CFG.REDIS_YT_FAILURE_CHANNEL,
                      request.params.id
                    )
              )
          )
      ).run()
      : response
        .status(404)
        .send({ message: `YouTube channel with ID: '${request.params.id}' doesn't exist.` })
)

APP.post(
  '/parse/youtube/video/:id',
  async (request, response) =>
    await G_SERVER_HANDLER.isYTVideo(request.params.id)
      ? M.IO(
        () =>
          response
            .status(200)
            .send(
              H.trace(
                { message: `Video with ID: '${request.params.id}' for parsing.` },
                CLI_COLOR.bold('Request time:'),
                `-- ${(new Date).toLocaleString()}`
              )
            )
      ).takeRight(
        M.IO(
          async () =>
            await YT_SERVER_MODE.youTubeServerModeIO(
              G_SERVER_HELPER.constructYTVideoLinkFromID(request.params.id),
              YT_AUTOMATON_HELPER.constructTemporaryDirectory(UUID.v4()),
              true
            )
        )
      ).bind(
        (IOresult) =>
          M.IO(
            async () =>
              (await IOresult).on(
                'exit',
                (code) =>
                  code === 0
                    ? REDIS_CLIENT.publish(
                      CFG.REDIS_YT_SUCCESS_CHANNEL,
                      request.params.id
                    )
                    : REDIS_CLIENT.publish(
                      CFG.REDIS_YT_FAILURE_CHANNEL,
                      request.params.id
                    )
              )
          )
      ).run()
      : response
        .status(404)
        .send({ message: `YouTube Video with ID: '${request.params.id}' doesn't exist.` })
)

APP.post(
  '/*',
  (request, response) =>
    response.status(404).send({ message: `PATH: ${request.originalUrl} doesn't exist` })
)

APP.listen(
  CFG.MAIN_PORT,
  () =>
    H.trace(
      CLI_COLOR.greenBright(`Main server is listening on port:`),
      CFG.MAIN_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${DATE.toLocaleString()}`
    )
)
