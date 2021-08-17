const { default: fetch } = require('node-fetch')

/**
 * Contstruct YT link of type: `www.youtube.com/channel/{channelId}`
 * @param {String} channelId 
 */
const constructYTChannelLinkFromID =
  (channelId) =>
    `https://www.youtube.com/channel/${channelId}`

/**
 * Contstruct `YT` link of type: `www.youtube.com/channel/{channelId}`
 * @param {String} channelName 
 */
const constructYTChannelLinkFromName =
  (channelName) =>
    `https://www.youtube.com/c/${channelName}`

/**
 * Contstruct `YT` link of type: `www.youtube.com/watch?v={videoId}`
 * @param {String} videoId 
 */
const constructYTVideoLinkFromID =
  (videoId) =>
    `https://www.youtube.com/watch?v=${videoId}`

/**
 * Contstruct `IG` link of type: `www.instagram.com/p/{postId}/`
 * @param {String} postId 
 */
const constructIGPostLink =
  (postId) =>
    `https://www.instagram.com/p/${postId}/`

/**
 * Construct `IG` link of type: `www.instagram.com/{username}/`
 * @param {String} username 
 */
const constructIGUserLink =
  (username) =>
    `https://www.instagram.com/${username}/`

/**
 * @param {String} link 
 */
const checkLinkExistence =
  async (link) =>
    (await fetch(link)).status === 200

module.exports = {
  constructYTChannelLinkFromName,
  constructYTChannelLinkFromID,
  constructYTVideoLinkFromID,
  constructIGPostLink,
  constructIGUserLink,
  checkLinkExistence
}
