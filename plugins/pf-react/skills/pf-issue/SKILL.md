---
name: pf-issue
description: Create GitHub issues for PatternFly repositories. Handles issue templates, followup issues across repos, and duplicate detection. Use when user wants to create a PatternFly issue or track followup work in another PatternFly repo.
disable-model-invocation: true
---

# PatternFly Issue Creator

Create well-structured GitHub issues for PatternFly repositories with template support, followup tracking, and duplicate detection.

## Workflow

### 1. Detect PatternFly Repository Context

First, determine if we're in a PatternFly repository:

```bash
# Get current repo info
git remote get-url origin 2>/dev/null

# Check if it's a PatternFly org repo
git remote get-url origin 2>/dev/null | grep -q "github.com[:/]patternfly/"
```

**If NOT in a PatternFly repo:**

- Analyze the user's context to suggest relevant repos:
  - Check for keywords in user's request (e.g., "React", "tokens", "documentation", "a11y", "accessibility", "codemod")
  - Look for file paths or component names mentioned
  - Consider any conversation context about what they're working on
- Ask user which PatternFly repo they want to create the issue for
- Present repos with context-based suggestions first, followed by other common repos:
  - Suggested repos (if context detected): [repos matching context]
  - Other common repos: patternfly, patternfly-react, patternfly-org, react-component-groups, design-tokens, pf-codemods
- Store target repo for later use

**Context-to-Repo Mapping:**

- Keywords: "React", "component", "props", "JSX" → suggest **patternfly-react**
- Keywords: "token", "design token", "variable" → suggest **design-tokens**
- Keywords: "CSS", "HTML", "core", "stylesheet", "style" → suggest **patternfly**
- Keywords: "docs", "documentation", "examples", "website" → suggest **patternfly-org**
- Keywords: "a11y", "accessibility", "ARIA", "screen reader" → suggest **patternfly-react** or **patternfly**, depending on other context provided
- Keywords: "extension", "composite", "template" → suggest **react-component-groups**
- Keywords: "migration", "upgrade", "codemod" → suggest **pf-codemods**

**If IN a PatternFly repo:**

- Use current repo as default
- Ask if they want to create issue in current repo or another PatternFly repo, following the steps for when the user is not in a PatternFly repo above

### 2. Determine Issue Type

Ask the user what type of issue they're creating:

**A. New Issue** - Fresh issue for the target repo
**B. Followup Issue** - Work in target repo that follows from work in current repo

### 3A. For New Issues

#### 3A.1 Check for Issue Templates

**Step 1: Check current working directory**

```bash
# Check if current directory has issue templates
ls -1 .github/ISSUE_TEMPLATE/ 2>/dev/null
```

**If templates found in current directory:**
- List available templates
- Skip to "Present options" below

**If templates NOT found in current directory:**

**Step 2: Ask user about target repo location**

Ask user: "Do you have the [target-repo-name] repository cloned locally?"

- **If NO**: Skip template check, proceed with blank issue option
- **If YES**: Ask "Would you like to:"
  1. Provide the path to the repo
  2. Have me search for it automatically

**If user provides path:**
```bash
# Check templates at provided path
ls -1 <user-provided-path>/.github/ISSUE_TEMPLATE/ 2>/dev/null
```

**If user chooses automatic search:**
```bash
# Search from home directory (limit depth to avoid long searches)
# Look for .git directories matching the target repo name
find ~ -type d -name ".git" -maxdepth 5 2>/dev/null | while read git_dir; do
  repo_dir=$(dirname "$git_dir")
  if git -C "$repo_dir" remote get-url origin 2>/dev/null | grep -q "patternfly/[target-repo-name]"; then
    echo "$repo_dir"
    break
  fi
done
```

Then check templates at discovered path:
```bash
ls -1 <discovered-path>/.github/ISSUE_TEMPLATE/ 2>/dev/null
```

**If repo found but no templates:**
- Inform user that no templates were found in the repo
- Proceed with blank issue option

**Present options:**

1. Use an existing template (list available if found: bug_report.md, feature_request.md, design_handoff.yml, etc.)
2. Create a blank issue

#### 3A.2 Gather Issue Details

**Pre-populate fields based on context:**

Before asking the user, analyze available context to pre-populate fields:

**Context sources:**
- User's initial request and conversation
- Current working directory and file paths
- Git branch name and recent commits (if in a repo and only for followup issues)
- Component names or file names mentioned
- Keywords indicating bug, feature, enhancement, etc.

**Common field mappings:**

| Field | Context Clues | Example Pre-population |
|-------|---------------|----------------------|
| Title | User's request summary | "Button component accessibility issue with keyboard navigation" |
| Component/Area | Component names mentioned, file paths | "Button", "DataList", "Pagination" |
| Issue Type | Keywords: "broken", "doesn't work" → Bug; "would be nice", "add" → Feature; "update example", "add tests" → Tech Debt | "Bug", "Feature", "Tech Debt" |
| Description | User's detailed explanation | Pre-filled with user's context, formatted appropriately |
| Steps to Reproduce | User mentions specific actions | List of steps user described |
| Expected Behavior | User mentions "should" or "expected" | What user said should happen |
| Actual Behavior | User's problem description | What user said is happening |
| Version | Check package.json or ask | "v6.0.0" (if detectable) |

**If using a template:**

1. Read the template file
2. Identify template sections/fields
3. For each field:
   - **If context suggests a value**: Pre-populate and ask user to confirm/edit
     - Show: "[Field Name]: [Pre-populated value]"
     - Ask: "Is this accurate? (y/n/edit)"
     - If "edit" or "n": Ask user to provide the correct value
   - **If no context available**: Ask user to provide the value
4. Fill in the template with final values

**If creating blank issue:**

1. Attempt to pre-populate:
   - **Title**: Based on user's request (required)
   - **Description/Body**: Based on user's detailed context (required)

2. For each field:
   - **If pre-populated**: Show value and ask "Is this accurate? (y/n/edit)"
   - **If not pre-populated**: Ask user to provide value

3. Build the issue with final values

**Example interaction:**

```
Claude: I'll help create the issue. Based on your description, here's what I have:

Title: "Button component not responding to Enter key press"
Is this accurate? (y/n/edit)

User: y

Claude: Description: "The primary Button component does not trigger onClick when
pressing Enter key while focused. This works in v5 but broke in v6."
Is this accurate or would you like to edit? (y/n/edit)

User: edit

Claude: What would you like the description to be?

User: [provides updated description]
```

### 3B. For Followup Issues

Followup issues are created when work in one PatternFly repo requires followup work in another repo (e.g., patternfly → patternfly-react).

**First, ask user how to determine followup work:**

"How would you like to determine the followup work needed?"
1. **Provide it yourself** - You'll describe what needs to be done in [target-repo]
2. **Analyze commit history** - I'll review your commits to suggest followup work

- **If option 1 (user provides)**:
  - Skip commit analysis (3B.1)
  - Ask user to describe the followup work needed
  - Continue to 3B.3 to structure the issue

- **If option 2 (analyze commits)**:
  - Continue with 3B.1 to analyze commits

#### 3B.1 Analyze Current Branch Commits

Get commits that are new to the current branch (since it diverged from main):

```bash
# Get the base branch (usually main)
BASE_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "main")

# Get commits on current branch not in base
git log ${BASE_BRANCH}..HEAD --oneline --no-decorate

# Get detailed commit messages
git log ${BASE_BRANCH}..HEAD --format="%h %s%n%b%n---"

# Get file changes
git diff ${BASE_BRANCH}...HEAD --stat
git diff ${BASE_BRANCH}...HEAD --name-only
```

#### 3B.2 Determine Followup Work Needed

Analyze the commits and file changes to suggest followup work:

**Common PatternFly Followup Patterns:**

| Source Repo | Target Repo | Common Followup Work |
| ----- | ----- | ------------------------------------ |
| **patternfly** (HTML/CSS) | **patternfly-react** | Update React component to use new CSS classes, tokens, or structure, or make updates to examples/demos for parity with patternfly |
| **patternfly-react** | **patternfly** | Update HTML/CSS component to use new CSS classes, tokens, or structure, or make updates to examples/demos for parity with patternfly-react |
| **design-tokens** | **patternfly** | Update CSS to use new token variables |                     |
| **patternfly** or **patternfly-react** | patternfly-org   | Update documentation for component changes (design guidelines, accessibility docs) |
| **patternfly-react** | **pf-codemods**  | Update or add a codemod, typically for breaking or mass changes |

**Analysis prompts:**

- Look for: new CSS classes, new tokens, structural changes, new props/attributes
- Identify: What needs to be updated in the target repo to match these changes
- Consider: Breaking changes, deprecations, new features

**Present suggestions:**

- List suggested followup work items
- Ask user to confirm, modify, or add to the suggestions

#### 3B.3 Create Followup Issue Content

**Attempt to auto-detect PR URL:**

Try to get the PR URL for the current branch using GitHub CLI:

```bash
# Check if gh CLI is available and authenticated
gh auth status 2>&1

# Get PR URL for current branch (if exists)
gh pr view --json url,number,title --jq '{url: .url, number: .number, title: .title}'
```

**If PR found:**
- Show the PR to user: "Found PR #[number]: [title]"
- Ask: "Would you like to use this PR as the reference? (y/n)"
- **If YES**: Use the detected PR URL
- **If NO**: Ask user for a different PR URL or skip PR reference

**If NO PR found or gh CLI not available:**
- Ask user: "Do you have a PR URL in [source-repo] to reference for this followup work?"
- **If YES**: Ask user to provide the PR URL
- **If NO**: Will reference branch name or commits instead

**Structure the followup issue:**

**Title:** `Followup: [Brief description of work needed]`

**Body (if PR URL provided):**

```markdown
## Context

This is followup work from [[source-repo]#[pr-number]]([PR URL]).

### Changes in [source-repo]

- [Summary of relevant changes]

### Work Needed in [target-repo]

- [ ] [Specific task 1]
- [ ] [Specific task 2]
- [ ] [Specific task 3]
```

**Body (if NO PR URL, using branch/commits):**

```markdown
## Context

This is followup work from [source-repo] branch [branch-name].

### Changes in [source-repo]

- [Summary of relevant changes from commits]

### Work Needed in [target-repo]

- [ ] [Specific task 1]
- [ ] [Specific task 2]
- [ ] [Specific task 3]

### References

- Related commits: [commit hashes]
- Source branch: [branch-name]
```

### 4. Check for Similar Issues

Before creating the issue, search for similar issues in the target repo (requires gh CLI):

```bash
# Check if gh CLI is available
gh auth status 2>&1

# Extract key terms from issue title for searching
# Search open issues
gh issue list --repo patternfly/[target-repo] --search "[key terms from title]" --limit 10 --json number,title,state,url

# Search closed issues (recent)
gh issue list --repo patternfly/[target-repo] --search "[key terms from title]" --state closed --limit 5 --json number,title,state,url,closedAt
```

**If gh CLI not available or not authenticated:**

- Skip similar issue check
- Inform user they can manually search at: `https://github.com/patternfly/[target-repo]/issues`

**If similar issues found:**

- Display the similar issues (number, title, state, url)
- Ask user: "Found potentially similar issues. Do you want to:"
  1. Create a new issue anyway
  2. Comment on one of the existing issues instead
  3. Cancel and review the similar issues first

**If user chooses to comment on existing issue:**

- Ask which issue number to comment on
- Ask what comment to add
- Create comment: `gh issue comment [number] --repo patternfly/[target-repo] --body "[comment]"`
- Skip issue creation

### 5. Create or Save the Issue

**Check if GitHub CLI is available and authenticated:**

```bash
gh auth status 2>&1
```

**If gh CLI is available and authenticated:**
- Ask user how they want to proceed:
  1. Create directly with GitHub CLI
  2. Save to file

**If gh CLI is NOT available or NOT authenticated:**
- Skip to Option B (save to file)
- Inform user: "GitHub CLI not available or not authenticated. Saving issue to file instead."

**Option A: Create directly with GitHub CLI** (only if gh CLI is available/authenticated)

```bash
# Create the issue using gh CLI
gh issue create \
  --repo patternfly/[target-repo] \
  --title "[Issue Title]" \
  --body "$(cat <<'EOF'
[Issue body content here]
EOF
)"
```

**Option B: Save to file**

Ask user:

"Where would you like to save the issue file?"
- Default: `~/Desktop/[repo-name]-issue-[timestamp].md`
- User can provide a different path or press Enter to use default

Create the file:

```markdown
# Issue for patternfly/[target-repo]

**Title:** [Issue Title]

**Labels:** [suggested labels if any]

**Body:**
[Issue body content]

---

To create this issue manually:

1. Go to https://github.com/patternfly/[target-repo]/issues/new
2. Copy the title and body above
3. Provide any other necessary information depending on the issue being created
```

Save the file and report the location to the user.

### 6. Confirmation & Next Steps

After creating or saving:

- Report success with issue URL (if created) or file path (if saved)
- For followup issues: Suggest linking the new issue to related PRs/commits
- Offer to create additional issues if needed

## Special Handling

### PatternFly Repository Mapping

Common PatternFly repositories:

- **patternfly** - HTML/CSS core (patternfly/patternfly)
- **patternfly-react** - React components (patternfly/patternfly-react)
- **patternfly-org** - Documentation site (patternfly/patternfly-org)
- **design-tokens** - Design tokens (patternfly/design-tokens)
- **react-component-groups** - React extension components (patternfly/react-component-groups)
- **pf-codemods** - Codemods for migrations (patternfly/pf-codemods)

### Template Handling

Support both formats:

- **Markdown templates** (.md files with YAML frontmatter)
- **YAML form templates** (.yml files with form field definitions)

For YAML forms, convert the form fields into a structured markdown format.

## Error Handling

All error handling is built into the workflows above. Key behaviors:

- Git/gh CLI failures are handled gracefully with fallbacks to manual input or file saving
- Missing templates or repos default to blank issue creation
- Failed searches or analysis continue without blocking the user

## Arguments

User can invoke with arguments:

- `/pf-issue` - Interactive mode, ask all questions
- `/pf-issue [repo-name]` - Create issue for specific PatternFly repo
- `/pf-issue followup [repo-name]` - Create followup issue for repo

## Examples

**Example 1: New bug report**

```
User: /pf-issue
Claude: Checking current repository... You're in patternfly/patternfly.
        Create issue in current repo or another PatternFly repo?
User: Current repo
Claude: What type of issue? (A) New Issue or (B) Followup Issue
User: A
Claude: Found templates: bug_report.md, feature_request.md, design_handoff.yml
        Which template? (or create blank)
User: bug_report.md
Claude: [Asks questions based on template sections...]
```

**Example 2: Followup issue**

```
User: /pf-issue followup patternfly-react
Claude: Analyzing commits on current branch (feat/new-tokens)...
        Found 3 commits with token changes. Suggested followup work:
        - Update Button component to use new --pf-t--global--color tokens
        - Update Card component CSS variable references
        Do these look correct?
User: Yes, and also need to update docs
Claude: Added: Update component documentation
        Checking for similar issues in patternfly-react...
        No similar issues found.
        Create directly with gh CLI or save to file?
```
