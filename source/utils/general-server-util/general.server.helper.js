require('module-alias/register')

const H = require('@general-helper')
const { default: fetch } = require('node-fetch')

/**
 * Contstruct YT link of type: www.youtube.com/channel/${channelId}
 * @param {String} channelId 
 */
const constructYTChannelLinkFromID =
  (channelId) =>
    `https://www.youtube.com/channel/${channelId}`

/**
 * Contstruct YT link of type: www.youtube.com/channel/${channelId}
 * @param {String} channelName 
 */
const constructYTChannelLinkFromName =
  (channelName) =>
    `https://www.youtube.com/c/${channelName}`

const constructYTVideoLinkFromID =
  (videoId) =>
    `https://www.youtube.com/watch?v=${videoId}`

/**
 * @param {String} link 
 * @returns 
 */
const checkLinkExistence =
  async (link) =>
    (await fetch(link)).status === 200

module.exports = {
  constructYTChannelLinkFromName,
  constructYTChannelLinkFromID,
  constructYTVideoLinkFromID,
  checkLinkExistence
}
