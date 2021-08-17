const CFG = require('dotenv').config().parsed
const REDIS = require('redis')
const TARGETS = JSON.parse(require('fs').readFileSync('./configuration.json')).targets

const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST
})

TARGETS.map(
  target => REDIS_CLIENT.del(`${target}_pid:interval`)
)
