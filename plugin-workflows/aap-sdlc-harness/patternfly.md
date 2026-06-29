## PatternFly Workflow Integration

When `package.json` contains `@patternfly/*` dependencies and PatternFly
plugin skills are available, invoke these as pre/post-steps.

### After `/code-review`

- `/pf-component-structure` — validate component nesting, wrapper hierarchies, layout composition
- `/pf-import-checker` — verify import paths across `@patternfly/react-core`, `react-icons`, `react-table`
- `/pf-raw-colors-scan` — find hardcoded hex/rgb/hsl values that should use PF design tokens
- `/pf-token-auditor` — audit design token usage against PF6 token architecture

### After `/story-implementation-workflow`

- `/pf-unit-test-generator` — generate unit tests using Testing Library with PF-aware patterns
- `/pf-component-structure` — validate component hierarchy before committing
- `/pf-import-checker` — verify imports resolve correctly
