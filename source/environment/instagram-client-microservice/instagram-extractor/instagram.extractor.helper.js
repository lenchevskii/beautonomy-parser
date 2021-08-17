require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const fetch = require('node-fetch')
const PROXY_AGENT = require('https-proxy-agent')
const proxyAgent = new PROXY_AGENT.HttpsProxyAgent('https://190.108.93.87:999')

/**
 * @param {Object} post 
 * @returns {[Object]|undefined} 
 */
const extractCaptions =
  (post) =>
    post.edge_media_to_parent_comment
      ? post.edge_media_to_parent_comment.edges
      : undefined

/**
* @param {Object} post 
* @returns {[Object]} 
*/
const extractDisplayResources =
  (post) =>
    post.is_video
      ? Array(post.video_url)
      : R.isNil(post.edge_sidecar_to_children)
        ? Array(R.last(post.display_resources))
        : post
          .edge_sidecar_to_children
          .edges
          .map(
            x => x.node.is_video
              ? { src: x.node.video_url }
              : R.last(x.node.display_resources)
          )

/**
 * @param {String} url 
 */
const fetchJson =
  async (url) =>
    await fetch(url, { agent: proxyAgent }).then(x => x.json()).catch(H.trace)

const extractMedia =
  (post) =>
    post.graphql.shortcode_media

/**
 * Construct **Instagram GraphAPI** `URL`
 * @param {String} id 
 */
const constructIGUrlAPI =
  (id) =>
    `https://www.instagram.com/p/${id}/?__a=1`

module.exports = {
  extractDisplayResources,
  constructIGUrlAPI,
  extractCaptions,
  extractMedia,
  fetchJson
}
