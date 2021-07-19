const R = require('ramda')

const unwrapRowDataPacket =
  (data) =>
    R.compose(
      JSON.parse,
      JSON.stringify
    )(data)

module.exports = { unwrapRowDataPacket }
