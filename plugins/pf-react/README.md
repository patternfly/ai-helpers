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

### Skills

Skills are tasks that produce a result.

**Unit Test Generator** (`/pf-react:unit-test-generator`) — Generates a complete unit test file for a given React component, following Testing Library best practices.

**PF Library Test Writer** (`/pf-react:pf-library-test-writer`) — Writes unit tests for components and features across the PatternFly ecosystem (patternfly-react, patternfly-chatbot, etc.), strictly following the [official testing guidelines](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines):

- Separate test files per exported component
- `test()` outside `describe()`, `it()` inside
- `screen` for queries, `asFragment` for snapshots only
- Snapshots for structure, `toHaveClass` for CSS classes
- Mock child components for unit isolation
- Default to inline setup (no premature abstraction)

### Agents

Agents are domain knowledge the AI follows.

**Coding Standards** — PatternFly React best practices:

- Component composition patterns
- PatternFly v6 styling standards
- Design token usage
- Accessibility requirements (WCAG 2.1 Level AA)
- React and TypeScript best practices

**Unit Test Standards** — Unit testing standards following Testing Library best practices:

- User behavior testing over implementation details
- Semantic query strategies
- Proper mocking patterns
- Accessibility testing
- PatternFly-specific patterns

### PatternFly MCP Server

Both agents have access to the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) which provides:

- **`searchPatternFlyDocs`** — Search for component documentation
- **`usePatternFlyDocs`** — Get full docs and JSON schemas

No manual configuration needed — the MCP server is defined in `plugin.json`.

## File Structure

```
pf-react/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest + MCP server config
├── .cursor-plugin/
│   └── plugin.json        # Identical copy for Cursor
├── agents/
│   ├── coding-standards.md
│   └── unit-test-standards.md
├── skills/
│   ├── unit-test-generator/
│   │   └── SKILL.md
│   └── pf-library-test-writer/
│       └── SKILL.md
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
