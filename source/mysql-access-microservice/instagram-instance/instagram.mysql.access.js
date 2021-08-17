const R = require('ramda')
const MYSQL = require('mysql2/promise')
const R_ASYNC = require('ramda-async')
const IG_MYSQL_ACCESS_API = require('./instagram.mysql.access.API')
const G_MYSQL_HANDLER = require('@general-mysql-handler')

/**
 * @param {MYSQL.Connection} connection 
 */
const listIGOwnersIO =
  (connection) =>
    R_ASYNC.pipeAsync(
      IG_MYSQL_ACCESS_API.listIGOwners,
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(connection)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} username 
 */
const listAvailablePostsByOwner =
  (connection, username) =>
    R_ASYNC.pipeAsync(
      IG_MYSQL_ACCESS_API.listIGOwnerPosts(connection, R.__),
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(username)

module.exports = { 
  listIGOwnersIO,
  listAvailablePostsByOwner
}
