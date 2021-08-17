const IG_SERVER_MONAD = require('./instagram.server.monad')
const IG_MYSQL_CONNECTION = require('./instagram-mysql-insert/instagram.mysql.connection')
const [BUCKET_NAME, CHILD_BUCKET_NAME, SHORTCODE] = process.argv.slice(2)

/**
 * Suicied `process`: kill itself after doing the job
 */
module.exports = (
  async () => await IG_SERVER_MONAD.instagramPostServerProcessIO(
    await IG_MYSQL_CONNECTION.CONNECTION,
    BUCKET_NAME,
    CHILD_BUCKET_NAME,
    SHORTCODE
  ).then(child => process.kill(process.pid))
)()
