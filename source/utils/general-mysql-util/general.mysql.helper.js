const R = require('ramda')

/**
 * Function to unwrap RowDataPacket | BinaryRow
 * @param {*} data Fetched data to unwrap
 * @returns {[*]} Array of elements
 */
const unwrapRowDataPacket =
  (data) =>
    R.compose(JSON.parse, JSON.stringify)(data)

module.exports = { unwrapRowDataPacket }
