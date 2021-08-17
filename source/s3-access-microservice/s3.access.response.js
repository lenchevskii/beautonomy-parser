const G_SERVER_RESPONSE = require('../utils/general-server-util/general.server.response')

/**
 * @param {String} target 
 * @param {String} id 
 * @param {Object} s3Object 
 * @param {EXPRESS.Response} response
 */
const s3AccessResponse =
  (target, id, s3Object, response) =>
    s3Object
      ? G_SERVER_RESPONSE.successfulResponse(
        target,
        id,
        response,
        s3Object
      )
      : G_SERVER_RESPONSE.unsuccessfulResponse(
        target,
        id,
        response,
        null
      )

module.exports = {
  s3AccessResponse
}
