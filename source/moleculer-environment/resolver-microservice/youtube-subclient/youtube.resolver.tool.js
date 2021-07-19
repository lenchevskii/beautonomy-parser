const YT_RESOLVER = require('./youtube-resolver/youtube.resolver')
const YT_PROCESSOR = require('./youtube-processor/youtube.processor')
const YT_RESOLVER_CONNECTION = require('./youtube-resolver/youtube.resolver.connection')

const [S3_BUCKET, S3_YT_CHILD_BUCKET, SAVING_DIRECTORY] = process.argv.slice(2)

YT_RESOLVER.insertProductsFoundTmpIO(
  YT_RESOLVER_CONNECTION.CONNECTION,
  YT_PROCESSOR.processProducts,
  S3_BUCKET,
  S3_YT_CHILD_BUCKET,
  SAVING_DIRECTORY,
  true
)

YT_RESOLVER_CONNECTION.CONNECTION.end()
