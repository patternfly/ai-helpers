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
- `references/` - Report templates and API guides
- `scripts/extract-figma-file-key.sh` - Extract file key from URL
- `scripts/compare-tokens.sh` - Automated token comparison (with Node.js validation)
- `scripts/compare-tokens.js` - Token comparison implementation

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

## FAQ

### General Questions

**Q: Should designers run this or developers?**
A: Both! Designers can verify their changes landed correctly in code, and developers can check what needs updating. The skill is designed to bridge the design-development gap.

**Q: How often should we sync?**
A: Weekly for active projects with frequent design changes, bi-weekly for stable projects. Consider running it before each sprint planning session.

**Q: What if the token names don't match between Figma and code?**
A: Create a token mapping file (see `examples/token-mappings.json`) to define relationships between Figma names and code token names. This enables fuzzy matching.

**Q: Does this work with Figma Variables or just Styles?**
A: Currently optimized for Styles. Figma Variables support can be added - check the Figma API endpoint `/files/{key}/variables/local`.

**Q: Can this work with other design systems besides PatternFly?**
A: Yes! Just update the token directory paths and naming conventions. The core workflow is design-system agnostic.

### Workflow Questions

**Q: Who should approve the generated reports?**
A: Ideally, a cross-functional review: design lead validates design accuracy, tech lead validates code feasibility, product manager prioritizes updates.

**Q: Should we commit the generated reports to git?**
A: Yes for FIGMA_CHANGELOG.md and RELEASE_NOTES.md (team documentation). The detailed update checklist (figma-updates-*.md) can be gitignored if it's task-specific.

**Q: What if we use a monorepo?**
A: Run the sync from your package directory or specify full paths to token directories. See [troubleshooting.md](references/troubleshooting.md) for monorepo examples.

**Q: Can we automate this in CI/CD?**
A: Yes! You can create a GitHub Action that runs weekly and creates a PR with the sync results. Example workflow coming soon.

### Technical Questions

**Q: What Node.js version is required?**
A: Node.js 14+ is recommended. The scripts use standard ES6+ features without exotic dependencies.

**Q: Does this modify our code automatically?**
A: No. This is a reporting tool only. It generates checklists and recommendations but never modifies code files automatically.

**Q: How do we handle responsive values (mobile/tablet/desktop)?**
A: Figma may store these as variants or separate frames. Document the mapping in your token-mappings.json, or process each breakpoint separately.

**Q: What about dark mode / theme variations?**
A: If Figma uses Variables with modes (themes), you can fetch them via the variables endpoint. Otherwise, treat each theme as a separate component variant.

**Q: Can we ignore certain Figma changes?**
A: Yes. Use the ignoreList in token-mappings.json to exclude internal/debug tokens, or filter by component in your sync command.

### Troubleshooting

**Q: I'm getting "401 Unauthorized" errors**
A: Your Figma access token is missing or invalid. Generate a new personal access token at https://www.figma.com/developers/api#access-tokens and set it: `export FIGMA_ACCESS_TOKEN="your-token"`

**Q: "No tokens found in code" error**
A: Verify your tokens directory path is correct and contains .scss/.css files. For PatternFly, try `./src/patternfly/base/tokens/` or `./node_modules/@patternfly/patternfly/base/`.

**Q: The script finds tokens but they're all mismatches**
A: This usually means naming conventions differ. Create a token-mappings.json file to map Figma names to code names. See examples/ directory.

**Q: Version history is empty**
A: You may need editor access (not just viewer) to see version history. Ask the file owner to grant you edit permissions or use OAuth for broader access.

For more troubleshooting help, see [troubleshooting.md](references/troubleshooting.md).

## Learn More

- [Figma API Documentation](https://www.figma.com/developers/api)
- [PatternFly Design Tokens](https://www.patternfly.org/tokens/)
- [Design-Code Sync Best Practices](references/figma-api-guide.md)
- [Troubleshooting Guide](references/troubleshooting.md)
