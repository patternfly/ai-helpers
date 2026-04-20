---
name: summarize-pr-reviews
description: "Summarize GitHub pull requests awaiting review from the current user. Use when the user asks to: (1) See their pending PR reviews, (2) Summarize PRs they need to review, (3) Get an overview of review requests, (4) Prioritize their code review queue, or (5) Understand what PRs are waiting for their review."
---

# Summarize My PR Review Queue

Fetch all GitHub pull requests where the current user is requested as a reviewer, summarize the changes, and provide prioritization recommendations.

## Workflow

1. **Get user identity** - Identify the current GitHub user
2. **Search for review requests** - Query GitHub for PRs requesting the user's review
3. **Fetch PR details** - Get diff stats, reviews, CI status, and context for each PR
4. **Analyze and categorize** - Size, priority, and complexity assessment
5. **Generate summary** - Present a clear overview with prioritization recommendations

## Step 1: Get User Identity

Identify the authenticated GitHub user's login.

## Step 2: Search for PRs Requesting Review

Search for open PRs where the user is requested as a reviewer, sorted by most recently updated. Run both queries in parallel:

- **Primary:** Open PRs awaiting your review
- **Secondary:** Open PRs you've already reviewed but haven't approved (may have new changes)

If the user asks about a specific org or repo, scope the search accordingly.

## Step 3: Fetch PR Details

For each PR found, fetch in parallel: metadata (title, author, labels, created date), files changed (count, lines added/deleted, key paths), existing reviews and their states, and CI/check status.

Extract from each PR:
- Title and description
- Author
- Number of files changed, lines added/deleted
- Labels (especially priority, urgent, blocker, critical)
- How long it's been open
- CI/check status (passing, failing, pending)
- Existing reviews and their states (approved, changes requested, commented)

## Step 4: Analyze and Categorize

### Size Categories

| Size | Criteria | Review Time Estimate |
|------|----------|---------------------|
| 🟢 **Small** | <100 lines changed, <5 files | ~10-15 min |
| 🟡 **Medium** | 100-500 lines, 5-15 files | ~30-60 min |
| 🔴 **Large** | >500 lines or >15 files | 1+ hours |

### Priority Signals

Flag PRs as high-priority when:
- Labeled `priority`, `urgent`, `blocker`, or `critical`
- Open >3 days without any review
- Author has pinged or requested re-review
- Blocking other work (mentioned in description)
- Failing CI that needs investigation
- Security fix or hotfix

### Complexity Indicators

Note when PRs involve:
- Multiple reviewers requested
- Files spread across different areas of the codebase
- New dependencies added
- Database migrations or API changes
- Configuration or infrastructure changes

## Step 5: Generate Summary

Structure the output in this order. Adapt detail level to queue size: full detail for <5 PRs, grouped summaries for 5-15, top priorities only for >15.

### At a Glance

Open with a quick snapshot:
- Total PRs awaiting review
- Breakdown by size (small / medium / large)
- Oldest PR waiting

### Priority Reviews (Address First)

Table of PRs that are urgent, stale (>3 days without review), security/hotfix, or blocking others. Include a "Why Priority" column.

For each priority PR, provide a detail block:
- **Repository** and **Author**
- **Changes:** `+X/-Y` lines across N files
- **Summary of Changes:** Brief description from title, description, and files changed
- **Key files to review:** Top 2-3 files with brief explanation
- **Review notes:** CI failures, existing review comments, blockers

### Standard Reviews

Remaining PRs in suggested review order. Table with PR number, repository, author, size, wait time, and notes. Detail blocks for each.

### Quick Reviews (Small PRs)

Compact table of small PRs that can be knocked out quickly — good for short time blocks.

### Needs Attention

Flag concerning patterns:
- **Stale PRs:** Open >7 days without review
- **Failed CI:** PRs with failing checks
- **Re-review requested:** PRs you reviewed but have new commits

### Suggested Review Order

Numbered list combining priority, size, and wait time into a recommended sequence. End with an estimated total review time.

## Tips for Quality Summaries

**Understand the changes:**
- Read the PR description carefully
- Look at file types changed to understand scope
- Note if tests are included

**Identify what matters:**
- Focus on the "why" not just the "what"
- Highlight breaking changes or API modifications
- Note new dependencies or configuration changes

**Make it actionable:**
- Suggest a specific review order
- Estimate review time for planning
- Flag PRs that can be quick wins

**Provide context:**
- Link directly to each PR with full URL
- Show how long PRs have been waiting
- Note if CI is passing/failing

**Adapt to queue size:**
- For <5 PRs: Detailed summary of each
- For 5-15 PRs: Group by priority, summarize key points
- For >15 PRs: Focus on top priorities, list others briefly
