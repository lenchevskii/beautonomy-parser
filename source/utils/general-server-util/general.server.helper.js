const R = require('ramda')
const R_ASYNC = require('ramda-async')
const EXPRESS = require('express')
const TARGETS = JSON.parse(require('fs').readFileSync('./configuration.json')).targets
const G_SERVER_HANDLER = require('./general.server.handler')

/**
 * Check if `YouTube Channel` exists
 * @param {String} channelId 
 * @returns {Promise<Boolean>} 
 */
const isYTChannel =
  (channelId) =>
    R_ASYNC.pipeAsync(
      G_SERVER_HANDLER.constructYTChannelLinkFromID,
      G_SERVER_HANDLER.checkLinkExistence
    )(channelId)

/**
 * Check if `YouTube Video` exists
 * @param {String} videoId 
 * @returns {Promise<Boolean>} 
 */
const isYTVideo =
  (videoId) =>
    R_ASYNC.pipeAsync(
      G_SERVER_HANDLER.constructYTVideoLinkFromID,
      G_SERVER_HANDLER.checkLinkExistence
    )(videoId)

/**
 * Check if `Instagram Post` exists
 * @param {String} postId
 * @returns {Promise<Boolean>} 
 */
const isIGPost =
  (postId) =>
    R_ASYNC.pipeAsync(
      G_SERVER_HANDLER.constructIGPostLink,
      G_SERVER_HANDLER.checkLinkExistence
    )(postId)

/**
 * Check if `Instagram User` exists
 * @param {String} username
 * @returns {Promise<Boolean>} 
 */
const isIGUser =
  (username) =>
    R_ASYNC.pipeAsync(
      G_SERVER_HANDLER.constructIGUserLink,
      G_SERVER_HANDLER.checkLinkExistence
    )(username)

/**
 * Check if this a service 
 * @param {EXPRESS.Request} request
 */
const isService =
  (request) =>
    R.any(target => target === request.params.service, TARGETS)

/**
 * Check if this an interval 
 * @param {EXPRESS.Request} request
 */
const isInterval =
  (request) =>
    Number(request.params.interval) > 1
    && Number(request.params.interval) < 5000

module.exports = {
  isYTChannel,
  isInterval,
  isYTVideo,
  isService,
  isIGPost,
  isIGUser
}
