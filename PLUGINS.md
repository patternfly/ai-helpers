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

**Skills:**
- `/design-foundations:css-var-analyzer` — Analyze CSS custom property usage, redefinitions, and naming patterns in PatternFly SCSS components. Use when auditing --pf- variables, debugging missing definitions, tracing SCSS variable cascades, or finding unused CSS custom properties.
- `/design-foundations:icon-finder` — Find icons from the Red Hat Design System (@rhds/icons) by use case. Searches the Red Hat Icons demo site by keyword, returns matching icon names with a visual HTML preview for comparison. Use when the user asks to find an icon, search for an icon by purpose, pick an icon for a UI, or get icon options for a use case.
- `/design-foundations:pf-analyze-modifiers` — Find, list, and summarize PatternFly component modifiers (pf-m- classes) across the codebase. Use when analyzing component styling patterns, documenting modifier usage, or auditing CSS consistency.
- `/design-foundations:pf-class-migration-scanner` — Scans for legacy PatternFly class usage and recommends PF6-safe replacements. Use when modernizing older PatternFly codebases.
- `/design-foundations:pf-raw-colors-scan` — "Analyze the provided code to find any raw color values assigned to styling properties. Flag these values as technical debt and suggest their replacement with design tokens."
- `/design-foundations:pf-token-auditor` — # PatternFly Design Token Auditor & Bridge
- `/design-foundations:pf-tokens` — Build CSS design tokens for PatternFly core and copy them to the PatternFly repository.

### figma

Figma design review, diffing, and asset identification

**Skills:**
- `/figma:figma-changes` — Identify Figma design changes and generate code update checklists. Use when the user asks to "check Figma updates", "track design changes", "what changed in Figma", "create changelog from Figma", or "what code needs updating based on Figma".
- `/figma:figma-icon-finder` — Identifies PatternFly icons used in Figma mockups and provides the correct import statements for React components. Use when given a Figma screenshot or URL and the user needs to know which PatternFly icons to import.
- `/figma:pf-compliance-checker` — Check Figma designs against PatternFly v6 design system standards. Use when a user provides a Figma URL and wants to validate compliance with PatternFly colors, typography, spacing, components, and UX patterns.

### issue-management

Issue creation, tracking, and cross-project coordination

**Skills:**
- `/issue-management:duplicate-epic` — Use when `/duplicate-epic <issue> <feature>` should clone a Jira Epic, Story, or Bug into the PF project, resolve non-epic inputs to their parent epic, link back to the source, and attach the new epic to a PF feature.
- `/issue-management:pf-bug-triage` — Performs preliminary triage of opened issues marked as bugs. Suggests what needs to be updated to fix reported bugs, provides context for assignees, and tags the most appropriate maintainer when the issue contains questions. Use when triaging bug issues, reviewing new bug reports, or preparing issues for assignment.
- `/issue-management:pf-create-issue` — Create GitHub issues for PatternFly repositories with smart templates, followup tracking, and duplicate detection.
- `/issue-management:quarterly-initiative-report` — Generate comprehensive quarterly Jira status reports with progress tracking, RAG assessment, blocker identification, cross-project duplicate link analysis, and Q+1 recommendations. Use when generating quarterly reports, tracking initiative progress, or analyzing epic completion metrics across Jira projects with labels.
- `/issue-management:summarize-jira-issues` — "Summarize Jira sprint issues and contributions for the current user. Use when the user asks to: (1) See what's left in the sprint, (2) Summarize their assigned work, (3) Prioritize sprint tasks, (4) See issues they're contributing to, or (5) Understand what to work on next. Focuses on active sprint work first, then shows contributor roles and backlog."

### react

React component development — coding standards, testing, and structure

**Skills:**
- `/react:ai-experience-patterns` — Apply established UI/UX design patterns when building AI-powered product demos and experiences. Use this skill whenever the user mentions "AI experience", "AI powered", "AI supported", "product demo", or when building prototypes that involve AI features like chat interfaces, generation flows, loading states, or AI-assisted interactions. Make sure to use this skill even when users don't explicitly ask for design guidance - proactively apply these patterns to create polished AI experiences.
- `/react:pf-component-structure` — Guide for PatternFly React component structure — audits, correct nesting, and layout debugging. Use when building with @patternfly/react-core or @patternfly/react-table, scanning code for hierarchy violations, or fixing spacing and alignment issues.
- `/react:pf-import-checker` — Audits and fixes PatternFly import paths, with emphasis on charts, chatbot, and component-groups. Use when imports fail or PatternFly modules are unresolved.
- `/react:pf-library-test-writer` — Write unit tests for contributors to PatternFly libraries (patternfly-react, patternfly-chatbot, etc.), not for consumers of PatternFly components. Use `unit-test-generator` for consumer application tests instead.
- `/react:pf-project-scaffolder` — Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. Use when creating a new PatternFly app or bootstrapping a migration sandbox.
- `/react:pf-unit-test-generator` — Generate a comprehensive unit test file for a given React component
- `/react:write-example-description` — Helps PatternFly developers write and refine example descriptions and demo descriptions for PatternFly.org. Covers (1) component example MD files: prose under each ### heading before the ts block in packages/react-core/src/components/*/examples/*.md; (2) demo MD files: prose under ## Demos / ### Demo name in packages/react-core/src/demos. Uses PatternFly MCP for UX writing and content guidelines, suggests cross-links, and asks the user to accept or request changes. Run only when the user asks.

**Agents:**
- `component-structure-audit` — PatternFly React structural composition rules — required hierarchies, wrapper components, and props-vs-children patterns. Use when writing, reviewing, or refactoring PatternFly UI so layouts rely on correct trees, not custom CSS.
- `pf-coding-standards` — PatternFly React development standards. Use when writing, reviewing, or refactoring PatternFly React components, layouts, or styles.
- `pf-unit-test-standards` — PatternFly React unit testing standards. Use when writing, reviewing, or modifying unit tests for PatternFly React components.

### repo-management

Release versioning, dependency analysis, and repository health

**Skills:**
- `/repo-management:analytics-repo-pruning` — Flags archived or inactive Git repositories listed in PatternFly Analytics repos.json so entries can be pruned. Use when reviewing repos.json, auditing tracked codebases, or removing stale or archived repos from analytics.
- `/repo-management:dependency-recommender` — Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation.
- `/repo-management:pf-org-version-update` — Updates the patternfly-org repo for a new PatternFly release or release candidate. Fetches or applies specified versions, updates package.json files and versions.json, and then provides the user with steps to run the build and regenerate screenshots locally. Use when preparing a PatternFly release, updating PF versions in this repo, or when the user asks to update patternfly-org for a new release.
- `/repo-management:semantic-release-troubleshooting` — Diagnose and fix semantic-release issues when a specific version is not being released. Use when semantic-release skips a version, fails to release, or when troubleshooting after git push --force, squashed commits, permission errors, or reference already exists.
- `/repo-management:summarize-pr-reviews` — "Summarize GitHub pull requests awaiting review from the current user. Use when the user asks to: (1) See their pending PR reviews, (2) Summarize PRs they need to review, (3) Get an overview of review requests, (4) Prioritize their code review queue, or (5) Understand what PRs are waiting for their review."

