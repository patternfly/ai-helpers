---
name: create-issue
description: Create GitHub issues for PatternFly repositories with smart templates, followup tracking, and duplicate detection.
---

# PatternFly Issue Creator

Create well-structured issues for PatternFly repos. Handles templates, cross-repo followups, and duplicate detection.

## What to Do

### 1. Determine Target Repo

**Detect context** from git remote, file paths, or keywords in user's request to suggest relevant repos:

- React/JSX/component/props → patternfly-react
- Token/design token → design-tokens
- CSS/HTML/core/stylesheet/style → patternfly
- guidelines/documentation/website → patternfly-org
- a11y/accessibility/aria/screen reader/wcag → patternfly or patternfly-react, depending on other context
- Migration/codemod/upgrade → pf-codemods
- Extension → list PatternFly extension repos

**Ask which repo** if not obvious. Show context-based suggestions first.

### 2. Choose Issue Type

**A. New Issue** - Fresh issue for target repo
**B. Followup Issue** - Work needed in target PatternFly repo after changes in source PatternFly repo

### 3A. New Issue Workflow

**Find templates:**

1. Check current directory `.github/ISSUE_TEMPLATE/`
2. If not found, fetch from GitHub using `gh api` (if available)
3. If not found, ask for local clone path or search for local clone
4. If none found, offer blank issue

**Pre-populate fields** from context:

- Title: "Bug - [description]" or "[Component] - [description]" (feature) or "[description]" (tech debt/other issue type)
- Component, description, steps, expected/actual behavior from user's request
- Version from package.json if available

**Ask user to confirm/edit** each pre-filled field. For blank fields, ask user to provide.

### 3B. Followup Issue Workflow

**Ask how to determine followup work:**

1. User describes it themselves
2. Analyze git commits to suggest work

**If analyzing commits:**

- Get commits since branch diverged from main
- Identify relevant changes only (new CSS classes, tokens, breaking changes, new features, accessibility updates, updated or new examples/demos)
- Filter out auto-inherited changes (style updates that version bump handles)

**Analyze target repo** (if found locally or local file path provided by user):

- Search for component files affected by changes
- Read current implementation (markup, classes, props, interfaces, examples)
- Generate specific tasks with file paths: "Add `variant` prop to CardHeader.tsx:24"
- If not found, provide generic suggestions

**Search for related/dependent components** when suggesting work:

- Select → also consider Menu, Popper, MenuToggle, Dropdown
- DatePicker → also consider Calendar, TextInput
- Table → also consider Checkbox, Pagination, Toolbar
  (See full list in patterns below)

**Detect PR** for current branch using `gh pr view` (if available). Ask user if they want to reference it.

**Structure followup issue:**

- Title: Type-prefixed like new issues
- Context section: Link to source PR or branch
- Changes section: Only relevant changes (omit auto-inherited)
- Work needed: Specific tasks (with file:line if analyzed) or generic tasks

### 4. Check for Similar Issues

**Search with multiple strategies** using `gh issue list` (if available):

1. Exact: component + feature
2. Broad: component only
3. Related components: dependent/child components (Menu or Popper for Select and Dropdown, AccordionItem for Accordion)
4. Features: keywords like "keyboard", "variant", "loading"
5. Synonyms: "danger"→"error"/"destructive", "loading"→"spinner"/"pending"
6. Closed issues: recent completions

**Score and deduplicate:**

- High: Same component + feature
- High-Medium: Related component + feature (note: "Menu (used by Select)")
- Medium: Same component OR feature
- Lower: Synonyms, related concepts

**Show top 5-10 results** with relevance labels. Ask: create new, comment on existing, or cancel.

**If no gh CLI**, skip check and inform user where to search manually before continuing to create a new issue.

### 5. Create or Save

**With gh CLI** (if authenticated): Offer to create directly or save to file
**Without gh CLI**: Save to file at user defined path or to `~/Desktop/[repo]-issue-[timestamp].md` by default

Include title, body, and instructions to create manually if saved.

### 6. Confirm

Report success (issue URL or file path). For followups, suggest linking to related work.

## Component Relationships

When searching for duplicates or analyzing followup work, consider these dependencies:

**Uses Popper:**

- Select, Dropdown, DatePicker, TimePicker, Popover, Tooltip

**Uses Menu:**

- Select, Dropdown, DatePicker, TimePicker

**Uses Form components:**

- Form → FormGroup, TextInput, Checkbox, Radio, Select

**Card family:**

- Card → CardHeader, CardBody, CardFooter

**Table family:**

- Table → Checkbox, Pagination, Toolbar

**Modal family:**

- Modal, Wizard → Backdrop

**List family:**

- DataList → Checkbox, Radio

## Title Formats

- **Bug**: "Bug - [description]"
- **Feature**: "[Component] - [description]" (no "Feature" prefix)
- **Tech Debt**: "[description]" (no prefix)

## Followup Patterns

| Source Repo | Target Repo | Common Followup Work |
| ----- | ----- | ------------------------------------ |
| **patternfly** (HTML/CSS) | **patternfly-react** | Update React component to use new CSS classes, tokens, or structure; make updates to examples/demos for parity |
| **patternfly-react** | **patternfly** | Update HTML/CSS component to use new CSS classes or structure; make updates to examples/demos for parity |
| **design-tokens** | **patternfly** | Apply new token variables |                     |
| **patternfly** or **patternfly-react** | patternfly-org   | Update design guidelines or accessibility documentation for component changes |
| **patternfly-react** | **pf-codemods**  | Update or add a codemod, typically for breaking or mass changes |

## Arguments

- `/create-issue` - Interactive
- `/create-issue [repo]` - Target specific repo
- `/create-issue followup [repo]` - Create followup

## Key Behaviors

- Pre-fill what you can from context
- Filter followup changes to only what needs action in target repo
- Search broadly for duplicates (component relationships, synonyms)
- Fall back gracefully when gh CLI unavailable
- Support both markdown and YAML templates
