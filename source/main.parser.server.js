/**
 * Load minor servers
 */
require('./socket.server')
require('./scheduler.server')
require('./s3.access.server')
require('./mysql.access.server')
require('module-alias/register')
/**
 * Clear previous server initialization
 */
require('child_process').execSync('node source/environment/youtube-client-microservice/youtube-automaton/youtube.automaton.autoremove.tool.js')

const H = require('@general-helper')
const M = require('monet')
const FS = require('fs')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const PATH = require('path')
const UUID = require('uuid')
const MARKED = require('marked')
const CLI_COLOR = require('cli-color')
const YT_SERVER_MODE = require('./environment/youtube-client-microservice/youtube.server.mode')
const IG_SERVER_MODE = require('./environment/instagram-client-microservice/instagram.server.mode')
const REDIS_MAIN_CALL = require('./redis-call-microservice/redis.main.call')
const G_SERVER_HELPER = require('./utils/general-server-util/general.server.helper')
const G_SERVER_HANDLER = require('./utils/general-server-util/general.server.handler')
const G_SERVER_RESPONSE = require('./utils/general-server-util/general.server.response')
const YT_AUTOMATON_HELPER = require('./environment/youtube-client-microservice/youtube-automaton/youtube.automaton.helper')

const README = FS.readFileSync(PATH.join(__dirname, '..', 'README.md')).toString()
const WHITELIST = JSON.parse(FS.readFileSync('./configuration.json')).whitelist

APP.all(
  '/*',
  (_, response, next) =>
    G_SERVER_RESPONSE.allowCORS(WHITELIST, response, next)
)

APP.post(
  '/parse/youtube/channel/:id',
  async (request, response) =>
    await G_SERVER_HELPER.isYTChannel(request.params.id)
      ? M.IO(
        () => G_SERVER_RESPONSE.successfulResponse(
          'youtube channel',
          request.params.id,
          response,
          'youtube channel was sent for parsing'
        )
      ).takeRight(
        M.IO(
          async () =>
            await YT_SERVER_MODE.youTubeServerModeIO(
              G_SERVER_HANDLER.constructYTChannelLinkFromID(request.params.id),
              YT_AUTOMATON_HELPER.constructTemporaryDirectory(UUID.v4()),
              true,
              CFG.YOUTUBE_DEFAULT_DATEAFTER
            )
        )
      ).bind(
        (serverModeResult) =>
          M.IO(
            async () => REDIS_MAIN_CALL.reportYTChannel(
              await serverModeResult,
              request.params.id
            )
          )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        'youtube channel',
        request.params.id,
        response,
        `youtube channel doesn't exist`
      )
)

APP.get(
  '/parse/youtube/video/:id',
  async (request, response) =>
    await G_SERVER_HELPER.isYTVideo(request.params.id)
      ? M.IO(
        () => G_SERVER_RESPONSE.successfulResponse(
          'youtube video',
          request.params.id,
          response,
          'youtube video was sent for parsing'
        )
      ).takeRight(
        M.IO(
          async () =>
            await YT_SERVER_MODE.youTubeServerModeIO(
              G_SERVER_HANDLER.constructYTVideoLinkFromID(request.params.id),
              YT_AUTOMATON_HELPER.constructTemporaryDirectory(UUID.v4()),
              true
            )
        )
      ).bind(
        (serverModeResult) =>
          M.IO(
            async () => REDIS_MAIN_CALL.reportYTVideo(
              await serverModeResult,
              request.params.id
            )
          )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        'youtube video',
        request.params.id,
        response,
        `youtube video doesn't exist`
      )
)

APP.post(
  '/parse/instagram/post/:shortcode',
  async (request, response) =>
    await G_SERVER_HELPER.isIGPost(request.params.shortcode)
      ? M.IO(
        () => G_SERVER_RESPONSE.successfulResponse(
          'instagram post',
          request.params.shortcode,
          response,
          'instagram post was sent for parsing'
        )
      ).takeRight(
        M.IO(
          () => IG_SERVER_MODE.instagramPostServerModeIO(
            request.params.shortcode
          )
        )
      ).bind(
        (serverModeResult) =>
          M.IO(
            () => REDIS_MAIN_CALL.reportIGPost(
              serverModeResult,
              request.params.shortcode
            )
          )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        'instagram post',
        request.params.shortcode,
        response,
        `instagram post doesn't exist`
      )
)

APP.post(
  '/parse/instagram/user/:username',
  async (request, response) =>
    await G_SERVER_HELPER.isIGUser(request.params.username)
      ? M.IO(
        () => G_SERVER_RESPONSE.successfulResponse(
          'instagram user',
          request.params.username,
          response,
          'instagram user was sent for parsing'
        )
      ).takeRight(
        M.IO(
          () => IG_SERVER_MODE.instagramUserServerModeIO(
            request.params.username
          )
        )
      ).bind(
        (serverModeResult) =>
          M.IO(
            () => REDIS_MAIN_CALL.reportIGUser(
              serverModeResult,
              request.params.username
            )
          )
      ).run()
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        'instagram user',
        request.params.username,
        response,
        `instagram user doesn't exist`
      )
)

APP.get(
  '/docs',
  (_, response) => response.sendFile('docs/beautonomy.server.docs.txt', { root: '.' })
)

APP.get(
  '/readme',
  (_, response) => response.send(MARKED(README))
)

APP.all(
  '/*',
  (request, response) =>
    G_SERVER_RESPONSE.asteriskResponse(
      response,
      CFG.PARSER,
      request.originalUrl,
      request.method
    )
)

APP.listen(
  CFG.PARSER_PORT,
  () =>
    H.trace(
      CLI_COLOR.bgWhite(`|> Main (Parser) <|server is listening on port:`),
      CFG.PARSER_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${(new Date()).toLocaleString()}`,
      CLI_COLOR.bgWhite('|> Clean TMP     <|')
    )
)
