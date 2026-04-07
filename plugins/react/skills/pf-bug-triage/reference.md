# Bug Triage Reference

## Maintainer Lookup

### CODEOWNERS Format

GitHub CODEOWNERS uses path-based ownership:

```
# Default owners
*       @org/team

# Component-specific
/packages/react-table/     @user1 @user2
/packages/react-charts/    @user3
/docs/                    @org/docs-team
```

Match the issue's affected files to the most specific path. Tag owners from the best-matching entry.

### Common PatternFly Repos

| Repo | Structure | Maintainer Sources |
|------|-----------|---------------------|
| patternfly-react | `packages/react-*/` | CODEOWNERS, package.json maintainers |
| ai-helpers | `plugins/`, `docs/` | CONTRIBUTING.md, plugin READMEs |
| patternfly | `src/` (CSS, tokens) | CODEOWNERS |

### When to Tag

Tag a maintainer only when the issue **asks a question** such as:
- "Is this expected behavior?"
- "Should we support X?"
- "What's the recommended approach?"
- "Is this a known limitation?"

Do **not** tag for:
- Straightforward bugs with clear reproduction
- Issues that only need implementation
- Questions the assignee can answer from docs
