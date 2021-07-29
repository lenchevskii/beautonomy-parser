const R = require('ramda')
const G_SERVER_HELPER = require('./general.server.helper')

const isYTChannel =
  (channelId) =>
    R.compose(
      G_SERVER_HELPER.checkLinkExistence,
      G_SERVER_HELPER.constructYTChannelLinkFromID
    )(channelId)

const isYTVideo =
  (videoId) =>
    R.compose(
      G_SERVER_HELPER.checkLinkExistence,
      G_SERVER_HELPER.constructYTVideoLinkFromID
    )(videoId)

module.exports = { 
  isYTChannel,
  isYTVideo
}
