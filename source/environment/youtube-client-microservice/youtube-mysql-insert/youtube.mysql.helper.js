const R = require('ramda')
const MYSQL = require('mysql')

/**
 * Function for contruction arrays with DB values for insertion.
 * *Inside function, `R.identity` allow to filter empty array elements*
 * @param {String} directory 
 * @param {[String]} paths 
 * @returns {[[String]]} Array with arrays of DB values
 */
const constructYTLinkEntity =
  (directory, paths) =>
    paths
      .map(
        path =>
          R.replace(directory, '', path)
            .split('/')
            .filter(R.identity)                 // Filter empty array elements
            .map(field => field.split(' --=-- '))
      )
      .map(R.flatten)
      .map(R.dropLast(1))

/**
 * Function for expanding Array with YouTube DB values 
 * @param {[[String]]} collection 
 * @returns Expanded YouTube Entity set ready for insertion
 */
const expandYTLinkEntitySet =
  (collection) =>
    collection
      .map(entity => entity.map(field => MYSQL.escape(field)))
      .map(
        ([channel_id, channel, upload_date, title, link_id]) =>
          `(${link_id}, ${channel}, ${channel_id}, ${upload_date}, ${title})`
      )

module.exports = {
  expandYTLinkEntitySet,
  constructYTLinkEntity: R.curry(constructYTLinkEntity)
}
