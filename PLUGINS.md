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
| `summarize-pr-reviews` | Summarize GitHub pull requests awaiting your review with status, age, and priority. |


<br>

### design-to-code

Design-to-code translation — Figma review, token auditing, icon identification, design compliance

| Skill | Description |
|-------|-------------|
| `figma-changes` | Diff Figma designs to identify what changed and generate code update checklists. |
| `figma-icon-finder` | Identify PatternFly icons in Figma mockups and provide the correct React import statements. |
| `icon-finder` | Find Red Hat Design System icons (@rhds/icons) by keyword or use case with visual previews. |
| `pf-ai-experience-patterns` | Apply Red Hat's AI design language to AI-powered features — chatbots, assistants, generation UIs. |
| `pf-compliance-checker` | Check Figma designs against PatternFly v6 standards for colors, typography, spacing, and component usage. |
| `pf-design-mode` | Create and edit Figma design files using PatternFly-approved component libraries. |
| `pf-raw-colors-scan` | Find raw color values (hex, rgb, hsl) in code and suggest PatternFly design token replacements. |
| `pf-token-auditor` | Audit designs against the PatternFly 6 token architecture and bridge Figma styles to PF semantic tokens. |


<br>

### migration

PF version migration — breaking change detection, class scanning, upgrade planning

| Skill | Description |
|-------|-------------|
| `pf-class-migration-scanner` | Scan code for legacy PatternFly CSS classes and recommend PF6-safe replacements. |
| `pf-react-breaking-changes` | Scan code for @patternfly/react-* API breaking changes and produce a markdown report. |


<br>

### pf-workshop

PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development

| Skill | Description |
|-------|-------------|
| `analytics-repo-pruning` | Flag archived or inactive repos in PatternFly Analytics repos.json for removal. |
| `css-var-analyzer` | Analyze --pf- CSS custom property usage and naming patterns in PatternFly SCSS. |
| `duplicate-epic` | Clone a Jira epic from another project into the PF Jira space with back-links and feature attachment. |
| `pf-analyze-modifiers` | Analyze PatternFly modifier class (pf-m-*) usage across SCSS files and generate usage reports. |
| `pf-bug-triage` | Triage PatternFly bug reports — assess completeness, suggest fixes, identify affected components, and recommend assignees. |
| `pf-create-issue` | Create well-structured GitHub issues for PatternFly repositories with templates, follow-up tracking, and duplicate detection. |
| `pf-org-version-update` | Update patternfly-org for a new PatternFly release — resolve versions, update package.json and versions.json, and provide build steps. |
| `pf-tokens` | Build CSS design tokens for PatternFly core and copy them to the PatternFly repository. |
| `quarterly-initiative-report` | Generate quarterly Jira status reports with RAG assessment, blocker tracking, and next-quarter recommendations. |
| `semantic-release-troubleshooting` | Diagnose and fix semantic-release issues when a specific version is not being released. |
| `summarize-jira-issues` | Summarize your current sprint workload from Jira — assigned issues, contributor roles, and priorities. |
| `write-example-description` | Write and refine example descriptions for PatternFly.org component and demo pages. |


<br>

### react

React component development — coding standards, testing, and structure

| Skill | Description |
|-------|-------------|
| `pf-component-structure` | Audit PatternFly React component nesting, wrapper hierarchies, and layout structure. |
| `pf-import-checker` | Audit and fix invalid PatternFly import paths across packages. |
| `pf-project-scaffolder` | Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. |
| `pf-prototype-mode` | Enable prototype mode for React apps with grayscale styling and a banner overlay. |
| `pf-unit-test-generator` | Generate a unit test file for a React component using Testing Library. |

| Agent | Description |
|-------|-------------|
| `component-structure-audit` | PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. |
| `pf-coding-standards` | PatternFly React coding standards — import patterns, component composition, token usage, and style conventions. |
| `pf-unit-test-standards` | PatternFly React unit testing standards — RTL patterns, mock boundaries, coverage expectations, and assertion style. |

