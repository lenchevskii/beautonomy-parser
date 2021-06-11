require('module-alias/register')

const { REDDIT_PORT } = require('dotenv').config().parsed

const H = require('@helper')
const OAUTH = require('./reddit.oauth')
const EXTRACTOR = require('./reddit.extractor')

const app = require('express')()
const today = new Date()

app.get(`/reddit.worm`, async (req, res) => {
  
  const data = await EXTRACTOR.extractRedditData(OAUTH.REDDIT, 'MakeupAddiction', 10, 'FOTD')

  res.send(data)
})

app.listen(REDDIT_PORT, () => {
  H.trace(`Server listening on port ${REDDIT_PORT}. Server time: ${today.toLocaleString()}`)
})
