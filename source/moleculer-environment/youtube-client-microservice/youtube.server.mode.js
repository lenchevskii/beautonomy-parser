require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CP = require('child_process')
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const YT_AUTOMATON = require('./youtube-automaton/youtube.automaton')

const START = new Date()

/**
 * Main Monad for processing YouTube 
 * @param {String} youTubeURL YouTube URL for processing (channel or video)
 * @param {String|Number} dateafter Only videos uploaded on or after this date
 */
const youTubeServerModeIO =
  (youTubeURL, dateafter) =>
    YT_AUTOMATON
      .downloadYouTubeDataIO(
        youTubeURL,
        dateafter
      ).on(
        'exit',
        code =>
          code === 0
            ? CP.execSync(
              'node source/moleculer-environment/youtube-client-microservice/youtube-s3-insert/youtube.s3.insert.tool.js' +
              ` ${YT_AUTOMATON.SAVING_DIRECTORY}` +
              ` ${CFG.S3_BUCKET}` +
              ` ${CFG.S3_YT_CHILD_BUCKET}`,
              { stdio: 'ignore' },
              (error) => H.trace(CLI_COLOR.red(error), 'S3 Insert TOOL Message')
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Download Error. Status code: ${code}`), youTubeURL)
      ).on(
        'exit',
        code =>
          code === 0
            ? CP.execSync(
              'node source/moleculer-environment/youtube-client-microservice/youtube-mysql-insert/youtube.mysql.insert.tool.js' +
              ` ${YT_AUTOMATON.SAVING_DIRECTORY}`,
              { stdio: 'ignore' },
              (error) => H.trace(CLI_COLOR.red(error), 'MySQL Insert TOOL Message')
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Upload Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? CP.execSync(
              `node source/moleculer-environment/resolver-microservice/youtube-subclient/youtube.resolver.tool.js` +
              ` ${CFG.S3_BUCKET}` +
              ` ${CFG.S3_YT_CHILD_BUCKET}` +
              ` ${YT_AUTOMATON.SAVING_DIRECTORY}`,
              { stdio: 'ignore' },
              (error) => H.trace(CLI_COLOR.red(error), 'Resolver TOOL Message')
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Upload Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? CP.execSync(
              'node source/moleculer-environment/youtube-client-microservice/youtube-automaton/youtube.automaton.tool.js' +
              ` ${YT_AUTOMATON.SAVING_DIRECTORY}`
            )
            : H.trace(CLI_COLOR.red(`Resolver TOOL Error. Status code: ${code}`))
      ).on(
        'exit',
        code =>
          code === 0
            ? H.trace(
              CLI_COLOR.bold.whiteBright('AUTOMATON Success.'),
              `${CLI_COLOR.bold('START')}: -- ${START.toLocaleString()}`,
              `${CLI_COLOR.bold('END')}: -- ${(new Date()).toLocaleString()}`
            )
            : H.trace(CLI_COLOR.red(`YT_AUTOMATON Remove TMP Error. Status code: ${code}`))
      )

module.exports = {
  youTubeServerModeIO: R.curry(youTubeServerModeIO)
}
