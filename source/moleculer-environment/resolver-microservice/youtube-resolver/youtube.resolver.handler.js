require('module-alias/register')

const H = require('@general-helper')
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

const getProductRegExp =
  (frames) =>
    R.compose(
      YT_RESOLVER_HELPER.constructRegExp,
      YT_RESOLVER_HELPER.formUniqueTriggerWordCollection,
      YT_RESOLVER_HELPER.unwrapMySQLCollection
    )(frames)

module.exports = { constructTriggerWordSet, getProductRegExp }
