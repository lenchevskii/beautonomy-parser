require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listIGOwners =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT username FROM processed_instagram_links`
    ).catch(H.trace)

/**
 * List all available posts of a user
 * @param {MYSQL.Connection} connection 
 * @param {String} username
 */
const listIGOwnerPosts =
  (connection, username) =>
    connection.execute(
      `SELECT * FROM processed_instagram_links WHERE username=${MYSQL.escape(username)}`
    ).catch(H.trace)

module.exports = {
  listIGOwners,
  listIGOwnerPosts: R.curry(listIGOwnerPosts)
}
