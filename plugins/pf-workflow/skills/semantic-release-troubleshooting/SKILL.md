---
name: semantic-release-troubleshooting
description: >-
  Diagnose and fix semantic-release issues when a specific version is not being
  released. Use when semantic-release skips a version, fails to release, or when
  troubleshooting after git push --force, squashed commits, permission errors,
  or reference already exists.
---

# semantic-release Troubleshooting

When a specific version is not being released, follow this diagnostic workflow.

## 1. Identify the Problem

Determine which scenario matches:

| Symptom | Section |
|---------|---------|
| `You do not have permission to publish` (403) | → [Permission error](#permission-error) |
| Release skipped; commits not counted | → [Squashed commits](#squashed-commits) |
| `reference already exists` when pushing tag | → [Tag conflict](#tag-conflict) |
| Release not found after `git push --force` | → [History rewrite recovery](#history-rewrite-recovery) |

## 2. Permission Error

**Cause:** npm registry auth or package name/ownership issues.

**Verify package availability:**
```bash
npm install --global npm-name-cli
npm-name <package-name>
```

**Fix:** Update `package.json` if name is taken, or use an [npm scope](https://docs.npmjs.com/cli/v11/using-npm/scope/). Check [npm registry authentication](https://github.com/semantic-release/npm#npm-registry-authentication) and user [publish permissions](https://docs.npmjs.com/cli/v8/commands/npm-team/).

## 3. Squashed Commits

**Cause:** semantic-release uses [commit message convention](https://github.com/semantic-release/semantic-release#commit-message-format). Squashed commits often get non-compliant messages and are ignored.

**Fix:** Rewrite the squashed commit message to follow the convention (e.g. `feat:`, `fix:`, `fix!:`, `BREAKING CHANGE:`). One squashed commit = one logical change; avoid combining unrelated features.

## 4. Tag Conflict (`reference already exists`)

**Cause:** A tag with the target version exists but is not in the current branch's history.

**Diagnose:**
```bash
# Does the tag exist?
git rev-list -1 <tag name>

# Which branches contain this tag?
git branch --contains <tag name>
```

**If the release was published:** Merge the commits from that release into your release branch.

**If no published release:** Delete the tag:
```bash
git tag -d <tag name>
git push origin :refs/tags/<tag name>
```

## 5. History Rewrite Recovery (after `git push --force`)

**Cause:** `git push --force` rewrites history; tags and git notes tied to old commits become invalid.

**Recovery steps** (in order):

1. **Delete the orphaned tags** (remote then local):
   ```bash
   git push origin -d <TAG NAME>    # e.g. git push origin -d v2.0.0-beta.1
   git tag -d <TAG NAME>
   ```

2. **Re-create the tags** on the new commit:
   ```bash
   git tag <TAG NAME> <COMMIT HASH>   # e.g. git tag v2.0.0-beta.1 abcdef0
   ```

3. **Re-create git notes** for each tag:
   ```bash
   # Beta/pre-release channel only
   git notes --ref semantic-release add -f -m '{"channels":["beta"]}' <TAG NAME>

   # Also on default channel (master/main)
   git notes --ref semantic-release add -f -m '{"channels":[null,"beta"]}' <TAG NAME>
   ```

4. **Push the notes** (force required after rebase):
   ```bash
   git push --force origin refs/notes/semantic-release
   ```

## Reference

Full documentation: [semantic-release Troubleshooting](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting)
