---
name: pf-component-reuse-check
description: >-
  Detects custom React components in newly created or modified (uncommitted)
  code that overlap with PatternFly React components, suggests the PatternFly
  equivalent, and can replace the custom component then build to verify.
  Use when creating UI components, reviewing uncommitted React changes, or when
  the user asks to prefer PatternFly instead of a custom component.
---

# PF Component Reuse Check

Prefer existing PatternFly React components over custom ones that reinvent the same UI role.

## Scope — uncommitted changes only

Analyze **only** files that are newly created or currently modified and not yet committed. The user has already decided on committed code — do not scan or refactor it.

Identify scope with git:

```bash
git status --short
git diff --name-only HEAD
git ls-files --others --exclude-standard
```

Include:

- Modified tracked files (`M`, `A`, staged or unstaged)
- Untracked new files

Exclude:

- Unchanged committed files
- Deleted files (unless they only remove a custom component you are replacing)
- Generated/vendor directories (`node_modules`, `dist`, `build`, coverage)

If there is no git repo, ask the user which new/changed files to check. Never invent a whole-repo audit.

Limit analysis to component-relevant extensions: `.tsx`, `.jsx`, `.ts`, `.js` (and co-located styles only when tied to a candidate component).

## Workflow

Track progress:

```
- [ ] 1. Collect uncommitted candidates
- [ ] 2. Match against PatternFly React
- [ ] 3. Report suggestions (ask before replacing)
- [ ] 4. Replace (only if requested)
- [ ] 5. Build and verify
```

### 1. Collect uncommitted candidates

From scoped files, find **custom components** being introduced or substantially changed:

- Exported `function` / `const` components and default exports
- New JSX structures that implement a known UI role (button, modal, alert, table, tabs, empty state, form controls, etc.)
- Local wrappers that mostly re-skin or re-compose primitives into something PatternFly already ships

Skip:

- Components that already wrap/compose PatternFly correctly (thin app shells, domain layouts)
- Pure utility hooks, non-UI helpers, test fixtures
- Page/route containers whose job is orchestration, not a reusable UI control

For each candidate, capture: name, file path, props surface, and intended UI role (1 short sentence).

### 2. Match against PatternFly React

Use the PatternFly MCP as the source of truth:

1. `searchPatternFlyDocs` with role keywords from the candidate (name, props, visual behavior). Try synonyms from [references/role-aliases.md](references/role-aliases.md).
2. `usePatternFlyDocs` for promising matches (schema + examples) to confirm prop/API fit.
3. Prefer `@patternfly/react-core`, `@patternfly/react-table`, `@patternfly/react-charts`, `@patternfly/chatbot`, and `@patternfly/react-component-groups` as appropriate.

Match confidence:

| Level | Meaning |
|-------|---------|
| High | Same UI role and enough prop coverage to replace without inventing a new abstraction |
| Medium | Same role, but some custom behavior needs PatternFly props, composition, or a small wrapper |
| Low | Related family only — mention as optional alternative, do not push replacement |

Do not suggest a match on name similarity alone. Confirm role + interaction model from docs/examples.

### 3. Report suggestions

For each High/Medium match, present before changing anything:

```
### [ComponentName] → PatternFly [PFComponent]

- File: path/to/file.tsx
- Confidence: High | Medium
- Why: <one sentence on overlapping role>
- Import: `import { PFComponent } from '@patternfly/...'`
- Docs: <MCP / patternfly.org link when available>
- Gaps: <custom behavior not covered, or "none">

Replace with PatternFly? (yes / no / adjust)
```

End with a short summary: candidates checked, matches found, no-match custom components kept.

If no matches: say so briefly and stop. Do not force PatternFly onto domain-specific UI.

### 4. Replace (only when the user asks)

When the user confirms replacement (or says to replace / use PatternFly instead):

1. Replace custom component usage with the PatternFly component API from MCP docs/examples.
2. Map props intentionally; do not invent unsupported props.
3. Add or fix imports (follow `pf-import-checker` rules for charts, chatbot, component-groups).
4. Remove the custom component definition and dead exports when fully replaced.
5. Update call sites in **scoped** files. If a committed file still imports the removed custom component, report it and ask before editing outside scope.
6. For Medium confidence, prefer PatternFly composition first; keep a thin wrapper only if truly required, and say why.

### 5. Build and verify

After replacement:

1. Detect the package manager (`package-lock.json` → npm, `yarn.lock` → yarn, `pnpm-lock.yaml` → pnpm).
2. Ensure required `@patternfly/*` dependencies exist; install only what the replacement needs.
3. Run the project's build script from `package.json` (`build`, else `compile` / `tsc` as available).

```bash
# examples — use the project's actual scripts
npm run build
# or: yarn build | pnpm run build
```

4. If the build fails due to the replacement, fix those errors and rebuild.
5. Report: build command used, pass/fail, files changed, remaining gaps.

Do not claim success without a successful build (or a clear blocker outside the replacement, such as pre-existing project failures — distinguish those).

## Guardrails

- Never expand the audit into committed, untouched components.
- Never replace without an explicit user yes (or an explicit “replace with PatternFly” request in the prompt).
- Never invent PatternFly APIs — confirm with MCP docs/schemas.
- Prefer one clear PatternFly component (or standard composition) over a large custom rewrite.
- If PatternFly coverage is incomplete, recommend keep-custom or hybrid and explain the gap.

## Related skills

- `pf-import-checker` — after adding/changing `@patternfly/*` imports
- `pf-component-structure` — when composing nested PatternFly wrappers
- `pf-project-scaffolder` — when the project is missing PatternFly setup
