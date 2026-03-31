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

| Plugin | Domain | Decision test | Example skills |
|--------|--------|---------------|----------------|
| **pf-react** | Component development | Does this help me write or test a React component? | `pf-unit-test-generator`, `pf-bug-triage` |
| **pf-styling** | Visual implementation | Does this help me understand or apply visual styling? | `pf-raw-colors-scan`, `pf-tokens` |
| **pf-a11y** | Accessibility | Does this help me make something accessible? | `pf-audit`, `pf-doc-scaffold` |
| **pf-figma** | Design tooling | Does this require Figma as input or output? | `pf-design-review`, `pf-design-diff` |
| **pf-workflow** | Project operations | Does this help manage the project, not build it? | `pf-create-issue`, `pf-org-version-update`, `dependency-recommender` |

**How to decide:**
- Use the **decision test** column. If you can answer "yes" to a plugin's question, that's where your skill goes.
- If your skill matches multiple plugins, pick the one closest to its *primary input/output*.
- If it doesn't fit any plugin, open an issue to discuss — don't create a new plugin without coordination.

**Skill vs agent:**
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

**Why this matters:** In Cursor, slash commands appear in a flat list without plugin context — `/unit-test-generator` is indistinguishable from skills in other plugins. In Claude Code, skills show the plugin namespace (`/pf-react:pf-unit-test-generator`), but the `pf-` prefix on the skill name ensures discoverability across both tools.

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

- **Frontmatter is required** with `name` and `description`. The `name` must match the directory name. The `description` should include trigger contexts (e.g., "Use when...") since the AI decides whether to load the skill based on the description alone.
- Add `disable-model-invocation: true` if your skill has side effects (creates issues, posts comments, deploys)
- **Describe outcomes, not implementation** — tell the AI what to accomplish, not how to do it. The AI already knows how to use `git`, `gh`, `grep`, etc.
- **Skills must be tool-agnostic** — they run in both Claude Code and Cursor. Avoid referencing a specific tool (e.g., use "Assistant:" instead of "Claude:" in examples).
- **Prefer bash** for bundled scripts — every user has it, no runtime dependency. If a script requires Node.js or Python, declare it in a `## Requirements` section and fail with a clear error if missing:
  ```bash
  command -v node >/dev/null 2>&1 || { echo "Error: This skill requires Node.js." >&2; exit 1; }
  ```
- Use `$CLAUDE_SKILL_DIR` to reference scripts relative to the skill directory — it resolves to the directory containing SKILL.md regardless of where the repo is cloned

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
