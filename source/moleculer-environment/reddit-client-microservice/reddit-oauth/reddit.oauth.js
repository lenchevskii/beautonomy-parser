const SNOOWRAP = require('snoowrap')

const {
  REDDIT_USER_AGENT,
  REDDIT_CLIENT_ID,
  REDDIT_CLIENT_SECRET,
  REDDIT_USERNAME,
  REDDIT_PASSWORD
} = require('dotenv').config().parsed

const redditCredentials = {
  userAgent: REDDIT_USER_AGENT,
  clientId: REDDIT_CLIENT_ID,
  clientSecret: REDDIT_CLIENT_SECRET,
  username: REDDIT_USERNAME,
  password: REDDIT_PASSWORD
}

const REDDIT = new SNOOWRAP(redditCredentials)

module.exports = { REDDIT }
