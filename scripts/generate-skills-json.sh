#!/usr/bin/env bash
# Generates dist/skills.json from all SKILL.md files across plugins.
# Output format matches the schema expected by patternfly-mcp's aiHelpers.skills.ts.

set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

OUTPUT="dist/skills.json"
mkdir -p "$(dirname "$OUTPUT")"

get_frontmatter_field() {
  local file="$1"
  local field="$2"
  local frontmatter value

  frontmatter=$(sed -n '/^---$/,/^---$/p' "$file")
  value=$(echo "$frontmatter" | grep "^${field}:" | sed "s/^${field}: *//")

  if [ "$value" = ">-" ] || [ "$value" = ">" ] || [ "$value" = "|" ] || [ "$value" = "|-" ]; then
    value=$(echo "$frontmatter" | sed -n "/^${field}:/,/^[a-zA-Z_-]*:\|^---$/{ /^${field}:/d; /^[a-zA-Z_-]*:/d; /^---$/d; p; }" | sed 's/^  *//' | tr '\n' ' ' | sed 's/ *$//')
  fi

  echo "$value"
}

count=0
first=true

{
  printf '{\n  "version": "1",\n  "generated": "%s",\n  "meta": {\n    "source": "patternfly/ai-helpers"\n  },\n  "skills": [\n' "$(date -u +%Y-%m-%dT%H:%M:%S).000Z"

  for plugin_dir in plugins/*/; do
    plugin=$(basename "$plugin_dir")
    [ -d "${plugin_dir}skills" ] || continue

    for skill_dir in "${plugin_dir}skills"/*/; do
      [ -d "$skill_dir" ] || continue
      skill_file="${skill_dir}SKILL.md"
      [ -f "$skill_file" ] || continue

      name=$(get_frontmatter_field "$skill_file" "name")
      description=$(get_frontmatter_field "$skill_file" "description")
      content=$(cat "$skill_file")

      [ -z "$name" ] && name=$(basename "$skill_dir")

      if [ "$first" = true ]; then
        first=false
      else
        printf ',\n'
      fi

      jq -n \
        --arg name "$name" \
        --arg plugin "$plugin" \
        --arg description "$description" \
        --arg content "$content" \
        '{ name: $name, plugin: $plugin, description: $description, content: $content }' \
        | sed 's/^/    /'

      count=$((count + 1))
    done
  done

  printf '\n  ]\n}\n'
} > "$OUTPUT"

# Patch totalSkills into meta
jq --argjson total "$count" '.meta.totalSkills = $total' "$OUTPUT" > "${OUTPUT}.tmp" && mv "${OUTPUT}.tmp" "$OUTPUT"

echo "Generated $OUTPUT ($count skills)"
