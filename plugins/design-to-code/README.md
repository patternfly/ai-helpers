# Design-to-Code Plugin

Design-to-code translation — Figma review, token auditing, icon identification, and design compliance. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install design-to-code@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

### Skills

**Figma Changes** (`/design-to-code:figma-changes`) — Detects and reports changes between Figma designs and their PatternFly implementations.

**Figma Icon Finder** (`/design-to-code:figma-icon-finder`) — Identifies PatternFly icons from Figma design files.

**Icon Finder** (`/design-to-code:icon-finder`) — Finds the right PatternFly icon by description or use case.

**PF AI Experience Patterns** (`/design-to-code:pf-ai-experience-patterns`) — Guides AI-related UI patterns following PatternFly design conventions.

**PF Compliance Checker** (`/design-to-code:pf-compliance-checker`) — Checks UI implementations against PatternFly design compliance rules.

**PF Design Mode** (`/design-to-code:pf-design-mode`) — Rapid design-focused mode for translating designs into PatternFly code.

**PF Raw Colors Scan** (`/design-to-code:pf-raw-colors-scan`) — Scans for raw color values that should use PatternFly design tokens.

**PF Token Auditor** (`/design-to-code:pf-token-auditor`) — Audits design token usage and identifies non-standard values.

## File Structure

```text
design-to-code/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
│   ├── figma-changes/
│   ├── figma-icon-finder/
│   ├── icon-finder/
│   ├── pf-ai-experience-patterns/
│   ├── pf-compliance-checker/
│   ├── pf-design-mode/
│   ├── pf-raw-colors-scan/
│   └── pf-token-auditor/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Design Tokens](https://www.patternfly.org/tokens/all-patternfly-tokens)
- [Figma](https://www.figma.com/)

## License

MIT
