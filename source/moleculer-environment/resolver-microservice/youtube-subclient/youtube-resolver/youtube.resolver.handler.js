require('module-alias/register')

const R = require('ramda')
const YT_RESOLVER_HELPER = require('./youtube.resolver.helper')

/**
 * 
 * @param {[[String]]} triggerWordCollection 
 * @returns {String} Expanded trigger word set for MySQL insertion
 */
const constructTriggerWordSet =
  (triggerWordCollection) =>
    R.compose(
      YT_RESOLVER_HELPER.expandTriggerWordSet
    )(triggerWordCollection)

module.exports = { constructTriggerWordSet }
