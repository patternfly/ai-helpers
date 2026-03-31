# PatternFly Figma Plugin

AI plugin for Figma design review, diffing, and asset identification for PatternFly. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-figma@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for the Figma-to-code workflow:

- Reviewing Figma designs for PatternFly conformance
- Comparing Figma designs against coded implementations
- Detecting changes between Figma design versions
- Summarizing implementation work from design updates
- Identifying icons and brand assets

Browse `skills/` for available skills (invoked as `/pf-figma:<skill-name>`) and `agents/` for domain knowledge.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Kit (Figma)](https://www.figma.com/community/file/1370151925110689873)

## License

MIT
