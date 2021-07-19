/**
 * Function takes service for scheduling
 * @param {*} service 
 * @param {Number} interval Interval for repetition *(ms)*
 * @param  {...any} args Service argruments 
 * @returns {NodeJS.Timeout} `Timeout` object 
 */
const scheduleService =
  (service, interval, ...args) =>
    setInterval(() => service(...args), interval)

module.exports = { scheduleService }
