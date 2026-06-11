# PatternFly AI Helpers

[![License](https://img.shields.io/github/license/patternfly/ai-helpers)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Plugins](https://img.shields.io/badge/plugins-7-blueviolet)](./PLUGINS.md)
[![Skills](https://img.shields.io/badge/skills-27-blue)](./PLUGINS.md)

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

<details>
<summary>See it in action</summary>

![Installing the PatternFly AI Helpers marketplace and using a skill in Claude Code](assets/claudecode-install-demo.gif)

</details>

### Cursor

#### Third-Party Plugin Import

If you've already installed plugins via Claude Code, Cursor can discover them automatically:

1. Open **Cursor Settings** → **Rules, Skills, Subagents**
2. Enable **"Include third-party Plugins, Skills, and other configs"**

Plugins installed via Claude Code appear immediately — no cloning or manual setup required.

<details>
<summary>See it in action</summary>

![Importing third-party plugins in Cursor and using a skill](assets/cursor-plugin-import-demo.gif)

</details>

#### Team Marketplace (Red Hat)

Red Hat Cursor Enterprise users have access to the PatternFly AI Helpers team marketplace:

1. Open **Cursor Settings** → **Plugins** → **Browse Marketplace**
2. Select **PatternFly AI Helpers**
3. Click **Get** on the plugins you need

<details>
<summary>See it in action</summary>

![Installing the react plugin from the PatternFly AI Helpers team marketplace in Cursor](assets/cursor-marketplace-install-demo.gif)

</details>

## Available Plugins

<!-- BEGIN PLUGIN TABLE -->
| Plugin | Description |
|--------|-------------|
| **a11y** | Accessibility auditing, reporting, and documentation |
| **code&#8209;review** | Code review and quality — adversarial review, security patterns |
| **design&#8209;audit** | Design audit — validate existing code and designs against PatternFly standards |
| **design&#8209;guide** | Design guide — component selection, interaction patterns, AI experience patterns, Figma design creation |
| **migration** | PF version migration — breaking change detection, class scanning, upgrade planning |
| **pf&#8209;workshop** | PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, new skill development |
| **react** | React component development — coding standards, testing, and structure |
<!-- END PLUGIN TABLE -->

See [PLUGINS.md](PLUGINS.md) for skills, agents, and usage details.

## PatternFly MCP Server (Recommended)

For the best experience, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp) which gives AI tools access to component documentation, prop schemas, and design guidelines. Skills and agents work without it but provide enhanced results when it's available.

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
