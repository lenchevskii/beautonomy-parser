const R = require('ramda')
const G_SERVER_RESPONSE = require('../utils/general-server-util/general.server.response')

/**
 * @param {String} target 
 * @param {String} id 
 * @param {Object} mysqlList 
 * @param {EXPRESS.Response} response
 */
const mysqlAccessResponse =
  (target, id, mysqlList, response) =>
    R.isEmpty(mysqlList)
      ? G_SERVER_RESPONSE.unsuccessfulResponse(
        target,
        id,
        response,
        null
      )
      : G_SERVER_RESPONSE.successfulResponse(
        target,
        id,
        response,
        mysqlList
      )

module.exports = {
  mysqlAccessResponse
}
