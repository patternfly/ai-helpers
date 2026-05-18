# Code Review Plugin

Code review and quality — PR summaries, adversarial review, and security patterns. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install code-review@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

### Skills

**Summarize PR Reviews** (`/code-review:summarize-pr-reviews`) — Summarizes GitHub PR review threads into concise, actionable feedback.

## File Structure

```text
code-review/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
│   └── summarize-pr-reviews/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)

## License

MIT
