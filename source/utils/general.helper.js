const R = require('ramda')
const CLI_COLOR = require('cli-color')

/**
 * Tracing function for embedding
 * @param {*} x Traced parameter
 * @param  {...any} comment Untraced comments
 * @returns x
 */
const trace =
  (x, ...comment) => { console.log(x, ...comment); return x }

/**
 * 
 * @param {function} fnc 
 * @param  {...any} args 
 * @returns Result
 */
const catchError =
  (fnc, ...args) => { try { return fnc(...args) } catch (error) { trace(CLI_COLOR.red(error.message)) } }

const extractName =
  (url) =>
    R.head(url.match(/([^/]*)\.jp(e?)g/i, ''))

module.exports = { extractName, catchError, trace }
