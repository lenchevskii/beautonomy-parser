const M = require('moleculer')

const FS = require('fs')

const PATH = require('path')

const puppeteer = require('puppeteer')

const { extractName, trace } = require('./helper')

const browser = puppeteer.launch({
  product: 'firefox',
  headless: true,
  defaultViewport: { width: 1350, height: 660 },
  // args: ['--proxy-server=socks5://127.0.0.1:9050']
})

const broker = new M.ServiceBroker()

broker.createService(
  {
    name: 'grab',
    actions: {
      async downloadImage(context) {
        const firefox = await browser
        const page = await firefox.newPage()
        const ppptrResponse = await page.goto(context.params.url)
        const image = ppptrResponse.frame()

        FS.writeFile(
          PATH.join(__dirname, 'tmp', extractName(context.params.url)),
          await image.content(),
          (err, res) => err ? trace(err) : trace('✅ The file was written successfully.')
        )
      }
    }
  }
)

broker.start()
  // .then(() => broker.call('grab.downloadImage', { url: "https://raw.githubusercontent.com/lenchevskii/beautonomy-parser/main/docs/beautonomy_mining_scheme.jpg" }))
  .then(() => broker.call('grab.downloadImage', { url: "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/170586863_2917158181863045_2391084497817864474_n.jpg?tp=1&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=A_cjqR0LRz0AX-Km0cz&edm=AABBvjUAAAAA&ccb=7-4&oh=9414750ba9da5d319af7698db620c186&oe=60A05EEF&_nc_sid=83d603" }))
