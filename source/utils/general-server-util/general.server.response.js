const M = require('monet')
const EXPRESS = require('express')

/**
 * General SUCCESS response function 
 * @param {String} target `YouTube channel`, `Instagram post`, etc.
 * @param {String|Number} id 
 * @param {EXPRESS.Response} response 
 * @param {String} message 
 */
const successfulResponse =
  (target, id, response, message) =>
    response
      .status(200)
      .send({
        target: target,
        id: id,
        time: (new Date()).toLocaleString(),
        message: message
      })

/**
 * General Failure response function 
 * @param {String} target `YouTube channel`, `Instagram post`, etc.
 * @param {String|Number} id 
 * @param {EXPRESS.Response} response 
 * @param {String} message
 */
const unsuccessfulResponse =
  (target, id, response, message) =>
    response
      .status(404)
      .send({
        target: target,
        id: id,
        time: (new Date()).toLocaleString(),
        message: message
      })

/**
 * Path not found server `response` 
 * @param {EXPRESS.Response} response 
 * @param {String} server
 * @param {String} originalUrl 
 * @param {String} method
 */
const asteriskResponse =
  (response, server, originalUrl, method) =>
    response
      .status(404)
      .send({
        server: server,
        path: originalUrl,
        time: (new Date()).toLocaleString(),
        method: method,
        message: 'no request path for such URL > take a look at the documentation'
      })

/**
 * @param {Array<String>} whitelist
 * @param {EXPRESS.Response} response 
 * @param {Function} next 
 */
const allowCORS =
  (whitelist, response, next) =>
    M.IO(
      () => response.header("Access-Control-Allow-Origin", whitelist)
    ).takeRight(
      M.IO(() => next())
    ).run()

module.exports = {
  unsuccessfulResponse,
  successfulResponse,
  asteriskResponse,
  allowCORS
}
