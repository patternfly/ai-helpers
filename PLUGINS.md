# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

- [pf-a11y](#pf-a11y) — Accessibility auditing, reporting, and documentation for PatternFly applications
- [pf-design-tokens](#pf-design-tokens) — Design token auditing, validation, and migration for PatternFly styling
- [pf-figma](#pf-figma) — Figma design review, diffing, and asset identification for PatternFly
- [pf-react](#pf-react) — PatternFly React coding standards and unit test generation agents
- [pf-workflow](#pf-workflow) — Issue tracking, PR management, and cross-repo coordination for PatternFly projects

---

### pf-a11y

Accessibility auditing, reporting, and documentation for PatternFly applications

No skills or agents yet — contributions welcome!

### pf-design-tokens

Design token auditing, validation, and migration for PatternFly styling

**Skills:**
- `/pf-design-tokens:pf-tokens` — Build CSS design tokens for PatternFly core and move them to the PatternFly repository.

### pf-figma

Figma design review, diffing, and asset identification for PatternFly

No skills or agents yet — contributions welcome!

### pf-react

PatternFly React coding standards and unit test generation agents

**Skills:**
- `/pf-react:bug-triage` — Performs preliminary triage of opened issues marked as bugs. Suggests what needs to be updated to fix reported bugs, provides context for assignees, and tags the most appropriate maintainer when the issue contains questions. Use when triaging bug issues, reviewing new bug reports, or preparing issues for assignment.
- `/pf-react:unit-test-generator` — Generate a comprehensive unit test file for a given React component

**Agents:**
- `coding-standards` — PatternFly React development standards. Use when writing, reviewing, or refactoring PatternFly React components, layouts, or styles.
- `unit-test-standards` — PatternFly React unit testing standards. Use when writing, reviewing, or modifying unit tests for PatternFly React components.

### pf-workflow

Issue tracking, PR management, and cross-repo coordination for PatternFly projects

**Skills:**
- `/pf-workflow:create-issue` — Create GitHub issues for PatternFly repositories with smart templates, followup tracking, and duplicate detection.
- `/pf-workflow:dependency-recommender` — Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation.
- `/pf-workflow:pf-org-version-update` — Updates the patternfly-org repo for a new PatternFly release or release candidate. Fetches or applies specified versions, updates package.json files and versions.json, and then provides the user with steps to run the build and regenerate screenshots locally. Use when preparing a PatternFly release, updating PF versions in this repo, or when the user asks to update patternfly-org for a new release.

