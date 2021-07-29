const YT_S3_INSERT = require('./youtube.s3.insert')
const [SAVING_DIRECTORY, S3_BUCKET, S3_YT_CHILD_BUCKET] = process.argv.slice(2)

YT_S3_INSERT.uploadYouTubeCollectionIO(
  SAVING_DIRECTORY,
  S3_BUCKET,
  S3_YT_CHILD_BUCKET
)
