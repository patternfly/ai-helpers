---
name: pf-ai-experience-patterns
description: Apply Red Hat's AI design language to AI-powered features — chatbots, assistants, generation UIs. Use when building AI experiences that should follow Red Hat brand and UX patterns.
---

# Red Hat AI Experience Design Patterns

This skill applies Red Hat's official design language for AI-enabled features (last updated February 2026). When building AI features, proactively apply these patterns to create transparent, polished, brand-compliant experiences.

**Authoritative source:** [https://staging.patternfly.org/ai/design-language](https://staging.patternfly.org/ai/design-language)

**Supporting files in this skill:**

- `guidelines/design-rules.md` — Detailed iconography, chatbot, color, and animation rules
- `guidelines/reference-mapping.md` — Reference image lookup tables for review findings
- `references/` — 21 extracted visual examples from key pages
- `references/REFERENCE-INDEX.md` — Descriptions of each reference image

## Core Principles

Every AI experience must follow these three principles:

1. **Be transparent** — Users want to know when they are interacting with AI. Make it clear using labels and visual cues.
2. **Make it personable, but not human** — AI should be polite and follow Red Hat voice and tone, but shouldn't act as though the user is interacting with a human.
3. **Stay within the Red Hat brand and design language** — Follow PatternFly and design system standards so AI experiences look and feel like Red Hat.

## Transparency Requirements

**Critical**: It should ALWAYS be clear when and how AI is being used.

- **Don't rely on just one indicator.** Use at minimum one visual AND one verbal indicator.
  - Visual: Icons with AI sparkles, animations
  - Verbal: "with AI", "AI-assisted", "AI-generated" in labels or button text
- **High-risk interactions**: Consider additional indicators (consult with AIA Reviewers)

**For AI-assisted features** (search, generation, editing): Place a transparency notice at the beginning of the experience. Minimum text: *"This feature uses AI technology. Do not include any personal information or other sensitive information in your input."* Include persistent notice: *"Always review AI-generated content prior to use."* Reference the Red Hat Privacy Statement.

**For virtual assistants/chatbots**: Show notice before user interacts and before any content is generated. Include an info icon (ℹ️) with persistent "Always review AI-generated content prior to use." Use AI icon + "AI" tag as visual and verbal indicators.

**For AI-generated content**: Must include a label AND icon indicating content was created using AI (e.g., Sparkle icon + "AI-assisted results" heading).

## Iconography Summary

Red Hat uses **9 official `rh-ui-icon-ai-*` icons** based on sparkles. Always pair icons with text ("...with AI", "...by AI"). Never create custom AI icons — request via #help-brand. See `guidelines/design-rules.md` for the full icon list and rules.

## Chatbot Summary

All chatbots must use **Red Hat's robot icon** as their avatar. Use PatternFly non-status color tokens for avatar colors. No gradients on launch buttons or chat message boxes. See `guidelines/design-rules.md` for full chatbot and chat message rules.

## Color & Animation Summary

Don't use color coding or gradients to indicate AI. AI features use the same colors as other interface elements. Use premade sparkle animations only — triggered on hover/click, loop once. See `guidelines/design-rules.md` for full color table and animation rules.

## Review Workflow

When analyzing a design against Red Hat AI patterns:

### Step 1: Identify what's being used

- What AI capabilities are shown? (generation, search, troubleshooting, chatbot, etc.)
- Are transparency notices present?
- Which icons are being used?
- Is this a chatbot (should use robot avatar) or another AI feature?
- Are there visual + verbal indicator pairs?

### Step 1a: Run a gradient sweep (required)

Before deciding compliance, inspect the full UI for gradients on AI-related surfaces:

- AI labels and badges (e.g., "AI Generated", "AI-assisted", "By AI")
- Chat launchers/buttons and any chatbot trigger controls
- Chat composer/message box borders, fills, and focus rings
- AI cards, panels, and highlighted callouts
- Any shimmer/glow treatment implying AI "thinking" or progress

If any of the above uses gradient color, mark as ❌ failed.

### Step 2: Categorize each requirement

- ✅ **Compliant** — Meets the guideline
- ❌ **Missing/Failed** — Does not meet the guideline

### Step 3: Select reference images for failed items

Read `guidelines/reference-mapping.md` to find the correct reference image for each failed check.

### Step 4: Summarize findings

Present a results table, then show the reference image for each ❌ item with a brief explanation of what needs to change.

**Results table format:**

| Category     | Status           |
| ------------ | ---------------- |
| [Check item] | ✅ Compliant      |
| [Check item] | ❌ Missing/Failed |

**For each ❌ item**, show the reference image and explain what needs to change. Always show reference images for failed items so users can visually compare the correct pattern against their current implementation.

---

## Quick Reference Checklist

**Transparency:**

- At least one visual indicator (icon with sparkle)
- At least one verbal indicator ("with AI", "AI-assisted", etc.)
- Appropriate transparency notice for feature type
- "Always review AI-generated content prior to use" notice where applicable

**Iconography:**

- Using official `rh-ui-icon-ai-*` icons (not creating custom ones)
- Icons paired with text labels
- For chatbots: robot icon as avatar

**Color & Styling:**

- Using standard PatternFly/Red Hat colors
- No gradients on AI labels/badges, chat buttons/launchers, or chat message/composer boxes
- No gradients to indicate thinking/progress
- No special "AI colors"; follows existing color status associations

**Brand Compliance:**

- Follows PatternFly component patterns
- Personable but not human in tone
- Looks and feels like Red Hat

---

## Additional Resources

- **PatternFly AI Design Language** (authoritative source): [https://staging.patternfly.org/ai/design-language](https://staging.patternfly.org/ai/design-language)
- PatternFly ChatBot Extension: [https://staging.patternfly.org/extensions/chatbot/overview/design-guidelines](https://staging.patternfly.org/extensions/chatbot/overview/design-guidelines)
- PatternFly Colors: [https://staging.patternfly.org/foundations-and-styles/color](https://staging.patternfly.org/foundations-and-styles/color)
- Red Hat Design System: [https://ux.redhat.com/](https://ux.redhat.com/)
- Red Hat Brand Standards: [http://brand.redhat.com/](http://brand.redhat.com/)
- `@patternfly/react-icons` package: [https://www.npmjs.com/package/@patternfly/react-icons](https://www.npmjs.com/package/@patternfly/react-icons)
- Request new icons or animations: #help-brand on Slack

> Guidelines updated February 2026. This skill does not replace AI Assessment, Privacy Impact Assessment, or other required reviews.

---

*Remember: The goal is transparency. Users want to know when they're interacting with AI. Over-communicate rather than under-communicate.*
