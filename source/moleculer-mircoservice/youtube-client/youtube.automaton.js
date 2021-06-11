// YouTube Python automaton

// use aliases for custom modules
require('module-alias/register')

const CP = require('child_process')
const PATH = require('path')
const CLICOLOR = require('cli-color')
const { trace } = require('@helper')

const SAVINGLOCATION = PATH.join(__dirname, 'youtube-data', "%(channel)s", "%(title)s", "%(id)s.%(ext)s")

/**
 * 
 * @param {String} url URL through which data have to be obtained.
 * @returns 
 */
const downloadYouTubeData = (url) => CP.exec(
  "youtube-dl" +
  " --skip-download" +
  " --write-description" +
  " --write-info-json" +
  " --write-all-thumbnails" +
  " --write-sub" +
  " --write-auto-sub" +
  " --rm-cache-dir" +
  " -w" +
  ` -o '${SAVINGLOCATION}'` +
  " " +
  url,
  (err, stdout, stderr) =>
    err
      ? trace(CLICOLOR.red('err:'), err)
      : trace(CLICOLOR.green('stdout:'), stdout)
)


module.exports = { downloadYouTubeData }

downloadYouTubeData('https://www.youtube.com/watch?v=Kuk07Y8DdAY')
downloadYouTubeData('https://www.youtube.com/watch?v=dYaznuhA4Io')
downloadYouTubeData('https://www.youtube.com/watch?v=hkRZbtmeaes')
downloadYouTubeData('https://www.youtube.com/watch?v=TaBjD9RVCRs')
