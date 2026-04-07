#!/bin/bash
# Extract Figma file key from a URL

URL="$1"

if [ -z "$URL" ]; then
  echo "Usage: $0 <figma-url>"
  echo "Example: $0 https://www.figma.com/file/abc123/My-Design"
  exit 1
fi

# Extract file key using regex
# Matches pattern: /file/{FILE_KEY}/
FILE_KEY=$(echo "$URL" | sed -n 's/.*\/file\/\([^\/]*\).*/\1/p')

if [ -z "$FILE_KEY" ]; then
  echo "Error: Could not extract file key from URL"
  echo "URL format should be: https://www.figma.com/file/{FILE_KEY}/..."
  exit 1
fi

echo "$FILE_KEY"
