# Contributing to PatternFly AI Helpers

We welcome contributions of new plugins, skills, agents, and documentation.

Plugins work in **Claude Code** and **Cursor**, and the structure is designed to extend to other tools. Each plugin has identical manifests in `.claude-plugin/` and `.cursor-plugin/` so each tool discovers it natively.

## Repository Structure

```
plugins/              # Plugins (skills and agents)
docs/                 # AI-friendly PatternFly documentation
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

Create a new plugin when your contribution represents a distinct domain that doesn't fit into an existing plugin.

### Plugin naming standard

Plugin names must tell a user exactly what the plugin helps them do. Someone browsing the marketplace should understand what they're installing without clicking through.

Ask: *"If someone sees this name in a list, do they know what they're installing?"*

| Good | Why | Bad | Why |
|------|-----|-----|-----|
| `design-tokens` | Specific — you know it's about tokens | `styling` | Vague — styling what? |
| `issue-management` | Clear action — manages issues | `workflow` | Could mean anything |
| `react` | Universal tech domain | `frontend` | Too broad |

It's fine to create a plugin with only 1-2 skills if it represents a distinct domain. The taxonomy should reflect where the project is going, not just where it is today. Coordinate via an issue before creating a new plugin.

### Steps

1. Create a new directory under `plugins/your-plugin-name/`
2. Add a `plugin.json` to both `.claude-plugin/` and `.cursor-plugin/` (identical content):
   ```json
   {
     "name": "your-plugin-name",
     "description": "What your plugin helps users do",
     "version": "1.0.0",
     "author": {
       "name": "Your Name"
     }
   }
   ```
3. Add skills under `skills/`, agents under `agents/`, or both
4. Register your plugin in both `.claude-plugin/marketplace.json` and `.cursor-plugin/marketplace.json` at the repo root
5. Add a `README.md` documenting your plugin

### Skills vs Agents

- **Skills** (`skills/your-skill/SKILL.md`) — tasks that produce a result. Use this for most contributions.
- **Agents** (`agents/your-agent.md`) — domain knowledge the AI follows. Use for standards and guidelines.

## Adding Documentation

1. Add markdown files under `docs/` following the existing directory structure
2. Update `docs/README.md` (table of contents) to link to your new content

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
- Don't hardcode a `model:` in agent frontmatter — it forces all users onto one model, overriding their preference
- Use the `pf-` prefix on skill/agent names that are PatternFly-specific (see [CONTRIBUTING-SKILLS.md](CONTRIBUTING-SKILLS.md#naming-convention))
