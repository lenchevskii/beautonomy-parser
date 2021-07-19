require('module-alias/register')

const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const CLI_COLOR = require('cli-color')
const S3_ACCESS_MS = require('./s3-access-microservice/s3.access')
const S3_ACCESS_MYSQL_CONNECTION = require('./s3-access-microservice/s3.access.connection')

APP.get(
  '/getYouTubeRecordByID/:linkID',
  (req, res) =>
    S3_ACCESS_MS.getS3FileById(
      S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
      CFG.S3_BUCKET,
      req.params.linkID
    )
)

APP.get(
  '/getYouTubeRecordByLink/:YTLink',
  (req, res) =>
    S3_ACCESS_MS.getYTLinkRecord(
      S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
      req.params.YTLink
    )
)

APP.listen(
  CFG.S3_ACCESS_PORT,
  () =>
    H.trace(
      CLI_COLOR.greenBright(`S3 Access Server is listening on port:`),
      CFG.S3_ACCESS_PORT
    )
)
