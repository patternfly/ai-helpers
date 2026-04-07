# Repo Management Plugin

Release versioning, dependency analysis, and repository health for PatternFly projects. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install repo-management@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills for maintaining repositories:

- Updating PatternFly org with release and pre-release versions
- Recommending dependencies from manifests and code patterns
- Pruning archived or stale repos from PatternFly Analytics

Browse `skills/` for available skills (invoked as `/repo-management:<skill-name>`).

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Organization GitHub](https://github.com/patternfly)

## License

MIT
