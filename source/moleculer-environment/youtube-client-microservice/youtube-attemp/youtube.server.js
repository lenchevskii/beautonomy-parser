const { trace } = require('../../utils/helper')

const app = require('express')()

const { YOUTUBE_SERVER_PORT } = require('dotenv').config().parsed

app.get('/', (req, res) => res.send('Bonjour, YouTube!'))

app.listen(YOUTUBE_SERVER_PORT, () => trace(`App listen on YOUTUBE_SERVER_PORT: ${YOUTUBE_SERVER_PORT}`))
