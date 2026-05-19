# PF Workshop Plugin

PatternFly team tools and skill incubation — issue triage, release management, codebase auditing, and new skill development. Works in both **Claude Code** and **Cursor**.

This plugin serves a dual purpose: it houses permanent team workflow tools and acts as an incubator for skills that aren't yet ready for a consumer plugin. Skills graduate to consumer plugins when mature.

## Installation

### Claude Code

```bash
# Add the PatternFly marketplace
/plugin marketplace add patternfly/ai-helpers

# Install the plugin
/plugin install pf-workshop@ai-helpers
```

### Cursor

See the [root README](../../README.md) for Cursor installation options.

## What's Included

### Skills

**Analytics Repo Pruning** (`/pf-workshop:analytics-repo-pruning`) — Flags archived or inactive repositories in PatternFly Analytics for pruning.

**CSS Var Analyzer** (`/pf-workshop:css-var-analyzer`) — Analyzes CSS custom property usage across the PatternFly codebase.

**Duplicate Epic** (`/pf-workshop:duplicate-epic`) — Duplicates a Jira epic with all its child issues.

**PF Analyze Modifiers** (`/pf-workshop:pf-analyze-modifiers`) — Finds, lists, and summarizes PatternFly component modifiers across SCSS files.

**PF Bug Triage** (`/pf-workshop:pf-bug-triage`) — Performs preliminary triage of bug issues with fix suggestions and maintainer tagging.

**PF Create Issue** (`/pf-workshop:pf-create-issue`) — Creates Jira issues using PatternFly-specific templates.

**PF Org Version Update** (`/pf-workshop:pf-org-version-update`) — Tracks and updates PatternFly version usage across organization repositories.

**PF Tokens** (`/pf-workshop:pf-tokens`) — Looks up and documents PatternFly design tokens.

**Quarterly Initiative Report** (`/pf-workshop:quarterly-initiative-report`) — Generates quarterly initiative reports from Jira data.

**Semantic Release Troubleshooting** (`/pf-workshop:semantic-release-troubleshooting`) — Diagnoses semantic-release pipeline issues.

**Summarize Jira Issues** (`/pf-workshop:summarize-jira-issues`) — Summarizes Jira issues for standup and status reporting.

**Write Example Description** (`/pf-workshop:write-example-description`) — Writes descriptions for PatternFly.org component examples.

## File Structure

```text
pf-workshop/
├── .claude-plugin/
│   └── plugin.json
├── .cursor-plugin/
│   └── plugin.json
├── skills/
│   ├── analytics-repo-pruning/
│   ├── css-var-analyzer/
│   ├── duplicate-epic/
│   ├── pf-analyze-modifiers/
│   ├── pf-bug-triage/
│   ├── pf-create-issue/
│   ├── pf-org-version-update/
│   ├── pf-tokens/
│   ├── quarterly-initiative-report/
│   ├── semantic-release-troubleshooting/
│   ├── summarize-jira-issues/
│   └── write-example-description/
└── README.md
```

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react)

## License

MIT
