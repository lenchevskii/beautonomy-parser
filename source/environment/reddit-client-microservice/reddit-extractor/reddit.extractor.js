require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CLICOLOR = require('cli-color')
const REDDITHANDLER = require('./reddit.handler')

const Snoowrap = require('snoowrap')

/**
 * 
 * @param {Snoowrap} oauthClient Reddit Authenticated Client
 * @param {String} subreddit Name of subreddit
 * @param {Number} lastPostsNumber The number of last posts that need to get
 * @param {String} flairName Category of posts (for isntance, 'FOTD')
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
      .catch(R.compose(H.trace, CLICOLOR.red))

module.exports = { extractRedditData }
