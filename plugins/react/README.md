# PatternFly React Plugin

AI plugin for PatternFly React development with coding standards enforcement and unit test generation. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install react@ai-helpers
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

**PF Unit Test Generator** (`/react:pf-unit-test-generator`) — Generates a complete unit test file for a given React component. Works for both consumer applications and component library contributions, following Testing Library best practices.

**PF Component Structure** (`/react:pf-component-structure`) — Analyzes and validates PatternFly component composition and structure.

**PF Import Checker** (`/react:pf-import-checker`) — Checks PatternFly imports for correctness and best practices.

**PF Project Scaffolder** (`/react:pf-project-scaffolder`) — Scaffolds a new PatternFly React project with recommended structure.

**PF Prototype Mode** (`/react:pf-prototype-mode`) — Rapid prototyping mode for quickly building PatternFly UI layouts.

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

**Component Structure Audit** — PatternFly React structural composition rules for layouts and component hierarchies.

## File Structure

```text
react/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── agents/
│   ├── component-structure-audit.md
│   ├── pf-coding-standards.md
│   └── pf-unit-test-standards.md
├── skills/
│   ├── pf-component-structure/
│   ├── pf-import-checker/
│   ├── pf-project-scaffolder/
│   ├── pf-prototype-mode/
│   └── pf-unit-test-generator/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

## License

MIT
