/**
 * @param {String} username 
 * @returns Constructed `Instagram` link type of: `www.instagram.com/{username}/?__a=1`
 */
const constructUserGraphLink =
  (username) =>
    `https://www.instagram.com/${username}/?__a=1`

module.exports = {
  constructUserGraphLink
}
