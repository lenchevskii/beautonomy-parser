require('module-alias/register')

const H = require('@general-helper')
const G_HANDLER = require('@general-handler')
const R = require('ramda')
const AWS = require('aws-sdk')
const MYSQL = require('mysql')
const CLI_COLOR = require('cli-color')
// const YT_RESOLVER_CALLBACK = require('./youtube.resolver.callback')

const S3 = new AWS.S3()

/**
 * 
 * @param {Function} processor Processing module (e.g., Products extraction fnc)
 * @param {[[String]]} frames Collection with trigger words
 * @param {String} bucketName 
 * @param {String} bucketS3Path 
 */
const getS3Object =
  (processor, frames, bucketName, bucketS3Path) =>
    S3.getObject(
      { Bucket: bucketName, Key: bucketS3Path },
      (error, S3Object) =>
        error
          ? H.trace(CLI_COLOR.red('RESOLVER error:', error.message))
          : H.trace(processor(S3Object, frames, bucketName, bucketS3Path))
    )

/**
 * 
 * @param {[[String]]} frames 
 * @returns {RegExp}
 */
const constructRegExp =
  ([startWords, endWords]) =>
    new RegExp(
      `(${startWords.join('|')}).+(${endWords.join('|')})+`,
      'gi'
    )

/**
 * 
 * @param {[*]} result SELECT + cross JOIN result
 * @returns {[[String]]} unwrapped SELECT result
 */
const unwrapMySQLCollection =
  (result) =>
    result.map(({ starts_with: start, ends_with: end }) => [start, end])

/**
 * 
 * @param {[[String]]} unwrapedCollection 
 * @returns {[[String]]} Set
 */
const formUniqueTriggerWordCollection =
  (unwrapedCollection) =>
    Array(
      Array.from(new Set(unwrapedCollection.map(([start, end]) => start))),
      Array.from(new Set(unwrapedCollection.map(([start, end]) => end)))
    )

/**
 * 
 * @param {[[String]]} collection 
 * @returns Expanded Trigger Word set ready for insertion
 */
const expandTriggerWordSet =
  (collection) =>
    collection.map(word => `(${MYSQL.escape(word)})`).toLocaleString()

module.exports = {
  formUniqueTriggerWordCollection,
  expandTriggerWordSet,
  unwrapMySQLCollection,
  constructRegExp,
  getS3Object
}
