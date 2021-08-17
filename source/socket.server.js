require('module-alias/register')

const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const REDIS = require('redis')
const WEBSOCKET = require('ws')
const CLI_COLOR = require('cli-color')

const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST,
  password: CFG.REDIS_PASSWORD
})

const SOCKET_SERVER = new WEBSOCKET.Server(
  { port: CFG.SOCKET_PORT },
  () =>
    H.trace(
      CLI_COLOR.bgWhite(`|> Socket        <|server is listening on port:`),
      CFG.SOCKET_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${(new Date()).toLocaleString()}`
    )
)

REDIS_CLIENT.subscribe(
  [
    CFG.REDIS_YT_SUCCESS_CHANNEL,
    CFG.REDIS_YT_FAILURE_CHANNEL,
    CFG.REDIS_YT_SUCCESS_VIDEO,
    CFG.REDIS_YT_FAILURE_VIDEO,
    CFG.REDIS_IG_SUCCESS_POST,
    CFG.REDIS_IG_FAILURE_POST
  ]
)

SOCKET_SERVER.on(
  'connection',
  (socket) =>
    REDIS_CLIENT.on(
      'message',
      (channel, message) =>
        socket.send({ channel: channel, message: message })
    )
)
