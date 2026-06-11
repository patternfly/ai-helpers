---
name: voice-and-tone
description: PatternFly and Red Hat voice and tone standards — friendly, approachable, collaborative, inventive. Active when writing, reviewing, or editing documentation, design guidelines, or UI copy for PatternFly or Red Hat brand.
---

# PatternFly Voice and Tone Standards

Apply these standards across two contexts — **UX microcopy** (buttons, alerts, tooltips, error messages, inline text) and **long-form content** (documentation, design guidelines, web copy) — for both PatternFly and Red Hat brand. Most rules are identical; exceptions are noted where they differ.

Source: [PatternFly content design guidelines](https://www.patternfly.org/content-design/overview)

---

## Brand voice

PatternFly's voice derives from the Red Hat brand. Four paired traits, each with a guard against its opposite:

| Voice trait | UX expression | Not this |
|---|---|---|
| **Friendly** | Clear, concise, plain language. Write how you speak, but polished. | Arrogant, padded, or overly formal |
| **Approachable** | No jargon, idioms, or bizspeak. Say what you mean. | Stubborn reliance on technical or insider language |
| **Collaborative** | "You" over "I." User is the star. Inclusive, global-friendly language. | Chaotic, inside-joke-heavy, exclusionary |
| **Inventive** | Confident simplicity. Real-world, global-friendly examples. | Reckless, punching down, mocking |

---

## Tone

Tone varies by context. Ask: What does the user need? What are they thinking? How are they feeling?

| Context | Tone |
|---|---|
| Onboarding, community, announcements | Casual |
| Outages, delays, compliance | Professional |
| Instructions, guidance | Informative + supportive |

---

## Point of view

- **Default: second person** — "you/your." Keeps focus on the user; sounds conversational.
- **First person "I"** — only when the user is agreeing to something: "I agree to the terms."
- **Third person** — avoid. Sounds formal and disconnected.

| Before | After |
|---|---|
| Users can simplify their designs with PatternFly. | Simplify your designs with PatternFly. |

---

## Sentence voice

- **Active voice by default** — subject performs the action. Shorter, clearer.
- **Passive voice** — only to avoid blaming the user (error messages) or to emphasize an action.

| Before | After |
|---|---|
| You entered the wrong password. | The password is incorrect. |

---

## Tense

Use **present tense** in documentation and design guidelines.

---

## Capitalization

- **Sentence case** everywhere: headings, nav items, buttons, page titles, list items.
- Capitalize: proper nouns, product names, acronyms, initialisms (React, PatternFly, HTML, URL).
- **Component names: lowercase** in prose ("the card component," "the button").
- API/code resource names: match the exact casing from the API spec when referencing a specific resource.

---

## Punctuation

- **No end punctuation** on headings or button labels. Exception: question marks in confirmation dialogs ("Delete service account?").
- **Oxford comma** always.
- **Ampersands** — in UI microcopy (buttons, alerts, error messages, tooltips, inline text), always write "and" for clarity and localization. In documentation, headings, navigation, and space-constrained contexts, & is acceptable.
- **Bold** for UI element references in prose (not quotes or italics): "Click **Submit**."
- **Exclamation marks** sparingly — only when the user is genuinely experiencing something exciting. Use after a few words, not a long sentence: "Congratulations!" not "Congratulations on creating your account!"
- Avoid semicolons in UI copy — break the sentence instead.
- **Emphasis**:
  - Bold sparingly for key points — overuse dilutes impact
  - Italics for subtle emphasis only — harder to read for users with dyslexia; use rarely
  - Underlines = links only, never for emphasis
  - All caps = acronyms only, never for emphasis

---

## Numbers

Use numerals in UI (not written-out numbers): "3 business days" not "three business days."

---

## Words to avoid

| Avoid | Use instead | Reason |
|---|---|---|
| "please" | (omit) | Extraneous and overly formal |
| "successfully" in alerts | (omit) | Success state implies it |
| "utilize" | "use" | Too formal |
| "modify," "change" | "edit" | Consistency |
| "new" or "add" for creating | "create" | Add = existing item; create = new object |
| "e.g.," "i.e.," "etc." | "for example," "in other words," "and more" | Accessibility and localization |
| "click here," "learn more," "read more" | Descriptive link text | Accessibility and clarity |
| Error codes alone | Plain description + resolution | Jargon-free |
| Colloquialisms, idioms | Literal meaning | Localization |
| Culture-specific references | Global-friendly equivalents | Inclusivity |
| Superlatives without a source ("best," "leading," "only," "fastest") | Specific, verifiable claim | Credibility and legal risk |

### Abbreviations and acronyms

Spell out all acronyms and abbreviations on first use, followed by the abbreviation in parentheses: "command-line interface (CLI)." Never invent an abbreviation. Exceptions: widely understood terms (HTML, AI, URL), space-constrained UI elements, terms that are part of an official product name.

### AI language to avoid

The following words and phrases are overused in AI-generated and committee-written content. They signal vague, low-effort writing and should be replaced with specific, grounded language.

**Words**: delve, enduring, harness, indelible, intricate, pivotal, profound, significant, unwavering

**Phrases**: "In today's fast-paced digital world", "unlock your potential", "ever-changing landscape", "seamlessly", "revolutionize"

When reviewing content, flag these as candidates for replacement — not because they are always wrong, but because they are almost always vaguer than a specific alternative.

---

## Structural patterns

**Lead with the benefit.** Instructions should start with the outcome, not the action.

| Before | After |
|---|---|
| Install this extension to learn more about email. | To learn more about email, install this extension. |

**Use positive, action-oriented language.** Focus on what the user can do.

| Before | After |
|---|---|
| Your user settings do not allow you to access this file. | To access this file, adjust your user settings. |

**Fragments are fine** in toasts, tooltips, and alerts when space is limited: "Message sent" beats "Your message has been sent."

**Error message formula**: Description (what happened) → Reason (why) → Resolution (what to do next). Never blame the user.

**Parallel structure in lists**: Every item starts with the same part of speech. End with a period if items are full sentences.

**Descriptive hyperlinks**: Use text that describes the destination. Use relative URLs on patternfly.org. Never use "click here," "learn more," or "read more" as link text — these are vague and inaccessible. Same destination = same link text; different destinations = different link text.

**Make the first word meaningful.** In UI labels, buttons, and headings, don't lead with "a," "the," or "for." Front-load the word that carries the most meaning.

**Heading hierarchy**: Never skip heading levels — don't jump from h2 to h4. Each page should have one h1 reflecting its main topic.

**One sentence, one idea.** If a sentence runs past 1–2 lines, break it up. If it contains a series, consider a bulleted list instead.

**Be credible.** Specific claims build trust; vague promises erode it. Prefer grounded, verifiable statements over transformation language.

| Credible | Not credible |
|---|---|
| "Tested against WCAG 2.2 Level AA" | "Fully accessible out of the box" |
| "Reduces setup time by removing manual token mapping" | "Streamline your workflow" |

---

## Component-specific microcopy

### Buttons

- **1–3 words** — keep labels short to avoid wrapping.
- **No articles** — write "Add source" not "Add a source"; "Create user" not "Create a user."
- **No punctuation** on button labels.
- **Verb-first** — use a simple verb or verb phrase that describes the action.
- Labels must make sense out of context — screen readers announce buttons independently.

### Tooltips

- **Icon tooltips: 1–2 words only.** Identify the icon clearly and concisely.
- **Fragments get no period.** Full sentences do.
- **Don't place tooltips on question-circle icons** — use a popover instead for non-trivial information.
- Standard icons always use the same tooltip label:

| Icon | Tooltip |
|---|---|
| Notifications (fa-bell) | Notifications |
| Settings (fa-cog) | Settings |
| Copy (fa-copy) | Copy |
| Download (fa-download) | Download |
| More options (fa-ellipsis-v) | More options |
| Edit (fa-pencil-alt) | Edit |
| Search (fa-search) | Search |
| Sync (fa-sync-alt) | Sync, Refresh, or Running — choose the best fit |
| Delete (fa-trash) | Delete |
| Export (pficon-export) | Export |
| Upgrade (fa-arrow-circle-up) | Upgrade |
| Tasks (pficon-task) | Tasks |

### Alt text

- **Meaningful images**: Describe the contextual meaning, not the literal content. An image of a dashboard showing an error should say what the error is, not "screenshot of a dashboard."
- **Decorative images**: Use `alt=""` so screen readers skip them.
- **Functional images** (used as links or buttons): Describe the action, not the image — "Go to homepage" not "Red Hat logo."
- **Grouped images**: Use a single container label (e.g., `aria-label`) rather than labelling each image individually.

---

## Content structure for design guidelines

When writing PatternFly component or pattern design guidelines, use this section order:

Elements → Usage (When to use / When not to use) → Behavior → Variations → Spacing → Placement → Content considerations → Accessibility

Within each section:
- Present tense
- Second person ("you")
- Active voice
- Full words for examples ("for example" not "e.g.")
- Relative URLs for cross-links

---

## Quick checklist

- [ ] Second person ("you/your") unless the user is agreeing ("I agree")
- [ ] Active voice unless avoiding blame in an error message
- [ ] Sentence case for all headings and UI labels
- [ ] Component names lowercase in prose
- [ ] No "please," "utilize," "successfully," "modify," or "change"
- [ ] No "click here," "learn more," or "read more" — descriptive link text only
- [ ] Button labels: 1–3 words, verb-first, no articles ("Add source" not "Add a source"), no punctuation
- [ ] Icon tooltips: 1–2 words, standard icons use standard labels (Settings, Edit, Delete, etc.)
- [ ] Alt text: meaningful images describe context not appearance; decorative images use alt=""; functional images describe the action
- [ ] First word of UI labels is meaningful — not "a," "the," or "for"
- [ ] Heading levels not skipped (h2 → h3, not h2 → h4)
- [ ] Emphasis used correctly: bold sparingly, underlines = links only, no all-caps for emphasis
- [ ] No exclamation marks except genuine excitement, and brief
- [ ] Instructions lead with the benefit ("To [goal], [action]")
- [ ] Oxford comma
- [ ] No end punctuation on headings or buttons
- [ ] Ampersands: "and" in UI microcopy; & acceptable in headings, navigation, space-constrained contexts
- [ ] Acronyms spelled out on first use: "command-line interface (CLI)"
- [ ] No superlatives without a verifiable source ("best," "leading," "only," "fastest")
- [ ] Numerals not written-out numbers in UI
- [ ] No jargon, idioms, colloquialisms, or culture-specific references
- [ ] No AI language: delve, enduring, harness, indelible, intricate, pivotal, profound, significant, unwavering, "seamlessly", "revolutionize", "ever-changing landscape", "In today's fast-paced digital world"
- [ ] Specific and grounded — no vague transformation language ("unlock your potential", "streamline your workflow")

---

## Sources

- [Brand voice and tone](https://www.patternfly.org/content-design/brand-voice-and-tone)
- [Best practices](https://www.patternfly.org/content-design/best-practices)
- [PatternFly design guidelines writing guide](https://www.patternfly.org/content-design/writing-guides/patternfly-design-guidelines)
- [Grammar: capitalization](https://www.patternfly.org/content-design/grammar/capitalization)
- [Grammar: sentence structure](https://www.patternfly.org/content-design/grammar/sentence-structure)
- [Grammar: terminology](https://www.patternfly.org/content-design/grammar/terminology)
- [Error messages](https://www.patternfly.org/content-design/writing-guides/error-messages)
- [Accessibility and localization](https://www.patternfly.org/content-design/accessibility-and-localization)
- [Red Hat Design System: content accessibility](https://ux.redhat.com/accessibility/content/)
- Red Hat corporate style guide
- Writing for Red Hat: Takeaway guide
