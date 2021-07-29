const PATH = require('path')

/**
 * @param {String} uuidV4 
 */
const constructTemporaryDirectory =
  (uuidV4) =>
    PATH.join(__dirname, 'youtube-tmp-data', uuidV4)

/**
 * @param {String} temporaryDirectory 
 */
const constructOutputTemplate =
  (temporaryDirectory) =>
    PATH.join(
      temporaryDirectory,
      "%(channel_id)s -- %(channel)s",
      "%(upload_date)s -- %(title)s",
      "%(id)s -- .%(ext)s"
    )

module.exports = { 
  constructTemporaryDirectory,
  constructOutputTemplate
}
