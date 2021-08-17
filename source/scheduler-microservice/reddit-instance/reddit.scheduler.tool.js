const SCHEDULER = require('./reddit.scheduler')
const [INTERVAL, LAST_POSTS_NUMBER] = process.argv.slice(2)
const RD_SERVER_MODE = require('../../environment/reddit-client-microservice/reddit.server.mode')

module.exports =
  (async () => await SCHEDULER.scheduleRDServiceIO(
    RD_SERVER_MODE.redditServerModeIO,
    INTERVAL,
    LAST_POSTS_NUMBER
  ))()
