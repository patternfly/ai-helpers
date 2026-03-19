# PatternFly Design Tokens Plugin

AI plugin for PatternFly design token auditing, validation, and migration. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-design-tokens@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for working with PatternFly design tokens:

- Scanning for raw hex values missing a token mapping
- Checking CSS variable definitions for completeness
- Validating token contrast ratios against AA/AAA standards
- Suggesting semantic tokens for common use cases
- Mapping Figma-only token references to code equivalents

Browse `skills/` for available skills (invoked as `/pf-design-tokens:<skill-name>`) and `agents/` for domain knowledge.

### PatternFly MCP Server

Skills and agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) for looking up component documentation and token references. No manual configuration needed.

## File Structure

```
pf-design-tokens/
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
- [PatternFly Design Tokens](https://www.patternfly.org/design-foundations/tokens)

## License

MIT
