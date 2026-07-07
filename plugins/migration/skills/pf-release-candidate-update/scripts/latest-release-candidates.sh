#!/usr/bin/env bash
# Resolve the latest release candidate version for each PatternFly package on npm.
# Usage:
#   ./latest-release-candidates.sh           # one line per package: "@patternfly/pkg": "x.y.z",
#   ./latest-release-candidates.sh --json    # JSON object of package -> version
#   ./latest-release-candidates.sh --update [package.json]  # update PF deps in package.json

set -euo pipefail

PACKAGES=(
  "@patternfly/patternfly"
  "@patternfly/react-charts"
  "@patternfly/react-code-editor"
  "@patternfly/react-core"
  "@patternfly/react-drag-drop"
  "@patternfly/react-icons"
  "@patternfly/react-styles"
  "@patternfly/react-table"
  "@patternfly/react-templates"
  "@patternfly/react-tokens"
  "@patternfly/react-topology"
  "@patternfly/react-virtualized-extension"
  "@patternfly/quickstarts"
  "@patternfly/react-user-feedback"
  "@patternfly/react-console"
  "@patternfly/react-log-viewer"
  "@patternfly/react-catalog-view-extension"
  "@patternfly/react-component-groups"
  "@patternfly/react-data-view"
  "@patternfly/chatbot"
)

resolve_release_candidate() {
  local pkg="$1"
  local version tag

  # PatternFly publishes release candidates under npm's "prerelease" dist-tag.
  tag=$(npm view "$pkg" dist-tags.prerelease 2>/dev/null || true)
  if [[ -n "$tag" && "$tag" != "undefined" && "$tag" == *-* ]]; then
    echo "$tag"
    return 0
  fi

  version=$(npm view "$pkg" versions --json 2>/dev/null | node -e "
    const versions = JSON.parse(require('fs').readFileSync(0, 'utf8'));
    const candidates = versions.filter((v) => v.includes('-'));
    if (candidates.length === 0) {
      process.stderr.write('warning: no release candidate found for ${pkg}; using latest stable\n');
      console.log(versions[versions.length - 1]);
    } else {
      console.log(candidates[candidates.length - 1]);
    }
  ")

  echo "$version"
}

output_json() {
  local first=true
  echo -n "{"
  for pkg in "${PACKAGES[@]}"; do
    version=$(resolve_release_candidate "$pkg")
    if [ "$first" = true ]; then
      first=false
    else
      echo -n ","
    fi
    printf '\n  "%s": "%s"' "$pkg" "$version"
  done
  echo
  echo "}"
}

output_lines() {
  for pkg in "${PACKAGES[@]}"; do
    version=$(resolve_release_candidate "$pkg")
    echo "\"$pkg\": \"$version\","
  done
}

update_package_json() {
  local file="${1:-package.json}"
  if [ ! -f "$file" ]; then
    echo "error: $file not found" >&2
    exit 1
  fi

  local versions_json
  versions_json=$(output_json)

  node -e "
    const fs = require('fs');
    const path = process.argv[1];
    const versions = JSON.parse(process.argv[2]);
    const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));

    const sections = ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'];
    let updated = 0;

    for (const section of sections) {
      if (!pkg[section]) continue;
      for (const name of Object.keys(pkg[section])) {
        if (versions[name]) {
          pkg[section][name] = versions[name];
          updated++;
        }
      }
    }

    for (const section of ['resolutions', 'overrides']) {
      if (!pkg[section]) continue;
      for (const name of Object.keys(pkg[section])) {
        if (versions[name]) {
          pkg[section][name] = versions[name];
          updated++;
        }
      }
    }

    fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
    console.log('Updated ' + updated + ' PatternFly entries in ' + path);
  " "$file" "$versions_json"
}

mode="${1:---lines}"
case "$mode" in
  --json)
    output_json
    ;;
  --update)
    update_package_json "${2:-package.json}"
    ;;
  --lines|"")
    output_lines
    ;;
  -h|--help)
    echo "Usage: $0 [--json | --update [package.json] | --lines]"
    ;;
  *)
    echo "error: unknown option $mode" >&2
    exit 1
    ;;
esac
