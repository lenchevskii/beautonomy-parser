require('module-alias/register')

const H = require('@general-helper')
const R = require('ramda')
const R_ASYNC = require('ramda-async')
const IG_AGGREGATOR_HELPER = require('../../environment/instagram-client-microservice/instagram-aggregator/instagram.aggregator.helper')
const IG_AGGREGATOR_HANDLER = require('../../environment/instagram-client-microservice/instagram-aggregator/instagram.aggregator.handler')

/**
 * @param {Array<Object} collection Channel IDs + Dates collection 
 * @returns {Array<Object} Collection with latest updates from MySQL DB
 */
const findLastUserDBUpdates =
  (collection) =>
    R.compose(
      groups => groups
        .map(group => group
          .reduce((acc, element) => element.post_id > acc.post_id ? element : acc)
        ),
      Object.values,
      R.groupBy(element => element.username)
    )(collection)

/**
 * Function comparing uploaded posts (via DB info) with available posts' updates
 * @param {Array<Object} userDBUpdates Array of type `[{ shortcode,  postId }]`
 */
const findPostsForUpdate =
  (userDBUpdates) =>
    R_ASYNC.pipeAsync(
      (x) => [
        x,
        userDBUpdates.map(
          userDBUpdate =>
            R_ASYNC.pipeAsync(
              IG_AGGREGATOR_HELPER.constructUserGraphLink,
              IG_AGGREGATOR_HANDLER.getAvailablePostMetadata,
            )(userDBUpdate.username)
        )
      ]
    )(userDBUpdates)

module.exports = {
  findLastUserDBUpdates,
  findPostsForUpdate
}
