---
name: summarize-pr-reviews
description: "Summarize GitHub pull requests awaiting review from the current user. Use when the user asks to: (1) See their pending PR reviews, (2) Summarize PRs they need to review, (3) Get an overview of review requests, (4) Prioritize their code review queue, or (5) Understand what PRs are waiting for their review."
---

# Summarize My PR Review Queue

Fetch all GitHub pull requests where the current user is requested as a reviewer, summarize the changes, and provide prioritization recommendations.

## Workflow

1. **Get user identity** - Identify the current GitHub user
2. **Search for review requests** - Query GitHub for PRs requesting the user's review
3. **Fetch PR details** - Get diff stats, description, and context for each PR
4. **Generate summary** - Present a clear overview with prioritization recommendations

## Step 1: Get User Identity

First, get the authenticated GitHub user's information.

```
get_me()
```

Store the `login` (username) for subsequent queries.

## Step 2: Search for PRs Requesting Review

Query GitHub for all open PRs where the user is requested as a reviewer.

**Primary query - PRs awaiting your review:**
```
search_issues(
    query="is:pr is:open review-requested:@me",
    sort="updated",
    order="desc",
    perPage=50
)
```

**Alternative if @me doesn't work:**
```
search_issues(
    query="is:pr is:open review-requested:[username]",
    sort="updated",
    order="desc",
    perPage=50
)
```

**Optional - PRs you've already reviewed but have new changes:**
```
search_issues(
    query="is:pr is:open reviewed-by:[username] -review:approved",
    sort="updated",
    order="desc",
    perPage=20
)
```

## Step 3: Fetch PR Details

For each PR found, fetch additional details to understand the scope of changes.

**Get PR details:**
```
get_pull_request(
    owner="[owner]",
    repo="[repo]",
    pullNumber=[number]
)
```

**Get PR diff/files changed:**
```
get_pull_request_files(
    owner="[owner]",
    repo="[repo]",
    pullNumber=[number]
)
```

**Get existing reviews (to see review status):**
```
get_pull_request_reviews(
    owner="[owner]",
    repo="[repo]",
    pullNumber=[number]
)
```

Extract from each PR:
- Title and description
- Author
- Number of files changed
- Lines added/deleted
- Labels (especially priority labels)
- How long it's been open
- CI/check status
- Existing reviews and comments

## Step 4: Analyze and Categorize

### Size Categories

Categorize PRs by scope of changes:

| Size | Criteria | Review Time Estimate |
|------|----------|---------------------|
| 🟢 **Small** | <100 lines changed, <5 files | ~10-15 min |
| 🟡 **Medium** | 100-500 lines, 5-15 files | ~30-60 min |
| 🔴 **Large** | >500 lines or >15 files | 1+ hours |

### Priority Signals

Identify high-priority PRs:
- Has `priority`, `urgent`, `blocker`, or `critical` labels
- Has been open >3 days without review
- Author has pinged or requested re-review
- Blocking other work (mentioned in description)
- Has failing CI that needs investigation
- Is a security fix or hotfix

### Complexity Indicators

Note complexity factors:
- Multiple reviewers requested
- Many files across different areas
- New dependencies added
- Database migrations
- API changes
- Configuration changes

## Step 5: Generate Summary

Present findings using this structure.

### Summary Output Template

```markdown
# Your PR Review Queue

## At a Glance
- **Total PRs Awaiting Review:** [count]
- **Small:** [count] | **Medium:** [count] | **Large:** [count]
- **Oldest Waiting:** [X days]

---

## 🔴 Priority Reviews (Address First)

[List PRs that are:
- Marked as urgent/priority/blocker
- Open >3 days without any review
- Security or hotfix PRs
- Blocking other team members]

| PR | Repository | Author | Size | Waiting | Why Priority |
|----|------------|--------|------|---------|--------------|
| #123 | repo-name | @author | 🟢 Small | 5 days | Marked urgent, blocking release |

### PR #123: [Title]
**Repository:** owner/repo
**Author:** @username
**Changes:** +50/-20 lines across 3 files

**Summary of Changes:**
[Brief description of what the PR does based on title, description, and files changed]

**Key files to review:**
- `src/components/Feature.tsx` - Main implementation
- `src/utils/helper.ts` - New utility function

**Review notes:**
- [Any CI failures to investigate]
- [Any existing review comments to address]

---

## 🟡 Standard Reviews

[Remaining PRs in suggested review order]

| PR | Repository | Author | Size | Waiting | Notes |
|----|------------|--------|------|---------|-------|
| #456 | other-repo | @dev | 🟡 Medium | 2 days | Feature addition |

### PR #456: [Title]
**Repository:** owner/repo  
**Author:** @username
**Changes:** +200/-50 lines across 8 files

**Summary of Changes:**
[Brief description]

**Key areas:**
- [Main component/feature affected]
- [Tests added/modified]

---

## 🟢 Quick Reviews (Small PRs)

[PRs that can be reviewed quickly - good for time blocks]

| PR | Repository | Author | Changes | Description |
|----|------------|--------|---------|-------------|
| #789 | repo | @dev | +15/-5 | Fix typo in docs |

---

## ⚠️ Needs Attention

[Flag any concerning patterns:]
- **Stale PRs:** [PRs open >7 days without review]
- **Failed CI:** [PRs with failing checks]
- **Re-review requested:** [PRs you reviewed but have new commits]

---

## Suggested Review Order

Based on priority, size, and wait time:

1. **#123** (repo-name) - Urgent, small, quick win
2. **#456** (other-repo) - Medium priority, been waiting 2 days
3. **#789** (repo) - Quick doc fix, 5 min review

**Estimated total review time:** ~2 hours
```

## Tips for Quality Summaries

**Understand the changes:**
- Read the PR description carefully
- Look at the file types changed to understand scope
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
- Link directly to each PR
- Show how long PRs have been waiting
- Note if CI is passing/failing

**Adapt to queue size:**
- For <5 PRs: Detailed summary of each
- For 5-15 PRs: Group by priority, summarize key points
- For >15 PRs: Focus on top priorities, list others briefly

## Common Search Queries

**All PRs requesting your review:**
```
is:pr is:open review-requested:@me
```

**PRs in a specific org:**
```
is:pr is:open review-requested:@me org:patternfly
```

**PRs in a specific repo:**
```
is:pr is:open review-requested:@me repo:owner/repo-name
```

**PRs with specific labels:**
```
is:pr is:open review-requested:@me label:priority
```

**Draft PRs (for early feedback):**
```
is:pr is:open draft:true review-requested:@me
```

**PRs you've reviewed that have new commits:**
```
is:pr is:open reviewed-by:@me -review:approved
```
