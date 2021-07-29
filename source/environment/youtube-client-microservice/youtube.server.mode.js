require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CP = require('child_process')
const CFG = require('dotenv').config().parsed
const CLI_COLOR = require('cli-color')
const YT_AUTOMATON = require('./youtube-automaton/youtube.automaton')

/**
 * Main Monad for processing YouTube 
 * @param {String} youTubeURL YouTube URL for processing (channel or video)
 * @param {String} temporaryDirectory
 * @param {Boolean} skipDownload skip video downloading if `true`
 * @param {String|Number} dateafter Only videos to upload on and after this date
 */
const youTubeServerModeIO =
  async (youTubeURL, temporaryDirectory, skipDownload, dateafter) =>
    Promise.resolve(
      YT_AUTOMATON.downloadYouTubeDataIO(
          youTubeURL,
          temporaryDirectory,
          skipDownload,
          dateafter
        ).on(
          'exit',
          code =>
            CP.execSync(
              'node source/environment/youtube-client-microservice/youtube-s3-insert/youtube.s3.insert.tool.js' +
              ` ${temporaryDirectory}` +
              ` ${CFG.S3_BUCKET}` +
              ` ${CFG.S3_YT_CHILD_BUCKET}`,
              { stdio: 'inherit' }
            )
          // : H.trace(CLI_COLOR.red(`YT_AUTOMATON Download Error. Status code: ${code}`), youTubeURL)
        ).on(
          'exit',
          code =>
            code === 0
              ? CP.execSync(
                'node source/environment/youtube-client-microservice/youtube-mysql-insert/youtube.mysql.insert.tool.js' +
                ` ${temporaryDirectory}`,
                { stdio: 'inherit' }
              )
              : H.trace(CLI_COLOR.red(`YT_S3_INSERT Error. Status code: ${code}`))
        ).on(
          'exit',
          code =>
            code === 0
              ? CP.execSync(
                `node source/environment/resolver-microservice/youtube-subclient/youtube.resolver.tool.js` +
                ` ${CFG.S3_BUCKET}` +
                ` ${CFG.S3_YT_CHILD_BUCKET}` +
                ` ${temporaryDirectory}`,
                { stdio: 'inherit' }
              )
              : H.trace(CLI_COLOR.red(`YT_MYSQL_INSERT Error. Status code: ${code}`))
        ).on(
          'exit',
          code =>
            CP.execSync(
              'node source/environment/youtube-client-microservice/youtube-automaton/youtube.automaton.tool.js' +
              ` ${temporaryDirectory}`,
              { stdio: 'inherit' }
            )
        ).on(
          'exit',
          code =>
            code === 0
              ? H.trace(
                CLI_COLOR.bold.whiteBright('YT_AUTOMATON Success.'),
                `-- ${CLI_COLOR.bold('Server time:')}`,
                `-- ${(new Date()).toLocaleString()}`
              )
              : H.trace(CLI_COLOR.red(`YT_AUTOMATON Remove TMP Error. Status code:`), code)
        )
    )

module.exports = {
  youTubeServerModeIO
}
