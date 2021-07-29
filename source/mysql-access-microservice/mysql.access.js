require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const R_ASYNC = require('ramda-async')
const MYSQL_ACCESS_API = require('./mysql.access.API')

const listYTChennelsIO =
  async (connection) =>
    R_ASYNC.pipeAsync(
      MYSQL_ACCESS_API.listYTChannels,
      channels => R.is(Error, channels) ? channels : R.head(channels)
    )(connection)

module.exports = { listYTChennelsIO }
