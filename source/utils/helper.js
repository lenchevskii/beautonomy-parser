const R = require('ramda')

const trace = (x, ...comment) => { console.log(x, ...comment); return x }

const extractName = (url) => R.head(url.match(/([^/]*)\.jp(e?)g/i, ''))


module.exports = { extractName, trace }