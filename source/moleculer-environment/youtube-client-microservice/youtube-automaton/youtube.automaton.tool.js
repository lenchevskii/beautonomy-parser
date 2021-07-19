const YT_AUTOMATON = require('./youtube.automaton')
const [SAVING_DIRECTORY] = process.argv.slice(2)

YT_AUTOMATON.clearTemporaryDirectoryIO(
  SAVING_DIRECTORY
)
