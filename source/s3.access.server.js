require('module-alias/register')

const M = require('monet')
const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const CLI_COLOR = require('cli-color')
const WHITELIST = JSON.parse(require('fs').readFileSync('./configuration.json')).whitelist
const YT_S3_ACCESS_MS = require('./s3-access-microservice/youtube-instance/youtube.s3.access')
const IG_S3_ACCESS_MS = require('./s3-access-microservice/instagram-instance/instagram.s3.access')
const RD_S3_ACCESS_MS = require('./s3-access-microservice/reddit-instance/reddit.s3.access')
const G_SERVER_RESPONSE = require('./utils/general-server-util/general.server.response')
const S3_ACCESS_RESPONSE = require('./s3-access-microservice/s3.access.response')
const S3_ACCESS_MYSQL_CONNECTION = require('./s3-access-microservice/s3.access.mysql.connection')

APP.all(
  '/*',
  (_, response, next) =>
    G_SERVER_RESPONSE.allowCORS(WHITELIST, response, next)
)

APP.get(
  '/s3/youtube/object/video/:id/:extension',
  async (request, response) =>
    M.IO(
      async () => await YT_S3_ACCESS_MS.getS3ObjectByIdIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET,
        request.params.extension
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            request.params.extension,
            request.params.id,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.get(
  '/s3/youtube/objects/video/:id',
  async (request, response) =>
    M.IO(
      async () => await YT_S3_ACCESS_MS.listAvailableObjectsIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            'youtube objects by video id',
            request.params.id,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.get(
  '/s3/instagram/object/:shortcode/:extension',
  async (request, response) =>
    M.IO(
      async () => await IG_S3_ACCESS_MS.getS3ObjectByIdIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.shortcode,
        CFG.S3_BUCKET,
        request.params.extension
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            request.params.extension,
            request.params.shortcode,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.get(
  '/s3/instagram/objects/:shortcode',
  async (request, response) =>
    M.IO(
      async () => await IG_S3_ACCESS_MS.listAvailableObjectsIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.shortcode,
        CFG.S3_BUCKET
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            'instagram objects by shortcode',
            request.params.shortcode,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.get(
  '/s3/reddit/object/:id/:extension',
  async (request, response) =>
    M.IO(
      async () => await RD_S3_ACCESS_MS.getS3ObjectByIdIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET,
        request.params.extension
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            request.params.extension,
            request.params.id,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.get(
  '/s3/reddit/objects/:id',
  async (request, response) =>
    M.IO(
      async () => await RD_S3_ACCESS_MS.listAvailableObjectsIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => S3_ACCESS_RESPONSE.s3AccessResponse(
            'reddit objects by post id',
            request.params.id,
            await s3Response,
            response
          )
        )
    ).run()
)

APP.all(
  '/*',
  (request, response) =>
    G_SERVER_RESPONSE.asteriskResponse(
      response,
      CFG.S3_ACCESS,
      request.originalUrl,
      request.method
    )
)

APP.listen(
  CFG.S3_ACCESS_PORT,
  () =>
    H.trace(
      CLI_COLOR.bgWhite(`|> S3-access     <|server is listening on port:`),
      CFG.S3_ACCESS_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${(new Date()).toLocaleString()}`
    )
)
