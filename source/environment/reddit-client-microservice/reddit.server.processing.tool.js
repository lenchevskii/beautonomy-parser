const RD_OAUTH = require('./reddit-oauth/reddit.oauth')
const RD_SERVER_MONAD = require('./reddit.server.processing')
const RD_MYSQL_CONNECTION = require('./reddit-mysql-insert/reddit.mysql.insert.connection')
const [SUBREDDIT, LAST_POSTS_NUMBER, FLAIR_NAME, BUCKET_NAME, CHILD_BUCKET_NAME] = process.argv.slice(2)

/**
 * Suicied `process`: kill itself after doing the job
 */
module.exports = (
  async () => await RD_SERVER_MONAD.redditServerProcessIO(
    await RD_MYSQL_CONNECTION.CONNECTION,
    RD_OAUTH.REDDIT,
    SUBREDDIT,
    Number(LAST_POSTS_NUMBER),
    FLAIR_NAME,
    BUCKET_NAME,
    CHILD_BUCKET_NAME
  ).then(child => process.kill(process.pid))
)()
