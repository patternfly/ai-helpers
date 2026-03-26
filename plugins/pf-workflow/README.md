# PatternFly Workflow Plugin

Project management, issue tracking, and contributor workflow automation for PatternFly repositories.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-workflow@ai-helpers
```

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

### PatternFly MCP Server

Skills and agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) for looking up component documentation and prop schemas. No manual configuration needed.

## Troubleshooting

**Plugin not recognized:**

```bash
/plugin list                         # Verify plugin is installed
/plugin install pf-workflow@ai-helpers  # Reinstall if needed
```

**MCP server not connecting:**

```bash
/mcp status  # Check MCP server status
```

If MCP is unavailable, agents fall back to their built-in documentation.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Organization GitHub](https://github.com/patternfly)
- [PatternFly MCP Server](https://github.com/patternfly/patternfly-mcp)

## License

MIT
