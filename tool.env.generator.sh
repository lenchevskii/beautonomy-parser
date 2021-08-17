#!/bin/bash
# bash version > 4.3 reqired

# Generate environment variables for tools presented
# The rule: /home/user/../some.work.tool.js -> some_work
# Usage: node $some_work [args]

delimeter='_'

while IFS= read -r TOOL_PATH; do
  # Split the read collection to extract necessary tool name
  # from the last element
  IFS='/' read -ra SPLITTED_COLLECTION <<<"$TOOL_PATH"

  dirty_tool="${SPLITTED_COLLECTION[-1]%.tool.js}"
  clean_tool="${dirty_tool//./$delimeter}"

  export "${clean_tool}=${TOOL_PATH}"
done < <(find "$(pwd)" -name '*.tool.js')

