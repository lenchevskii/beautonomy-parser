const CFG = require('dotenv').config().parsed
const SNOOWRAP = require('snoowrap')

const REDDIT = new SNOOWRAP({
  userAgent: CFG.REDDIT_USER_AGENT,
  clientId: CFG.REDDIT_CLIENT_ID,
  clientSecret: CFG.REDDIT_CLIENT_SECRET,
  username: CFG.REDDIT_USERNAME,
  password: CFG.REDDIT_PASSWORD
})

module.exports = { REDDIT }
