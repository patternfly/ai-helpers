# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Repository Purpose

This is a **documentation and AI knowledge base repository** for PatternFly development. It provides indexed documentation, guidelines, and best practices that AI coding tools (Cursor, Copilot, ChatGPT, Claude) can use to generate accurate PatternFly code.

**This repository contains no runnable code** - it consists of markdown documentation files that should be copied into target projects.

## Documentation Structure

- `.pf-ai-documentation/` - Main documentation directory
  - `README.md` - Table of contents and navigation hub
  - `setup/` - Project initialization and environment setup
  - `guidelines/` - Core development principles and standards
  - `components/` - Component-specific rules (layout, data display)
  - `charts/` - PatternFly Charts (Victory.js/ECharts) rules
  - `chatbot/` - PatternFly Chatbot implementation rules
  - `component-groups/` - React Component Groups rules
  - `troubleshooting/` - Common issues and solutions

- `.cursor/rules/` - Cursor IDE rules that auto-apply to PatternFly code

## Key PatternFly Development Rules

When generating or reviewing PatternFly code, always follow these rules:

### Version Requirements

- **Always use PatternFly v6** - Use `pf-v6-` prefixed classes only
- Use `pf-t-` prefixed tokens over `pf-v6-` tokens (e.g., `var(--pf-t--global--spacer--sm)`)
- Use `<Content component="h1">` instead of deprecated `<Text component="h1">`

### Import Patterns

**Charts (CRITICAL):**

```jsx
// ✅ Correct - MUST include /victory
import { ChartDonut } from '@patternfly/react-charts/victory';

// ❌ Wrong - causes "Module not found" errors
import { ChartDonut } from '@patternfly/react-charts';
```

**Chatbot:**

```jsx
// ✅ Correct - use dynamic imports
import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';

// ❌ Wrong
import { Chatbot } from '@patternfly/chatbot';
```

**Component Groups:**

```jsx
// ✅ Correct - use dynamic imports
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
```

### Required CSS Imports

```jsx
import '@patternfly/patternfly/patternfly-charts.css';  // For charts
import '@patternfly/chatbot/dist/css/main.css';          // For chatbot
import '@patternfly/react-component-groups/dist/css/main.css'; // For component groups
```

### Common AI Mistakes to Avoid

- ❌ `className={styles.x}` - CSS modules syntax doesn't work
- ❌ Using non-existent components without verification
- ❌ Inline styles for layout (use PatternFly utilities)
- ❌ Hardcoded colors (use design tokens)
- ❌ Missing accessibility attributes (ARIA labels, keyboard navigation)

## Reference Resources

- [PatternFly.org](https://www.patternfly.org/) - Primary documentation
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react) - Source code and examples
- [PatternFly React Seed](https://github.com/patternfly/patternfly-react-seed) - Recommended starter for new projects
