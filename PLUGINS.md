# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

- [pf-a11y](#pf-a11y) — Accessibility auditing, reporting, and documentation for PatternFly applications
- [pf-figma](#pf-figma) — Figma design review, diffing, and asset identification for PatternFly
- [pf-react](#pf-react) — PatternFly React coding standards and unit test generation agents
- [pf-styling](#pf-styling) — CSS, SCSS, design tokens, and visual styling for PatternFly
- [pf-workflow](#pf-workflow) — Issue tracking, PR management, and cross-repo coordination for PatternFly projects

---

### pf-a11y

Accessibility auditing, reporting, and documentation for PatternFly applications

No skills or agents yet — contributions welcome!

### pf-figma

Figma design review, diffing, and asset identification for PatternFly

**Skills:**
- `/pf-figma:figma-changes` — Identify Figma design changes and generate code update checklists. Use when the user asks to "check Figma updates", "track design changes", "what changed in Figma", "create changelog from Figma", or "what code needs updating based on Figma".

### pf-react

PatternFly React coding standards and unit test generation agents

**Skills:**
- `/pf-react:patternfly-component-structure` — Guide for PatternFly React component structure — audits, correct nesting, and layout debugging. Use when building with @patternfly/react-core or @patternfly/react-table, scanning code for hierarchy violations, or fixing spacing and alignment issues.
- `/pf-react:pf-bug-triage` — Performs preliminary triage of opened issues marked as bugs. Suggests what needs to be updated to fix reported bugs, provides context for assignees, and tags the most appropriate maintainer when the issue contains questions. Use when triaging bug issues, reviewing new bug reports, or preparing issues for assignment.
- `/pf-react:pf-unit-test-generator` — Generate a comprehensive unit test file for a given React component
- `/pf-react:write-example-description` — >-

**Agents:**
- `component-structure-audit` — PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. Use when writing, reviewing, or refactoring PatternFly UI so layouts rely on correct trees, not custom CSS.
- `pf-coding-standards` — PatternFly React development standards. Use when writing, reviewing, or refactoring PatternFly React components, layouts, or styles.
- `pf-unit-test-standards` — PatternFly React unit testing standards. Use when writing, reviewing, or modifying unit tests for PatternFly React components.

### pf-styling

CSS, SCSS, design tokens, and visual styling for PatternFly

**Skills:**
- `/pf-styling:pf-raw-colors-scan` — "Analyze the provided code to find any raw color values assigned to styling properties. Flag these values as technical debt and suggest their replacement with design tokens."
- `/pf-styling:pf-token-auditor` — Validate and bridge Figma design styles to PatternFly 6 design tokens. Use when auditing Figma designs against PatternFly tokens, validating token naming, translating Figma styles to composite tokens, or when the user mentions "token validation", "token audit", "design tokens", "Figma audit", "Figma variables", "token bridge", or "PF tokens".
- `/pf-styling:pf-tokens` — Build CSS design tokens for PatternFly core and copy them to the PatternFly repository.

### pf-workflow

Issue tracking, PR management, and cross-repo coordination for PatternFly projects

**Skills:**
- `/pf-workflow:analytics-repo-pruning` — Flags archived or inactive Git repositories listed in PatternFly Analytics repos.json so entries can be pruned. Use when reviewing repos.json, auditing tracked codebases, or removing stale or archived repos from analytics.
- `/pf-workflow:dependency-recommender` — Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation.
- `/pf-workflow:duplicate-epic` — Duplicates an Atlassian Jira epic into the PatternFly (PF) project space, adds an "is duplicated by" link referencing the original, and assigns it as a child of a given feature. This allows the PatternFly team to trace Jira work items up a hierarchy in the product Jira project. Use when asked to "duplicate epic X for feature Y", clone a COST epic to PatternFly, or replicate a Jira epic under a PF feature.
- `/pf-workflow:pf-create-issue` — Create GitHub issues for PatternFly repositories with smart templates, followup tracking, and duplicate detection.
- `/pf-workflow:pf-org-version-update` — Updates the patternfly-org repo for a new PatternFly release or release candidate. Fetches or applies specified versions, updates package.json files and versions.json, and then provides the user with steps to run the build and regenerate screenshots locally. Use when preparing a PatternFly release, updating PF versions in this repo, or when the user asks to update patternfly-org for a new release.

