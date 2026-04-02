---
name: pf-project-scaffolder
description: Scaffolds PatternFly React projects with PF6-safe dependencies, imports, and starter layout. Use when creating a new PatternFly app or bootstrapping a migration sandbox.
---

# PF Project Scaffolder

Create a clean PatternFly React starting point with current conventions.

Use the PatternFly MCP server as the primary source for up-to-date component APIs, usage examples, and migration-safe setup guidance.

## Recommended starting point

Use the official PatternFly React seed repository first when possible.

```bash
git clone https://github.com/patternfly/patternfly-react-seed
cd patternfly-react-seed
npm install
npm run start:dev
```

## Required dependencies

```bash
npm install @patternfly/react-core @patternfly/react-icons @patternfly/react-table
```

Feature-based dependencies:

```bash
npm install @patternfly/react-charts victory
npm install @patternfly/chatbot
npm install @patternfly/react-component-groups
```

## Baseline app requirements

```tsx
import "@patternfly/react-core/dist/styles/base.css";
```

Add feature CSS only when relevant:

```tsx
import "@patternfly/patternfly/patternfly-charts.css";
import "@patternfly/chatbot/dist/css/main.css";
import "@patternfly/react-component-groups/dist/css/main.css";
```

## Initial quality checklist

- Uses PatternFly v6 classes and semantic tokens.
- Uses PatternFly components for layout (`PageSection`, `Stack`, `Grid`) before utility classes.
- Handles loading, error, and empty states for data views.
- Includes accessible names/labels for interactive controls.
