require('module-alias/register')

const H = require('@general-helper')
const AWS = require('aws-sdk')
const YT_RESOLVER_API = require('./youtube.resolver.API')
const YT_RESOLVER_PROCESSOR = require('./youtube.resolver.processor')
const YT_RESOLVER_CONNECTION = require('./youtube.resolver.connection')

const S3 = new AWS.S3()

const getS3ObjectTEST = S3.getObject({
  Bucket: 'beautonomy-parser',
  Key: 'youtube/Mariah Leonard/20210331 -- The Makeup Techniques That Never Fail Me - My Signature Look _ Mariah Leonard/Kuk07Y8DdAY.info.json'
},
  (err, data) =>
    H.trace(YT_RESOLVER_PROCESSOR.extractProducts(
      JSON.parse(data.Body).description,
      [['Dior', 'Palette'], ['Charlotte', 'Palette'], ['bareMinerals', 'Powder']]
    ))
)
