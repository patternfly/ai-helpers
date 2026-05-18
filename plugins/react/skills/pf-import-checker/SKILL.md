---
name: pf-import-checker
description: Audit and fix invalid PatternFly import paths across packages. Use when imports fail, modules are unresolved, or after upgrading PatternFly versions.
---

# PF Import Checker

Find and fix invalid PatternFly import patterns.

Before proposing import fixes, use the PatternFly MCP server to confirm current package paths and examples from the latest docs.

## What to check

1. Charts imported from `@patternfly/react-charts` root (invalid for Victory components).
2. Chatbot imports not using `@patternfly/chatbot/dist/dynamic/*`.
3. Component-group imports not using `@patternfly/react-component-groups/dist/dynamic/*`.
4. Missing package CSS imports for features in use.

## Validation commands

```bash
rg "@patternfly/react-charts['\"]" src
rg "@patternfly/chatbot['\"]" src
rg "@patternfly/react-component-groups['\"]" src
```

## Correct import examples

```tsx
import { ChartDonut } from "@patternfly/react-charts/victory";
import { Chatbot } from "@patternfly/chatbot/dist/dynamic/Chatbot";
import { BulkSelect } from "@patternfly/react-component-groups/dist/dynamic/BulkSelect";
```

## Output format

Provide:

- offending file paths
- exact import lines to replace
- corrected import lines
- any CSS import additions needed
