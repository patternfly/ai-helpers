# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

- [a11y](#a11y) — Accessibility auditing, reporting, and documentation
- [code-review](#code-review) — Code review and quality — PR summaries, adversarial review, security patterns
- [design-to-code](#design-to-code) — Design-to-code translation — Figma review, token auditing, icon identification, design compliance
- [migration](#migration) — PF version migration — breaking change detection, class scanning, upgrade planning
- [pf-workshop](#pf-workshop) — PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development
- [react](#react) — React component development — coding standards, testing, and structure

---

### a11y

Accessibility auditing, reporting, and documentation

No skills or agents yet — contributions welcome!


<br>

### code-review

Code review and quality — PR summaries, adversarial review, security patterns

| Skill | Description |
|-------|-------------|
| `summarize-pr-reviews` | Summarize GitHub pull requests awaiting review from the current user. |


<br>

### design-to-code

Design-to-code translation — Figma review, token auditing, icon identification, design compliance

| Skill | Description |
|-------|-------------|
| `figma-changes` | Identify Figma design changes and generate code update checklists. |
| `figma-icon-finder` | Identifies PatternFly icons used in Figma mockups and provides the correct import statements for React components. |
| `icon-finder` | Find icons from the Red Hat Design System (@rhds/icons) by use case. |
| `pf-ai-experience-patterns` | Apply Red Hat's AI design language for AI-powered demos and features. |
| `pf-compliance-checker` | Check Figma designs against PatternFly v6 design system standards. |
| `pf-design-mode` | Create and edit Figma design files using the Figma MCP workflow with PatternFly-approved libraries only. |
| `pf-raw-colors-scan` | Analyze the provided code to find any raw color values assigned to styling properties. |
| `pf-token-auditor` | Validate and bridge Figma design styles to PatternFly 6 design tokens. |


<br>

### migration

PF version migration — breaking change detection, class scanning, upgrade planning

| Skill | Description |
|-------|-------------|
| `pf-class-migration-scanner` | Scans for legacy PatternFly class usage and recommends PF6-safe replacements. |


<br>

### pf-workshop

PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development

| Skill | Description |
|-------|-------------|
| `analytics-repo-pruning` | Flags archived or inactive Git repositories listed in PatternFly Analytics repos.json so entries can be pruned. |
| `css-var-analyzer` | Analyze CSS custom property usage, redefinitions, and naming patterns in PatternFly SCSS components. |
| `duplicate-epic` | Use when `/duplicate-epic <issue> <feature>` should clone a Jira Epic, Story, or Bug into the PF project, resolve non-epic inputs to their parent epic, link back to the source, and attach the new epic to a PF feature. |
| `pf-analyze-modifiers` | Find, list, and summarize PatternFly component modifiers (pf-m- classes) across the codebase. |
| `pf-bug-triage` | Performs preliminary triage of opened issues marked as bugs. |
| `pf-create-issue` | Create GitHub issues for PatternFly repositories with smart templates, follow-up tracking, and duplicate detection. |
| `pf-org-version-update` | Updates the patternfly-org repo for a new PatternFly release or release candidate. |
| `pf-tokens` | Build CSS design tokens for PatternFly core and copy them to the PatternFly repository. |
| `quarterly-initiative-report` | Generate comprehensive quarterly Jira status reports with progress tracking, RAG assessment, blocker identification, cross-project duplicate link analysis, and Q+1 recommendations. |
| `semantic-release-troubleshooting` | Diagnose and fix semantic-release issues when a specific version is not being released. |
| `summarize-jira-issues` | Summarize Jira sprint issues and contributions for the current user. |
| `write-example-description` | Helps PatternFly developers write and refine example descriptions and demo descriptions for PatternFly.org. |


<br>

### react

React component development — coding standards, testing, and structure

| Skill | Description |
|-------|-------------|
| `pf-component-structure` | Guide for PatternFly React component structure — audits, correct nesting, and layout debugging. |
| `pf-import-checker` | Audits and fixes PatternFly import paths, with emphasis on charts, chatbot, and component-groups. |
| `pf-project-scaffolder` | Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. |
| `pf-prototype-mode` | Enable prototype mode for React apps (grayscale + banner) |
| `pf-unit-test-generator` | Generate a comprehensive unit test file for a given React component. |

| Agent | Description |
|-------|-------------|
| `component-structure-audit` | PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. |
| `pf-coding-standards` | PatternFly React development standards. |
| `pf-unit-test-standards` | PatternFly React unit testing standards. |

