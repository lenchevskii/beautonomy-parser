const YT_AUTOMATON = require('./youtube.automaton')

/**
 * Clear temporary directory while starting the server
 */
YT_AUTOMATON.clearTemporaryDirectoryIO(
  'source/environment/youtube-client-microservice/youtube-automaton/youtube-tmp-data'
)
