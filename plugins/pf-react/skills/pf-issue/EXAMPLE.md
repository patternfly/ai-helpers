# PatternFly Issue Skill - Usage Examples

## Quick Start

```bash
/pf-issue                    # Interactive mode - asks all questions
/pf-issue patternfly-react   # Target specific repo
/pf-issue followup patternfly-org  # Create followup issue
```

## Example Scenarios

### Scenario 1: Bug Report in Current Repo

You're working in `patternfly/patternfly` and found a bug in the Button component.

```
User: /pf-issue

Claude: I see you're in patternfly/patternfly.
        Would you like to create an issue in the current repo or another PatternFly repo?
User: Current repo

Claude: What type of issue are you creating?
        A. New Issue
        B. Followup Issue
User: A

Claude: I found these issue templates in this repo:
        1. bug_report.md
        2. feature_request.md
        3. tech_debt_request.md
        4. devX_request.md
        5. design_handoff.yml
        6. Create a blank issue

        Which would you like to use?
User: 1

Claude: Great! I'll use the bug_report.md template.

        Based on your context, I've pre-populated some fields:

        **Title**: Bug - Button - Focus ring not visible in dark mode
        Is this accurate? (y/n/edit)
User: y

Claude: **Which version is this affecting?**
        - [ ] PatternFly 5
        - [ ] PatternFly 6
        - [ ] other
User: PatternFly 6

Claude: **Describe the problem**:
        Pre-filled: "The Button component's focus ring is not visible when using dark mode theme. The ring color doesn't adjust for dark backgrounds."
        Is this accurate? (y/n/edit)
User: y

[... continues through all template fields ...]

Claude: Checking for similar issues in patternfly/patternfly...

        Found 2 potentially similar issues:
        #8156 - Button focus styles inconsistent [OPEN]
        https://github.com/patternfly/patternfly/issues/8156

        #7924 - Dark mode contrast issues [CLOSED]
        https://github.com/patternfly/patternfly/issues/7924
        Closed: 2025-02-10

        Would you like to:
        1. Create a new issue anyway
        2. Comment on #8156 instead
        3. Cancel and review these issues first
User: 1

Claude: Would you like to create this issue directly using GitHub CLI or save it to a file?
        1. Create with gh CLI (requires authentication)
        2. Save to file
User: 1

Claude: ✓ Created issue #8220: Bug - Button - Focus ring not visible in dark mode
        https://github.com/patternfly/patternfly/issues/8220
```

---

### Scenario 2: Followup Issue for Token Changes

You just finished updating design tokens in `patternfly/design-tokens` and need to create followup work in `patternfly/patternfly`.

```
User: /pf-issue followup patternfly

Claude: How would you like to determine the followup work needed?
        1. Provide it yourself - You'll describe what needs to be done
        2. Analyze commit history - I'll review your commits to suggest followup work
User: 2

Claude: Analyzing commits on current branch (feat/spacing-tokens-update)...

        Found 5 commits:
        a1b2c3d feat: add new spacing scale tokens
        d4e5f6g feat: update semantic spacing tokens
        h7i8j9k docs: update token documentation
        ...

        Based on these changes, here's the suggested followup work for patternfly/patternfly:

        - Update spacing utility classes to use new --pf-t--global--spacer-* tokens
        - Replace deprecated --pf-global--spacer tokens in component CSS
        - Update layout components (Grid, Stack, Flex) token references
        - Add CSS variable mappings for backward compatibility

        Does this look correct, or would you like to modify?
User: Yes, and also add "Update documentation with migration guide"

Claude: Added: Update documentation with migration guide

        Here's the complete followup issue:

        **Title**: Update PatternFly core to use new spacing tokens

        **Body**:
        ## Context
        This is followup work from design-tokens#234 (feat/spacing-tokens-update).

        ### Changes in design-tokens
        - Added new spacing scale tokens (--pf-t--global--spacer-xs through --pf-t--global--spacer-4xl)
        - Updated semantic spacing tokens to reference new scale
        - Deprecated legacy --pf-global--spacer tokens

        ### Work Needed in patternfly
        - [ ] Update spacing utility classes to use new --pf-t--global--spacer-* tokens
        - [ ] Replace deprecated --pf-global--spacer tokens in component CSS
        - [ ] Update layout components (Grid, Stack, Flex) token references
        - [ ] Add CSS variable mappings for backward compatibility
        - [ ] Update documentation with migration guide

        ### References
        - Source PR: [design-tokens#234](https://github.com/patternfly/design-tokens/pull/234)

        Checking for similar issues in patternfly/patternfly...
        No similar issues found.

        Create with gh CLI or save to file?
User: Save to file

Claude: Checking GitHub CLI status...
        GitHub CLI is available and authenticated.

        Would you like to:
        1. Create directly with GitHub CLI
        2. Save to file
User: 2

Claude: Where would you like to save the issue file?
        Default: ~/Desktop/patternfly-issue-2026-03-16.md
User: [Enter]

Claude: ✓ Saved issue to ~/Desktop/patternfly-issue-2026-03-16.md

        You can create the issue manually by:
        1. Go to https://github.com/patternfly/patternfly/issues/new
        2. Copy the title and body from the saved file
        3. Provide any other necessary information depending on the issue being created
```

---

### Scenario 3: Followup to React After CSS Changes

You updated the Card component CSS in `patternfly/patternfly` and need followup work in `patternfly-react`.

```
User: /pf-issue followup patternfly-react

Claude: You're currently in patternfly/patternfly on branch feat/card-updates.

        Attempting to auto-detect PR...
        Found PR #8219: Card header variants and token updates
        Would you like to use this PR as the reference? (y/n)
User: y

Claude: How would you like to determine the followup work needed?
        1. Provide it yourself
        2. Analyze commit history
User: 2

Claude: Analyzing commits since main...

        Found 3 commits modifying Card component:
        - feat(card): add new card header variants
        - feat(card): update card to use unified theme tokens
        - fix(card): improve card border radius in nested cards

        Key file changes:
        - src/patternfly/components/Card/card.scss
        - src/patternfly/components/Card/examples/Card.md

        What followup work is needed in patternfly-react?
        (You can describe it, or let me analyze the commits to suggest work)
User: Analyze the commits

Claude: Based on the CSS changes, here's the suggested followup work:

        New CSS classes detected:
        - .pf-v6-c-card__header--variant-compact
        - .pf-v6-c-card__header--variant-elevated

        New CSS variables:
        - --pf-v6-c-card--BackgroundColor (now uses --pf-t--global--background--color--primary)
        - --pf-v6-c-card--BorderColor (now uses --pf-t--global--border--color--default)

        Searching for patternfly-react repository locally...
        Found: ~/GitHub/PatternFly/patternfly-react

        Analyzing target repo files...
        - Found CardHeader component at packages/react-core/src/components/Card/CardHeader.tsx
        - Found Card examples at packages/react-core/src/components/Card/examples/Card.md
        - Current CardHeader props don't include variant prop

        Specific followup work for patternfly-react:
        - Add 'variant' prop to CardHeaderProps interface (CardHeader.tsx:24)
          - Type: 'default' | 'compact' | 'elevated'
        - Update CardHeader className logic to include variant modifier (CardHeader.tsx:45)
        - Add examples demonstrating new header variants in Card.md
        - Update Card tests (Card.test.tsx) to cover new variants
        - Update migration guide for token changes

        Would you like to modify these suggestions?
User: Looks good

Claude: Checking for similar issues in patternfly/patternfly-react...

        Found 1 potentially similar issue:
        #10234 - Card: Add support for new variants [OPEN]
        https://github.com/patternfly/patternfly-react/issues/10234
        Labels: enhancement, card

        This looks like it might be related. Would you like to:
        1. Create a new issue anyway
        2. Comment on #10234 to mention the CSS changes are ready
        3. Cancel and review #10234 first
User: 2

Claude: What would you like to comment on #10234?
User: The CSS changes for card header variants are now available in PatternFly core v6.0.0-alpha.120. Ready for React implementation.

Claude: ✓ Added comment to patternfly-react#10234
        https://github.com/patternfly/patternfly-react/issues/10234#issuecomment-...
```

---

### Scenario 4: Feature Request with Design Handoff

You're a designer handing off approved designs for a new component.

```
User: /pf-issue patternfly

Claude: What type of issue are you creating?
        A. New Issue
        B. Followup Issue
User: A

Claude: I found these issue templates:
        1. bug_report.md
        2. feature_request.md
        3. tech_debt_request.md
        4. devX_request.md
        5. design_handoff.yml
        6. Create a blank issue

        Which would you like to use?
User: 5

Claude: Great! I'll use the design_handoff.yml template.

        **Title**: [Design]:
User: Navigation Dock - Mobile responsive variant

Claude: **Figma Link**: Link to the specific frame or page. Include before/after screens.
User: https://www.figma.com/file/xyz/Navigation-Dock-Mobile

Claude: **Jira/GitHub Ticket Link**: Link to the original design request.
User: https://issues.redhat.com/browse/PF-1234

Claude: **Design Screenshot**: Paste a screenshot for quick reference.
User: [User pastes image]

Claude: **Any extra notes for developers**: Key changes, variants, hover states, transitions, responsive behavior.
User: Mobile breakpoint should collapse nav items into a bottom drawer. Uses new slide-up animation token. Touch targets must be minimum 44px.

Claude: Checking for similar issues in patternfly/patternfly...
        No similar issues found.

        Create with gh CLI or save to file?
User: gh CLI

Claude: ✓ Created issue #8221: Design: Navigation Dock - Mobile responsive variant
        https://github.com/patternfly/patternfly/issues/8221
```

---

### Scenario 5: Quick Blank Issue

Creating a simple task without a template.

```
User: /pf-issue patternfly-org

Claude: What type of issue are you creating?
        A. New Issue
        B. Followup Issue
User: A

Claude: I found these issue templates:
        [Lists templates...]

        Which would you like to use?
User: 6 (blank)

Claude: **Title**:
User: Update PatternFly version in docs site to v6.0.0-alpha.120

Claude: **Description**: Clear description of the task.
User: Update the PatternFly core CSS package version reference throughout the docs site to use the latest alpha release.

Claude: **Background**: Why is this needed?
User: New alpha includes card header variants that are documented but not yet reflected in live examples.

Claude: **Acceptance Criteria**: Specific requirements.
User: - Update package.json, - Regenerate examples, - Verify all pages load correctly

Claude: **Additional Context**: Screenshots, links, etc.
User: See https://github.com/patternfly/patternfly/releases/tag/v6.0.0-alpha.120

Claude: **Related Issues/PRs**:
User: Follows from patternfly#8219

Claude: Checking for similar issues in patternfly/patternfly-org...
        No similar issues found.

        Create with gh CLI or save to file?
User: Save to file

Claude: ✓ Saved to ~/Desktop/patternfly-org-issue-2026-03-16.md
```

---

### Scenario 6: Context-Based Repo Suggestions

Creating an issue when not in a PatternFly repo, with intelligent repo suggestions.

```
User: /pf-issue
User's message: "I need to create an issue about updating the Button component to support the new design tokens"

Claude: You're not currently in a PatternFly repository.

        Based on your context (mentions of "Button component" and "design tokens"),
        I suggest these repositories:

        **Suggested:**
        1. patternfly-react - React components
        2. design-tokens - Design tokens
        3. patternfly - HTML/CSS core

        **Other common repos:**
        4. patternfly-org - Documentation site
        5. react-component-groups - React extension components
        6. pf-codemods - Codemods for migrations

        Which PatternFly repo would you like to create an issue for?
User: 1

Claude: Creating issue for patternfly-react.

        What type of issue are you creating?
        A. New Issue
        B. Followup Issue
User: B

[... continues with followup issue workflow ...]
```

---

## Tips for Effective Use

### For Bug Reports

- Include CodePen/CodeSandbox when possible
- List specific PatternFly version (check package.json)
- Mention if it's a regression

### For Followup Issues

- Create followup issues BEFORE merging the source PR
- Link the source PR in the followup issue body
- Tag relevant team members if cross-team coordination needed

### For Feature Requests

- Attach design mockups or Figma links
- Specify if it's a new component or enhancement
- Mention target release if known

### General Tips

- Use descriptive titles following the repo's conventions
- Check similar issues to avoid duplicates
- Add appropriate labels (will be suggested based on content)
- Save to file when creating multiple related issues for batch upload
