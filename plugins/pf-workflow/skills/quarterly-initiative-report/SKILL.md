---
name: quarterly-initiative-report
description: Generate comprehensive quarterly Jira status reports with progress tracking, RAG assessment, blocker identification, cross-project duplicate link analysis, and Q+1 recommendations. Use when generating quarterly reports, tracking initiative progress, or analyzing epic completion metrics across Jira projects with labels.
disable-model-invocation: false
---

# Quarterly Initiative Status Report

Generate comprehensive quarterly status reports for Jira initiatives with progress tracking, RAG (Red/Amber/Green) status assessment, blocker identification, and next-quarter priority recommendations.

## Requirements

| Tool | Purpose | Check |
|---|---|---|
| `curl` | Jira REST API calls | `command -v curl` |
| `jq` | JSON parsing | `command -v jq` or `brew install jq` |

## Prerequisites

This skill requires Jira API credentials configured as environment variables:

| Variable | Description | Example |
|---|---|---|
| `ATLASSIAN_EMAIL` | Your Atlassian account email | `user@company.com` |
| `ATLASSIAN_API_TOKEN` | API token from [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) | `ATATT3xFfGF0...` |
| `JIRA_SITE_URL` | Your Jira instance URL | `https://company.atlassian.net` |

### Setting Environment Variables

**Option 1: In AI tool settings** (Claude Code settings.json, Cursor config):
```json
{
  "env": {
    "ATLASSIAN_EMAIL": "your-email@company.com",
    "ATLASSIAN_API_TOKEN": "your-token-here",
    "JIRA_SITE_URL": "https://your-company.atlassian.net"
  }
}
```

**Option 2: Shell environment** (add to ~/.zshrc or ~/.bashrc):
```bash
export ATLASSIAN_EMAIL="your-email@company.com"
export ATLASSIAN_API_TOKEN="your-token-here"
export JIRA_SITE_URL="https://your-company.atlassian.net"
```

**Verify credentials:**
```bash
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_SITE_URL/rest/api/3/myself" | jq '.displayName'
```

## Usage

When invoked, gather from the user:
1. **Jira Project Key** (e.g., "PF" for PatternFly)
2. **Label** identifying the initiative (e.g., "Q1-2026" or "Q12026")

Then execute the workflow below to generate the comprehensive report.

## Workflow

### Step 1: Fetch All Epics with the Label

```bash
# Search for all epics/initiatives with the label
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jql":"project=PROJECT AND labels=\"LABEL\" AND type IN (Epic, Initiative)","fields":["key","summary","status","assignee","duedate","issuetype","labels"],"maxResults":1000}' \
  "$JIRA_SITE_URL/rest/api/3/search/jql"
```

### Step 2: For Each Epic, Gather Complete Metrics

**Process for EVERY epic (including closed):**

1. **Fetch direct sub-issues:**
```bash
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jql":"parent=EPIC-KEY","fields":["key","summary","status","priority"],"maxResults":1000}' \
  "$JIRA_SITE_URL/rest/api/3/search/jql" | \
  jq '{
    total: (.issues | length),
    done: ([.issues[] | select(.fields.status.statusCategory.key == "done")] | length),
    in_progress: ([.issues[] | select(.fields.status.statusCategory.key == "indeterminate")] | length),
    todo: ([.issues[] | select(.fields.status.statusCategory.key == "new")] | length),
    completion_pct: (if (.issues | length) > 0 then (([.issues[] | select(.fields.status.statusCategory.key == "done")] | length) * 100 / (.issues | length) | floor) else 0 end)
  }'
```

2. **Check for duplicate links (CRITICAL for all epics):**
```bash
# Check EVERY epic for cross-project duplicate links
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_SITE_URL/rest/api/3/issue/EPIC-KEY?fields=issuelinks" | \
  jq '{
    key: .key,
    duplicates: [.fields.issuelinks[] | select(.type.name == "Duplicate") | {
      linked_issue: (if .outwardIssue then .outwardIssue.key else .inwardIssue.key end),
      linked_type: (if .outwardIssue then .outwardIssue.fields.issuetype.name else .inwardIssue.fields.issuetype.name end)
    }]
  }'
```

3. **For each linked epic, fetch its child issues:**
```bash
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jql":"parent=LINKED-EPIC-KEY","fields":["key","summary","status"],"maxResults":1000}' \
  "$JIRA_SITE_URL/rest/api/3/search/jql" | \
  jq '{
    total: (.issues | length),
    done: ([.issues[] | select(.fields.status.statusCategory.key == "done")] | length),
    in_progress: ([.issues[] | select(.fields.status.statusCategory.key == "indeterminate")] | length),
    todo: ([.issues[] | select(.fields.status.statusCategory.key == "new")] | length)
  }'
```

**IMPORTANT:** Combine direct children + linked epic children for total metrics. Many cross-project initiatives track significant work via duplicate links (e.g., AAP, MTV, CONSOLE, SAT projects).

### Step 3: Calculate Aggregate Metrics

- **Total Issues:** Sum all direct + linked issues across all epics
- **Overall Completion:** (Total Done / Total Issues) × 100
- **Epic Counts:** Closed, In Progress, New
- **Cross-Project Work:** Issues tracked via duplicate links

### Step 4: Identify Blockers

```bash
# Find high-priority or blocked issues
curl -s -u "$ATLASSIAN_EMAIL:$ATLASSIAN_API_TOKEN" \
  -H "Accept: application/json" \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jql":"labels=\"LABEL\" AND (status=Blocked OR priority=Highest)","fields":["key","summary","status","priority","assignee"],"maxResults":100}' \
  "$JIRA_SITE_URL/rest/api/3/search/jql"
```

### Step 5: Determine RAG Status

For each epic:
- **🟢 Green (On Track):** ≥75% complete OR ≥50% with no blockers
- **🟡 Amber (At Risk):** 40-74% complete OR 1-2 non-critical blockers
- **🔴 Red (Critical):** <40% complete OR critical blockers OR unassigned near deadline

### Step 6: Generate Report

Structure the output markdown report with these sections:

## Report Structure

```markdown
# Quarterly Initiative Status Report: [Initiative Name]
**Reporting Period:** [Quarter/Year]
**Report Date:** [Current Date]
**Overall Status:** 🟢/🟡/🔴 [RAG]

---

## Executive Summary

[2-3 paragraphs: overall health, key achievements, critical concerns]

**Key Metrics:**
- Overall Completion: X% (Y/Z issues)
- Epics Completed: A of B
- Critical Blockers: C

---

## Initiative Overview

**Initiative:** [Label/Name]
**Quarter:** Q# YYYY
**Timeline:** [Start] - [End]
**Days Remaining:** X days

**Goals:** [Extracted from initiative description or inferred]

---

## Epic Status Dashboard

| Epic | Owner | Status | Progress | RAG | Notes |
|------|-------|--------|----------|-----|-------|
| [KEY] [Summary] | [Owner] | In Progress | 75% (15/20) | 🟢 | |
| [KEY] [Summary] | [Owner] | In Progress | 45% (9/20) | 🟡 | Has 1 blocker |
| [KEY] [Summary] | [Owner] | New | 0% (0/10) | 🔴 | Unassigned |

---

## Detailed Metrics

### Overall Progress
- **Total Issues:** X
- **Completed:** Y (Z%)
- **In Progress:** A (B%)
- **To Do:** C (D%)

### Cross-Project Work
- **Total Linked Issues:** N (via duplicate epics)
- **Projects:** AAP, MTV, CONSOLE, SAT, etc.
- **Linked Completion:** P%

### By Epic
[For each epic with duplicate links, show:]
- **[Epic Key]** - [Summary]: X direct children (Y% complete)
  - Linked via duplicates: [Linked Epic Key] (Z children, W% complete)
  - Combined: Total issues, overall %

---

## Blockers and Risks

### Critical Blockers (Immediate Action Required)
1. **[Epic Key]:** [Description]
   - Impact: High/Medium/Low
   - Recommendation: [Action]

### Risks (Monitor Closely)
1. **[Risk]:** [Description]
   - Likelihood: High/Medium/Low
   - Impact: High/Medium/Low
   - Mitigation: [Strategy]

---

## Q+1 Priority Recommendations

### Must Complete (Carryover)
1. **[Epic/Task]** - [Reason why critical]

### High Priority (Next Phase)
1. **[Suggested Work]** - [Builds on completed X]

---

## Appendix

### Methodology
- Data source: Jira REST API v3
- Reporting period: [Dates]
- Status categories: "done", "indeterminate", "new"

### Complete Epic Reference Table

| Epic | Summary | Owner | Done | In Prog | To Do | Total | % | Link |
|------|---------|-------|------|---------|-------|-------|---|------|
| **[KEY]** | [Summary] | [Owner] | X | Y | Z | N | P% | [View]([url]) |

**Notes:**
- * Indicates epic with cross-project duplicate links
- Total includes direct + linked epic work
- Sorted by completion % (descending)

**Summary Totals:**
- Total Issues: X
- Completed: Y (Z%)
```

## Best Practices

1. **Check ALL epics for duplicate links** - Even closed epics may track work in other projects
2. **Report cross-project work** - Many initiatives span multiple Jira projects (AAP, MTV, etc.)
3. **Use data-driven RAG** - Don't guess; base status on actual completion %
4. **Track trends** - Compare with previous reports to show velocity
5. **Be concise in executive summary** - Decision-makers want key facts
6. **Include appendix table** - Full epic reference with links for drill-down

## Common Patterns

**Epic with no direct children but has linked work:**
```
Epic PF-3227: Ansible Nexus Migration (Closed)
  Direct children: 0 issues
  Linked via duplicates:
    - AAP-58793: 16 issues (16 done, 100%)
  Combined: 16 issues, 100% complete ✅
```

**Epic with both direct and linked work:**
```
Epic PF-3408: Ansible Q1 Features (In Progress)
  Direct children: 0 issues
  Linked via duplicates:
    - AAP-60038: 63 issues (55 done, 87%)
    - AAP-57961: 18 issues (18 done, 100%)
    - AAP-59349: 56 issues (22 done, 39%)
  Combined: 137 issues, 69% complete
```

## Example Invocation

**User:** "Generate a quarterly report for PF project with label Q12026"

**Assistant actions:**
1. Confirm project key and label with user
2. Fetch all epics with label
3. For each epic:
   - Fetch direct children
   - Check for duplicate links
   - Fetch linked epic children
   - Calculate combined metrics
4. Calculate aggregate statistics
5. Identify blockers and assign RAG status
6. Generate comprehensive markdown report
7. Save report to file with date in filename

**Output file:** `Q1-2026-Q12026-Quarterly-Report-[DATE].md`
