# Figma Plugin

Figma design review, diffing, and asset identification for PatternFly. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install figma@ai-helpers
```

The `pf-design-mode` skill requires the official Figma plugin. Install it before using that skill:

```bash
/plugin install figma
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

Install this plugin from the Cursor marketplace or see the [root README](../../README.md) for options.

The `pf-design-mode` skill requires the official [Figma plugin for Cursor](https://cursor.com/marketplace). Install it from the Cursor marketplace before using that skill.

## What's Included

Skills for the Figma-to-code workflow:

- Detecting changes between Figma design versions
- Summarizing implementation work from design updates

Browse `skills/` for available skills (invoked as `/figma:<skill-name>`).

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Kit (Figma)](https://www.figma.com/community/file/1370151925110689873)

## License

MIT
