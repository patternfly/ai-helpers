---
name: bug-triage
description: Performs preliminary triage of opened issues marked as bugs. Suggests what needs to be updated to fix reported bugs, provides context for assignees, and tags the most appropriate maintainer when the issue contains questions. Use when triaging bug issues, reviewing new bug reports, or preparing issues for assignment.
---

# Bug Triage

Performs preliminary triage of opened issues labeled as bugs. Produces a structured triage summary with fix suggestions and maintainer recommendations.

## Input

The user provides an issue (title, body, labels, and optionally linked files or component names). The issue must be marked or labeled as a bug.

## Triage Workflow

### 1. Parse the Issue

Extract from the issue:
- **Summary** — One-sentence description of the bug
- **Reproduction steps** — Are they clear and complete?
- **Expected vs actual behavior** — Is the distinction stated?
- **Environment** — Versions, browser, OS if mentioned
- **Affected area** — Component, file path, or feature inferred from description

### 2. Assess Completeness

Flag if missing:
- [ ] Reproduction steps
- [ ] Expected vs actual behavior
- [ ] Version/environment info
- [ ] Minimal reproduction (code, sandbox, or repo link)

Suggest what the reporter should add before the issue can be triaged effectively.

### 3. Identify Fix Location

Search the codebase for:
- Component names, file paths, or imports mentioned in the issue
- Related code in `packages/`, `src/`, or equivalent
- Tests that might need updates
- Documentation that might be wrong

Suggest **what needs to be updated** to fix the bug:
- Specific files or components
- Likely root cause (logic, styling, accessibility, API usage)
- Tests to add or modify
- Any docs to update

### 4. Determine Maintainer

Find the most appropriate maintainer to tag when the issue **contains questions** (e.g., "Is this expected?", "How should we handle X?"):

1. **Check CODEOWNERS** — If present, match issue paths to ownership:
   - Map affected files/components to CODEOWNERS entries
   - Tag the owner(s) for the most relevant path(s)

2. **Check CONTRIBUTING.md / MAINTAINERS** — Look for maintainer lists, areas of responsibility, or "who to ask" sections.

3. **Infer from codebase** — If no CODEOWNERS:
   - Recent commits to affected files
   - Component/package naming (e.g., `packages/react-table` → table maintainers)
   - Comments or author info in relevant files

4. **Fallback** — If unclear, suggest: "Tag @patternfly/react-core-maintainers" or the repo's default maintainer group.

**Only suggest tagging when the issue explicitly asks a question** that requires maintainer input. Do not tag for straightforward bugs that just need implementation.

For CODEOWNERS format and when-to-tag guidance, see [reference.md](reference.md).

## Output Format

Produce a triage comment or summary using this template:

```markdown
## Bug Triage Summary

### Summary
[One-sentence bug description]

### Completeness
- [ ] Reproduction steps clear
- [ ] Expected vs actual stated
- [ ] Environment/versions provided
- [ ] Minimal reproduction available

[If incomplete: List what the reporter should add]

### Suggested Fix
**Likely location:** [files, components, or packages]
**Root cause:** [brief hypothesis]
**Changes needed:**
- [ ] [Specific change 1]
- [ ] [Specific change 2]
- [ ] [Tests to add/modify]
- [ ] [Docs to update if applicable]

### Context for Assignee
[2–4 bullets: key files to look at, related patterns, similar past fixes, or docs to reference]

### Maintainer Tag (if issue has questions)
**Suggested:** @[username or team]
**Reason:** [Why this maintainer — e.g., "Owns Table component per CODEOWNERS"]
```

## Rules

- Be concise. Each section should be 1–3 sentences or bullets.
- Only suggest maintainer tags when the issue **asks a question** requiring maintainer input.
- If the codebase is unavailable, state what you would search for and produce a partial triage.
- Use the repo's actual structure (e.g., `packages/react-core`, `packages/react-table`) when suggesting locations.
