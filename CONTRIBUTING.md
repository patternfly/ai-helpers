# Contributing to PatternFly AI Helpers

We welcome contributions of new plugins, skills, agents, documentation, and Cursor rules.

Plugins in this repo work in both **Claude Code** and **Cursor**. Each plugin has both a `.claude-plugin/` and `.cursor-plugin/` directory with identical manifests, so each tool discovers it natively.

## Repository Structure

```
plugins/              # Plugins (skills, agents, MCP servers)
docs/                 # AI-friendly PatternFly documentation
.cursor/rules/        # Cursor IDE rules (standalone, no plugin needed)
.claude-plugin/       # Marketplace config (Claude Code)
.cursor-plugin/       # Marketplace config (Cursor)
```

## Adding a Skill to an Existing Plugin

This is the simplest way to contribute. See [CONTRIBUTING-SKILLS.md](CONTRIBUTING-SKILLS.md) for a full walkthrough.

1. Create a directory under the plugin's `skills/` folder: `plugins/<plugin-name>/skills/your-skill/`
2. Add a `SKILL.md` with your instructions in plain markdown
3. Open a pull request

Your skill becomes available as `/<plugin-name>:your-skill` once merged.

## Creating a New Plugin

Create a new plugin when your contribution doesn't fit into an existing one — for example, a new domain like charts, chatbot patterns, or migration tooling.

1. Create a new directory under `plugins/your-plugin-name/`
2. Add a `plugin.json` to both `.claude-plugin/` and `.cursor-plugin/` (identical content):
   ```json
   {
     "name": "your-plugin-name",
     "description": "What your plugin does",
     "version": "1.0.0",
     "author": {
       "name": "Your Name"
     }
   }
   ```
   Both directories contain the same file so each tool discovers the plugin natively.
3. Add skills under `skills/`, agents under `agents/`, or both
4. Register your plugin in both `.claude-plugin/marketplace.json` and `.cursor-plugin/marketplace.json` at the repo root
5. Add a `README.md` documenting your plugin

### Skills vs Agents

- **Skills** (`skills/your-skill/SKILL.md`) — focused instructions for a specific task. Creates a `/slash-command`. Use this for most contributions.
- **Agents** (`agents/your-agent.md`) — domain experts with broad knowledge. Auto-invoked when relevant context is detected, no slash command. Use for comprehensive standards or review guidelines.

## Adding Documentation

1. Add markdown files under `docs/` following the existing directory structure
2. Update `docs/README.md` (table of contents) to link to your new content

## Adding Cursor Rules

1. Add `.mdc` files to `.cursor/rules/`
2. Follow the existing frontmatter pattern with `description`, `globs`, and `alwaysApply`

## Submitting Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Guidelines

- Use kebab-case for directory and file names
- Include clear descriptions in all frontmatter
- Test your skills locally before submitting
- Keep documentation concise and AI-friendly
- Don't hardcode a `model:` in agent frontmatter — let users choose their preferred model
