const SCHEDULER = require('./scheduler/scheduler')
const [INTERVAL] = process.argv.slice(2)
const SCHEDULER_CONNECTION = require('./scheduler/scheduler.connection')
const YT_SERVER_MODE = require('../environment/youtube-client-microservice/youtube.server.mode')

module.exports =
  (async () => SCHEDULER.scheduleYTServiceIO(
    await SCHEDULER_CONNECTION.CONNECTION,
    YT_SERVER_MODE.youTubeServerModeIO,
    INTERVAL
  ))()
