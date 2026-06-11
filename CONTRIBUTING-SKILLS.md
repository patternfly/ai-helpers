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

<!-- BEGIN PLUGIN TABLE -->
| Plugin | What it helps you do | Decision test | Example skills |
|--------|---------------------|---------------|----------------|
| **a11y** | Audit and document accessibility | Does this help me make my UI accessible? |  |
| **code-review** | Review code for quality | Does this help me review code for quality? |  |
| **design-audit** | Validate existing code/designs against PF standards | Does this check whether existing code or designs follow PF standards? | `pf-compliance-checker`, `pf-figma-icon-finder`, `pf-raw-colors-scan` |
| **design-guide** | Choose the right PF components and patterns when building | Does this help me choose the right PF components and patterns when building? | `pf-ai-experience-patterns`, `pf-design-mode` |
| **migration** | Upgrade PatternFly versions | Does this help me upgrade PF versions? | `pf-class-migration-scanner` |
| **pf-workshop** | Team tools and skill incubation | Is this a team workflow tool, or a new skill that isn't ready for a consumer plugin yet? | `analytics-repo-pruning`, `css-var-analyzer`, `duplicate-epic` |
| **react** | Develop and test React components | Does this help me write or test a React component? | `pf-component-structure`, `pf-import-checker`, `pf-project-scaffolder` |
<!-- END PLUGIN TABLE -->

**How to decide:**
- Use the **decision test** column. If you can answer "yes" to a plugin's question, that's where your skill goes.
- If your skill matches multiple plugins, pick the one closest to its *primary input/output*.
- If it doesn't fit any plugin, open an issue to discuss creating a new one.

### Plugin naming standard

Plugin names must tell a user exactly what the plugin helps them do. A user browsing the marketplace should understand what they're installing without clicking through.

<!-- BEGIN GOOD NAMES -->
**Good names** describe the capability:
- `a11y` — accessibility auditing, reporting, and documentation
- `code-review` — code review and quality — adversarial review, security patterns
- `design-audit` — design audit — validate existing code and designs against PatternFly standards
- `design-guide` — design guide — component selection, interaction patterns, AI experience patterns, Figma design creation
- `migration` — pF version migration — breaking change detection, class scanning, upgrade planning
- `react` — react component development — coding standards, testing, and structure
<!-- END GOOD NAMES -->

**Bad names** are vague categories:
- `workflow` — what workflow?
- `styling` — styling what? how?
- `ops` — too abstract

When proposing a new plugin, ask: *"If someone sees this name in a list, do they know what they're installing?"* If not, pick a more specific name. It's fine to create a plugin with only 1-2 skills if it represents a distinct domain — the taxonomy should reflect where the project is going, not just where it is today.

### Skill vs agent

- **Skill** — a task that produces a result: "generate tests," "audit for accessibility," "find an icon." Most contributions are skills.
- **Agent** — domain knowledge the AI follows: "always follow these coding standards," "when reviewing designs, always verify brand colors and 8px grid spacing." Only create an agent if it's foundational context that improves *every* interaction in that plugin's area.

**Litmus test:** Can someone use the result? Skill. Is it knowledge the AI should always follow? Agent. When in doubt, write a skill.

**They work together:** An agent's knowledge is loaded automatically when the AI detects relevant context. So if you invoke a skill like `pf-unit-test-generator`, the `pf-coding-standards` agent's knowledge is also active — the agent makes the skill's output better.

## Naming convention

Skills in consumer plugins use the `pf-` prefix and are PatternFly-specific. Generic skills that aren't PF-specific belong in `pf-workshop`.

| Type | PatternFly-specific? | Plugin | Name |
|------|---------------------|--------|------|
| Skill | Yes — generates PF component tests | `react` | `pf-unit-test-generator` |
| Skill | Yes — PF design token auditing | `design-audit` | `pf-token-auditor` |
| Skill | No — summarizes PR review threads | `pf-workshop` | `summarize-pr-reviews` |
| Agent | Yes — PF React coding standards | `react` | `pf-coding-standards` |

**Why this matters:** Consumer plugins are polished offerings for PF consumers. Keeping generic tools separate preserves that signal. In Cursor, slash commands appear in a flat list without plugin context — the `pf-` prefix ensures discoverability. In Claude Code, skills show the plugin namespace (`/react:pf-unit-test-generator`), but the prefix is still valuable for cross-tool consistency.

PF-specific skills that serve internal team workflows also use the `pf-` prefix but live in `pf-workshop` because they aren't consumer-facing (e.g., `pf-bug-triage`, `pf-create-issue`).

**The directory name, file name, and frontmatter `name` must all match.** A mismatch causes confusing behavior when invoking the skill.
- Skill directory: `skills/pf-unit-test-generator/SKILL.md` with `name: pf-unit-test-generator`
- Agent file: `agents/pf-coding-standards.md` with `name: pf-coding-standards`

## Writing descriptions

Every skill and agent needs a `description` in its frontmatter. This description is how the AI decides whether to load the skill — it's the single most important line in your SKILL.md.

### Formula

**[Action verb] [what it does]. [Use when + trigger contexts.]**

### Rules

1. **Start with an action verb** — Audit, Generate, Scan, Create, Validate, Find, Recommend. Not "Guide for," "Performs," "Enables," "A tool that."
2. **One sentence for what it does** — the capability, not the implementation.
3. **One sentence for when to use it** — "Use when" followed by 2-3 trigger scenarios separated by commas or "or."
4. **No keyword lists** — the AI handles semantic matching. Don't pad with synonyms.
5. **Front-load the key use case** — descriptions longer than 250 characters are truncated in the skill listing.

### Examples

**Good:**

```yaml
description: Audit focus traps, restoration, and screen reader announcements. Use when building modals, dialogs, or wizards that manage focus programmatically.
```

**Good:**

```yaml
description: Generate unit tests for React components. Use when creating new components, adding test coverage, or refactoring existing tests.
```

**Bad — starts with a weak verb:**

```yaml
description: A comprehensive guide for PatternFly component structure auditing and debugging.
```

**Bad — keyword stuffing:**

```yaml
description: Tool for testing, unit testing, component testing, React testing, PatternFly testing, jest testing.
```

### Agent descriptions

Agents are domain knowledge, not tasks — their descriptions follow a different pattern.

**[Domain noun] [what it covers]. [Active when + context.]**

No action-verb lead-in. Use "Active when" instead of "Use when" — agents aren't invoked, they're contextually loaded.

**Good:**

```yaml
description: PatternFly React coding standards — import patterns, component composition, token usage, and style conventions. Active when writing, reviewing, or refactoring PF React code.
```

**Bad — uses skill formula on an agent:**

```yaml
description: Define PatternFly React coding standards. Use when writing or reviewing PF React code.
```

## How the repo is structured

```
ai-helpers/
├── .claude-plugin/       # Claude Code marketplace config
├── .cursor-plugin/       # Cursor marketplace config
├── plugins/
│   └── <plugin-name>/
│       ├── .claude-plugin/
│       ├── .cursor-plugin/
│       ├── skills/
│       └── agents/
└── docs/                 # AI-friendly PatternFly documentation
```

Each AI tool looks for its own directory (`.claude-plugin/`, `.cursor-plugin/`) to find `marketplace.json`, which lists plugins with relative paths to `plugins/<name>/`. Each plugin has identical manifests in both directories. Adding support for a new tool means copying the manifest into a new `.<tool>-plugin/` directory.

## Step 6: Contribute it

Once you're happy with the skill:

1. Fork and clone `patternfly/ai-helpers`
2. Copy your `SKILL.md` into `plugins/<plugin-name>/skills/your-skill-name/SKILL.md`
3. Open a pull request

Your skill becomes available as `/<plugin-name>:your-skill-name` for anyone who installs the plugin.

---

## Writing skills

For guidance on writing effective skills — structure, descriptions, examples, evaluation, and bundled resources — see Anthropic's [skill-creator](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) plugin (also installable via `/plugin install skill-creator@claude-plugins-official`).

### Requirements for this repo

In addition to the skill-creator guidance, skills in this repo must follow these rules:

- **Frontmatter is required** with `name` and `description`. The `name` must match the directory name. See [Writing descriptions](#writing-descriptions) for the description formula.
- Add `disable-model-invocation: true` if your skill has side effects (creates issues, posts comments, deploys)
- **Describe outcomes, not implementation** — tell the AI what to accomplish, not how to do it. The AI already knows how to use `git`, `gh`, `grep`, etc.
- **Skills must be tool-agnostic** — they run in both Claude Code and Cursor. Avoid referencing a specific tool (e.g., use "Assistant:" instead of "Claude:" in examples).
- **Prefer bash** for bundled scripts — every user has it, no runtime dependency. If a script requires Node.js or Python, declare it in a `## Requirements` section and fail with a clear error if missing:
  ```bash
  command -v node >/dev/null 2>&1 || { echo "Error: This skill requires Node.js." >&2; exit 1; }
  ```
- Use `$CLAUDE_SKILL_DIR` to reference scripts relative to the skill directory — it resolves to the directory containing SKILL.md regardless of where the repo is cloned
- **Evals are optional** but recommended for skills with structured output or external system interactions — see the [skill-creator eval guide](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator) for setup

### Security rules

Skills are instructions that an AI tool follows on behalf of a user. Contributors must not include instructions that:

- Hardcode secrets, tokens, or credentials
- Tell the AI to disable permission prompts or skip verification (`--no-verify`, `--force`) in skill instructions or bundled scripts
- Send data to external services without explicit user confirmation
- Use `eval`, `exec`, or `curl | bash` patterns in bundled scripts
- Access files outside the target project without stating why

Bundled scripts (`.sh`, `.js`, `.py`, `.ts`) are reviewed for these patterns automatically by CodeRabbit. See [GOVERNANCE.md](GOVERNANCE.md) for the full review process.

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
