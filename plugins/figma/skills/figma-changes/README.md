# Figma Design Change Tracker Skill

Track layer-level Figma design updates and generate detailed changelogs with smart filtering.

## What This Skill Does

This skill helps you:
- 📊 Track layer-level changes within Figma components
- 📝 Generate detailed changelogs showing exactly what changed
- 🔍 Cross-reference design updates with GitHub issues
- ✅ Categorize changes (Added, Removed, Fixed, Modified)
- 🎨 See before/after values for every property change
- 🎯 Smart filtering to focus on visual changes (filters out metadata noise)
- ✨ **Highlight new variants added to existing components** (dedicated section)

## When to Use

The skill automatically triggers when you:
- Ask to "check Figma updates"
- Want to "compare Figma with code"
- Need to "audit design tokens"
- Mention "design system updates"
- Discuss "sync design and code"

## Smart Filtering

The skill automatically filters changes to focus on visual impact:

**✅ Includes:**
- Semantic color/dimension token changes
- Layer additions or removals
- Typography, spacing, and layout changes
- Text content updates
- Component structure changes

**❌ Filters Out:**
- Description or documentation updates
- Scope or organizational changes
- Layer name changes (without visual impact)
- Tags, labels, or category updates

Result: Clean, focused changelogs without metadata noise!

## Quick Start

1. **Get your Figma access token** (optional but recommended):
   - Go to https://www.figma.com/developers/api#access-tokens
   - Generate a personal access token
   - Store it: `export FIGMA_ACCESS_TOKEN="your-token"`

2. **Have your Figma file URL ready**:
   ```
   https://www.figma.com/file/ABC123/My-Design-System
   ```

3. **Ask Claude**:
   ```
   Check for Figma updates and compare with our code
   ```

## Example Workflows

### Track Recent Changes
```
What changed in our Figma design system in the last week?
```

### Check Specific Time Period
```
Show me all Figma updates from last week
```

### Track Multiple Files
```
Check for updates across all PatternFly Figma files
```

### Generate Release Notes
```
Create release notes for the March design updates
```

## Output Format

The skill generates three reports:

1. **FIGMA_CHANGELOG.md**
   - Executive summary of changes
   - Categorized tables (Added, Removed, Fixed, Modified)
   - Layer-level detail sections for each component
   - Before/after values for all property changes
   - Designer attribution and dates
   - GitHub issue references
   - Example: "🔄 Modified Alert icon: Size `16px → 20px`, Color `#0066CC → #004080`"

2. **RELEASE_NOTES.md**
   - Consumer-facing high-level summary
   - What's new, what's removed, and what's fixed
   - Action items for teams

3. **CHANGELOG_EXPORT.md** 🆕
   - Clean, copy-paste ready format
   - Optimized for Slack, Jira, and GitHub
   - Simple bullet lists (no tables)
   - All links clickable
   - Mobile-friendly

## Files in This Skill

- `SKILL.md` - Main skill instructions
- `references/figma-api-guide.md` - Figma API reference
- `scripts/extract-figma-file-key.sh` - Extract file key from URL
- `scripts/compare-tokens.js` - Automated token comparison

## Configuration

### Time Range
Default: Last 30 days

Customize the time range:
```
Check updates from the last 7 days
Check updates since March 1st
```

### Figma Files
The skill can track multiple Figma files in one run. Just provide the URLs when asked.

## Tips

### Running Checks
- Run checks weekly to catch design changes early
- Keep a mapping between Figma frames and code components
- Tag code releases with corresponding Figma version dates

### Sharing Updates (Using CHANGELOG_EXPORT.md)
- **Slack**: Copy-paste into #design-updates channel
  ```bash
  cat CHANGELOG_EXPORT.md | pbcopy  # macOS
  cat CHANGELOG_EXPORT.md | clip     # Windows
  ```
- **Jira**: Add to sprint planning tickets or release notes
- **GitHub**: Include in PR descriptions or release discussions
- **Email**: Forward to stakeholders - it's already formatted!

## Troubleshooting

**"Can't access Figma file"**
- File might be private - provide access token
- Check file URL is correct
- Ensure you have view permissions

**"No recent changes detected"**
- Verify the date range you're checking
- Check if you're looking at the right file
- Figma version history requires authentication
- Try expanding the time range

## Learn More

- [Figma API Documentation](https://www.figma.com/developers/api)
- [PatternFly Design Tokens](https://www.patternfly.org/tokens/)
- [Design-Code Sync Best Practices](references/figma-api-guide.md)
