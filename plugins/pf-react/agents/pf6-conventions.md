---
name: pf6-conventions
description: Always-on PatternFly 6 React conventions for imports, styling, and accessibility. Use when writing, reviewing, or refactoring PatternFly React code.
---

# PatternFly 6 Conventions

Apply these rules by default for PatternFly React work.

## Core rules

- Use PatternFly v6 classes only (`pf-v6-*`).
- Prefer semantic tokens (`--pf-t--*`) over hardcoded values.
- Use PatternFly components for layout and typography before utility classes.
- Keep accessibility baseline: labels for interactive controls, keyboard support, and semantic heading structure.
- For API/source-of-truth checks, query the PatternFly MCP server first to get the latest component docs and examples.

## Import rules

- Charts must import from `@patternfly/react-charts/victory`.
- Chatbot components must import from `@patternfly/chatbot/dist/dynamic/*`.
- Component groups must import from `@patternfly/react-component-groups/dist/dynamic/*`.

## CSS rules

Always include:

```tsx
import "@patternfly/react-core/dist/styles/base.css";
```

Include package CSS only when used:

```tsx
import "@patternfly/patternfly/patternfly-charts.css";
import "@patternfly/chatbot/dist/css/main.css";
import "@patternfly/react-component-groups/dist/css/main.css";
```

## Common anti-patterns

- Do not import charts from `@patternfly/react-charts` root.
- Do not use `pf-v5-*`, `pf-c-*`, or unversioned `pf-*` class prefixes.
- Do not rely on inline hardcoded spacing/color when a token exists.
