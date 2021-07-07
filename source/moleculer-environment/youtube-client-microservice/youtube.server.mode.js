require('module-alias/register')

const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const YT_AUTOMATON = require('./youtube-automaton/youtube.automaton')
const YT_S3_INSERT_TOOL = require('./youtube-s3-insert/youtube.s3.tool')
const YT_MYSQL_CONNECTION = require('./youtube-mysql-insert/youtube.mysql.connection')
const YT_MYSQL_INSERT_TOOL = require('./youtube-mysql-insert/youtube.mysql.insert')

/**
 * Main Monad for processing YouTube 
 * @param {String} youTubeURL YouTube URL for processing (channel or video)
 */
const youTubeServerModeIO =
  (youTubeURL) =>
    YT_AUTOMATON
      .downloadYouTubeDataIO(
        youTubeURL
      ).on(
        'exit',
        code =>
          code === 0
            ? YT_S3_INSERT_TOOL.uploadYouTubeCollectionIO(
              YT_AUTOMATON.SAVING_DIRECTORY,
              CFG.S3_BUCKET,
              CFG.S3_YT_CHILD_BUCKET
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Download Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? YT_MYSQL_INSERT_TOOL.insertYouTubeCollectionIO(
              YT_MYSQL_CONNECTION.CONNECTION,
              YT_AUTOMATON.SAVING_DIRECTORY
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Upload Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? YT_AUTOMATON.clearTemporaryDirectoryIO(
              YT_AUTOMATON.SAVING_DIRECTORY
            )
            : H.trace(CLI_COLOR.red(`YT_MYSQL_INSERT_TOOL Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? YT_MYSQL_CONNECTION.CONNECTION.end((error) => H.trace(CLI_COLOR.red(error.message)))
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Remove TMP Error. Status code: ${code}`))
      )

module.exports = { youTubeServerModeIO }

// youTubeServerModeIO('https://www.youtube.com/channel/UCzfKFtL9oochl5JIo72S1Zw')
// youTubeServerModeIO('https://www.youtube.com/watch?v=rtgv5DV0IUk')
