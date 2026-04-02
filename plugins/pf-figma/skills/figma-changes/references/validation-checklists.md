# Validation Checklists

## Pre-Sync Validation Checklist

Run this checklist before starting a Figma sync to ensure smooth operation.

### Environment Setup
- [ ] Node.js installed (v14+)
  ```bash
  node --version
  ```
- [ ] GitHub CLI installed (if using GitHub integration)
  ```bash
  gh --version
  ```
- [ ] Figma access token set
  ```bash
  echo $FIGMA_ACCESS_TOKEN
  ```
- [ ] Working directory is correct
  ```bash
  pwd
  ```

### File Access
- [ ] Figma file URL is correct
- [ ] Have view/edit access to Figma file
- [ ] Token directory exists
  ```bash
  ls -la ./src/tokens/  # or your token path
  ```
- [ ] Token files contain valid CSS/SCSS variables
  ```bash
  grep -r "^--\|^\$" ./src/tokens/ | head -5
  ```

### Git Status
- [ ] Working tree is clean (no uncommitted changes)
  ```bash
  git status
  ```
- [ ] On correct branch
  ```bash
  git branch --show-current
  ```
- [ ] Latest changes pulled from remote
  ```bash
  git pull
  ```

### Script Permissions
- [ ] Scripts are executable
  ```bash
  ls -l scripts/*.sh
  ```
- [ ] No permission errors when running test command
  ```bash
  ./scripts/compare-tokens.sh --help
  ```

---

## Post-Sync Validation Checklist

After running the sync, validate the generated reports and data.

### Report Quality
- [ ] FIGMA_CHANGELOG.md generated and not empty
  ```bash
  wc -l FIGMA_CHANGELOG.md
  ```
- [ ] RELEASE_NOTES.md generated and not empty
  ```bash
  wc -l RELEASE_NOTES.md
  ```
- [ ] Detailed report (figma-updates-*.md) generated
  ```bash
  ls -lh figma-updates-*.md
  ```
- [ ] All referenced GitHub issues actually exist
  ```bash
  # Check first few issues manually
  gh issue view 1234
  ```
- [ ] Component names match your codebase
- [ ] Token names follow PatternFly conventions
- [ ] Dates and timestamps are correct (check timezone)

### Data Accuracy
- [ ] No duplicate entries in changelog
  ```bash
  # Check for duplicate component entries
  grep "^###" FIGMA_CHANGELOG.md | sort | uniq -d
  ```
- [ ] Status assignments (✅/⚠️/🔍) seem reasonable
- [ ] Token comparisons show actual values (not "undefined")
- [ ] File paths in checklist are correct
  ```bash
  # Verify files exist
  ls -l src/components/Button/_button.scss
  ```
- [ ] Color values are valid hex/rgb
  ```bash
  # Check for invalid color values
  grep -E "#[^0-9A-Fa-f]" figma-updates-*.md
  ```

### Priority Assignment
- [ ] Breaking changes marked as High Priority
- [ ] Minor adjustments marked appropriately
- [ ] Design-only updates clearly identified
- [ ] Verification-needed items have clear next steps

### Cross-References
- [ ] Figma links work and point to correct file
- [ ] PatternFly.org links are valid (not 404)
- [ ] GitHub issue links resolve correctly
- [ ] File paths exist in codebase

---

## Code Update Validation Checklist

Before implementing code changes from the sync report, validate the proposed updates.

### Token Changes Review
- [ ] Understand impact of each token change
- [ ] Check for cascading effects (tokens that reference other tokens)
- [ ] Verify no circular dependencies
- [ ] Consider backward compatibility
- [ ] Document breaking changes

### Visual Regression Check
- [ ] Take screenshots of components before changes
- [ ] Identify which pages use affected components
- [ ] Plan visual regression tests
- [ ] Consider mobile/responsive impact
- [ ] Check dark mode / theme variations

### Accessibility Validation
- [ ] Color contrast meets WCAG AA (use contrast checker)
  ```bash
  # For critical color changes
  # Foreground: #004080, Background: #FFFFFF
  # Check at: https://webaim.org/resources/contrastchecker/
  ```
- [ ] Font sizes meet minimum requirements (16px+ for body)
- [ ] Touch targets meet size requirements (44x44px minimum)
- [ ] Focus indicators remain visible

### Code Impact Assessment
- [ ] Identify all files needing updates
  ```bash
  # Find all uses of a token
  grep -r "--pf-c-button--BackgroundColor" src/
  ```
- [ ] Check for hardcoded values that should use tokens
- [ ] Review component snapshots that may need updating
- [ ] Identify integration tests that may be affected

### Dependencies & Build
- [ ] No new dependencies required
- [ ] Build passes with changes
  ```bash
  npm run build
  ```
- [ ] Linter passes
  ```bash
  npm run lint
  ```
- [ ] Type checking passes (if using TypeScript)
  ```bash
  npm run type-check
  ```

---

## Release Validation Checklist

Before releasing changes based on Figma sync, ensure quality and completeness.

### Testing
- [ ] Unit tests updated and passing
  ```bash
  npm test
  ```
- [ ] Visual regression tests pass
- [ ] Integration tests pass
- [ ] Manual testing in all supported browsers
- [ ] Manual testing on mobile devices
- [ ] Accessibility audit passes

### Documentation
- [ ] Component documentation updated
- [ ] Changelog/release notes updated
- [ ] Migration guide created (if breaking changes)
- [ ] Example code updated
- [ ] Storybook/demos updated

### Code Quality
- [ ] Code review completed
- [ ] No console warnings/errors
- [ ] Performance benchmarks acceptable
- [ ] Bundle size impact acceptable
- [ ] CSS specificity hasn't increased unnecessarily

### Stakeholder Review
- [ ] Design team approves changes
- [ ] Product team aware of changes
- [ ] Breaking changes communicated
- [ ] Release scheduled appropriately

### Post-Release
- [ ] Monitor error tracking for issues
- [ ] Watch for bug reports
- [ ] Prepare hotfix plan if needed
- [ ] Document lessons learned
- [ ] Update sync process if needed

---

## Continuous Improvement Checklist

Periodically review and improve your sync process.

### Process Efficiency
- [ ] Sync time is acceptable (< 5 minutes ideal)
- [ ] False positives are minimal
- [ ] Token mappings are up to date
- [ ] Automation is working correctly
- [ ] Team is using reports effectively

### Data Quality
- [ ] Status determination is accurate (> 90%)
- [ ] Token comparisons are reliable
- [ ] GitHub integration finds relevant issues
- [ ] Component detection is comprehensive
- [ ] No duplicate work across syncs

### Team Adoption
- [ ] Designers understand how to trigger sync
- [ ] Developers know how to read reports
- [ ] Process is documented in team wiki
- [ ] Onboarding includes sync training
- [ ] Feedback loop exists for improvements

### Tool Updates
- [ ] Scripts are maintained and updated
- [ ] Dependencies are up to date
  ```bash
  npm outdated
  ```
- [ ] Figma API changes are tracked
- [ ] PatternFly updates are incorporated
- [ ] New features are considered

---

## Quick Reference: Critical Checks

**Before every sync:**
```bash
# 1. Environment ready?
node --version && echo $FIGMA_ACCESS_TOKEN | head -c 20 && git status

# 2. Access confirmed?
curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/me" | jq .email

# 3. Paths correct?
ls ./src/tokens/*.scss && ls ./scripts/*.sh
```

**After every sync:**
```bash
# 1. Reports generated?
ls -lh FIGMA_CHANGELOG.md RELEASE_NOTES.md figma-updates-*.md

# 2. No obvious errors?
tail -20 figma-updates-*.md

# 3. Ready to review?
wc -l FIGMA_CHANGELOG.md  # Should be > 0
```

**Before code changes:**
```bash
# 1. Impact understood?
grep -c "Code update needed" figma-updates-*.md

# 2. Tests ready?
npm test

# 3. Backup created?
git checkout -b figma-sync-$(date +%Y%m%d)
```
