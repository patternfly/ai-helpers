---
name: summarize-jira-issues
description: "Summarize Jira sprint issues and contributions for the current user. Use when the user asks to: (1) See what's left in the sprint, (2) Summarize their assigned work, (3) Prioritize sprint tasks, (4) See issues they're contributing to, or (5) Understand what to work on next. Focuses on active sprint work first, then shows contributor roles and backlog."
---

# Summarize My Jira Issues

Fetch sprint issues assigned to or contributed by the current user, summarize the workload, and provide prioritization recommendations.

## Workflow

1. **Get user identity** - Identify the current user's Jira account
2. **Fetch sprint issues** - Query active sprint items (assigned + contributing)
3. **Fetch contributor issues** - Query issues where user is listed as contributor
4. **Analyze workload** - Categorize by sprint commitment vs contributions
5. **Generate summary** - Present sprint-focused overview with recommendations

## Step 1: Get User Identity

Identify the current user's Atlassian account and accessible Jira resources (account ID and cloud ID).

## Step 2: Fetch Sprint Issues

Run these queries in parallel via the Atlassian MCP:

**Active sprint issues assigned to user** (open statuses, ordered by priority then status):
```jql
assignee = currentUser() AND sprint in openSprints() AND status NOT IN (Done, Closed, Resolved) ORDER BY priority DESC, status ASC
```

**Sprint issues completed this sprint** (most recently resolved first):
```jql
assignee = currentUser() AND sprint in openSprints() AND status IN (Done, Closed, Resolved) ORDER BY resolved DESC
```

## Step 3: Fetch Contributor Issues

Query issues where the user is a contributor but not the assignee. Run in parallel with sprint queries.

```jql
"Contributor[User Picker (multiple users)]" = currentUser() AND assignee != currentUser() AND status NOT IN (Done, Closed, Resolved) ORDER BY priority DESC, updated DESC
```

**Note:** The contributor field name varies by Jira instance. Common alternatives: `"Contributors"`, `cf[XXXXX]`. If the query fails, try alternate field names or ask the user.

## Step 4: Fetch Backlog (Brief)

Fetch a brief backlog summary — sprint work takes priority. Limit to ~10 results.

```jql
assignee = currentUser() AND (sprint is EMPTY OR sprint not in openSprints()) AND status NOT IN (Done, Closed, Resolved) ORDER BY priority DESC, updated DESC
```

## Step 5: Analyze Workload

### Sprint Focus

The primary analysis should be on sprint items:

| Category | Criteria | Action |
|----------|----------|--------|
| 🔴 **Sprint - In Progress** | Active sprint items being worked on | Complete these first |
| 🟡 **Sprint - To Do** | Sprint items not yet started | Start after in-progress items |
| 🟢 **Sprint - Done** | Completed this sprint | Track velocity |

### Contributor Analysis

For issues where user is a contributor:

| Category | Criteria | Action |
|----------|----------|--------|
| 👥 **Active Contributions** | In Progress items you're helping with | May need your input |
| 📋 **Pending Contributions** | To Do items you'll contribute to | Be aware of upcoming work |

### Backlog (Brief)

Only highlight backlog items that are:
- High priority and may need sprint inclusion
- Blocked or stale and need attention
- Quick wins that could be done if sprint work completes early

## Step 6: Generate Summary

Present findings using this sprint-focused structure.

### Summary Output Template

```markdown
# Sprint Summary

## Sprint Status
- **Sprint Items Remaining:** [count]
- **In Progress:** [count] | **To Do:** [count]
- **Completed This Sprint:** [count]

---

## 🎯 Your Sprint Commitment

### In Progress
[List sprint items currently being worked on]

| Issue | Summary | Status | Updated |
|-------|---------|--------|---------|
| PROJ-123 | [summary] | In Progress | Today |

### To Do
[List sprint items not yet started]

| Issue | Summary | Priority |
|-------|---------|----------|
| PROJ-456 | [summary] | High |

### ✅ Completed This Sprint
[Brief list of completed sprint work]

- PROJ-111: [summary]
- PROJ-222: [summary]

---

## 👥 Contributing To

Issues where you're listed as a contributor (owned by others):

| Issue | Summary | Owner | Status | Updated |
|-------|---------|-------|--------|---------|
| PROJ-789 | [summary] | @owner | In Progress | Yesterday |

**Action needed:** [Note any contributor items that may need your input soon]

---

## 📋 Backlog Highlights

[Only show if relevant - keep brief]

**[count] items in backlog** (not in current sprint)

Notable items:
- [Any high priority items that might need sprint inclusion]
- [Any blocked items needing attention]

---

## Recommended Focus Order

1. **Now:** [Most urgent sprint item]
2. **Next:** [Second priority]
3. **Watch:** [Contributor items that may need input]
```

## Tips for Quality Summaries

**Sprint first:**
- Always lead with sprint commitment
- Sprint items are the primary deliverables
- Backlog is secondary context only

**Contributor awareness:**
- Highlight contributor items that are "In Progress" - you may be needed
- Note who owns each contributor issue
- Flag if contributor items are blocked waiting on you

**Keep backlog brief:**
- Only show top 5-10 backlog items
- Focus on items that might need sprint inclusion
- Don't overwhelm with full backlog listing

**Adapt to sprint state:**
- Early sprint: Focus on planning and getting started
- Mid sprint: Focus on progress and blockers
- Late sprint: Focus on completion and carryover risk

## Example Queries

**All sprint issues (any status):**
```jql
assignee = currentUser() AND sprint in openSprints()
```

**Sprint items at risk (not started, sprint half over):**
```jql
assignee = currentUser() AND sprint in openSprints() AND status = "To Do"
```

**Contributor issues in progress:**
```jql
"Contributor[User Picker (multiple users)]" = currentUser() AND status = "In Progress"
```

**Contributor issues updated recently:**
```jql
"Contributor[User Picker (multiple users)]" = currentUser() AND updated >= -3d
```

**High priority backlog (not in sprint):**
```jql
assignee = currentUser() AND sprint is EMPTY AND priority IN (Highest, High) AND status NOT IN (Done, Closed, Resolved)
```

**Backlog items not updated in 30 days:**
```jql
assignee = currentUser() AND sprint is EMPTY AND updated < -30d AND status NOT IN (Done, Closed, Resolved)
```
