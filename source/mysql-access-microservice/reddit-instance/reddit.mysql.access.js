const R = require('ramda')
const R_ASYNC = require('ramda-async')
const MYSQL = require('mysql2/promise')
const RD_MYSQL_ACCESS_API = require('./reddit.mysql.access.API')
const G_MYSQL_HANDLER = require('@general-mysql-handler')

/**
 * @param {MYSQL.Connection} connection 
 * @returns {Promise<Array>}
 */
const listUsers =
  (connection) =>
    R_ASYNC.pipeAsync(
      RD_MYSQL_ACCESS_API.listUsers,
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(connection)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} author
 */
const listPostsByAuthor =
  (connection, author) =>
    R_ASYNC.pipeAsync(
      RD_MYSQL_ACCESS_API.listPostsByAuthor(R.__, author),
      G_MYSQL_HANDLER.maybeMySQLResponse
    )(connection)

module.exports = { 
  listUsers,
  listPostsByAuthor
}
