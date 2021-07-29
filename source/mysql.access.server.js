require('module-alias/register')

const R = require('ramda')
const M = require('monet')
const H = require('@general-helper')
const APP = require('express')()
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const MYSQL_ACCESS_MS = require('./mysql-access-microservice/mysql.access')
const MYSQL_ACCESS_CONNECTION = require('./mysql-access-microservice/mysql.access.connection')

const DATE = new Date()

APP.all(
  '/',
  (_, response) =>
    response.header("Access-Control-Allow-Origin", "*")
)

APP.get(
  '/list/youtube/channels',
  async (_, response) =>
    M.IO(
      async () =>
        await MYSQL_ACCESS_MS.listYTChennelsIO(
          await MYSQL_ACCESS_CONNECTION.CONNECTION
        )
    ).bind(
      mysqlResponse =>
        M.IO(
          async () => R.is(Error, await mysqlResponse)
            ? response.status(404).send(await mysqlResponse)
            : response.status(200).send(await mysqlResponse)
        )
    ).run()
)

APP.listen(
  CFG.MYSQL_ACCESS_PORT,
  () =>
    H.trace(
      CLI_COLOR.greenBright(`Scheduler server is listening on port:`),
      CFG.MYSQL_ACCESS_PORT,
      CLI_COLOR.white.bold('Server started at:'),
      `-- ${DATE.toLocaleString()}`
    )
)
