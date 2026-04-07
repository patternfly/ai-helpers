---
name: pf-class-migration-scanner
description: Scans for legacy PatternFly class usage and recommends PF6-safe replacements. Use when modernizing older PatternFly codebases.
---

# PF Class Migration Scanner

Locate legacy PatternFly class names and migration risks.

When migration recommendations are ambiguous, query the PatternFly MCP server first to verify the latest supported component patterns and tokens.

## Migration scope

- Legacy versioned classes (`pf-v5-*`, `pf-v4-*`)
- Unversioned legacy classes (`pf-c-*`, `pf-u-*`, `pf-l-*`)
- Legacy token patterns (`--pf-v6-*`, `--pf-global-*`) that should use semantic tokens (`--pf-t--*`)

## Scan commands

```bash
rg "pf-v5-|pf-v4-|pf-c-|pf-u-|pf-l-" src
rg "--pf-v6-|--pf-global-" src
```

## Replacement guidance

- Prefer PatternFly React component props and composition first.
- If a utility class is still needed, use `pf-v6-u-*` variants.
- Prefer semantic tokens (`--pf-t--*`) over hardcoded values and legacy token names.

## Output format

For each finding include:

- file path
- current class/token
- recommended PF6 replacement
- confidence (`high`, `medium`, `low`)
