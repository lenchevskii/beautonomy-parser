require('module-alias/register')

const H = require('@general-helper')
const AWS = require('aws-sdk')
const MYSQL = require('mysql')
const CLI_COLOR = require('cli-color')

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
          : processor(S3Object, frames, bucketName, bucketS3Path)
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
  expandTriggerWordSet,
  getS3Object
}
