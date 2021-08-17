require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listUsers =
  (connection) =>
    connection.execute(
      `SELECT DISTINCT author FROM processed_reddit_links`
    ).catch(H.trace)

/**
 * @param {MYSQL.Connection} connection 
 * @param {String} author
 */
const listPostsByAuthor =
  (connection, author) =>
    connection.execute(
      `SELECT * FROM processed_reddit_links WHERE author=${MYSQL.escape(author)}`
    ).catch(H.trace)

module.exports = {
  listUsers,
  listPostsByAuthor: R.curry(listPostsByAuthor)
}
