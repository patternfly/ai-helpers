# PatternFly Issue Creator Skill

A Claude Code skill for creating well-structured GitHub issues across PatternFly repositories.

## Features

- **Template Support**: Automatically detects and uses issue templates from `.github/ISSUE_TEMPLATE/`
- **Followup Tracking**: Analyzes commits to suggest followup work needed in related repos
- **Target Repo Analysis**: Analyzes the target repo's code to provide specific, actionable followup tasks with file paths and line numbers
- **Smart Duplicate Detection**: Uses multiple search strategies with synonyms and related terms to find similar issues, scored by relevance
- **Flexible Output**: Create directly via GitHub CLI or save as a file
- **Multi-Repo Aware**: Works across all PatternFly organization repositories

## Usage

Invoke the skill with `/pf-issue`:

```
/pf-issue                          # Interactive mode
/pf-issue patternfly-react         # Create issue for specific repo
/pf-issue followup patternfly-org  # Create followup issue
```

## Prerequisites

### Required

- Git repository with PatternFly remote (or manual repo selection)

### Optional (but recommended)

- **GitHub CLI (gh)** - Enables direct issue creation, remote template fetching, and duplicate detection
  - Install: `brew install gh` (macOS) or see https://cli.github.com/
  - Authenticate: `gh auth login`
  - Without gh CLI: templates must be available locally, issues are saved to files, and similar issue detection is skipped

## Workflow Overview

1. **Detect Context**: Identifies if you're in a PatternFly repo and analyzes context to suggest relevant repos
2. **Choose Type**: New issue or followup issue
3. **Select Template**: Checks for templates locally, then remotely via GitHub CLI, or offers blank option
4. **Pre-populate Fields**: Intelligently fills in issue fields based on your context
5. **Analyze Commits**: For followup issues, optionally analyzes branch commits or lets you provide work yourself
6. **Analyze Target Repo**: For followup issues, searches and analyzes the target repo's code to make specific suggestions with file paths
7. **Auto-detect PR**: Automatically finds associated PR using GitHub CLI
8. **Check Duplicates**: Searches for similar existing issues (if gh CLI available)
9. **Create/Save**: Creates via gh CLI (if available) or saves to file

## PatternFly Repository Map

Common followup patterns:

| Source           | Target           | Typical Followup                                           |
| ---------------- | ---------------- | ---------------------------------------------------------- |
| patternfly       | patternfly-react | Update React components for CSS changes or example parity |
| patternfly-react | patternfly       | Update HTML/CSS examples for parity with React changes    |
| design-tokens    | patternfly       | Apply new token variables                                  |
| patternfly-react | patternfly-org   | Update documentation and examples                          |
| patternfly-react | pf-codemods      | Add codemods for breaking changes                          |

## Examples

### Creating a Bug Report

```
/pf-issue

> You're in patternfly/patternfly. Create issue here? (yes)
> Type: New Issue
> Template: bug_report.md
> [Answers template questions]
> Similar issues: None found
> Create with gh CLI or save to file? (gh CLI)
✓ Created issue #1234: Bug - Button - Focus ring not visible
```

### Creating a Followup Issue

```
/pf-issue followup patternfly-react

> Analyzing 4 commits on feat/card-tokens branch...
> Suggested followup work:
>   - Update Card component to use new --pf-t--global--* tokens
>   - Update CardHeader CSS variable references
>   - Add migration guide to docs
> Correct? (yes)
> Similar issues: None found
✓ Saved to ~/Desktop/patternfly-react-issue-2024-03-16.md
```

## Customization

### Adding New Templates

Place additional templates in the target repo's `.github/ISSUE_TEMPLATE/` directory.

### Modifying Followup Patterns

Edit the followup patterns table in SKILL.md to match your team's workflow.

### Changing Default Save Location

Modify the default file path in the "Save to file" section of SKILL.md.

## Troubleshooting

**"gh: command not found"**

- Install GitHub CLI or use "save to file" option

**"gh auth status failed"**

- Run `gh auth login` to authenticate

**"No templates found"**

- Repo may not have templates, use blank issue option

**"Cannot detect repository"**

- Manually specify target repo when prompted

## Tips

- Use followup issues to track cross-repo dependencies
- Check similar issues to avoid duplicates
- Save to file for batch issue creation or offline work
- Use templates to maintain consistency across issues
