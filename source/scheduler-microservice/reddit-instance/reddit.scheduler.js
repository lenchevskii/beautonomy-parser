const R = require('ramda')

/**
 * Function takes service for scheduling 
 * @param {Function} service 
 * @param {Number|String} interval Interval for repetition *(min)*
 * @param {Number|String} lastPostsNumber
 */
const scheduleRDServiceIO =
  (service, interval, lastPostsNumber) =>
    Promise.resolve(
      setTimeout(
        () => R.compose(service, Number)(lastPostsNumber),
        interval * 60000
      )
    )

module.exports = {
  scheduleRDServiceIO
}
