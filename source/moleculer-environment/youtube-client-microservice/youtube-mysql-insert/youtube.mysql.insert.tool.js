require('module-alias/register')

const H = require('@general-helper')
const CLI_COLOR = require('cli-color')
const YT_MYSQL_INSERT = require('./youtube.mysql.insert')
const YT_MYSQL_CONNECTION = require('./youtube.mysql.connection')
const [SAVING_DIRECTORY] = process.argv.slice(2)

YT_MYSQL_INSERT.insertYouTubeCollectionIO(
  YT_MYSQL_CONNECTION.CONNECTION,
  H.trace(SAVING_DIRECTORY)
)

YT_MYSQL_CONNECTION.CONNECTION.end((error) => H.trace(CLI_COLOR.red(error), 'Insert YT Collection IO'))
