const FS = require('fs')

const puppeteer = require('puppeteer')

const { ServiceBroker } = require('moleculer')

const browser = puppeteer.launch({ product: 'firefox', headless: false })

const trace = (x, ...comment) => { console.log(x, ...comment); return x }

const broker = new ServiceBroker()

broker.createService({
  name: 'fire',
  actions: {
    downloadImage(context) {
      return browser.then(res => res.newPage())
                    .then(res => res.goto(context.params.url))
    }
  }
})

broker.start()
      .then(() => broker.call('fire.downloadImage', { url: "https://raw.githubusercontent.com/lenchevskii/beautonomy-parser/main/docs/beautonomy_mining_scheme.jpg"}))
      // .then(res => FS.writeFile('tmp/nasa.jpg', res))
