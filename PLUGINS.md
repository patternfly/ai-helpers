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


<br>

### design-foundations

Design foundation reference and auditing — tokens, icons, colors, spacing

| Skill | Description |
|-------|-------------|
| `css-var-analyzer` | Analyze --pf- CSS custom property usage and naming patterns in PatternFly SCSS. |
| `icon-finder` | Find Red Hat Design System icons (@rhds/icons) by keyword or use case with visual previews. |
| `pf-ai-experience-patterns` | Apply Red Hat's AI design language to AI-powered features — chatbots, assistants, generation UIs. |
| `pf-analyze-modifiers` | Analyze PatternFly modifier class (pf-m-*) usage across SCSS files and generate usage reports. |
| `pf-class-migration-scanner` | Scan code for legacy PatternFly CSS classes and recommend PF6-safe replacements. |
| `pf-raw-colors-scan` | Find raw color values (hex, rgb, hsl) in code and suggest PatternFly design token replacements. |
| `pf-token-auditor` | Audit designs against the PatternFly 6 token architecture and bridge Figma styles to PF semantic tokens. |
| `pf-tokens` | Build CSS design tokens for PatternFly core and copy them to the PatternFly repository. |


<br>

### figma

Figma design review, diffing, and asset identification

| Skill | Description |
|-------|-------------|
| `figma-changes` | Diff Figma designs to identify what changed and generate code update checklists. |
| `figma-icon-finder` | Identify PatternFly icons in Figma mockups and provide the correct React import statements. |
| `pf-compliance-checker` | Check Figma designs against PatternFly v6 standards for colors, typography, spacing, and component usage. |
| `pf-design-mode` | Create and edit Figma design files using PatternFly-approved component libraries. |


<br>

### issue-management

Issue creation, tracking, and cross-project coordination

| Skill | Description |
|-------|-------------|
| `duplicate-epic` | Clone a Jira epic from another project into the PF Jira space with back-links and feature attachment. |
| `pf-bug-triage` | Triage PatternFly bug reports — assess completeness, suggest fixes, identify affected components, and recommend assignees. |
| `pf-create-issue` | Create well-structured GitHub issues for PatternFly repositories with templates, follow-up tracking, and duplicate detection. |
| `quarterly-initiative-report` | Generate quarterly Jira status reports with RAG assessment, blocker tracking, and next-quarter recommendations. |
| `summarize-jira-issues` | Summarize your current sprint workload from Jira — assigned issues, contributor roles, and priorities. |


<br>

### react

React component development — coding standards, testing, and structure

| Skill | Description |
|-------|-------------|
| `pf-component-structure` | Audit PatternFly React component nesting, wrapper hierarchies, and layout structure. |
| `pf-import-checker` | Audit and fix invalid PatternFly import paths across packages. |
| `pf-library-test-writer` | Write unit tests for PatternFly library internals using mock-based isolation. |
| `pf-project-scaffolder` | Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. |
| `pf-prototype-mode` | Enable prototype mode for React apps (grayscale + banner) |
| `pf-unit-test-generator` | Generate a unit test file for a React component using Testing Library. |
| `write-example-description` | Write and refine example descriptions for PatternFly.org component and demo pages. |

| Agent | Description |
|-------|-------------|
| `component-structure-audit` | PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. |
| `pf-coding-standards` | Define PatternFly React coding standards — import patterns, component composition, token usage, and style conventions. |
| `pf-unit-test-standards` | Standardize PatternFly React testing — RTL patterns, mock boundaries, coverage expectations, and assertion style. |


<br>

### repo-management

Release versioning, dependency analysis, and repository health

| Skill | Description |
|-------|-------------|
| `analytics-repo-pruning` | Flag archived or inactive repos in PatternFly Analytics repos.json for removal. |
| `dependency-recommender` | Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation. |
| `pf-org-version-update` | Update patternfly-org for a new PatternFly release — resolve versions, update package.json and versions.json, and provide build steps. |
| `semantic-release-troubleshooting` | Diagnose and fix semantic-release issues when a specific version is not being released. |
| `summarize-pr-reviews` | Summarize GitHub pull requests awaiting review from the current user. |

