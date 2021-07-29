require('module-alias/register')

const M = require('monet')
const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const APP = require('express')()
const CLI_COLOR = require('cli-color')
const S3_ACCESS_MS = require('./s3-access-microservice/s3.access')
const S3_ACCESS_MYSQL_CONNECTION = require('./s3-access-microservice/s3.access.connection')

const DATE = new Date()

APP.all(
  '/',
  (request, response) =>
    response.header("Access-Control-Allow-Origin", "*")
)

APP.get(
  '/s3/youtube/record/:id&:extension',
  async (request, response) =>
    M.IO(
      async () => await S3_ACCESS_MS.getS3ObjectByIdIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET,
        request.params.extension
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => await s3Response
            ? response.status(200).send(await s3Response)
            : response.status(404).send({ message: `S3 File Not Found: ${request.params.id}` })
        )
    ).run()
)

APP.get(
  '/s3/youtube/available/records/video/:id',
  async (request, response) =>
    M.IO(
      async () => await S3_ACCESS_MS.listAvailableYTObjectsIO(
        await S3_ACCESS_MYSQL_CONNECTION.CONNECTION,
        request.params.id,
        CFG.S3_BUCKET
      )
    ).bind(
      s3Response =>
        M.IO(
          async () => await s3Response
            ? response.status(200).send(await s3Response)
            : response.status(404).send({ message: `S3 List Not Found: ${request.params.id}` })
        )
    ).run()
)

APP.listen(
  CFG.S3_ACCESS_PORT,
  () =>
    H.trace(
      CLI_COLOR.greenBright(`S3 Access Server is listening on port:`),
      CFG.S3_ACCESS_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${DATE.toLocaleString()}`
    )
)
