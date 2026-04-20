# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

- [a11y](#a11y) — Accessibility auditing, reporting, and documentation
- [design-foundations](#design-foundations) — Design foundation reference and auditing — tokens, icons, colors, spacing
- [figma](#figma) — Figma design review, diffing, and asset identification
- [issue-management](#issue-management) — Issue creation, tracking, and cross-project coordination
- [react](#react) — React component development — coding standards, testing, and structure
- [repo-management](#repo-management) — Release versioning, dependency analysis, and repository health

---

### a11y

Accessibility auditing, reporting, and documentation

No skills or agents yet — contributions welcome!


### design-foundations

Design foundation reference and auditing — tokens, icons, colors, spacing

| Skill | Description |
|-------|-------------|
| `css-var-analyzer` | Analyze CSS custom property usage, redefinitions, and naming patterns in PatternFly SCSS components. |
| `icon-finder` | Find icons from the Red Hat Design System (@rhds/icons) by use case. |
| `pf-analyze-modifiers` | Find, list, and summarize PatternFly component modifiers (pf-m- classes) across the codebase. |
| `pf-class-migration-scanner` | Scans for legacy PatternFly class usage and recommends PF6-safe replacements. |
| `pf-raw-colors-scan` | Analyze the provided code to find any raw color values assigned to styling properties. |
| `pf-token-auditor` | Validate and bridge Figma design styles to PatternFly 6 design tokens. |
| `pf-tokens` | Build CSS design tokens for PatternFly core and copy them to the PatternFly repository. |


### figma

Figma design review, diffing, and asset identification

| Skill | Description |
|-------|-------------|
| `figma-changes` | Identify Figma design changes and generate code update checklists. |
| `figma-icon-finder` | Identifies PatternFly icons used in Figma mockups and provides the correct import statements for React components. |
| `pf-compliance-checker` | Check Figma designs against PatternFly v6 design system standards. |


### issue-management

Issue creation, tracking, and cross-project coordination

| Skill | Description |
|-------|-------------|
| `duplicate-epic` | Use when `/duplicate-epic <issue> <feature>` should clone a Jira Epic, Story, or Bug into the PF project, resolve non-epic inputs to their parent epic, link back to the source, and attach the new epic to a PF feature. |
| `pf-bug-triage` | Performs preliminary triage of opened issues marked as bugs. |
| `pf-create-issue` | Create GitHub issues for PatternFly repositories with smart templates, followup tracking, and duplicate detection. |
| `quarterly-initiative-report` | Generate comprehensive quarterly Jira status reports with progress tracking, RAG assessment, blocker identification, cross-project duplicate link analysis, and Q+1 recommendations. |
| `summarize-jira-issues` | Summarize Jira sprint issues and contributions for the current user. |


### react

React component development — coding standards, testing, and structure

| Skill | Description |
|-------|-------------|
| `ai-experience-patterns` | Apply established UI/UX design patterns when building AI-powered product demos and experiences. |
| `pf-component-structure` | Guide for PatternFly React component structure — audits, correct nesting, and layout debugging. |
| `pf-import-checker` | Audits and fixes PatternFly import paths, with emphasis on charts, chatbot, and component-groups. |
| `pf-library-test-writer` | Write unit tests for contributors to PatternFly libraries (patternfly-react, patternfly-chatbot, etc.), not for consumers of PatternFly components. |
| `pf-project-scaffolder` | Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. |
| `pf-unit-test-generator` | Generate a comprehensive unit test file for a given React component |
| `write-example-description` | Helps PatternFly developers write and refine example descriptions and demo descriptions for PatternFly.org. |

| Agent | Description |
|-------|-------------|
| `component-structure-audit` | PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. |
| `pf-coding-standards` | PatternFly React development standards. |
| `pf-unit-test-standards` | PatternFly React unit testing standards. |


### repo-management

Release versioning, dependency analysis, and repository health

| Skill | Description |
|-------|-------------|
| `analytics-repo-pruning` | Flags archived or inactive Git repositories listed in PatternFly Analytics repos.json so entries can be pruned. |
| `dependency-recommender` | Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation. |
| `pf-org-version-update` | Updates the patternfly-org repo for a new PatternFly release or release candidate. |
| `semantic-release-troubleshooting` | Diagnose and fix semantic-release issues when a specific version is not being released. |
| `summarize-pr-reviews` | Summarize GitHub pull requests awaiting review from the current user. |

