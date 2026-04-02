# PatternFly AI Helpers

AI coding helpers for PatternFly development — plugins, skills, agents, and documentation for Claude Code and Cursor.

## Working in this repo

- Plugin manifests must be identical in `.claude-plugin/` and `.cursor-plugin/` — always update both
- After adding or renaming skills/agents, run `bash scripts/generate-plugins-md.sh` to regenerate PLUGINS.md and the README plugin table
- Skills/agents that are PatternFly-specific use the `pf-` prefix (e.g., `pf-unit-test-generator`). Generic skills do not.
- Do not add `mcpServers` to plugin.json files — the PatternFly MCP is a separate user install documented in each plugin's README

## Key paths

See [PLUGINS.md](PLUGINS.md) for the full list of plugins, skills, and agents.

- `plugins/<name>/skills/` — Skill definitions (SKILL.md)
- `plugins/<name>/agents/` — Agent definitions (markdown)
- `plugins/<name>/.claude-plugin/plugin.json` — Plugin manifest
- `docs/` — AI-friendly PatternFly documentation (see `docs/README.md`)
- `.claude-plugin/marketplace.json` / `.cursor-plugin/marketplace.json` — Marketplace config
