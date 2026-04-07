# Issue Management Plugin

Issue creation, tracking, and cross-project coordination for PatternFly repositories. Works in both **Claude Code** and **Cursor**.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install issue-management@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

Skills for managing issues across GitHub and Jira:

- Creating well-structured GitHub issues with template detection and duplicate search
- Duplicating Jira epics across projects with linking and assignment

Browse `skills/` for available skills (invoked as `/issue-management:<skill-name>`).

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly Organization GitHub](https://github.com/patternfly)

## License

MIT
