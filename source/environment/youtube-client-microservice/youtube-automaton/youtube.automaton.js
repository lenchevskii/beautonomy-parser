require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const FS = require('fs')
const CP = require('child_process')
const CLI_COLOR = require('cli-color')
const YT_AUTOMATON_HELPER = require('./youtube.automaton.helper')

/**
 * `Child Process` for downloading YouTube data via `YouTube-DL` library
 * @param {String} aim URL through which data have to be obtained (accepts `ChannelURL`|`VideoURL`|`VideoID`)
 * @param {String} temporaryDirectory 
 * @param {Boolean} skipDownload skip video downloading if True
 * @param {String|Number} dateafter Only videos uploaded on or after this date
 */
const downloadYouTubeDataIO =
  (aim, temporaryDirectory, skipDownload, dateafter) =>
    H.catchError(
      () => CP.exec(
        "youtube-dl" +
        (skipDownload ? " --skip-download" : " --format best") +
        (dateafter ? ` --dateafter ${Number(dateafter)}` : '') +
        " --write-description" +
        " --write-info-json" +
        " --write-all-thumbnails" +
        " --write-sub" +
        " --write-auto-sub" +
        " --rm-cache-dir" +
        " -w" +
        ` -o '${YT_AUTOMATON_HELPER.constructOutputTemplate(temporaryDirectory)}'` +
        " " +
        aim,
        (error, stdout, stderr) =>
          error
            ? H.trace(CLI_COLOR.bold('Error:'), CLI_COLOR.red(error), CLI_COLOR.bold('Aim:'), aim)
            : R.always()
      )
    )

/**
 * @param {String} temporaryDirectory 
 */
const clearTemporaryDirectoryIO =
  (temporaryDirectory) =>
    FS.rm(
      temporaryDirectory,
      { recursive: true, force: true },
      () => temporaryDirectory
    )

module.exports = {
  clearTemporaryDirectoryIO,
  downloadYouTubeDataIO
}
