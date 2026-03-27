# PatternFly Styling Plugin

AI plugin for CSS, SCSS, design tokens, and visual styling in PatternFly applications. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-styling@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly visual styling:

- Scanning for raw color values missing a design token mapping
- Analyzing CSS variable usage and SCSS patterns
- Auditing PatternFly modifier classes (pf-m-*)
- Validating token contrast ratios against AA/AAA standards
- Building and copying design tokens for PatternFly core
- Finding icons from the Red Hat Design System

Browse `skills/` for available skills (invoked as `/pf-styling:<skill-name>`) and `agents/` for domain knowledge.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Tokens](https://www.patternfly.org/design-foundations/tokens)

## License

MIT
