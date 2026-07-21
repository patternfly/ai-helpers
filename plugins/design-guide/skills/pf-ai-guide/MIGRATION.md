# Migration to project-felt/ai-guidelines

**Date:** July 21, 2026  
**Branch:** `update-pf-ai-guide-to-project-felt`

## Changes

This skill has been updated to reference the **project-felt/ai-guidelines** repository instead of maintaining local copies of guidelines and reference images.

### What changed

**Before:**
- `guidelines/design-rules.md` — Local copy of detailed design rules
- `guidelines/reference-mapping.md` — Local reference image lookup tables
- `references/` — 25 local PNG/SVG reference images

**After:**
- SKILL.md now references content from [https://github.com/project-felt/ai-guidelines](https://github.com/project-felt/ai-guidelines)
- Content files: `content/*.md` (7 markdown files organized by topic)
- Images: `assets/images/` (60 reference images)
- Source: `source/ai-guidelines.txt` and `source/ai-guidelines.pdf`

### Why this change

1. **Single source of truth** — The project-felt/ai-guidelines repository is the authoritative source for Red Hat AI design guidelines
2. **Better organization** — Content is structured by topic (iconography, color, chatbot-avatars, etc.) instead of monolithic files
3. **More complete** — The repository includes 60 reference images vs the 25 we had locally
4. **Maintainability** — Updates to guidelines happen in one place, and the skill references them
5. **Transparency** — The repository includes the source deck (PDF and text) for full context

### Repository structure

```
project-felt/ai-guidelines/
├── content/
│   ├── ai-design-principles.md      # Core 3 principles
│   ├── transparency-notices.md      # Disclosure requirements
│   ├── iconography.md               # 9 AI sparkle icons
│   ├── color.md                     # Color usage guidelines
│   ├── chatbot-avatars.md           # Robot avatar patterns
│   ├── animation.md                 # Animation guidelines
│   └── legal-requirements.md        # Legal compliance
├── assets/images/                   # 60 reference images
│   ├── rh-ui-icon-ai-*.svg         # Official AI icon SVGs
│   ├── do-*.png                     # Correct pattern examples
│   ├── do-not-*.png                 # Incorrect pattern examples
│   └── [various reference images]
└── source/
    ├── ai-guidelines.pdf            # Original design deck
    ├── ai-guidelines.txt            # Text extraction
    └── source.md                    # Link to Google Slides
```

### Content mapping

| Old file | New reference |
|----------|---------------|
| `guidelines/design-rules.md` | `content/iconography.md`, `content/chatbot-avatars.md`, `content/color.md`, `content/animation.md` |
| `guidelines/reference-mapping.md` | Direct references to `assets/images/*.png` paths in SKILL.md |
| `references/*.png` | `assets/images/*.png` (more complete set) |

### What to do with old files

The `guidelines/` and `references/` directories have been **preserved** in this branch for reference during the transition. They can be removed in a future commit once the migration is validated.

**Recommendation:** Delete these directories after confirming the skill works correctly with the new references:

```bash
cd ~/ai-helpers/plugins/design-guide/skills/pf-ai-guide
rm -rf guidelines/ references/
```

## Usage changes

### For skill consumers

No changes needed! The skill behavior is identical. Reference images are now provided as GitHub URLs instead of local file paths.

### For skill contributors

When updating this skill:

1. **Check the source repository first:** [https://github.com/project-felt/ai-guidelines](https://github.com/project-felt/ai-guidelines)
2. **Run the check script:** `cd ~/ai-guidelines && ./check-source.sh` to see if the source deck has changed
3. **Update content files:** If the source changed, update `content/*.md` files following the pattern in the repository's CLAUDE.md
4. **Update SKILL.md:** Reference the new/updated content files and image paths

### For local development

Clone the ai-guidelines repository for local access to all content:

```bash
cd ~
git clone https://github.com/project-felt/ai-guidelines.git
```

The skill will reference the repository via GitHub URLs, but having a local copy helps when developing and testing updates.

## Validation

To validate the migration:

1. ✅ SKILL.md references all 9 AI icons by name
2. ✅ SKILL.md includes reference image paths for all major guidelines
3. ✅ Core principles, transparency requirements, and checklists are preserved
4. ✅ Review workflow and gradient sweep instructions are maintained
5. ✅ All external links updated to project-felt/ai-guidelines

## Next steps

1. Test the updated skill in a real design review scenario
2. Validate that image references work correctly (GitHub URLs accessible)
3. Get feedback from skill users
4. Remove old `guidelines/` and `references/` directories
5. Update plugin documentation if needed
6. Submit PR to patternfly/ai-helpers

---

**Questions or issues?** Contact the PatternFly team or open an issue in the ai-helpers repository.
