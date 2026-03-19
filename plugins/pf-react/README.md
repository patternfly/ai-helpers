# PatternFly React Plugin

AI plugin for PatternFly React development with coding standards enforcement and unit test generation. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-react@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly React development:

- Coding standards enforcement for components, styling, accessibility, and TypeScript
- Unit test generation following Testing Library best practices
- React and PatternFly-specific patterns and conventions

Browse `skills/` for available skills (invoked as `/pf-react:<skill-name>`) and `agents/` for domain knowledge.

### PatternFly MCP Server

Skills and agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) for looking up component documentation and prop schemas. No manual configuration needed.

## File Structure

```
pf-react/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest + MCP server config
├── .cursor-plugin/
│   └── plugin.json        # Identical copy for Cursor
├── skills/                # Tasks that produce a result
├── agents/                # Domain knowledge the AI follows
└── README.md
```

## Troubleshooting

**Plugin not recognized:**
```bash
/plugin list                         # Verify plugin is installed
/plugin install pf-react@ai-helpers  # Reinstall if needed
```

**MCP server not connecting:**
```bash
/mcp status  # Check MCP server status
```

If MCP is unavailable, agents fall back to their built-in documentation.

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
- [PatternFly MCP Server](https://github.com/patternfly/patternfly-mcp)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## License

MIT
