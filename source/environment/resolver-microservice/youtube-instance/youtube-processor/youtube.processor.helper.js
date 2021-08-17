const R = require('ramda')

/**
 * Function to construct trigger word RegExp
 * @param {[[String]]} frames 
 * @returns {RegExp}
 */
const constructRegExp =
  ([startWords, endWords]) =>
    new RegExp(
      `(${startWords.join('|')}).+(${endWords.join('|')})`,
      'gi'
    )

/**
 * @param {String} line 
 * @param {[[String]]} frames 
 * @returns {Boolean} Whether or not line contains some of the frames
 */
const isProductString =
  (line, [startWords, endWords]) =>
    // R.reduce((acc, startWord) => acc || line.startsWith(startWord), false, startWords)
    R.reduce((acc, endWord) => acc || line.includes(endWord), false, endWords)

/**
* 
* @param {[*]} result SELECT + cross JOIN result
* @returns {[[String]]} unwrapped SELECT result
*/
const unwrapMySQLCollection =
  (result) =>
    result.map(({ starts_with: start, ends_with: end }) => [start, end])

/**
* 
* @param {[[String]]} collection 
* @returns {[[String]]} Set
*/
const createUniqueTriggerWords =
  (collection) =>
    Array(
      Array.from(new Set(collection.map(([start, end]) => start))).map(word => word.toLowerCase()),
      Array.from(new Set(collection.map(([start, end]) => end))).map(word => word.toLowerCase())
    )

module.exports = {
  constructRegExp,
  isProductString,
  unwrapMySQLCollection,
  createUniqueTriggerWords
}
