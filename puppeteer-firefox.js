const puppeteer = require('puppeteer')

const browser = puppeteer.launch({ product: 'firefox', headless: false })

// browser.newPage('http://google.com')
module.exports = { browser }