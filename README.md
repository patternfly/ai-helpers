# PatternFly AI Helpers

AI coding helpers for [PatternFly](https://www.patternfly.org/) development. This repository provides plugins, rules, and documentation to help AI tools generate accurate, best-practice PatternFly applications.

Plugins work in both **Claude Code** and **Cursor**. The content is identical — only the install path differs.

## Quick Start

### Claude Code

```bash
# Add the marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the PatternFly React plugin
/plugin install pf-react@ai-helpers
```

After installation, the plugin's agents and skills are available in any project.

### Cursor

Cursor can discover plugins from `.cursor-plugin/` directories. If you also have Claude Code installed, Cursor may pick up installed plugins automatically via its third-party plugin settings.

For lightweight PatternFly guidance without plugins, copy the `.cursor/rules/` directory into your project.

## Available Plugins

| Plugin | Description | Includes |
|--------|-------------|----------|
| **pf-react** | PatternFly React development standards | Coding standards agent, unit test generator agent, PatternFly MCP server |

See [plugins/pf-react/](plugins/pf-react/) for full documentation.

## Repository Structure

```
ai-helpers/
├── plugins/              # Plugins (work in both Claude Code and Cursor)
│   └── pf-react/
│       ├── .claude-plugin/   # Plugin manifest (Claude Code)
│       ├── .cursor-plugin/   # Plugin manifest (Cursor)
│       └── agents/           # Domain expert agents
├── docs/                 # AI-friendly PatternFly documentation
│   ├── guidelines/
│   ├── components/
│   ├── charts/
│   └── chatbot/
├── .cursor/rules/        # Cursor rules (standalone, no plugin needed)
├── .claude-plugin/       # Marketplace config (Claude Code)
└── .cursor-plugin/       # Marketplace config (Cursor)
```

Both `.claude-plugin/` and `.cursor-plugin/` contain identical manifests so each tool discovers plugins natively.

## Documentation

The `docs/` directory contains comprehensive, AI-friendly PatternFly documentation. See [docs/README.md](docs/README.md) for the full table of contents.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding plugins, skills, and documentation.

See [CONTRIBUTING-SKILLS.md](CONTRIBUTING-SKILLS.md) for a step-by-step guide to creating and contributing a skill.

## References

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
- [PatternFly MCP Server](https://github.com/patternfly/patternfly-mcp)

## License

[MIT](LICENSE)
