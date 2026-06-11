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

Skills and agents for PatternFly and Red Hat content design — applicable to both UX microcopy and long-form documentation:

- Voice and tone standards rooted in PatternFly's content design guidelines and the Red Hat brand
- Content review and rewriting against those standards

### Skills

Skills are tasks that produce a result.

**Content Review** (`/content:content-review`) — Audits or rewrites markdown content to match PatternFly and Red Hat voice and tone. Accepts a file path or pasted content and produces an annotated issues list (audit mode) or revised content (rewrite mode).

### Agents

Agents are domain knowledge the AI follows.

**Voice and Tone** — PatternFly and Red Hat content design standards, applicable to UX microcopy and long-form content:

- Brand voice traits: friendly, approachable, collaborative, inventive
- Grammar and style rules (capitalization, punctuation, tense, point of view)
- Vocabulary guidelines (words to avoid, AI language flags, superlatives)
- Structural patterns (lead with the benefit, active voice, error message formula, credibility)
- Abbreviations and acronym handling
- Design guidelines writing conventions

## File Structure

```text
content/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── agents/
│   └── voice-and-tone.md
├── skills/
│   └── content-review/
│       └── SKILL.md
└── README.md
```

## Sources

- [PatternFly content design guidelines](https://www.patternfly.org/content-design/overview)
- [PatternFly brand voice and tone](https://www.patternfly.org/content-design/brand-voice-and-tone)
- [PatternFly best practices](https://www.patternfly.org/content-design/best-practices)
- [Red Hat brand standards](https://www.redhat.com/en/about/brand/standards/personality)
- [Red Hat Design System: content accessibility](https://ux.redhat.com/accessibility/content/)
- Red Hat corporate style guide
- Writing for Red Hat: Takeaway guide

## License

MIT
