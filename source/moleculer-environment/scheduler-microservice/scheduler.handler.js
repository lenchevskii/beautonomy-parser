require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const SCHEDULER_API = require('./scheduler.API')

const getYTChannelsList =
  async (connection) =>
    R.compose(R.head, H.trace, await SCHEDULER_API.getYTChannels)(connection)

module.exports = { getYTChannelsList }
