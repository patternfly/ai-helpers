# PatternFly AI Helpers

[![License](https://img.shields.io/github/license/patternfly/ai-helpers)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Plugins](https://img.shields.io/badge/plugins-8-blueviolet)](./PLUGINS.md)
[![Skills](https://img.shields.io/badge/skills-32-blue)](./PLUGINS.md)

AI coding helpers for [PatternFly](https://www.patternfly.org/) development. This repository provides plugins and documentation to help AI tools generate accurate, best-practice PatternFly applications.

Plugins work in both **Claude Code** and **Cursor**. The content is identical — only the install path differs.

## Quick Start

### Claude Code

```bash
# Add the marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugins you need
/plugin install react@ai-helpers
```

After installation, the plugin's agents and skills are available in any project.

### Cursor

Cursor can discover plugins from `.cursor-plugin/` directories. If you also have Claude Code installed, Cursor may pick up installed plugins automatically via its third-party plugin settings.

## Available Plugins

<!-- BEGIN PLUGIN TABLE -->
| Plugin | Description |
|--------|-------------|
| **a11y** | Accessibility auditing, reporting, and documentation |
| **code&#8209;review** | Code review and quality — adversarial review, security patterns |
| **design&#8209;audit** | Design audit — validate existing code and designs against PatternFly standards |
| **design&#8209;guide** | Design guide — component selection, interaction patterns, AI experience patterns, Figma design creation |
| **migration** | PF version migration — breaking change detection, class scanning, upgrade planning |
| **patternfly&#8209;mcp** | PatternFly MCP server — provides component documentation, design token lookup, and accessibility guidance via the Model Context Protocol |
| **pf&#8209;workshop** | PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development |
| **react** | React component development — coding standards, testing, and structure |
<!-- END PLUGIN TABLE -->

See [PLUGINS.md](PLUGINS.md) for skills, agents, and usage details.

## PatternFly MCP Server (Recommended)

For the best experience, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) which gives AI tools access to component documentation, prop schemas, and design guidelines. Skills and agents work without it but provide enhanced results when it's available.

## Architecture

```mermaid
graph TD
    A[AI Tool] -->|discovers| B[".<tool>-plugin/marketplace.json"]
    B -->|references| C[plugins/react]
    B -->|references| D[plugins/design-to-code]
    B -->|references| E[plugins/...]
    C --- F[skills/ + agents/]
    D --- G[skills/ + agents/]
    E --- H[skills/ + agents/]
```

### How it works

1. Each AI tool looks for its own directory (`.claude-plugin/`, `.cursor-plugin/`) to find `marketplace.json`
2. The marketplace lists plugins with relative paths to `plugins/<name>/`
3. Each plugin has identical manifests in `.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json`
4. Adding support for a new tool = copying the manifest into a new `.<tool>-plugin/` directory

## Repository Structure

```
ai-helpers/
├── .claude-plugin/       # Claude Code marketplace config
├── .cursor-plugin/       # Cursor marketplace config
├── plugins/
│   └── <plugin-name>/    # One directory per plugin
│       ├── .claude-plugin/
│       ├── .cursor-plugin/
│       ├── skills/
│       └── agents/
└── docs/                 # AI-friendly PatternFly documentation
```

## Documentation

The `docs/` directory contains comprehensive, AI-friendly PatternFly documentation. See [docs/README.md](docs/README.md) for the full table of contents.

## Security & Governance

See [SECURITY.md](SECURITY.md) for vulnerability reporting and [GOVERNANCE.md](GOVERNANCE.md) for how contributions are reviewed.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on adding plugins, skills, and documentation.

See [CONTRIBUTING-SKILLS.md](CONTRIBUTING-SKILLS.md) for a step-by-step guide to creating and contributing a skill.

## References

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)
- [PatternFly MCP Server](https://github.com/patternfly/patternfly-mcp)

## License

[MIT](LICENSE)
