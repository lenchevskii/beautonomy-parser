require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')
const CLI_COLOR = require('cli-color')

/**
 * @param {MYSQL.Connection} connection
 * @param {Array<String>} param1 `[username, shortcode, postId, ownerId]`
 */
const insertIGPost =
  (connection, [username, shortcode, ownerId, postId]) =>
    connection.execute(
      'INSERT INTO `processed_instagram_links` (`shortcode`, `username`, `owner_id`, `post_id`) VALUES '
      + `(${MYSQL.escape(shortcode)}, ${MYSQL.escape(username)}, ${MYSQL.escape(ownerId)}, ${MYSQL.escape(postId)})`
    ).catch(
      x => H.trace(CLI_COLOR.red(x.sqlMessage))
    )

module.exports = {
  insertIGPost: R.curry(insertIGPost)
}
