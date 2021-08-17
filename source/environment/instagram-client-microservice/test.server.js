require('module-alias/register')

const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const EXPRESS = require('express')
const IG_SERVER_MODE = require('./instagram.server.mode')
const IG_AGGREGATOR = require('./instagram-aggregator/instagram.aggregator')

const TODAY = new Date()
const app = EXPRESS()

app.get(
  `/instagram.worm`,
  (req, res) =>
    // IG_SERVER_MODE.instagramServerModeIO('COHAXxyFofk').on('close', (code) => res.send({ status: 'OK' }))
    IG_AGGREGATOR.getAvailableShortcodesIO('mariahlleonard')
)

app.listen(
  CFG.SCHEDULER_PORT,
  () =>
    H.trace(`Server listening on port ${CFG.SCHEDULER_PORT}. Server time: ${TODAY.toLocaleString()}`)
)
