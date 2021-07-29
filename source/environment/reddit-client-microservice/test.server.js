require('module-alias/register')

const { REDDIT_PORT } = require('dotenv').config().parsed

const H = require('@general-helper')
const OAUTH = require('./reddit-oauth/reddit.oauth')
const S3_INSERTION = require('./reddit-s3-insert/reddit.s3.insert')

const app = require('express')()
const today = new Date()

app.get(`/reddit.worm`, async (req, res) => {

  S3_INSERTION.uploadRedditStructureS3('beautonomy-parser', 'reddit', OAUTH.REDDIT, 'MakeupAddiction', 10, 'FOTD')

  res.send({ status: 'OK' })
})

app.listen(REDDIT_PORT, () => {
  H.trace(`Server listening on port ${REDDIT_PORT}. Server time: ${today.toLocaleString()}`)
})
