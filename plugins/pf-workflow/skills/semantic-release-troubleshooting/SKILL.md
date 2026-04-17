---
name: semantic-release-troubleshooting
description: >-
  Diagnose and fix semantic-release issues when a specific version is not being
  released. Use when semantic-release skips a version, fails to release, or when
  troubleshooting after git push --force, squashed commits, permission errors,
  or reference already exists.
disable-model-invocation: true
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

**Diagnosis:** Verify package name availability on the npm registry.

**Fix:** If the package name is taken, update `package.json` with a different name or use an [npm scope](https://docs.npmjs.com/cli/v11/using-npm/scope/). Ensure proper [npm registry authentication](https://github.com/semantic-release/npm#npm-registry-authentication) and confirm the user has [publish permissions](https://docs.npmjs.com/cli/v8/commands/npm-team/).

## 3. Squashed Commits

**Cause:** semantic-release uses [commit message convention](https://github.com/semantic-release/semantic-release#commit-message-format). Squashed commits often get non-compliant messages and are ignored.

**Diagnosis:** Check that commit messages follow conventional commit format.

**Fix:** Ensure commit messages follow the semantic-release convention with proper prefixes (`feat:`, `fix:`, `fix!:`, `BREAKING CHANGE:`). Each squashed commit should represent one logical change; avoid combining unrelated features. Rewrite non-compliant commit messages to match the required format.

## 4. Tag Conflict (`reference already exists`)

**Cause:** A tag with the target version exists but is not in the current branch's history.

**Diagnosis:** Confirm whether the tag exists and identify which branches contain it.

**Fix:**
- If the release was published: Merge the commits from that release into your release branch.
- If no published release: Delete the conflicting tag locally and from the remote repository.

## 5. History Rewrite Recovery (after `git push --force`)

**Cause:** `git push --force` rewrites history; tags and git notes tied to old commits become invalid.

**Diagnosis:** Identify orphaned tags and notes that point to old (rewritten) commits.

**Fix:** Recover in this order:
1. Delete orphaned tags from both remote and local repositories
2. Re-create tags pointing to the corresponding new commits
3. Re-create git notes for each tag with appropriate channel configuration (e.g., `{"channels":["beta"]}` for beta channel only, or `{"channels":[null,"beta"]}` for both default and beta channels)
4. Force push the updated notes to the remote repository

## Reference

Full documentation: [semantic-release Troubleshooting](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting)
