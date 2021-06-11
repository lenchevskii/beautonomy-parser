require('module-alias/register')

const FS = require('fs')

const { trace } = require('@helper')

const { YouTube } = require('popyt')

const { YOUTUBE_API_KEY } = require('dotenv').config().parsed

const youtube = new YouTube(
  YOUTUBE_API_KEY,
  'ya29.a0AfH6SMBcfZUBzq1ebJDSsSOzcXSSZxIi8Orjgp7jsKe4A4QLiTCfP04EBCS5JQzsHokxU_ZX8kYHNMUGw_6KZtAr7j7OUUR5Ix_32EMsn5ox3lo_cevTkjaVpC4appAWqL9lxogWdJUef9tPat9bb5ppeNMSzg',
  { cache: false }
)

// const data = youtube.getVideoComments('BkIjPQExD-o').then(x => trace(x))

// const data = youtube.getVideo('elvOZm0d4H0')
const data = youtube.getVideo('dYaznuhA4Io')
  .then(
    video => video.fetchCaptions()
      .then(
        captionsArray => FS.writeFile(
          'source/moleculer-mircoservice/youtube-client/tmp/youtube-video.json',
          Buffer.from(trace(captionsArray)),
          'base64',
          err => trace(err))
      )
  )

