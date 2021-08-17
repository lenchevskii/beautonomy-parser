const R = require('ramda')

const maybeMySQLResponse =
  channels =>
    R.is(Error, channels)
      ? channels
      : R.head(channels)

module.exports = {
  maybeMySQLResponse
}
