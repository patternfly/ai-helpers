---
name: pf-assist
description: PatternFly development routing — maps code changes, test gaps, scaffolding needs, and design work to the right PF sub-skills. Active when working in any project with @patternfly/* dependencies.
---

# PatternFly assist

Route to the right PatternFly consumer skills based on what the developer is doing. Skip entirely if the project does not depend on `@patternfly/*` packages.

## Sub-skills by context

Identify the current context from the developer's recent activity, then apply the relevant sub-skills. Multiple contexts can apply simultaneously.

### Validation — code has been written or modified

| Sub-skill | What it checks | Plugin |
|-----------|---------------|--------|
| `/pf-component-structure` | Component nesting, wrapper hierarchies, layout composition | react |
| `/pf-import-checker` | Import paths across `@patternfly/*` packages | react |
| `/pf-raw-colors-scan` | Hardcoded hex/rgb/hsl values that should use design tokens | design-audit |
| `/pf-token-auditor` | Design token usage against PF token architecture | design-audit |
| `/pf-compliance-checker` | Component usage against PF design guidelines | design-audit |
| `/pf-class-migration-scanner` | Legacy CSS classes from older PF versions | migration |

### Testing — implementation done or tests needed

| Sub-skill | What it does | Plugin |
|-----------|-------------|--------|
| `/pf-unit-test-generator` | Generate unit tests for React components using Testing Library | react |

### Scaffolding — starting a new project or feature

| Sub-skill | What it does | Plugin |
|-----------|-------------|--------|
| `/pf-project-scaffolder` | Scaffold a PF React project with PF6-safe dependencies and starter layout | react |

### Design — Figma or design-related work

| Sub-skill | What it does | Plugin |
|-----------|-------------|--------|
| `/pf-figma-icon-finder` | Identify PF icons in Figma mockups and provide React imports | design-audit |
| `/pf-design-mode` | Create and edit Figma files using PF component libraries | design-guide |
| `/pf-design-comments` | Integrate `@patternfly/design-comments` for on-page design feedback | react |
| `/pf-ai-experience-patterns` | Apply Red Hat's AI design language to AI-powered features | design-guide |

## Context detection

Determine which contexts apply based on observable signals:

- **Validation**: changed or new `.tsx`, `.jsx`, `.css`, `.scss` files that import from `@patternfly/*`
- **Testing**: recently implemented or modified components without corresponding test updates
- **Scaffolding**: empty or new project directory, `package.json` just created, user asked to scaffold
- **Design**: Figma URLs in conversation, design-related user requests, `.figma` references

When multiple contexts apply, surface all relevant sub-skills and group findings by context. Only include context sections that were activated. Attribute findings to the specific sub-skill that produced them.
