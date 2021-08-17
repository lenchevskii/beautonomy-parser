require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const REDDITHANDLER = require('./reddit.extractor.handler')

const Snoowrap = require('snoowrap')

/**
 * Function to extract subinformation from last `N` posts at the moment 
 * @param {Snoowrap} oauthClient Reddit Authenticated Client
 * @param {String} subreddit Name of subreddit
 * @param {Number} lastPostsNumber The number of last posts that need to get
 * @param {String} flairName Category of posts (for isntance, `FOTD`)
 * @returns Promised Array of Reddit posts with comments 
 */
const extractRedditData =
  (oauthClient, subreddit, lastPostsNumber, flairName) =>
    oauthClient
      .getSubreddit(subreddit)
      .getNew({ limit: lastPostsNumber })
      .then(posts => posts.filter(x => x.link_flair_text === flairName))
      .then(
        posts =>
          Promise.all(
            posts.map(
              async post => [
                { author: post.author },
                { id: post.id },
                { post: post },
                {
                  comments: await oauthClient
                    .getSubmission(post.id)
                    .expandReplies({ limit: Infinity, depth: Infinity })
                    .then(REDDITHANDLER.constructCommentSubstructure)
                }
              ]
            )
          )
      )
      .catch(H.trace)

module.exports = { 
  extractRedditData: R.curry(extractRedditData)
}
