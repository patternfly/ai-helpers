#!/usr/bin/env bash
# Generates PLUGINS.md, updates README.md plugin table, updates CONTRIBUTING-SKILLS.md
# plugin table and good names section, and generates all plugin READMEs from plugin.json.
#
# Run: bash scripts/generate-plugins-md.sh

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OUTPUT="PLUGINS.md"

###############################################################################
# Helper functions
###############################################################################

# Convert kebab-case name to Display Name (Title Case with abbreviation fixes)
to_display_name() {
  echo "$1" | tr '-' ' ' | awk '{
    for(i=1;i<=NF;i++) {
      $i=toupper(substr($i,1,1))substr($i,2)
      if ($i == "Pf") $i = "PF"
      if ($i == "Css") $i = "CSS"
      if ($i == "Pr") $i = "PR"
      if ($i == "Api") $i = "API"
      if ($i == "A11y") $i = "Accessibility"
      if ($i == "Ai") $i = "AI"
      if ($i == "Ui") $i = "UI"
    }
    print
  }'
}

# Extract "description" from YAML frontmatter (between --- delimiters)
get_frontmatter_desc() {
  local file="$1"
  local frontmatter desc_line desc
  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file")
  desc_line=$(echo "$frontmatter" | grep '^description:')
  [ -z "$desc_line" ] && return
  desc=$(echo "$desc_line" | sed 's/^description: *//')
  if [ "$desc" = ">-" ] || [ "$desc" = ">" ] || [ "$desc" = "|" ] || [ "$desc" = "|-" ]; then
    desc=$(echo "$frontmatter" | sed -n '/^description:/,/^[a-zA-Z_-]*:\|^---$/{ /^description:/d; /^[a-zA-Z_-]*:/d; /^---$/d; p; }' | sed 's/^  *//' | tr '\n' ' ' | sed 's/ *$//')
  fi
  echo "$desc"
}

# Fallback: first non-empty line after frontmatter
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

# Read a string field from plugin.json (returns empty string if field missing)
get_plugin_json_field() {
  local plugin_dir="${1%/}"
  local field="$2"
  local json="$plugin_dir/.claude-plugin/plugin.json"
  [ -f "$json" ] || return 0
  grep "\"$field\"" "$json" 2>/dev/null | head -1 | sed "s/.*\"$field\": *\"//;s/\"[,]*//" || true
}

get_plugin_desc() {
  local plugin_dir="$1"
  get_plugin_json_field "$plugin_dir" "description"
}

# Generate markdown sources list from plugin.json sources array
get_plugin_sources_md() {
  local plugin_dir="${1%/}"
  local json="$plugin_dir/.claude-plugin/plugin.json"
  [ -f "$json" ] || return
  local in_sources=false
  while IFS= read -r line; do
    if [[ "$line" == *'"sources"'* ]]; then
      in_sources=true
      continue
    fi
    if [ "$in_sources" = true ]; then
      if [[ "$line" == *']'* ]]; then
        break
      fi
      local name url
      name=$(echo "$line" | sed -n 's/.*"name": *"\([^"]*\)".*/\1/p')
      url=$(echo "$line" | sed -n 's/.*"url": *"\([^"]*\)".*/\1/p')
      if [ -n "$name" ] && [ -n "$url" ]; then
        echo "- [$name]($url)"
      fi
    fi
  done < "$json"
}

# Get first N skill names from a plugin as comma-separated backtick list
get_example_skills() {
  local plugin_dir="$1"
  local max="${2:-3}"
  local result=""
  local count=0
  if [ -d "${plugin_dir}skills" ]; then
    for skill_dir in "${plugin_dir}skills"/*/; do
      [ -d "$skill_dir" ] || continue
      [ -f "${skill_dir}SKILL.md" ] || continue
      local skill_name
      skill_name=$(basename "$skill_dir")
      if [ $count -gt 0 ]; then result="$result, "; fi
      result="${result}\`${skill_name}\`"
      count=$((count + 1))
      [ "$count" -ge "$max" ] && break
    done
  fi
  echo "$result"
}

# Replace content between BEGIN/END markers in a file
# Usage: update_between_markers FILE "MARKER_NAME" "NEW_CONTENT"
update_between_markers() {
  local file="$1"
  local marker="$2"
  local content="$3"
  local begin_marker="<!-- BEGIN ${marker} -->"
  local end_marker="<!-- END ${marker} -->"

  [ -f "$file" ] || { echo "Warning: $file not found"; return; }

  local tmpfile
  tmpfile=$(mktemp)
  local in_block=false
  local replaced=false

  while IFS= read -r line; do
    if [[ "$line" == "$begin_marker" ]]; then
      echo "$line" >> "$tmpfile"
      echo "$content" >> "$tmpfile"
      in_block=true
      replaced=true
    elif [[ "$line" == "$end_marker" ]]; then
      echo "$line" >> "$tmpfile"
      in_block=false
    elif [ "$in_block" = false ]; then
      echo "$line" >> "$tmpfile"
    fi
  done < "$file"

  if [ "$replaced" = true ]; then
    mv "$tmpfile" "$file"
  else
    rm -f "$tmpfile"
    echo "Warning: no $begin_marker markers found in $file"
  fi
}

###############################################################################
# Step 1: Generate PLUGINS.md (full file)
###############################################################################

{
  cat <<'HEADER'
# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

HEADER

  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")
    echo "- [${plugin}](#${plugin}) — ${desc}"
  done

  echo ""
  echo "---"
  echo ""

  first_plugin=true
  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")

    if [ "$first_plugin" = true ]; then
      first_plugin=false
    else
      echo ""
      echo "<br>"
      echo ""
    fi

    echo "### ${plugin}"
    echo ""
    echo "${desc}"
    echo ""

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
      echo "No skills or agents yet."
    fi

    echo ""
  done
} > "$OUTPUT"

echo "Generated $OUTPUT"

###############################################################################
# Step 2: Update README.md plugin table between markers
###############################################################################

README="README.md"
if [ -f "$README" ]; then
  # Count plugins and skills
  plugin_count=0
  skill_count=0
  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    plugin_count=$((plugin_count + 1))
    if [ -d "${plugin_dir}skills" ]; then
      for skill_dir in "${plugin_dir}skills"/*/; do
        [ -d "$skill_dir" ] && [ -f "${skill_dir}SKILL.md" ] && skill_count=$((skill_count + 1))
      done
    fi
  done

  # Update badge counts
  sed -i '' "s|plugins-[0-9]*-blueviolet|plugins-${plugin_count}-blueviolet|" "$README"
  if grep -q "skills-[0-9]*-blue" "$README"; then
    sed -i '' "s|skills-[0-9]*-blue|skills-${skill_count}-blue|" "$README"
  else
    sed -i '' "s|\(.*plugins-.*blueviolet.*\)|\1\n[![Skills](https://img.shields.io/badge/skills-${skill_count}-blue)](./PLUGINS.md)|" "$README"
  fi
  echo "Updated badges in $README (${plugin_count} plugins, ${skill_count} skills)"

  # Update plugin table
  table_content=""
  table_content+="| Plugin | Description |"$'\n'
  table_content+="|--------|-------------|"
  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")
    nowrap_plugin="${plugin//-/&#8209;}"
    table_content+=$'\n'"| **${nowrap_plugin}** | ${desc} |"
  done
  update_between_markers "$README" "PLUGIN TABLE" "$table_content"
  echo "Updated plugin table in $README"
fi

###############################################################################
# Step 3: Update CONTRIBUTING-SKILLS.md plugin table and good names
###############################################################################

CONTRIB="CONTRIBUTING-SKILLS.md"
if [ -f "$CONTRIB" ]; then
  # Plugin table
  contrib_table=""
  contrib_table+="| Plugin | What it helps you do | Decision test | Example skills |"$'\n'
  contrib_table+="|--------|---------------------|---------------|----------------|"
  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    plugin=$(basename "$plugin_dir")
    intent=$(get_plugin_json_field "$plugin_dir" "intent")
    decision_test=$(get_plugin_json_field "$plugin_dir" "decisionTest")
    examples=$(get_example_skills "$plugin_dir" 3)
    contrib_table+=$'\n'"| **${plugin}** | ${intent} | ${decision_test} | ${examples} |"
  done
  update_between_markers "$CONTRIB" "PLUGIN TABLE" "$contrib_table"
  echo "Updated plugin table in $CONTRIB"

  # Good names section (consumer plugins only)
  good_names=""
  good_names+="**Good names** describe the capability:"
  for plugin_dir in plugins/*/; do
    [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
    local_category=$(get_plugin_json_field "$plugin_dir" "category")
    [ "$local_category" = "workshop" ] && continue
    plugin=$(basename "$plugin_dir")
    desc=$(get_plugin_desc "$plugin_dir")
    # Lowercase for display
    desc_lower=$(echo "$desc" | awk '{print tolower(substr($0,1,1))substr($0,2)}')
    good_names+=$'\n'"- \`${plugin}\` — ${desc_lower}"
  done
  update_between_markers "$CONTRIB" "GOOD NAMES" "$good_names"
  echo "Updated good names in $CONTRIB"
fi

###############################################################################
# Step 4: Generate each plugin's README.md
###############################################################################

for plugin_dir in plugins/*/; do
  [ -f "${plugin_dir}.claude-plugin/plugin.json" ] || continue
  plugin=$(basename "$plugin_dir")
  desc=$(get_plugin_desc "$plugin_dir")
  title=$(to_display_name "$plugin")
  cross_ref=$(get_plugin_json_field "$plugin_dir" "crossRef")

  readme_file="${plugin_dir}README.md"

  {
    echo "<!-- This file is auto-generated by scripts/generate-plugins-md.sh — do not edit manually. -->"
    echo ""
    echo "# ${title} Plugin"
    echo ""
    echo "${desc}."

    if [ -n "$cross_ref" ]; then
      echo ""
      echo "$cross_ref"
    fi

    # Skills
    has_skills=false
    skill_content=""
    if [ -d "${plugin_dir}skills" ]; then
      for skill_dir in "${plugin_dir}skills"/*/; do
        [ -d "$skill_dir" ] || continue
        [ -f "${skill_dir}SKILL.md" ] || continue
        has_skills=true
        skill_name=$(basename "$skill_dir")
        skill_display=$(to_display_name "$skill_name")
        skill_desc=$(get_description "${skill_dir}SKILL.md")
        short_desc=$(get_desc_first_sentence "$skill_desc")
        skill_content+="- **${skill_display}** (\`/${plugin}:${skill_name}\`) — ${short_desc}"$'\n'
      done
    fi

    # Agents
    has_agents=false
    agent_content=""
    if [ -d "${plugin_dir}agents" ]; then
      for agent_file in "${plugin_dir}agents"/*.md; do
        [ -f "$agent_file" ] || continue
        has_agents=true
        agent_name=$(basename "$agent_file" .md)
        agent_display=$(to_display_name "$agent_name")
        agent_desc=$(get_description "$agent_file")
        short_desc=$(get_desc_first_sentence "$agent_desc")
        agent_content+="- **${agent_display}** (\`${agent_name}\`) — ${short_desc}"$'\n'
      done
    fi

    if [ "$has_skills" = true ] || [ "$has_agents" = true ]; then
      echo ""
      echo "## What's Included"

      if [ "$has_skills" = true ]; then
        echo ""
        echo "### Skills"
        echo ""
        printf "%s" "$skill_content"
      fi

      if [ "$has_agents" = true ]; then
        echo ""
        echo "### Agents"
        echo ""
        printf "%s" "$agent_content"
      fi
    else
      echo ""
      echo "No skills or agents yet."
    fi

    # Sources
    sources=$(get_plugin_sources_md "$plugin_dir")
    if [ -n "$sources" ]; then
      echo ""
      echo "## Sources"
      echo ""
      echo "$sources"
    fi
  } > "$readme_file"

  echo "Generated ${readme_file}"
done

echo ""
echo "Done. All plugin surfaces updated from plugin.json."
