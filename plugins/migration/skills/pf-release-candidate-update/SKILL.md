---
name: pf-release-candidate-update
description: >-
  Update @patternfly/* npm dependencies to the latest release candidate versions.
  Use when testing the next PF release or bumping to RC packages.
disable-model-invocation: true
---

# PatternFly Release Candidate Update

Update a consumer project's `package.json` to the latest PatternFly release candidates on npm, install dependencies, verify the project builds and tests pass, and fix any failures introduced by the upgrade.

## Requirements

**Node.js** is required to run the bundled script (for JSON parsing and `package.json` updates).

```bash
command -v node >/dev/null 2>&1 || { echo "Error: This skill requires Node.js." >&2; exit 1; }
```

## Prerequisites

- Run from the **target project root** (the repo with `package.json`), not from `ai-helpers`.
- Network access for `npm view` and package install.
- Invoke the skill script via `$CLAUDE_SKILL_DIR/scripts/latest-release-candidates.sh`.

## Workflow checklist

```
- [ ] Step 1: Resolve latest release candidate versions
- [ ] Step 2: Update package.json
- [ ] Step 3: Install dependencies
- [ ] Step 4: Build
- [ ] Step 5: Run tests
- [ ] Step 6: Fix build/test failures (loop until green)
- [ ] Step 7: Summarize changes
```

## Step 1: Resolve versions

Run the script to fetch the latest release candidate for each canonical PatternFly package:

```bash
bash "$CLAUDE_SKILL_DIR/scripts/latest-release-candidates.sh" --json
```

The script queries npm's `prerelease` dist-tag (PatternFly's release candidate channel), then falls back to the highest published candidate version (any version containing `-`). Packages covered:

`@patternfly/patternfly`, `@patternfly/react-charts`, `@patternfly/react-code-editor`, `@patternfly/react-core`, `@patternfly/react-drag-drop`, `@patternfly/react-icons`, `@patternfly/react-styles`, `@patternfly/react-table`, `@patternfly/react-templates`, `@patternfly/react-tokens`, `@patternfly/react-topology`, `@patternfly/react-virtualized-extension`, `@patternfly/quickstarts`, `@patternfly/react-user-feedback`, `@patternfly/react-console`, `@patternfly/react-log-viewer`, `@patternfly/react-catalog-view-extension`, `@patternfly/react-component-groups`, `@patternfly/react-data-view`, `@patternfly/chatbot`

**If the user provided specific versions**, use those instead and skip the script.

## Step 2: Update package.json

Update only PatternFly packages. Do not change unrelated dependencies.

### Sections to update

In every `package.json` at the project root (and in workspaces if the repo is a monorepo):

- `dependencies`
- `devDependencies`
- `peerDependencies`
- `optionalDependencies`
- `resolutions` (Yarn)
- `overrides` (npm)

For each `@patternfly/*` entry that appears in the canonical list above, set the version to the resolved release candidate. Leave version prefixes (`^`, `~`) off — use exact candidate versions (e.g. `"6.6.0-prerelease.16"`).

**Automated update** (root `package.json` only):

```bash
bash "$CLAUDE_SKILL_DIR/scripts/latest-release-candidates.sh" --update package.json
```

For monorepos, run `--update` on each workspace `package.json` that contains PatternFly deps, or update them manually using the `--json` output.

**Do not** add packages the project does not already use unless the user explicitly asks.

## Step 3: Install

Detect the package manager from lockfiles:

| Lockfile | Install command |
|----------|-----------------|
| `pnpm-lock.yaml` | `pnpm install` |
| `yarn.lock` | `yarn install` |
| `package-lock.json` | `npm install` |
| none | `npm install` |

If install fails on peer dependency conflicts, retry with the project's usual workaround (`--legacy-peer-deps` for npm, `yarn install --ignore-engines` only if the project already uses it). Prefer fixing version alignment over forcing installs.

## Step 4: Build

Run the project's build script:

```bash
npm run build   # or yarn build / pnpm build
```

If there is no `build` script, run whatever compile step the project uses (`tsc`, `vite build`, `webpack`, etc.) and note the command used.

**Build must pass before moving on.**

## Step 5: Run tests

```bash
npm test   # or yarn test / pnpm test
```

If the project separates unit and integration tests, run the full suite the CI runs (check `.github/workflows` or `package.json` scripts).

**All tests must pass before finishing.**

## Step 6: Fix failures

When build or tests fail after the upgrade, fix the project code — do not pin back to older versions unless the failure is an upstream bug with no workaround.

### Diagnosis order

1. **Read the error output** — note the first failing file and whether it is a type error, import error, or runtime/test failure.
2. **Import paths** — scan for invalid `@patternfly/*` import paths (charts, chatbot, component-groups dynamic paths, missing CSS).
3. **Deprecated APIs** — query the PatternFly MCP server for current component APIs and migration guidance.
4. **CSS classes / tokens** — scan for legacy `pf-c-*`, `pf-v5-*`, or hardcoded values.
5. **Component structure** — audit component nesting and layout for hierarchy violations exposed by stricter types or DOM changes.
6. **Snapshot / visual tests** — update snapshots only when the visual change is intentional from the PF upgrade.

### Fix loop

```
build → fail? → fix → build
test  → fail? → fix → test
```

Repeat until both build and tests pass. Keep fixes minimal and scoped to what the upgrade broke.

## Step 7: Summarize

Report to the user:

- Previous and new versions for each updated `@patternfly/*` package
- Package manager and commands run
- Any code changes made to fix build/test failures
- Remaining risks (e.g. packages that fell back to stable because no release candidate exists)

## Monorepo notes

- Update every workspace `package.json` that lists PatternFly deps; keep versions consistent across workspaces.
- Run install once at the root.
- Build/test from the root if the repo uses workspace scripts; otherwise build/test each affected package.

## Common issues

| Symptom | Likely fix |
|---------|------------|
| `Module not found: @patternfly/...` | Wrong import path; scan for invalid `@patternfly/*` import paths |
| Peer dependency warnings on install | Align all `@patternfly/*` packages to the same release candidate set |
| Type errors on removed props | Check PatternFly MCP for replacement props/APIs |
| CSS/layout regressions | Verify `base.css` and feature CSS imports; scan for legacy classes |
| Test snapshot failures | Review diff; update only if PF change is expected |
