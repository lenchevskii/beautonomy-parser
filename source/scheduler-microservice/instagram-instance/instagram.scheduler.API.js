require('module-alias/register')

const H = require('@general-helper')
const MYSQL = require('mysql2/promise')

/**
 * @param {MYSQL.Connection} connection 
 */
const listPostIDs =
  (connection) =>
    connection.execute(
      'SELECT username, post_id FROM processed_instagram_links'
    ).catch(H.trace)

module.exports = { listPostIDs }
