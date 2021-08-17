const SCHEDULER = require('./instagram.scheduler')
const [INTERVAL] = process.argv.slice(2)
const SCHEDULER_CONNECTION = require('./instagram.scheduler.connection')
const IG_SERVER_MODE = require('../../environment/instagram-client-microservice/instagram.server.mode')

module.exports = (
  async () => await SCHEDULER.scheduleIGServiceIO(
    await SCHEDULER_CONNECTION.CONNECTION,
    IG_SERVER_MODE.instagramPostServerModeIO,
    INTERVAL
  )
)()
