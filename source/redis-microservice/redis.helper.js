const { trace } = require("../utils/helper");

const redisError = (err) => trace(err)

const redisReady = () => trace("Redis is ready")

module.exports = { redisError, redisReady }