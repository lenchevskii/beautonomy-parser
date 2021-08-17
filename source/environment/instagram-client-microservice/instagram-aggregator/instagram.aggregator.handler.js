require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const { default: fetch } = require("node-fetch");

/**
 * Find available posts of a specific user 
 * @param {String} userLink Instagram account `url`
 * @returns Array of type `[{ shortcode,  postId }]`
 */
const getAvailablePostMetadata =
  (userLink) =>
    fetch(userLink)
      .then(graph => graph.json())
      .then(json => json.graphql.user.edge_owner_to_timeline_media.edges)
      .then(R.map(edge => new Object({ shortcode: edge.node.shortcode, postId: edge.node.id })))
      .catch(H.trace)

module.exports = {
  getAvailablePostMetadata
}
