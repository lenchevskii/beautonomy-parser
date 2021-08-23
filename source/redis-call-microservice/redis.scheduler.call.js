const CP = require('child_process')
const CFG = require('dotenv').config().parsed
const UTIL = require('util')
const REDIS = require('redis')
const EXPRESS = require('express')

const REDIS_CLIENT = REDIS.createClient({
  port: CFG.REDIS_PORT,
  host: CFG.REDIS_HOST
})

/**
 * Function to get `PID` from Redis (if exists)
 * @param {EXPRESS.Request} request
 */
const getProcessMetadata =
  (request) =>
    UTIL
      .promisify(REDIS_CLIENT.get)
      .bind(REDIS_CLIENT)(`${request.params.service}_pid:interval`)

/**
 * Function to delete `PID` from Redis (if exists)
 * @param {EXPRESS.Request} request
 */
const delProcessMetadata =
  (request) =>
    UTIL
      .promisify(REDIS_CLIENT.del)
      .bind(REDIS_CLIENT)(`${request.params.service}_pid:interval`)

/**
 * @param {CP.ChildProcess} childProcess 
 * @param {EXPRESS.Request} request 
 * @returns Last element of an Array - `PID` of set child process
 */
const setProcessMetadata =
  (childProcess, request) =>
    [
      REDIS_CLIENT.set(
        `${request.params.service}_pid:interval`,
        `${childProcess.pid}:${request.params.interval}`
      ),
      childProcess.pid
    ]

module.exports = {
  getProcessMetadata,
  delProcessMetadata,
  setProcessMetadata
}
