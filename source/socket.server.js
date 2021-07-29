require('module-alias/register')

const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const REDIS = require('redis')
const WEBSOCKET = require('ws')
const CLI_COLOR = require('cli-color')

const DATE = new Date()

const REDIS_CLIENT = REDIS.createClient({ 
  port: CFG.REDIS_PORT, 
  host: CFG.REDIS_HOST,
  password: CFG.REDIS_PASSWORD
})

const SOCKET_SERVER = new WEBSOCKET.Server(
  { port: CFG.SOCKET_PORT },
  () =>
    H.trace(
      CLI_COLOR.greenBright(`Socket server is listening on port:`),
      CFG.SOCKET_PORT,
      CLI_COLOR.white.bold('Socket started at:'),
      `-- ${DATE.toLocaleString()}`
    )
)

REDIS_CLIENT.subscribe(
  [
    CFG.REDIS_YT_SUCCESS_CHANNEL,
    CFG.REDIS_YT_FAILURE_CHANNEL
  ]
)

REDIS_CLIENT.on(
  'message',
  (channel, message) =>
    H.trace({ channel: channel, message: message })
)

SOCKET_SERVER.on(
  'connection',
  (socket) =>
    REDIS_CLIENT.on(
      'message',
      (channel, message) =>
        H.trace(socket).send(H.trace({ channel: channel, message: message }))
    )
)
