---
name: pf-org-version-update
description: Updates the patternfly-org repo for a new PatternFly release or release candidate. Fetches or applies specified versions, updates package.json files and versions.json, and then provides the user with steps to run the build and regenerate screenshots locally. Use when preparing a PatternFly release, updating PF versions in this repo, or when the user asks to update patternfly-org for a new release.
---

# PatternFly Org Version Update

Updates patternfly-org for a new PatternFly release or release candidate: resolve versions, update all package.json and versions.json, then provide the user with steps to run install, build, and optionally update documentation screenshots locally.

## 1. Resolve Versions

**If the user provided specific versions** (e.g. in the command or message): use those versions. Do **not** run `latest-versions.sh`.

**If no versions were specified**: run from repo root:

```bash
./scripts/latest-versions.sh -e
```

The `-e` flag includes extension packages. Output is one line per package in the form:

```
"@patternfly/package-name": "X.Y.Z",
```

Parse this output to build the set of package versions. Use these as the source of truth for the rest of the workflow.

## 2. Update package.json Files

Update PatternFly dependencies only in these locations. **Do not** modify `packages/site/package.json` or any other package.json not listed here.

### Root `package.json`

In `devDependencies` and `resolutions`, update every `@patternfly/*` entry with the resolved versions. Only change PatternFly packages; leave other dependencies unchanged.

### `packages/documentation-site/package.json`

In `dependencies`, update every `@patternfly/*` entry with the resolved versions. Only change PatternFly packages; leave other dependencies unchanged.

### `packages/documentation-framework/package.json`

In `peerDependencies`, update every `@patternfly/*` entry with the resolved versions. Only change PatternFly packages; leave other dependencies unchanged.

## 3. Update versions.json

File: `packages/documentation-framework/versions.json`.

### 3.1 New release object

Insert a **new** object at the **start** of the `"Releases"` array with:

- **`"name"`**: version from `@patternfly/react-core` (e.g. `"6.3.0"` or `"6.5.0-prerelease.33"`).
- **`"date"`**: current date in `YYYY-MM-DD`.
- **`"latest"`**: `true`.
- **`"versions"`**: object with **all** PatternFly packages and their versions. Use the resolved version set; for any package not in that set, copy the version from the current "latest" release so the list stays complete and consistent.

### 3.2 Previous latest release

Find the release that currently has `"latest": true`. Change it to `"hidden": true` (remove `"latest": true`). Do not change anything else in that entry.

### 3.3 Validation

- Exactly one release has `"latest": true`.
- All others have `"hidden": true`.
- New release is first in the array.
- Every release’s `versions` object includes the same package keys (alphabetical order); only version values change.

### 3.4 versions object package list

Each release’s `versions` must include these packages (alphabetical order):

- `@patternfly/chatbot`
- `@patternfly/patternfly`
- `@patternfly/quickstarts`
- `@patternfly/react-catalog-view-extension`
- `@patternfly/react-charts`
- `@patternfly/react-code-editor`
- `@patternfly/react-component-groups`
- `@patternfly/react-console`
- `@patternfly/react-core`
- `@patternfly/react-data-view`
- `@patternfly/react-drag-drop`
- `@patternfly/react-icons`
- `@patternfly/react-log-viewer`
- `@patternfly/react-styles`
- `@patternfly/react-table`
- `@patternfly/react-tokens`
- `@patternfly/react-templates`
- `@patternfly/react-topology`
- `@patternfly/react-user-feedback`
- `@patternfly/react-virtualized-extension`

New release object shape:

```json
{
  "name": "X.Y.Z",
  "date": "YYYY-MM-DD",
  "latest": true,
  "versions": {
    "@patternfly/chatbot": "...",
    "@patternfly/patternfly": "...",
    "@patternfly/react-*": "...",
    "... (all packages above, alphabetically)"
  }
}
```

### 3.5 Conventions

- Release name = `@patternfly/react-core` version.
- Use current date for new releases.
- Some packages (e.g. react-charts, chatbot) may use different version numbers; use the resolved or existing latest value for those.

## 4. Verification Checklist

Before proceeding:

- [ ] Root package.json devDependencies (all @patternfly/\* entries) updated
- [ ] documentation-site package.json dependencies (all @patternfly/\* entries) updated
- [ ] documentation-framework package.json peerDependencies (all @patternfly/\* entries) updated
- [ ] packages/site/package.json was **not** modified
- [ ] New release added at top of versions.json Releases array with `"latest": true`
- [ ] Previous latest now has `"hidden": true`
- [ ] Only one object has `"latest": true`
- [ ] Version numbers consistent across root, documentation-site, documentation-framework, and versions.json

## 5. Build and Screenshots (user-run only)

The agent **does not** run `yarn install`, `yarn build`, `yarn serve`, or `yarn screenshots` (sandbox limits: cache/lockfile, long build, Puppeteer/Chrome). After completing steps 1–4, give the user the following instructions to run locally from the repo root for the purpose of updating documentation screenshots.

1. **Install**

   ```bash
   yarn install
   ```

2. **Build**

   ```bash
   yarn build
   ```

3. **Serve** — in a terminal, start the server and leave it running:

   ```bash
   yarn serve
   ```

   Wait until the docs are being served (e.g. "Serving build/patternfly-org/site at..." or similar).

4. **Screenshots** — in a second terminal:

   ```bash
   yarn screenshots
   ```

   Run to completion.

5. When `yarn screenshots` has finished, stop the serve process.

After providing the user with the steps to update screenshots, the skill is done.

## Summary

| Step                | Action                                                                                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Versions            | User-provided → use as-is. Otherwise run `./scripts/latest-versions.sh -e` and parse output.                                                                                             |
| package.json        | Update root, documentation-site, and documentation-framework: every @patternfly/\* entry with resolved versions; only change PF packages. Never change packages/site.                    |
| versions.json       | Add new release at top with `latest: true`, set previous latest to `hidden: true`, same package list everywhere.                                                                         |
| Build / Screenshots | Do **not** run install, build, serve, or screenshots. Give user the full list of steps: `yarn install`, `yarn build`, `yarn serve` (one terminal), `yarn screenshots` (second terminal). |
