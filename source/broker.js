const FS = require('fs')

const PATH = require('path')

const HTTPS = require('https')

const MLCLR = require('moleculer')

// const fetch = require('node-fetch')

const puppeteer = require('puppeteer')

const { extractName, trace } = require('./helper')

const browser = puppeteer.launch({
  product: 'firefox',
  headless: true,
  defaultViewport: { width: 1350, height: 660 },
  // args: ['--proxy-server=http://183.88.213.85:8080']
})

const grabNode = new MLCLR.ServiceBroker({
  nodeID: 'node-1-grab',
  retryPolicy: {
    enabled: true,
    retries: 1,
    delay: 100,
    maxDelay: 2000,
    factor: 2,
    check: err => err && !!err.retryable
  },
})

grabNode.createService({
  name: 'grab',
  actions: {
    async downloadImage(context) {
      const firefox = await browser
      const page = await firefox.newPage()
      const ppptrResponse = await page.goto(context.params.url)
      const image = await ppptrResponse.buffer()

      const img = await fetch(context.params.url).then(async response => response.text())

      FS.writeFile(
        PATH.join(__dirname, 'tmp', extractName(context.params.url)),
        img,
        (err, res) => err ? trace(err) : trace('✅ The file was written successfully.')
      )

      firefox.close()
    },
    async getInstagramObject(context) {
      const firefox = await browser
      const page = await firefox.newPage()
      const ppptrResponse = await page.goto(context.params.url, { waitUntil: 'load', timeout: 0 })
      const instagramObject = await ppptrResponse.frame().content()

      // await new Promise.resolve(setTimeout(() => trace('Time Out, 3000ms'), 3000))

      async function download(context) {
        return new Promise((resolve, reject) => {
          const destination = PATH.join(__dirname, 'tmp', 'instagram', 'graphql_nasa.jpg')
  
          HTTPS.get(context.params.url, response => {
            trace('on HTTPS GET')
            const file = FS.createWriteStream(destination)

            response.pipe(file)
  
            file.on('finish', () => {
              trace('on Finish')
              file.close(resolve(true))
            })
          }).on('error', error => {
            FS.unlink(destination)
  
            return reject(error.message)
          })
        })
      }

      // FS.writeFile(
      //   PATH.join(__dirname, 'tmp', 'instagram', 'graphql_nasa.jpg'),
      //   instagramObject,
      //   (err, res) => err ? trace(err) : trace('✅ The file was written successfully.')
      // )

      await download(context)
      await firefox.close()
    },
    
  }
})

const resolveNode = new MLCLR.ServiceBroker({
  nodeID: 'node-2-resolve'
})

// resolveNode.createService({
//   name: 'resolve',
//   actions: {
//     async resolve
//   }
// })

grabNode.start()
  // .then(() => grabNode.call('grab.downloadImage', { url: "https://raw.githubusercontent.com/lenchevskii/beautonomy-parser/main/docs/beautonomy_mining_scheme.jpg" }))
  .then(() => grabNode.call('grab.getInstagramObject', { url: "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/170586863_2917158181863045_2391084497817864474_n.jpg?tp=1&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=A_cjqR0LRz0AX-Km0cz&edm=AABBvjUAAAAA&ccb=7-4&oh=9414750ba9da5d319af7698db620c186&oe=60A05EEF&_nc_sid=83d603" }))
  // .then(() => grabNode.call('grab.getInstagramObject', { url: "https://www.instagram.com/p/CNGPA77JkRv/?__a=1" }))

grabNode.stop()