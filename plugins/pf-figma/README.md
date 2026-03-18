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

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for the Figma-to-code workflow:

- Reviewing Figma designs for PatternFly conformance
- Comparing Figma designs against coded implementations
- Detecting changes between Figma design versions
- Summarizing implementation work from design updates
- Identifying icons and brand assets

### PatternFly MCP Server

Skills and agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) for looking up component documentation and design guidelines. No manual configuration needed.

## File Structure

```
pf-figma/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest + MCP server config
├── .cursor-plugin/
│   └── plugin.json        # Identical copy for Cursor
├── skills/                # Tasks that produce a result
├── agents/                # Domain knowledge the AI follows
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Kit (Figma)](https://www.figma.com/community/file/1370151925110689873)

## License

MIT
