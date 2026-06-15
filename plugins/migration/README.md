# Migration Plugin

PF version migration — breaking change detection, class scanning, and upgrade planning. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install migration@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

### Skills

**PF Class Migration Scanner** (`/migration:pf-class-migration-scanner`) — Scans a codebase for deprecated PatternFly CSS classes and suggests replacements for version upgrades.

**PF React Breaking Changes** (`/migration:pf-react-breaking-changes`) — Scans for `@patternfly/react-*` API breaking changes (removed props, renamed components, import path changes) and generates a markdown report.

## File Structure

```text
migration/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
│   ├── pf-class-migration-scanner/
│   └── pf-react-breaking-changes/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Migration Guide](https://www.patternfly.org/get-started/upgrade)

## License

MIT
