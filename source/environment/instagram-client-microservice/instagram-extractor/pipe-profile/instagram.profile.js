const R = require('ramda')

const template = "https://www.instagram.com/p/{pointer}/?__a=1"

const pattern = /(https:\/\/www.instagram.com\/p\/)([^\/.]*)(\/?.*)/

const resolveUrl =
  (template, pattern, url) =>
    template.replace('{pointer}', R.head(R.tail(R.tail(url.match(pattern)))))


module.exports = { template, pattern, resolveUrl: R.curry(resolveUrl) }