require('module-alias/register')

const H = require('@general-helper')
const CP = require('child_process')
const CFG = require('dotenv').config().parsed
const REDIS = require('redis')

const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST
})

/**
 * YouTube channel messanger 
 * @param {CP.ChildProcess} childProcess 
 * @param {String} id
 */
const reportYTChannel =
  (childProcess, id) =>
    childProcess.on(
      'exit',
      (code) =>
        code === 0
          ? REDIS_CLIENT.publish(CFG.REDIS_YT_SUCCESS_CHANNEL, id)
          : REDIS_CLIENT.publish(CFG.REDIS_YT_FAILURE_CHANNEL, id)
    )

/**
 * YouTube video messanger 
 * @param {CP.ChildProcess} childProcess 
 * @param {String} id
 */
const reportYTVideo =
  (childProcess, id) =>
    childProcess.on(
      'exit',
      (code) =>
        code === 0
          ? REDIS_CLIENT.publish(CFG.REDIS_YT_SUCCESS_VIDEO, id)
          : REDIS_CLIENT.publish(CFG.REDIS_YT_FAILURE_VIDEO, id)
    )

/**
 * Instagram post messanger 
 * @param {CP.ChildProcess} childProcess 
 * @param {String} id
 */
const reportIGPost =
  (childProcess, id) =>
    childProcess.on(
      'exit',
      (code) =>
        code === 0
          ? REDIS_CLIENT.publish(CFG.REDIS_IG_SUCCESS_POST, id)
          : REDIS_CLIENT.publish(CFG.REDIS_IG_FAILURE_POST, id)
    )

module.exports = {
  reportYTChannel,
  reportYTVideo,
  reportIGPost
}
