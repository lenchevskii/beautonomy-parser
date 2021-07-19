const FS = require('fs')
const CP = require('child_process')
const PATH = require('path')
const UUID = require('uuid')

const SAVING_DIRECTORY = PATH.join(__dirname, 'youtube-tmp-data', UUID.v4())

const OUTPUT_TEMPLATE = PATH.join(
  SAVING_DIRECTORY,
  "%(channel_id)s -- %(channel)s",
  "%(upload_date)s -- %(title)s",
  "%(id)s -- .%(ext)s"
)

/**
 * `Child Process` for downloading YouTube data via `YouTube-DL` library
 * @param {String} aim URL through which data have to be obtained (accepts `ChannelURL`|`VideoURL`|`VideoID`)
 * @param {String|Number} dateafter Only videos uploaded on or after this date
 */
const downloadYouTubeDataIO =
  (aim, dateafter) =>
    CP.exec(
      "youtube-dl" +
      " --skip-download" +
      ` --dateafter ${Number(dateafter)}` +
      " --write-description" +
      " --write-info-json" +
      " --write-all-thumbnails" +
      " --write-sub" +
      " --write-auto-sub" +
      " --rm-cache-dir" +
      " -w" +
      ` -o '${OUTPUT_TEMPLATE}'` +
      " " +
      aim
    )

/**
 * @param {String} savingDirectory 
 */
const clearTemporaryDirectoryIO =
  (savingDirectory) =>
    FS.rm(savingDirectory, { recursive: true, force: true }, () => savingDirectory)

module.exports = {
  clearTemporaryDirectoryIO,
  downloadYouTubeDataIO,
  SAVING_DIRECTORY
}
