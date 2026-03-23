# How to Create and Contribute a Skill

## Step 1: Create your skill locally

Work in any project directory or an empty one — NOT in the `ai-helpers` repo.

```bash
mkdir my-skill-workspace
cd my-skill-workspace
```

Open your AI tool (Claude Code, Cursor, etc.):

```bash
claude  # or open the project in Cursor
```

## Step 2: Describe what you want

Describe what you want. Be specific about what the skill should do, what the output should look like, and who it's for. For example:

```
Create a skill called "component-doc" that generates a usage guide
from a React component's source code. It should output the component name,
a plain-language description of what it does, a list of its props with types,
and a basic usage example. Write it for someone who hasn't seen the component before.
```

This will create a `skills/your-skill-name/SKILL.md` file.

## Step 3: Test it

Use the skill right there in your workspace:

```
/your-skill-name
```

Point it at a real file or scenario and see if the output is useful. If not, iterate:

```
The output is too verbose. Keep each section to 2-3 sentences max.
```

```
It's not explaining the props clearly enough. Add the default values.
```

Iterate until the output matches what you'd actually want to see.

## Step 4: Review your SKILL.md

Open the file and read it. It's just markdown. Ask yourself:

- Are the instructions clear enough that any AI tool would produce the same quality output?
- Is there anything tool-specific that wouldn't work in both Claude Code and Cursor?
- Is it under 500 lines? Shorter is better.

## Step 5: Pick the right plugin

Every skill or agent must live in a plugin. Pick the one that matches your skill's domain:

| Plugin | Domain | Example skills | When to use |
|--------|--------|----------------|-------------|
| **pf-react** | React components, coding standards, testing | `component-suggest`, `feasibility-check`, `pf-upgrade`, `unit-test-generator` | Your skill helps write, test, review, or migrate PatternFly React code |
| **pf-design-tokens** | Design tokens, CSS variables, color contrast | `hex-scan`, `css-var-audit`, `token-contrast`, `suggest-tokens` | Your skill audits, validates, or suggests design tokens |
| **pf-a11y** | Accessibility, WCAG, ARIA, screen readers | `audit`, `doc-scaffold` | Your skill checks, reports on, or documents accessibility |
| **pf-figma** | Figma designs, design-to-code, assets | `design-review`, `design-diff`, `icon-id`, `brand-assets` | Your skill works with Figma designs, icons, or brand assets |

**How to decide:**
- Ask yourself: "Who installs this?" A React developer? → `pf-react`. A designer working in Figma? → `pf-figma`.
- If your skill spans two domains (e.g., checking token contrast in a React component), pick the domain that best describes the *primary task*, not the input.
- If it doesn't fit any plugin, open an issue to discuss — don't create a new plugin without coordination.

**Skill vs agent:**
- **Skill** — a task that produces a result: "generate tests," "audit for accessibility," "find an icon." Most contributions are skills.
- **Agent** — domain knowledge the AI follows: "always follow these coding standards," "when reviewing designs, always verify brand colors and 8px grid spacing." Only create an agent if it's foundational context that improves *every* interaction in that plugin's area.

**Litmus test:** Can someone use the result? Skill. Is it knowledge the AI should always follow? Agent. When in doubt, write a skill.

**They work together:** An agent's knowledge is loaded automatically when the AI detects relevant context. So if you invoke a skill like `unit-test-generator`, the `coding-standards` agent's knowledge is also active — the agent makes the skill's output better.

## Step 6: Contribute it

Once you're happy with the skill:

1. Fork and clone `patternfly/ai-helpers`
2. Copy your `SKILL.md` into `plugins/<plugin-name>/skills/your-skill-name/SKILL.md`
3. Open a pull request

Your skill becomes available as `/<plugin-name>:your-skill-name` for anyone who installs the plugin.

---

## What makes a good skill?

**Good skills are specific.** "Summarize a file" is good. "Help with code" is too vague.

**Good skills define the output format.** Specify what sections to include, how long each should be, and what tone to use.

**Good skills include examples.** Show what good output looks like AND what bad output looks like.

**Good skills are short.** If your SKILL.md is over 200 lines, you're probably over-explaining. Say what you want, not how to think. The [Claude Code docs recommend under 500 lines](https://code.claude.com/docs/en/skills#add-supporting-files) as a ceiling — beyond that, move reference content into supporting files alongside your SKILL.md.

**Good skills describe outcomes, not implementation.** Tell the AI what to accomplish, not how to do it. The AI already knows how to use `git`, `gh`, `grep`, and other tools — you don't need to spell out exact commands or multi-step conditional logic. A single sentence like "Check for issue templates locally, then via GitHub CLI, falling back to a blank issue" is better than 70 lines of bash scripts and if/else branches.

**Good skills are tool-agnostic.** Skills in this repo work in both Claude Code and Cursor. Avoid referencing a specific tool in your instructions or examples (e.g., use "Assistant:" instead of "Claude:" in example conversations).

## What does a SKILL.md look like?

Here's an example `summarize` skill — the entire file:

```markdown
---
name: summarize
description: Summarize code, files, PRs, or directories for a mixed audience
---

Provide clear, concise summaries of code, files, pull requests,
or entire directories. Write for a mixed audience of designers,
developers, and stakeholders.

## How to Summarize

### When given a file or code block

1. Read the file or code provided.
2. Produce a summary with these sections:

**What it does** — One or two sentences in plain language.

**Key details** — 3-6 bullets of the important things happening inside.

**Dependencies** — What does this file rely on?

**Who cares** — Who needs to know about this file and why.

## Tone and Style

- Write like you're explaining to a coworker over coffee.
- Use short sentences. Avoid filler.
- No jargon without explanation.
- Shorter is better.
```

We recommend adding YAML frontmatter with a `name` and `description` to every SKILL.md. While skills are discovered by directory path, frontmatter improves compatibility with third-party tooling:

```yaml
---
name: summarize
description: Summarize code, files, PRs, or directories for a mixed audience
---
```

After the frontmatter, it's just instructions in markdown. No code. No config.

## Skill ideas to get you started

| Skill | What it does |
|---|---|
| `component-doc` | Generate a usage guide from a component's source |
| `changelog` | Generate a changelog entry from recent git commits |
| `migration-helper` | Help migrate PatternFly v5 code to v6 |
| `test-plan` | Generate a QA test plan from a PR diff |
| `design-review` | Check a component against PatternFly design guidelines |
| `api-mock` | Generate mock data from a TypeScript interface |
| `rename` | Suggest better names for variables and functions |
| `pr-description` | Generate a clear PR description from a diff |
