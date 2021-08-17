require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const MYSQL = require('mysql2/promise')
const CLI_COLOR = require('cli-color')

/**
 * @param {MYSQL.Connection} connection
 * @param {Array<String>} param1 `[username, shortcode, postId, ownerId]`
 */
const insertRDPost =
  (connection, [author, id]) =>
    connection.execute(
      'INSERT INTO `processed_reddit_links` (`post_id`, `author`) VALUES '
      + `(${MYSQL.escape(id)}, ${MYSQL.escape(author)})`
    ).catch(
      x => H.trace(CLI_COLOR.red(x.sqlMessage))
    )

module.exports = {
  insertRDPost: R.curry(insertRDPost)
}
