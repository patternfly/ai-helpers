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

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly accessibility:

- Automated a11y audits with standard report output
- WCAG conformance checking
- Accessibility documentation scaffolding
- UI review for PatternFly conformance and deviations

Browse `skills/` for available skills (invoked as `/pf-a11y:<skill-name>`) and `agents/` for domain knowledge.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Accessibility Guide](https://www.patternfly.org/accessibility/accessibility-fundamentals)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

## License

MIT
