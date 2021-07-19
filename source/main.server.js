require('module-alias/register')
require('./s3.access.server')

const H = require('@general-helper')
const M = require('monet')
const R = require('ramda')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const CLI_COLOR = require('cli-color')
const YT_SERVER_MODE = require('./moleculer-environment/youtube-client-microservice/youtube.server.mode')
const G_SERVER_HELPER = require('@general-server-helper')
const G_SERVER_HANDLER = require('@general-server-handler')
const SCHEDULER_MS = require('./moleculer-environment/scheduler-microservice/scheduler')
const SCHEDULER_API = require('./moleculer-environment/scheduler-microservice/scheduler.API')
const SCHEDULER_HANDLER = require('./moleculer-environment/scheduler-microservice/scheduler.handler')
const SCHEDULER_CONNECTION = require('./moleculer-environment/scheduler-microservice/scheduler.connection')

APP.post(
  '/listenYTChannel/:YTChannelID',
  async (request, response) =>
    await G_SERVER_HANDLER.isYTChannel(request.params.YTChannelID)
      ? M.IO(
        () => response
          .status(200)
          .send(H.trace({ message: `Channel is listening: ${request.params.YTChannelID}` }))
      ).takeRight(
        M.IO(
          () => YT_SERVER_MODE
            .youTubeServerModeIO(
              G_SERVER_HELPER.constructYTChannelLinkFromID(request.params.YTChannelID),
              CFG.YOUTUBE_DEFAULT_DATEAFTER
            )
        )
      ).run()
      : response
        .status(404)
        .send(H.trace({ message: `YouTube channel ${request.params.YTChannelID} doesn't exist.` }))
)

APP.get(
  '/listenYTChannel/:YTChannelID',
  async (request, response) =>
    await G_SERVER_HANDLER.isYTChannel(request.params.YTChannelID)
      ? M.IO(
        () => response
          .status(200)
          .send(H.trace({ message: `Channel is listening: ${request.params.YTChannelID}` }))
      ).takeRight(
        M.IO(
          () => YT_SERVER_MODE
            .youTubeServerModeIO(
              G_SERVER_HELPER.constructYTChannelLinkFromID(request.params.YTChannelID),
              CFG.YOUTUBE_DEFAULT_DATEAFTER
            )
        )
      ).run()
      : response
        .status(404)
        .send(H.trace({ message: `YouTube channel ${request.params.YTChannelID} doesn't exist.` }))
)

APP.get(
  '/getYTChannelsList',
  async (req, res) =>
    res
      .status(200)
      .send(R.head(await SCHEDULER_API.getYTChannels(await SCHEDULER_CONNECTION.CONNECTION)))
)

APP.listen(
  CFG.MAIN_PORT,
  () =>
    H.trace(CLI_COLOR.greenBright(`Main Server is listening on port:`), CFG.MAIN_PORT)
)
