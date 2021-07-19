require('module-alias/register')

const R = require('ramda')
const H = require('@general-helper')
const CFG = require('dotenv').config().parsed
const AWS = require('aws-sdk')
const PATH = require('path')
const CLI_COLOR = require('cli-color')

const S3 = new AWS.S3()

/**
 * @param {[*]} param0 Array containing RowDataPacket object
 * @returns {String} Bucket S3 path to element
 */
const constructYTBucketS3Path =
  (
    [{
      link_id: linkId,
      channel: channel,
      channel_id: channelId,
      upload_date: uploadDate,
      title: title
    }]
  ) =>
    PATH.join(
      CFG.S3_YT_CHILD_BUCKET,
      channelId + ' -- ' + channel,
      uploadDate + ' -- ' + title,
      linkId + ' -- ' + '.info.json'
    )

const getS3Object =
  (bucketName, bucketS3Path) =>
    S3.getObject(
      { Bucket: bucketName, Key: bucketS3Path },
      (error, data) =>
        error
          ? H.trace(CLI_COLOR.red(error.message))
          : JSON.parse(data.Body)
    )

module.exports = {
  constructYTBucketS3Path,
  getS3Object: R.curry(getS3Object)
}
