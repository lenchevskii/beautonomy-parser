require('module-alias/register')

const H = require('@helper')
const R = require('ramda')
const FS = require('fs')
const S3CB = require('./youtube.s3.callback')

const filePath = 'source/moleculer-mircoservice/youtube-client/youtube-data/Mariah Leonard/The_Makeup_Techniques_That_Never_Fail_Me_-_My_Signature_Look_MariahLeonard/Kuk07Y8DdAY.info.json'
const bucketName = 'beautonomy-parser'
const key = 'youtube/Kuk07Y8DdAY.info.json'

const uploadFile =
  (filePath, bucketName, key) =>
    FS.readFile(
      filePath,
      S3CB.readFileCallback(bucketName, key, R.__, R.__)
    )

module.exports = { uploadFile }

// FS.readdir(
//   'source/moleculer-mircoservice/youtube-client/youtube-data/Mariah Leonard/',
//   (error, files) =>
//     H.trace(files)
// )

FS.stat(
  'source/moleculer-mircoservice/youtube-client/youtube-data/Mariah Leonard/',
  (error, stats) =>
    H.trace(stats)
)