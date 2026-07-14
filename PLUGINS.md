# Available Plugins

Quick reference of all plugins and what they contain. This file is auto-generated — do not edit manually.

## Table of Contents

- [a11y](#a11y) — Accessibility auditing, reporting, and documentation
- [code-review](#code-review) — Code review and quality — adversarial review, security patterns
- [design-audit](#design-audit) — Design audit — validate existing code and designs against PatternFly standards
- [design-guide](#design-guide) — Design guide — component selection, interaction patterns, AI experience patterns, Figma design creation
- [migration](#migration) — PF version migration — breaking change detection, class scanning, upgrade planning
- [patternfly-mcp](#patternfly-mcp) — PatternFly MCP server — provides component documentation, design token lookup, and accessibility guidance via the Model Context Protocol
- [pf-workshop](#pf-workshop) — PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development
- [react](#react) — React component development — coding standards, testing, and structure

---

### a11y

Accessibility auditing, reporting, and documentation

No skills or agents yet.


<br>

### code-review

Code review and quality — adversarial review, security patterns

| Skill | Description |
|-------|-------------|
| `pf-security-scan` | Scan PatternFly React code for security anti-patterns — XSS via dangerouslySetInnerHTML, unsanitized user input in tooltips/labels, and insecure href patterns. |

| Agent | Description |
|-------|-------------|
| `pf-assist` | PatternFly development routing — maps code changes, test gaps, scaffolding needs, and design work to the right PF sub-skills. |


<br>

### design-audit

Design audit — validate existing code and designs against PatternFly standards

| Skill | Description |
|-------|-------------|
| `pf-code-token-check` | Detect hardcoded color, spacing, typography, border radius and shadow values that have PF token equivalents and suggest the correct design token replacements. |
| `pf-color-scan` | Find raw color values (hex, rgb, hsl) in code and suggest PatternFly design token replacements. |
| `pf-figma-check` | Check Figma designs against PatternFly v6 standards for colors, typography, spacing, and component usage. |
| `pf-figma-token-check` | Audit designs against the PatternFly 6 token architecture and bridge Figma styles to PF semantic tokens. |
| `pf-icon-finder` | Identify PatternFly icons in Figma mockups and provide the correct React import statements. |


<br>

### design-guide

Design guide — component selection, interaction patterns, AI experience patterns, Figma design creation

| Skill | Description |
|-------|-------------|
| `pf-ai-guide` | Apply Red Hat's AI design language to AI-powered features — chatbots, assistants, generation UIs. |
| `pf-figma-design-mode` | Create and edit Figma design files using PatternFly-approved component libraries. |

| Agent | Description |
|-------|-------------|
| `pf-microcopy` | PatternFly component microcopy standards — button labels, tooltips, alt text, and error messages. |


<br>

### migration

PF version migration — breaking change detection, class scanning, upgrade planning

| Skill | Description |
|-------|-------------|
| `pf-css-migration-scan` | Scan code for legacy PatternFly CSS classes and recommend PF6-safe replacements. |
| `pf-react-migration-scan` | Scan code for @patternfly/react-* API breaking changes and produce a markdown report. |


<br>

### patternfly-mcp

PatternFly MCP server — provides component documentation, design token lookup, and accessibility guidance via the Model Context Protocol

This plugin provides an MCP server only — no skills or agents. Other plugins declare it as a dependency so the MCP server is installed automatically.


<br>

### pf-workshop

PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development

| Skill | Description |
|-------|-------------|
| `analytics-repo-pruning` | Flag archived or inactive repos in PatternFly Analytics repos.json for removal. |
| `duplicate-epic` | Clone a Jira epic from another project into the PF Jira space with back-links and feature attachment. |
| `figma-diff` | Diff Figma designs to identify what changed and generate code update checklists. |
| `icon-finder` | Find Red Hat Design System icons (@rhds/icons) by keyword or use case with visual previews. |
| `pf-bug-triage` | Triage PatternFly bug reports — assess completeness, suggest fixes, identify affected components, and recommend assignees. |
| `pf-content-review` | Review content against PatternFly and Red Hat voice and tone standards. |
| `pf-create-issue` | Create well-structured GitHub issues for PatternFly repositories with templates, follow-up tracking, and duplicate detection. |
| `pf-css-var-scan` | Analyze --pf- CSS custom property usage and naming patterns in PatternFly SCSS. |
| `pf-modifier-scan` | Analyze PatternFly modifier class (pf-m-*) usage across SCSS files and generate usage reports. |
| `pf-org-version-update` | Update patternfly-org for a new PatternFly release — resolve versions, update package.json and versions.json, and provide build steps. |
| `pf-token-build` | Build CSS design tokens for PatternFly core and copy them to the PatternFly repository. |
| `prototype-mode` | Enable prototype mode for React apps with grayscale styling and a banner overlay. |
| `quarterly-report-gen` | Generate quarterly Jira status reports with RAG assessment, blocker tracking, and next-quarter recommendations. |
| `semantic-release-debug` | Diagnose and fix semantic-release issues when a specific version is not being released. |
| `summarize-jira-issues` | Summarize your current sprint workload from Jira — assigned issues, contributor roles, and priorities. |
| `summarize-pr-reviews` | Summarize GitHub pull requests awaiting your review with status, age, and priority. |
| `write-example-description` | Write and refine example descriptions for PatternFly.org component and demo pages. |

| Agent | Description |
|-------|-------------|
| `pf-voice-and-tone` | PatternFly and Red Hat voice and tone standards — friendly, approachable, collaborative, inventive. |


<br>

### react

React component development — coding standards, testing, and structure

| Skill | Description |
|-------|-------------|
| `pf-component-check` | Audit PatternFly React component nesting, wrapper hierarchies, and layout structure. |
| `pf-deploy` | Deploy a PatternFly React project to GitHub Pages using pfcli deploy. |
| `pf-design-comments-setup` | Integrate @patternfly/design-comments into React apps for on-page design feedback, pinned comment threads, GitHub Issues sync, and Jira linking. |
| `pf-import-check` | Audit and fix invalid PatternFly import paths across packages. |
| `pf-project-gen` | Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. |
| `pf-test-gen` | Generate a unit test file for a React component using Testing Library. |

| Agent | Description |
|-------|-------------|
| `pf-coding-standards` | PatternFly React coding standards — import patterns, component composition, token usage, and style conventions. |
| `pf-component-structure-audit` | PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. |
| `pf-unit-test-standards` | PatternFly React unit testing standards — RTL patterns, mock boundaries, coverage expectations, and assertion style. |

