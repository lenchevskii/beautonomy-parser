// use aliases for custom modules
require('module-alias/register')

const CLICOLOR = require('cli-color')
const PUPPETEER = require('puppeteer')

const { trace } = require('@helper')

const loginInstagram = async (username, password) => {
  const chrome = await PUPPETEER.launch({
    product: 'chrome',
    headless: false,
    defaultViewport: { width: 1350, height: 660 },
    // args: ['--proxy-server=http://183.88.213.85:8080']
  })

  const page = await chrome.newPage()

  await page.goto('https://www.instagram.com/accounts/login/')

  try {
    await page.waitForSelector('input[name=username]')
    await page.waitForSelector('input[name=password]')
    await page.type('input[name=username]', username)
    await page.type('input[name=password]', password)
    await page.click('button[type="submit"]')
    
    await page.waitForSelector('label[for="choice_1"]')
    await page.click('label[for="choice_1"]')
    await page.evaluate(async () => document.querySelectorAll('button')[1])
    
    // ...continue

  } catch (error) {
    trace(CLICOLOR.red('Login Error.'), error.message)
  }
}


module.exports = { loginInstagram }
