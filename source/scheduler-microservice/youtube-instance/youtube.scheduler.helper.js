require('module-alias/register')

const R = require('ramda')

/**
 * @param {Array} collection Channel IDs + Dates collection 
 * @returns {Array} Collection with latest updates
 */
const findLastChannelUpdates =
  (collection) =>
    R.compose(
      groups => groups
        .map(group => group
          .reduce((acc, element) => element.upload_date > acc.upload_date ? element : acc)
        ),
      Object.values,
      R.groupBy(element => element.channel_id)
    )(collection)

module.exports = { findLastChannelUpdates }
