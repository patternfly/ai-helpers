# PatternFly Accessibility Plugin

AI plugin for accessibility auditing, reporting, and documentation in PatternFly applications. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-a11y@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly accessibility:

- Automated a11y audits with standard report output
- WCAG conformance checking
- Accessibility documentation scaffolding
- UI review for PatternFly conformance and deviations

### PatternFly MCP Server

Skills and agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) for looking up component documentation and accessibility guidelines. No manual configuration needed.

## File Structure

```
pf-a11y/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest + MCP server config
├── .cursor-plugin/
│   └── plugin.json        # Identical copy for Cursor
├── skills/                # User-invoked skills (slash commands)
├── agents/                # Auto-invoked domain agents
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Accessibility Guide](https://www.patternfly.org/accessibility/accessibility-fundamentals)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

## License

MIT
