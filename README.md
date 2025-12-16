# PatternFly AI Coding Support

## Who is this for?

This repository is for individuals and AI agents who want to prototype PatternFly applications using the latest best practices, with AI assistance (Cursor, Copilot, ChatGPT, etc.).

## Quick Start (TL;DR)

1. **Clone or copy this repo (or at least the `.pf-ai-documentation/` directory and `.cursor/rules/` files) into your project.**
2. **Open your project in Cursor or your preferred AI coding tool.**
3. (Optional) **Set up context7 MCP for always-up-to-date PatternFly docs.**

## Goal

The primary aim is to offer a comprehensive, AI-friendly knowledge base and starting point for prototyping PatternFly applications. By indexing relevant documentation and providing context files, this repo ensures that any AI model can deliver accurate, consistent, and best-practice guidance while you code.

## Core Components

The core components of this repository are the README and markdown files found throughout the project. These files provide indexed documentation, guidelines, and best practices to support AI-assisted PatternFly development, regardless of which AI coding tool you use.

- **Table of Contents:** See [`.pf-ai-documentation/README.md`](.pf-ai-documentation/README.md) for a full table of contents and navigation to all rules, guides, and best practices.

## Claude Code Skill

For [Claude Code](https://claude.ai/code) users, this repository includes a ready-to-use skill that provides PatternFly 6 development guidance directly in your coding sessions.

### Installation

```bash
# Clone and install the skill
git clone https://github.com/patternfly/patternfly-ai-coding.git
mkdir -p ~/.claude/skills
cp -r patternfly-ai-coding/skills/patternfly-6-development ~/.claude/skills/
```

Or for team sharing via your project:

```bash
mkdir -p .claude/skills
cp -r patternfly-ai-coding/skills/patternfly-6-development .claude/skills/
git add .claude/skills/patternfly-6-development
git commit -m "Add PatternFly 6 development skill"
```

### Features

- **Automatic activation** when working with PatternFly components
- **Import pattern guidance** for charts, chatbot, and component-groups
- **CSS and styling rules** with design token reference
- **Validation scripts** to check for common issues
- **Live documentation** fetched from this repository

See [`skills/patternfly-6-development/README.md`](skills/patternfly-6-development/README.md) for full documentation.

## Using This Documentation with Cursor and AI Tools

> **Important:**
> Simply providing a link to this repository is not enough for Cursor (or most AI tools) to load all the context and instructions. These tools only index files that are present in your local project workspace.

### Best Practice: Add Documentation Locally

To get the full benefit of these docs and rules:

1. **Clone or copy this repository (or at least the `.pf-ai-documentation/` directory and `.cursor/rules/` files) into your project.**
2. **Open your project in Cursor (or your preferred AI coding tool).**
3. **Keep your local docs up to date** by pulling changes from this repo as it evolves.

### Why Local Files Matter

- Cursor and similar tools only use files present in your local workspace for context and code search.
- If the documentation and rules are not present locally, the AI will not "see" them, even if you provide a link.

### For Maximum Effectiveness

- Use context7 or another MCP server to supplement your local docs with the latest upstream PatternFly documentation.
- Encourage your team to read and follow the local documentation and rules for consistent, best-practice PatternFly development.

## Setting Up context7 MCP for Latest Docs (Optional)
>
> **How to set up context7 MCP server:**
>
> 1. Ensure you have Node.js v18+ and an MCP-compatible client (e.g., Cursor, VS Code with MCP extension, Windsurf, Claude Desktop).
> 2. Add context7 as an MCP server in your client's configuration. For example, in Cursor, add this to your `~/.cursor/mcp.json`:
>
>    ```json
>    {
>      "mcpServers": {
>        "context7": {
>          "command": "npx",
>          "args": ["-y", "@upstash/context7-mcp@latest"]
>        }
>      }
>    }
>    ```
>
> 3. Save and restart your client/editor.
> 4. For more details and setup instructions for other editors, see the official guide: <https://github.com/upstash/context7#installation>

## Reference Documentation

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React GitHub Repository](https://github.com/patternfly/patternfly-react)

> For all rules and examples, consult both PatternFly.org and the official GitHub repository. When using AI tools, leverage context7 to fetch the latest docs from these sources.
