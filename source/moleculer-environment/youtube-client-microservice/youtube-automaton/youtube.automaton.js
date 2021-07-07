require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const FS = require('fs')
const CP = require('child_process')
const PATH = require('path')
const CLI_COLOR = require('cli-color')

const SAVING_DIRECTORY = PATH.join(__dirname, 'youtube-tmp-data')

const OUTPUT_TEMPLATE = PATH.join(
  SAVING_DIRECTORY,
  "%(channel_id)s -- %(channel)s",
  "%(upload_date)s -- %(title)s",
  "%(id)s -- .%(ext)s"
)

/**
 * 
 * @param {String} youtubeVideoURL URL through which data have to be obtained
 */
const downloadYouTubeDataIO =
  (youtubeVideoURL) =>
    CP.exec(
      "youtube-dl" +
      " --skip-download" +
      // " --write-description" +
      " --write-info-json" +
      // " --write-all-thumbnails" +
      " --write-sub" +
      " --write-auto-sub" +
      " --rm-cache-dir" +
      " -w" +
      ` -o '${OUTPUT_TEMPLATE}'` +
      " " +
      youtubeVideoURL,
      (err, stdout, stderr) =>
        err
          ? H.trace(CLI_COLOR.red('err:'), err)
          : R.always()
    )

/**
 * @param {String} savingDirectory 
 */
const clearTemporaryDirectoryIO =
  (savingDirectory) =>
    FS.rmSync(savingDirectory, { recursive: true, force: true })

module.exports = { downloadYouTubeDataIO, clearTemporaryDirectoryIO, SAVING_DIRECTORY }
