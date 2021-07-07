require('module-alias/register')


const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const EXPRESS = require('express')
const IG_S3_INSERT = require('./instagram-s3-insert/instagram.s3.insert')

const TODAY = new Date()
const app = EXPRESS()

// app.use((req, res, next) => res.header("Access-Control-Allow-Origin", "*"))

app.get(`/instagram.worm`, async (req, res) => {
  H.trace('Inside server call')
  // const collection = await IG_EXTRACTOR.getInstagramMedia('https://www.instagram.com/p/CO6ijhFnBUR/')
  // const video = await IG_EXTRACTOR.getInstagramMedia('https://www.instagram.com/p/CNlC-TUnJJm/')
  // const mixedCollection = await IG_EXTRACTOR.getInstagramMedia('https://www.instagram.com/p/CPZsMPvNSLa/?utm_medium=copy_link')
  // const data = await IG_EXTRACTOR.constructInstagramStructure('https://www.instagram.com/p/CNlC-TUnJJm/?__a=1')
  IG_S3_INSERT.uploadInstagramStructureS3('beautonomy-parser', 'instagram', 'https://www.instagram.com/p/CPqvufwr9ks/')
  IG_S3_INSERT.uploadInstagramStructureS3('beautonomy-parser', 'instagram', 'https://www.instagram.com/p/CPBURzAjhpq/')
  IG_S3_INSERT.uploadInstagramStructureS3('beautonomy-parser', 'instagram', 'https://www.instagram.com/p/COHAXxyFofk/')
  IG_S3_INSERT.uploadInstagramStructureS3('beautonomy-parser', 'instagram', 'https://www.instagram.com/p/CNTlCjzFkQ4/')

  res.send({ status: 'OK' })
})

app.post('/send.instagram.button', async (req, res) => {
  const BODY = req.body

  H.trace(BODY, 'body filled with instagram buttons')

  res.send(BODY)
})

app.listen(CFG.INSTAGRAM_PORT, () => {
  console.log(`Server listening on port ${CFG.INSTAGRAM_PORT}. Server time: ${TODAY.toLocaleString()}`)
})
