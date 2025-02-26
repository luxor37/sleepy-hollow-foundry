#!/bin/bash

# Check if the source folder argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <path-to-source-folder>"
  exit 1
fi

SOURCE_DIR="$1"
OUTPUT="${SOURCE_DIR}/database.db"

# Empty or create the output file
> "$OUTPUT"

# Loop through each JSON file in the provided source directory
for file in "$SOURCE_DIR"/*.json; do
  # Only process if it's a file
  if [ -f "$file" ]; then
    # If jq is available, use it to compact the JSON; otherwise, remove newlines manually.
    if command -v jq &> /dev/null; then
      jq -c . "$file" >> "$OUTPUT"
    else
      tr -d '\n' < "$file" >> "$OUTPUT"
      echo "" >> "$OUTPUT"
    fi
  fi
done