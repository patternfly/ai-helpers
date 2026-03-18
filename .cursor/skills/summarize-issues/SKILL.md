---
name: summarize-issues
description: "Summarize Jira issues assigned to the current user and recommend priorities. Use when the user asks to: (1) See what's on their plate, (2) Summarize their assigned work, (3) Prioritize their issues or tasks, (4) Get an overview of their Jira backlog, or (5) Understand what to work on next. Fetches issues from Jira, analyzes by priority/status/due date, and provides actionable prioritization."
---

# Summarize My Jira Issues

Fetch all Jira issues assigned to the current user, summarize the workload, and provide prioritization recommendations.

## Workflow

1. **Get user identity** - Identify the current user's Jira account
2. **Fetch assigned issues** - Query Jira for all open issues assigned to the user
3. **Analyze workload** - Categorize issues by priority, status, and urgency
4. **Generate summary** - Present a clear overview with prioritization recommendations

## Step 1: Get User Identity and Cloud ID

First, get the user's Atlassian account info and accessible resources.

```
atlassianUserInfo()
getAccessibleAtlassianResources()
```

Store the `accountId` from user info and `cloudId` from resources for subsequent queries.

## Step 2: Fetch Assigned Issues

Query all open issues assigned to the current user using JQL.

**Primary query - All open assigned issues:**
```
searchJiraIssuesUsingJql(
    cloudId="[cloudId]",
    jql='assignee = currentUser() AND status NOT IN (Done, Closed, Resolved) ORDER BY priority DESC, duedate ASC',
    maxResults=100,
    fields=["summary", "status", "priority", "issuetype", "duedate", "created", "updated", "project", "labels"],
    responseContentFormat="markdown"
)
```

**If pagination needed:** Use `nextPageToken` from results to fetch additional pages.

**Optional - Recently completed (last 7 days):**
```
searchJiraIssuesUsingJql(
    cloudId="[cloudId]",
    jql='assignee = currentUser() AND status IN (Done, Closed, Resolved) AND resolved >= -7d ORDER BY resolved DESC',
    maxResults=20,
    fields=["summary", "status", "priority", "resolved", "project"],
    responseContentFormat="markdown"
)
```

## Step 3: Analyze Workload

Categorize and analyze the fetched issues.

### Priority Buckets

Group issues into action categories:

| Category | Criteria | Action |
|----------|----------|--------|
| 🔴 **Urgent** | Highest/High priority OR overdue OR blocked status | Address immediately |
| 🟡 **This Week** | Medium priority with due dates within 7 days | Plan for this week |
| 🟢 **Backlog** | Lower priority OR no due date | Schedule when capacity allows |

### Workload Metrics

Calculate:
- **Total open issues** - Overall workload size
- **Issues by status** - In Progress, To Do, Blocked, In Review
- **Issues by priority** - Highest, High, Medium, Low, Lowest
- **Overdue count** - Issues past due date
- **Due this week** - Issues due in next 7 days

### Red Flags to Identify

Flag these patterns:
- Issues blocked for >3 days
- High priority issues not started
- Multiple overdue items
- Too many items "In Progress" simultaneously (>3 suggests context switching)

## Step 4: Generate Summary

Present findings using this structure.

### Summary Output Template

```markdown
# Your Jira Workload Summary

## At a Glance
- **Total Open Issues:** [count]
- **In Progress:** [count] | **Blocked:** [count] | **To Do:** [count]
- **Overdue:** [count] | **Due This Week:** [count]

---

## 🔴 Priority 1: Urgent (Address Today)

[List issues that are:
- Highest/High priority AND in progress or blocked
- Overdue regardless of priority
- Explicitly marked as blockers]

| Issue | Summary | Status | Due |
|-------|---------|--------|-----|
| PROJ-123 | [summary] | In Progress | Overdue by 2d |

**Why urgent:** [Brief explanation of why these need immediate attention]

---

## 🟡 Priority 2: This Week

[List issues that are:
- Medium-High priority with due dates within 7 days
- High priority not yet started]

| Issue | Summary | Status | Due |
|-------|---------|--------|-----|
| PROJ-456 | [summary] | To Do | Mar 20 |

**Recommendation:** [Suggested order or approach]

---

## 🟢 Priority 3: Backlog

[Remaining issues, grouped by project or type if helpful]

| Issue | Summary | Priority | Status |
|-------|---------|----------|--------|
| PROJ-789 | [summary] | Medium | To Do |

---

## ⚠️ Attention Needed

[Flag any concerning patterns:]
- **Blocked issues:** [list any blocked items with notes on blockers if available]
- **Context switching risk:** You have [X] items in progress simultaneously
- **Aging items:** [Issues not updated in >14 days]

---

## ✅ Recently Completed (Last 7 Days)

[Brief list of completed work for context/motivation]

- PROJ-111: [summary]
- PROJ-222: [summary]

---

## Recommended Focus Order

1. **First:** [Most urgent item with reason]
2. **Then:** [Next priority with reason]
3. **If time permits:** [Additional items]
```

## Tips for Quality Summaries

**Be specific about priorities:**
- Don't just list by Jira priority - consider due dates and blockers
- Explain *why* something is urgent (overdue, blocking others, high business impact)

**Make it actionable:**
- Suggest a specific order to tackle work
- Identify items that can be quick wins
- Flag items that need clarification or are blocked

**Provide context:**
- Link to Jira issues directly
- Show status and due dates
- Mention recently completed work for morale

**Adapt to workload size:**
- For <10 issues: List all individually
- For 10-30 issues: Group by priority/project
- For >30 issues: Summarize by category, highlight top 10

## Example Queries

**All blocked issues:**
```jql
assignee = currentUser() AND status = Blocked
```

**Overdue issues:**
```jql
assignee = currentUser() AND duedate < now() AND status NOT IN (Done, Closed, Resolved)
```

**Due this week:**
```jql
assignee = currentUser() AND duedate >= startOfWeek() AND duedate <= endOfWeek() AND status NOT IN (Done, Closed, Resolved)
```

**High priority not started:**
```jql
assignee = currentUser() AND priority IN (Highest, High) AND status = "To Do"
```

**Stale issues (not updated in 14 days):**
```jql
assignee = currentUser() AND updated < -14d AND status NOT IN (Done, Closed, Resolved)
```
