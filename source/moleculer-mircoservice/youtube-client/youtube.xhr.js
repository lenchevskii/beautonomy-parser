// use aliases for custom modules
require('module-alias/register')

const R = require('ramda')
const FS = require('fs')
const PATH = require('path')
const CLICOLOR = require('cli-color')
const PUPPETEER = require('puppeteer')

const { IO } = require('monet')
const { trace } = require('@helper')
const { default: fetch } = require('node-fetch')

// const readCaption = (tmpJsonPath) =>
//   FS.readFileSync(
//     tmpJsonPath,
//     (err, data) =>
//       err
//         ? trace(err)
//         : IO(
//           () => trace(JSON.parse(data)['events'])
//         ).takeRight(
//           IO(() => FS.unlinkSync(tmpJsonPath))
//         ).run()
//   )

/**
 * 
 * @param {[String]} keywords Array with keywords from which RegExp will be constructed
 * @returns Regular expression of type `/(keyword_1|keyword_2|...)+/gi`
 */
const constructRegExp =
  (keywords) =>
    new RegExp(
      `(${keywords.reduce((acc, x) => acc + '|' + x)})+`,
      'gi'
    )

const findWordZeroLevelALG =
  (timedArray, regularExpression) =>
    timedArray
      .filter(
        timedSegments => !R.isNil(timedSegments['segs']) && !R.isNil(
          R.head(
            timedSegments['segs']
              .map(x => x['utf8']
                .match(
                  regularExpression
                )
              )
          )
        )
      )

const interceptXHR = async (youTubeUrl, keywords) => {
  const [videoId] = youTubeUrl.match(/[^(https:\/\/www\.youtube\.com\/watch\?v\=)]+(?<videoId>.*)/g)
  const tmpPath = PATH.join(__dirname, 'tmp')
  const tmpJsonPath = PATH.join(tmpPath, `${videoId}.json`)

  const chrome = await PUPPETEER.launch({
    product: 'chrome',
    headless: true,
    defaultViewport: { width: 1350, height: 660 },
    // args: ['--proxy-server=http://183.88.213.85:8080']
  })

  const page = await chrome.newPage()

  await page.goto(youTubeUrl)
  await page.setRequestInterception(true)

  page.on('request', async (request) => {
    if (request.url().startsWith('https://www.youtube.com/api/timedtext')) {
      const timedTextObject = await fetch(request.url())
      const timedText = await timedTextObject.buffer()
      const timedArray = JSON.parse(timedText)['events']
      const regularExpression = constructRegExp(keywords)

      const timedProductsWithPoison = findWordZeroLevelALG(timedArray, regularExpression)

      trace(trace(timedProductsWithPoison).map(x => x['segs']))
      trace(timedProductsWithPoison.length)

      // FS.existsSync(tmpPath) ? R.always() : FS.mkdirSync(tmpPath)

      // FS.existsSync(tmpJsonPath)
      //   ? trace(CLICOLOR.yellow('File already exists.'))
      //   : FS.writeFile(
      //     tmpJsonPath,
      //     timedText,
      //     (err, res) => err
      //       ? trace(CLICOLOR.red(err))
      //       : trace(CLICOLOR.green('Timed text was written successfully.'))
      //   )

      return timedProductsWithPoison
    }
  })

  try {
    await page.click('.ytp-subtitles-button')
  } catch (error) {
    trace(CLICOLOR.red('Video has no subtitles.'), error.message)
  }

  await chrome.close()
}

module.exports = { interceptXHR }
