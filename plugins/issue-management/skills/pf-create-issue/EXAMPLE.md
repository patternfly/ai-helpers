# Create Issue Skill - Examples

## Example 1: Bug Report with Template

You're in `patternfly/patternfly` and found a button focus bug.

```
/pf-create-issue

→ Detected repo: patternfly/patternfly
→ Issue type? (A) New Issue (B) Followup Issue
   A
→ Found templates: bug_report.md, feature_request.md, design_handoff.yml
   Which template? 1 (bug_report.md)
→ Pre-filled title: "Bug - Button focus ring not visible in dark mode"
   Accurate? y
→ Similar issues: None found
→ Created: [url of issue inserted here]
```

## Example 2: Followup Issue After CSS Changes

You updated Card CSS in patternfly and need React followup.

```
/pf-create-issue followup patternfly-react

→ How to determine followup work?
   (1) Describe yourself (2) Analyze commits
   2
→ Analyzing commits on feat/card-variants...
   Found: New CSS classes (.pf-m-compact, .pf-m-elevated)
→ Searching for patternfly-react locally... Found.
   Analyzing CardHeader.tsx...
→ Suggested work:
   - Add 'variant' prop to CardHeaderProps (CardHeader.tsx:24)
   - Update className logic (CardHeader.tsx:45)
   - Add examples in Card.md
   Correct? y
→ Auto-detected PR: patternfly#8219
   Use as reference? y
→ Similar issues: None found
→ Created: https://github.com/patternfly/patternfly-react/issues/10567
```

## Example 3: Consumer Finding Similar Issue

A PatternFly consumer wants to report a Select keyboard bug but doesn't know which repo. The consumer also has the GitHub CLI installed and authorized.

```
/pf-create-issue
User context: "Select dropdown not responding to arrow keys"

→ Not in a PatternFly repo.
→ Based on context (Select component), suggested repos:
   1. patternfly-react (React components)
   2. patternfly (HTML/CSS core)
   Other repos: patternfly-org, design-tokens, pf-codemods
   Which repo? 1
→ Issue type? A (New Issue)
→ Pre-filled title: "Select - Arrow keys not working"
   Accurate? y
→ Searching for similar issues...
   High relevance:
   #10456 - Select keyboard navigation broken [OPEN]
   High-Medium relevance:
   #10412 - Menu keyboard navigation issues [OPEN] (Menu used by Select)
   Create new, comment on existing, or cancel? 2
→ Comment on which issue? 10456
→ What comment? "I'm experiencing this same issue in v6.0.0"
→ Added comment to #10456
```
