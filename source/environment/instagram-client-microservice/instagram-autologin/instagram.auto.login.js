// use aliases for custom modules
require('module-alias/register')

const CLI_COLOR = require('cli-color')
const PUPPETEER = require('puppeteer')

const H = require('@general-helper')

const loginInstagram = async (username, password) => {
  const chrome = await PUPPETEER.launch({
    product: 'chrome',
    headless: false,
    defaultViewport: { width: 1350, height: 660 },
    // args: ['--proxy-server=http://183.88.213.85:8080']
  })

  // const extractConfirmationButton =
  //   async () => {
  //     console.log('Inside the XML attempt.')
  //     const puppeteerClientXMLRequest = new XMLHttpRequest()

  //     puppeteerClientXMLRequest.open("POST", 'http://localhost:3000/send.instagram.button')
  //     puppeteerClientXMLRequest.send({
  //       confirmationButton: document.querySelectorAll('button')[1],
  //       buttonScope: document.querySelectorAll('button')
  //     })

  //     console.log('DONE xml')
  //   }

  const page = await chrome.newPage()

  await page.goto('https://www.instagram.com/accounts/login/')
  page.on('console', msg => console.log('PAGE LOG:', msg.args()))

  try {
    await page.waitForSelector('input[name=username]')
    await page.waitForSelector('input[name=password]')
    await page.type('input[name=username]', username)
    await page.type('input[name=password]', password)
    await page.click('button[type="submit"]')

    // await page.click('button[type="button"]')

    // await page.waitForSelector('label[for="choice_1"]')
    // await page.click('label[for="choice_1"]')
    // await page.evaluate(async () => document.querySelectorAll('button')[1])
    // await page.exposeFunction('extractConfirmationButton', extractConfirmationButton)

    await page.evaluate(() => {
      const extractConfirmationButton = () => {
        console.log(document.querySelectorAll('button')[1])
        const puppeteerClientXMLRequest = new window.XMLHttpRequest()

        puppeteerClientXMLRequest.open("POST", 'https://37.214.29.52:3000/send.instagram.button')
        console.log(puppeteerClientXMLRequest)
        puppeteerClientXMLRequest.send({
          confirmationButton: document.querySelectorAll('button')[1],
          buttonScope: document.querySelectorAll('button')
        })
        console.log(puppeteerClientXMLRequest)
      }

      extractConfirmationButton()
    })

    // const afterPage = await chrome.newPage()
    // await afterPage.goto('http://localhost:3000/instagram.worm')

  } catch (error) {
    H.trace(CLI_COLOR.red('Login Error:'), error.message)
  }
}


module.exports = { loginInstagram }

loginInstagram('beauty.tom.lebree', 'Z8hjMS6N9FJzUnp')
