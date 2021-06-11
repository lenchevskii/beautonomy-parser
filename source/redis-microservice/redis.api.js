const redis = require('redis')

const { trace } = require('../utils/helper')

const uuid = require('prefixed-uuid')

const { redisError, redisReady } = require('./redis.helper')

const { DEAD_REDIS_HOST, DEAD_REDIS_PORT } = require('dotenv').config().parsed

const redisClient = redis.createClient({ 
  host: DEAD_REDIS_HOST, 
  port: DEAD_REDIS_PORT
})

redisClient.on('ready', redisReady)

redisClient.set(uuid('grab', 'v4'), JSON.stringify({
  task: 'grab',
  url: 'https://www.instagram.com/nasa/',
  replay: 0
}))

redisClient.on('error', redisError)

redisClient.get("f4b99968-0877-428a-a6d4-6dd0df26996d", (msg, bbb) => trace(msg, bbb, 'Message'))