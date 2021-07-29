const fetch = require('node-fetch')

const fetchJson = async (url) => await fetch(url).then(x => x.json()).catch(e => console.error(e.message))

const extractMedia = (post) => post.graphql.shortcode_media

module.exports = { fetchJson, extractMedia }
