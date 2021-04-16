const FS = require('fs')

const { browser } = require('./puppeteer-firefox')

const { ServiceBroker } = require('moleculer')

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
      .then(() => broker.call('fire.downloadImage', { url: "https://scontent-waw1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/170586863_2917158181863045_2391084497817864474_n.jpg?tp=1&_nc_ht=scontent-waw1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=A_cjqR0LRz0AX-Km0cz&edm=AABBvjUAAAAA&ccb=7-4&oh=9414750ba9da5d319af7698db620c186&oe=60A05EEF&_nc_sid=83d603"}))
      // .then(res => FS.writeFile('tmp/nasa.jpg', res))
