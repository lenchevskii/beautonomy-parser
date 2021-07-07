require('module-alias/register')

const R = require('ramda')
const G_HANDLER = require('@general-handler')
const YT_MYSQL_HELPER = require('./youtube.mysql.helper')

/**
 * 
 * @param {String} directory Temporary directory for listening
 * @returns {String} Expanded YouTube links set for MySQL insertion
 */
const constructYTLinkEntitySet =
  (directory) =>
    R.compose(
      YT_MYSQL_HELPER.expandYTLinkEntitySet,
      G_HANDLER.removeIdenticalSubsets,
      YT_MYSQL_HELPER.constructYTLinkEntity(directory, R.__),
      G_HANDLER.getAllFilePaths
    )(directory)

module.exports = { constructYTLinkEntitySet }
