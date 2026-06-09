# PatternFly Content Plugin

AI plugin for PatternFly content design — voice and tone standards, content review, and UX writing guidance. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install content@ai-helpers
```

For enhanced results, also install the [PatternFly MCP server](https://github.com/patternfly/patternfly-mcp).

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills and agents for PatternFly content design:

- Voice and tone standards based on PatternFly's official content design guidelines
- Content review and rewriting against PatternFly's style rules

### Skills

Skills are tasks that produce a result.

**PF Content Review** (`/content:pf-content-review`) — Audits or rewrites markdown content to match PatternFly voice and tone. Accepts a file path or pasted content and produces an annotated issues list (audit mode) or revised content (rewrite mode).

### Agents

Agents are domain knowledge the AI follows.

**PF Voice and Tone** — PatternFly content design standards:

- Brand voice traits: friendly, approachable, collaborative, inventive
- Grammar and style rules (capitalization, punctuation, tense, point of view)
- Vocabulary guidelines (words to avoid and prefer)
- Structural patterns (lead with the benefit, active voice, error message formula)
- Design guidelines writing conventions

## File Structure

```text
content/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── agents/
│   └── pf-voice-and-tone.md
├── skills/
│   └── pf-content-review/
│       └── SKILL.md
└── README.md
```

## Sources

- [PatternFly content design guidelines](https://www.patternfly.org/content-design/overview)
- [PatternFly brand voice and tone](https://www.patternfly.org/content-design/brand-voice-and-tone)
- [PatternFly best practices](https://www.patternfly.org/content-design/best-practices)

## License

MIT
