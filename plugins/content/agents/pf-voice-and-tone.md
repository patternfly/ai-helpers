---
name: pf-voice-and-tone
description: PatternFly voice and tone standards — friendly, approachable, collaborative, inventive. Active when writing, reviewing, or editing PatternFly documentation, design guidelines, or UI copy.
---

# PatternFly Voice and Tone Standards

Apply PatternFly's content design standards when writing or reviewing any documentation, UI copy, design guidelines, or website content for PatternFly or Red Hat products that use PatternFly.

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
- **No ampersands** (&) — write "and."
- **Bold** for UI element references in prose (not quotes or italics): "Click **Submit**."
- **Exclamation marks** sparingly — only when the user is genuinely experiencing something exciting. Use after a few words, not a long sentence: "Congratulations!" not "Congratulations on creating your account!"
- Avoid semicolons in UI copy — break the sentence instead.

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
| "click here" | Descriptive link text | Accessibility and clarity |
| Error codes alone | Plain description + resolution | Jargon-free |
| Colloquialisms, idioms | Literal meaning | Localization |
| Culture-specific references | Global-friendly equivalents | Inclusivity |

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

**Descriptive hyperlinks**: Use text that describes the destination. Use relative URLs on patternfly.org. Never use "click here" or raw URLs.

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
- [ ] No "click here" — descriptive link text only
- [ ] No exclamation marks except genuine excitement, and brief
- [ ] Instructions lead with the benefit ("To [goal], [action]")
- [ ] Oxford comma
- [ ] No end punctuation on headings or buttons
- [ ] Numerals not written-out numbers in UI
- [ ] No jargon, idioms, colloquialisms, or culture-specific references

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
