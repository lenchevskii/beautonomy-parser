require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CLI_COLOR = require('cli-color')
const YT_MYSQL_INSERT = require('./youtube.mysql.insert')
const YT_MYSQL_CONNECTION = require('./youtube.mysql.connection')
const [SAVING_DIRECTORY] = process.argv.slice(2)

YT_MYSQL_INSERT
  .insertYTCollectionByRowIO(
    YT_MYSQL_CONNECTION.CONNECTION,
    SAVING_DIRECTORY
  )

YT_MYSQL_CONNECTION
  .CONNECTION
  .end(
    error =>
      error
        ? H.trace(CLI_COLOR.red(error), 'YT_MYSQL_CONNECTION Error')
        : R.always()
  )
