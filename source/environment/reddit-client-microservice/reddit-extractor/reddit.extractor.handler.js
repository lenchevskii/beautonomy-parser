const R = require('ramda')

const SNOOWRAP = require('snoowrap')

/**
 * 
 * @param {SNOOWRAP.Submission} submission Comment thread from Reddit
 * @returns Array of filtered comments (AutoModerator comment is excluded)
 */
const maybeComments =
  (submission) =>
    R.isEmpty(submission.comments)
      ? undefined
      : submission.comments
        .filter(x => x.author.name !== "AutoModerator")
        .filter(x => x.author_fullname !== submission.author_fullname)
        .map(x => x.body)

/**
 * 
 * @param {SNOOWRAP.Submission} submission Comment thread from Reddit
 * @returns Array of filtered comments (only Author comment is included)
 */
const maybeAuthorComment =
  (submission) =>
    R.isEmpty(submission.comments)
      ? undefined
      : R.isEmpty(submission.comments.filter(x => x.author_fullname === submission.author_fullname))
        ? undefined
        : submission.comments
          .filter(x => x.author_fullname === submission.author_fullname)
          .map(x => x.body)

/**
 * 
 * @param {SNOOWRAP.Submission} submission Comment thread from Reddit
 * @returns Array of filtered comments
 */
const constructCommentSubstructure =
  submission => [
    { authorComment: maybeAuthorComment(submission) },
    { comments: maybeComments(submission) }
  ]

module.exports = { constructCommentSubstructure }
