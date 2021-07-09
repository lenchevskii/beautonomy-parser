/**
 * Function to construct trigger word RegExp
 * @param {[[String]]} frames 
 * @returns {RegExp}
 */
const constructRegExp =
  ([startWords, endWords]) =>
    new RegExp(
      `(${startWords.join('|')}).+(${endWords.join('|')})+`,
      'gi'
    )

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
* @param {[[String]]} unwrapedCollection 
* @returns {[[String]]} Set
*/
const formUniqueTriggerWordCollection =
  (unwrapedCollection) =>
    Array(
      Array.from(new Set(unwrapedCollection.map(([start, end]) => start))),
      Array.from(new Set(unwrapedCollection.map(([start, end]) => end)))
    )

module.exports = {
  constructRegExp,
  unwrapMySQLCollection,
  formUniqueTriggerWordCollection
}
