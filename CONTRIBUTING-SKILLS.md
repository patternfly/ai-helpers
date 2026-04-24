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

| Plugin | What it helps you do | Decision test | Example skills |
|--------|---------------------|---------------|----------------|
| **react** | Develop and test React components | Does this help me write or test a React component? | `pf-unit-test-generator`, `pf-bug-triage` |
| **design-foundations** | Reference and audit design foundations — tokens, icons, colors, spacing | Does this involve a design foundation like tokens, icons, or colors? | `pf-tokens`, `pf-token-auditor`, `icon-finder` |
| **a11y** | Audit and document accessibility | Does this help me make something accessible? | *(accepting contributions)* |
| **figma** | Review and extract from Figma designs | Does this require Figma as input or output? | `figma-changes` |
| **issue-management** | Create and track issues across tools | Does this help me create, link, or manage issues? | `pf-create-issue`, `duplicate-epic` |
| **repo-management** | Manage releases, dependencies, and repo health | Does this help me maintain a repository? | `pf-org-version-update`, `dependency-recommender`, `analytics-repo-pruning` |

**How to decide:**
- Use the **decision test** column. If you can answer "yes" to a plugin's question, that's where your skill goes.
- If your skill matches multiple plugins, pick the one closest to its *primary input/output*.
- If it doesn't fit any plugin, open an issue to discuss creating a new one.

### Plugin naming standard

Plugin names must tell a user exactly what the plugin helps them do. A user browsing the marketplace should understand what they're installing without clicking through.

**Good names** describe the capability:
- `design-foundations` — you know it's about design system foundations (tokens, icons, colors)
- `issue-management` — you know it manages issues
- `react` — universally understood technology domain

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

Use the `pf-` prefix on skill and agent names that are **PatternFly-specific**. Do not prefix generic skills that could apply to any project.

| Type | PatternFly-specific? | Name |
|------|---------------------|------|
| Skill | Yes — generates PF component tests | `pf-unit-test-generator` |
| Skill | No — recommends deps for any project | `dependency-recommender` |
| Agent | Yes — PF React coding standards | `pf-coding-standards` |

**Why this matters:** In Cursor, slash commands appear in a flat list without plugin context — `/unit-test-generator` is indistinguishable from skills in other plugins. In Claude Code, skills show the plugin namespace (`/react:pf-unit-test-generator`), but the `pf-` prefix on the skill name ensures discoverability across both tools.

**The directory name, file name, and frontmatter `name` must all match.** A mismatch causes confusing behavior when invoking the skill.
- Skill directory: `skills/pf-unit-test-generator/SKILL.md` with `name: pf-unit-test-generator`
- Agent file: `agents/pf-coding-standards.md` with `name: pf-coding-standards`

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

- **Frontmatter is required** with `name` and `description`. The `name` must match the directory name. The `description` should include trigger contexts (e.g., "Use when...") since the AI decides whether to load the skill based on the description alone. Front-load the key use case — descriptions longer than 250 characters are truncated in the skill listing.
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
| `pf-bug-triage` | Preliminary triage of bug issues with fix suggestions and maintainer tagging |
