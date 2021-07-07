require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const FS = require('fs')
const PATH = require('path')

/**
 * 
 * @param {String} directory Relative path to the target directory
 * @returns {[String]} Array of paths
 */
const getAllFilesPathR =
  (directory) =>
    FS.readdirSync(directory).map(
      directoryObject =>
        FS.statSync(PATH.join(directory, directoryObject)).isDirectory()
          ? getAllFilesPathR(
            PATH.join(directory, directoryObject),
            FS.readdirSync(PATH.join(directory, directoryObject))
          )
          : PATH.join(directory, directoryObject)
    )

/**
 * 
 * @param {String} directory Relative path to the target directory
 * @returns {[String]} Flatten array of paths
 */
const getAllFilePaths =
  (directory) =>
    H.catchError(R.compose(R.flatten, getAllFilesPathR), directory)

/**
 * 
 * @param {[[*]]} collection 
 */
const removeIdenticalSubsets =
  (collection) =>
    Array
      .from(new Set(collection.map(JSON.stringify)))
      .map(JSON.parse)

module.exports = { removeIdenticalSubsets, getAllFilePaths }
