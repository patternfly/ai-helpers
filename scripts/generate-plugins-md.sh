#!/usr/bin/env bash
# Generates PLUGINS.md from the plugins/ directory structure.
# Reads descriptions from plugin.json and YAML frontmatter in SKILL.md / agent files.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OUTPUT="PLUGINS.md"

# Extract "description" from YAML frontmatter (between --- delimiters)
# Handles both inline (description: text) and multiline (description: >-) YAML values
get_frontmatter_desc() {
  local file="$1"
  local frontmatter desc_line desc
  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file")
  desc_line=$(echo "$frontmatter" | grep '^description:')
  [ -z "$desc_line" ] && return
  desc=$(echo "$desc_line" | sed 's/^description: *//')
  # If value is a YAML block scalar indicator, read the continuation lines
  if [ "$desc" = ">-" ] || [ "$desc" = ">" ] || [ "$desc" = "|" ] || [ "$desc" = "|-" ]; then
    desc=$(echo "$frontmatter" | sed -n '/^description:/,/^[a-zA-Z_-]*:\|^---$/{ /^description:/d; /^[a-zA-Z_-]*:/d; /^---$/d; p; }' | sed 's/^  *//' | tr '\n' ' ' | sed 's/ *$//')
  fi
  echo "$desc"
}

# Fallback: first non-empty line after frontmatter (or first line if no frontmatter)
get_first_line_desc() {
  local file="$1"
  if head -1 "$file" | grep -q '^---$'; then
    sed -n '/^---$/,/^---$/!p' "$file" | sed '/^$/d' | head -1
  else
    sed '/^$/d' "$file" | head -1
  fi
}

get_description() {
  local file="$1"
  local desc
  desc=$(get_frontmatter_desc "$file")
  if [ -z "$desc" ]; then
    desc=$(get_first_line_desc "$file")
  fi
  echo "$desc"
}

# First sentence only for table display
get_desc_first_sentence() {
  local desc="$1"
  desc="${desc#\"}"
  desc="${desc%\"}"
  echo "$desc" | sed 's/\([.]\) .*/\1/'
}

# Read plugin description from plugin.json
get_plugin_desc() {
  local plugin_dir="$1"
  local json="$plugin_dir/.claude-plugin/plugin.json"
  if [ -f "$json" ]; then
    grep '"description"' "$json" | head -1 | sed 's/.*"description": *"//;s/".*//'
  fi
}

{
  cat <<'HEADER'
# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

HEADER

  # Build TOC
  for plugin_dir in plugins/*/; do
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")
    echo "- [${plugin}](#${plugin}) — ${desc}"
  done

  echo ""
  echo "---"
  echo ""

  # Build per-plugin sections
  first_plugin=true
  for plugin_dir in plugins/*/; do
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")

    if [ "$first_plugin" = true ]; then
      first_plugin=false
    fi

    echo "### ${plugin}"
    echo ""
    echo "${desc}"
    echo ""

    # Skills
    has_skills=false
    if [ -d "${plugin_dir}skills" ]; then
      for skill_dir in "${plugin_dir}skills"/*/; do
        [ -d "$skill_dir" ] || continue
        skill_file="${skill_dir}SKILL.md"
        [ -f "$skill_file" ] || continue
        if [ "$has_skills" = false ]; then
          echo "| Skill | Description |"
          echo "|-------|-------------|"
          has_skills=true
        fi
        skill_name=$(basename "$skill_dir")
        skill_desc=$(get_description "$skill_file")
        short_desc=$(get_desc_first_sentence "$skill_desc")
        echo "| \`${skill_name}\` | ${short_desc} |"
      done
    fi

    # Agents
    has_agents=false
    if [ -d "${plugin_dir}agents" ]; then
      for agent_file in "${plugin_dir}agents"/*.md; do
        [ -f "$agent_file" ] || continue
        if [ "$has_agents" = false ]; then
          if [ "$has_skills" = true ]; then echo ""; fi
          echo "| Agent | Description |"
          echo "|-------|-------------|"
          has_agents=true
        fi
        agent_name=$(basename "$agent_file" .md)
        agent_desc=$(get_description "$agent_file")
        short_desc=$(get_desc_first_sentence "$agent_desc")
        echo "| \`${agent_name}\` | ${short_desc} |"
      done
    fi

    if [ "$has_skills" = false ] && [ "$has_agents" = false ]; then
      echo "No skills or agents yet — contributions welcome!"
    fi

    echo ""
  done
} > "$OUTPUT"

echo "Generated $OUTPUT"

# Update README.md plugin table between markers
README="README.md"
if [ -f "$README" ]; then
  TMPFILE=$(mktemp)
  in_block=false
  replaced=false
  while IFS= read -r line; do
    if [[ "$line" == "<!-- BEGIN PLUGIN TABLE -->" ]]; then
      echo "$line" >> "$TMPFILE"
      echo "| Plugin | Description |" >> "$TMPFILE"
      echo "|--------|-------------|" >> "$TMPFILE"
      for plugin_dir in plugins/*/; do
        plugin=$(basename "$plugin_dir")
        desc=$(get_plugin_desc "$plugin_dir")
        echo "| **${plugin}** | ${desc} |" >> "$TMPFILE"
      done
      in_block=true
      replaced=true
    elif [[ "$line" == "<!-- END PLUGIN TABLE -->" ]]; then
      echo "$line" >> "$TMPFILE"
      in_block=false
    elif [ "$in_block" = false ]; then
      echo "$line" >> "$TMPFILE"
    fi
  done < "$README"
  if [ "$replaced" = true ]; then
    mv "$TMPFILE" "$README"
    echo "Updated plugin table in $README"
  else
    rm -f "$TMPFILE"
    echo "Warning: no plugin table markers found in $README"
  fi
fi
