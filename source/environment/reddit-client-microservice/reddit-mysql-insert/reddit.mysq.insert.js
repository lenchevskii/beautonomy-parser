require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const MYSQL = require('mysql2/promise')
const RD_MYSQL_API = require('./reddit.mysql.insert.API')

/**
 * 
 * @param {MYSQL.Connection} connection 
 * @param {Array} collection Array of type 
 */
const insertRDPostCollectionIO =
  (connection, collection) =>
    Promise.all(
      collection.map(
        ([{ author: author }, { id: id }, _]) =>
          RD_MYSQL_API.insertRDPost(
            connection,
            [author.name, id]
          )
      )
    )

module.exports = {
  insertRDPostCollectionIO: R.curry(insertRDPostCollectionIO)
}
