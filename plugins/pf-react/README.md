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

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly React development:

- Coding standards enforcement for components, styling, accessibility, and TypeScript
- Unit test generation following Testing Library best practices
- React and PatternFly-specific patterns and conventions

### Skills

Skills are tasks that produce a result.

**PF Unit Test Generator** (`/pf-react:pf-unit-test-generator`) — Generates a complete unit test file for a given React component, following Testing Library best practices.

**PF Bug Triage** (`/pf-react:pf-bug-triage`) — Performs preliminary triage of opened bug issues. Suggests what needs to be updated to fix the bug, provides context for assignees, and recommends the most appropriate maintainer to tag when the issue contains questions.

### Agents

Agents are domain knowledge the AI follows.

**PF Coding Standards** — PatternFly React best practices:

- Component composition patterns
- PatternFly v6 styling standards
- Design token usage
- Accessibility requirements (WCAG 2.1 Level AA)
- React and TypeScript best practices

**PF Unit Test Standards** — Unit testing standards following Testing Library best practices:

- User behavior testing over implementation details
- Semantic query strategies
- Proper mocking patterns
- Accessibility testing
- PatternFly-specific patterns

## File Structure

```
pf-react/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── agents/
│   ├── pf-coding-standards.md
│   └── pf-unit-test-standards.md
├── skills/
│   ├── pf-bug-triage/
│   │   └── SKILL.md
│   └── pf-unit-test-generator/
│       └── SKILL.md
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## License

MIT
