# Figma Design Change Tracker Skill

Track Figma design updates and maintain alignment between design and code.

## What This Skill Does

This skill helps you:
- 📊 Track changes in Figma design files
- 📝 Generate comprehensive changelogs with timestamps and authors
- 🔍 Compare Figma design tokens with your codebase
- ✅ Create actionable checklists for code updates
- 🎨 Identify token discrepancies between design and implementation

## When to Use

The skill automatically triggers when you:
- Ask to "check Figma updates"
- Want to "compare Figma with code"
- Need to "audit design tokens"
- Mention "design system updates"
- Discuss "sync design and code"

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

### Compare Specific Component
```
Compare the Button component in Figma with our code implementation
```

### Audit Design Tokens
```
Audit all color tokens - are they in sync with Figma?
```

### Generate Update Checklist
```
What code changes do we need to match the latest Figma designs?
```

## Output Format

The skill generates:

1. **Executive Summary**: Overview of changes
2. **Detailed Changelog**: Component-by-component breakdown
3. **Token Comparison Table**: Figma vs Code values
4. **Action Items Checklist**: Prioritized updates with file paths
5. **Next Steps**: Recommendations

## Files in This Skill

- `SKILL.md` - Main skill instructions
- `references/figma-api-guide.md` - Figma API reference
- `scripts/extract-figma-file-key.sh` - Extract file key from URL
- `scripts/compare-tokens.js` - Automated token comparison

## Configuration

### Token Directory
Default: `src/patternfly/base/tokens`

If your tokens are elsewhere, just mention it:
```
My tokens are in src/styles/tokens
```

### Token Formats Supported
- SCSS variables (`$color-primary`)
- CSS custom properties (`--pf-global--color`)
- JSON token files
- JavaScript/TypeScript exports

## Tips

- Run checks weekly to catch changes early
- Keep a mapping between Figma frames and code components
- Tag code releases with corresponding Figma version
- Share reports with both design and dev teams

## Troubleshooting

**"Can't access Figma file"**
- File might be private - provide access token
- Check file URL is correct
- Ensure you have view permissions

**"Token files not found"**
- Specify correct token directory path
- Check if tokens are in node_modules (PatternFly packages)

**"No recent changes detected"**
- Verify date range
- Check if you're looking at the right file
- Figma version history requires authentication

## Learn More

- [Figma API Documentation](https://www.figma.com/developers/api)
- [PatternFly Design Tokens](https://www.patternfly.org/tokens/)
- [Design-Code Sync Best Practices](references/figma-api-guide.md)
