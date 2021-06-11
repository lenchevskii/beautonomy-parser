require('module-alias/register')

const { INSTAGRAM_PORT } = require('dotenv').config().parsed
const EXPRESS = require('express')

const { getInstagramCaptions } = require('./extraction-util/instagram.extractor')
const { trace } = require('@helper')

const TODAY = new Date()
const app = EXPRESS()

app.get(`/instagram.worm`, async (req, res) => {

  // const collection = await getInstagramMedia('https://www.instagram.com/p/CO6ijhFnBUR/')
  // const video = await getInstagramMedia('https://www.instagram.com/p/CNlC-TUnJJm/')
  // const mixedCollection = await getInstagramMedia('https://www.instagram.com/p/CPZsMPvNSLa/?utm_medium=copy_link')
  const captions = await getInstagramCaptions('https://www.instagram.com/p/CNlC-TUnJJm/?__a=1')

  trace(captions.length)

  res.send(captions)
})

app.listen(INSTAGRAM_PORT, () => {
  console.log(`Server listening on port ${INSTAGRAM_PORT}. Server time: ${TODAY.toLocaleString()}`)
})
