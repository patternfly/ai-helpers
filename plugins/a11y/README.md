# Accessibility Plugin

Accessibility auditing, reporting, and documentation for PatternFly applications. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install a11y@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## File Structure

```text
a11y/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Accessibility Guide](https://www.patternfly.org/accessibility/accessibility-fundamentals)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

## License

MIT
