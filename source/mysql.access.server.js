require('module-alias/register')

const M = require('monet')
const H = require('@general-helper')
const APP = require('express')()
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const WHITELIST = JSON.parse(require('fs').readFileSync('./configuration.json')).whitelist
const G_SERVER_RESPONSE = require('./utils/general-server-util/general.server.response')
const YT_MYSQL_ACCESS_MS = require('./mysql-access-microservice/youtube-instance/youtube.mysql.access')
const IG_MYSQL_ACCESS_MS = require('./mysql-access-microservice/instagram-instance/instagram.mysql.access')
const RD_MYSQL_ACCESS_MS = require('./mysql-access-microservice/reddit-instance/reddit.mysql.access')
const MYSQL_ACCESS_RESPONSE = require('./mysql-access-microservice/mysql.access.response')
const MYSQL_ACCESS_CONNECTION = require('./mysql-access-microservice/youtube.mysql.access.connection')

APP.all(
  '/*',
  (_, response, next) =>
    G_SERVER_RESPONSE.allowCORS(WHITELIST, response, next)
)

APP.get(
  '/mysql/youtube/channels',
  async (_, response) =>
    M.IO(
      async () =>
        YT_MYSQL_ACCESS_MS.listChannelsIO(
          await MYSQL_ACCESS_CONNECTION.CONNECTION
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'youtube channels',
            null,
            await mysqlResponse,
            response
          )
        )
    ).run()
)

APP.get(
  '/mysql/youtube/videos/channel/:id',
  async (request, response) =>
    M.IO(
      async () =>
        YT_MYSQL_ACCESS_MS.listVideosByChannelIdIO(
          await MYSQL_ACCESS_CONNECTION.CONNECTION,
          request.params.id
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'youtube videos of distinct channel',
            request.params.id,
            await mysqlResponse,
            response
          )
        )
    ).run()
)

APP.get(
  '/mysql/instagram/owners',
  async (_, response) =>
    M.IO(
      async () =>
        IG_MYSQL_ACCESS_MS.listIGOwnersIO(
          await MYSQL_ACCESS_CONNECTION.CONNECTION
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'instagram owners',
            null,
            await mysqlResponse,
            response
          )
        )
    ).run()
)

APP.get(
  '/mysql/instagram/posts/:username',
  async (request, response) =>
    M.IO(
      async () =>
        IG_MYSQL_ACCESS_MS.listAvailablePostsByOwner(
          await MYSQL_ACCESS_CONNECTION.CONNECTION,
          request.params.username
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'available posts by owner',
            request.params.username,
            await mysqlResponse,
            response
          )
        )
    ).run()
)

APP.get(
  '/mysql/reddit/authors',
  async (_, response) =>
    M.IO(
      async () =>
        RD_MYSQL_ACCESS_MS.listUsers(
          await MYSQL_ACCESS_CONNECTION.CONNECTION
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'reddit authors',
            null,
            await mysqlResponse,
            response
          )
        )
    ).run()
)

APP.get(
  '/mysql/reddit/posts/:author',
  async (request, response) =>
    M.IO(
      async () =>
        RD_MYSQL_ACCESS_MS.listPostsByAuthor(
          await MYSQL_ACCESS_CONNECTION.CONNECTION,
          request.params.author
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => MYSQL_ACCESS_RESPONSE.mysqlAccessResponse(
            'available posts by author',
            request.params.author,
            await mysqlResponse,
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
      CFG.MYSQL_ACCESS,
      request.originalUrl,
      request.method
    )
)

APP.listen(
  CFG.MYSQL_ACCESS_PORT,
  () =>
    H.trace(
      CLI_COLOR.bgWhite(`|> MySQL-access  <|server is listening on port:`),
      CFG.MYSQL_ACCESS_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${(new Date()).toLocaleString()}`
    )
)
