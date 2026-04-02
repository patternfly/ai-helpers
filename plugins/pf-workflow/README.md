# PatternFly Workflow Plugin

Project management, issue tracking, and contributor workflow automation for PatternFly repositories. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-workflow@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly workflows:

- Creating well-structured GitHub issues
- Tracking followup work across repositories
- Managing pull requests and releases
- Coordinating cross-repo changes
- Dependency recommendations from manifests and code patterns (`dependency-recommender`)
- Pruning archived or stale repos from PatternFly Analytics `repos.json` (`analytics-repo-pruning`)

Browse `skills/` for available skills (invoked as `/pf-workflow:<skill-name>`) and `agents/` for domain knowledge.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Organization GitHub](https://github.com/patternfly)

## License

MIT
