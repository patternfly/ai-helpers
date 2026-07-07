---
name: pf-microcopy
description: PatternFly component microcopy standards — button labels, tooltips, alt text, and error messages. Active when writing or reviewing UI copy for PatternFly components.
---

# PatternFly Component Microcopy Standards

Apply these standards when writing or reviewing **UI microcopy** — button labels, tooltips, alt text, error messages, alerts, and inline text — for PatternFly components.

Source: [PatternFly content design guidelines](https://www.patternfly.org/content-design/overview)

---

## Buttons

- **1–3 words** — keep labels short to avoid wrapping.
- **No articles** — write "Add source" not "Add a source"; "Create user" not "Create a user."
- **No punctuation** on button labels.
- **Verb-first** — use a simple verb or verb phrase that describes the action.
- Labels must make sense out of context — screen readers announce buttons independently.
- **Make the first word meaningful** — don't lead with "a," "the," or "for."

---

## Tooltips

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

---

## Alt text

- **Meaningful images**: Describe the contextual meaning, not the literal content. An image of a dashboard showing an error should say what the error is, not "screenshot of a dashboard."
- **Decorative images**: Use `alt=""` so screen readers skip them.
- **Functional images** (used as links or buttons): Describe the action, not the image — "Go to homepage" not "Red Hat logo."
- **Grouped images**: Use a single container label (e.g., `aria-label`) rather than labelling each image individually.

---

## Error messages

**Formula**: Description (what happened) → Reason (why) → Resolution (what to do next). Never blame the user.

- Use **passive voice** in error messages to avoid blame: "The password is incorrect" not "You entered the wrong password."
- **Fragments are fine** in toasts, tooltips, and alerts when space is limited: "Message sent" beats "Your message has been sent."
- Don't show error codes alone — always include a plain description and resolution.

---

## General microcopy rules

- **Sentence case** for all UI labels and headings.
- **No end punctuation** on button labels or headings. Exception: question marks in confirmation dialogs ("Delete service account?").
- **Ampersands**: always write "and" in UI microcopy (buttons, alerts, error messages, tooltips, inline text) for clarity and localization.
- **Numerals** not written-out numbers in UI: "3 business days" not "three business days."
- Avoid "please," "successfully," "utilize," "modify," and "change" — see the [PatternFly terminology guide](https://www.patternfly.org/content-design/grammar/terminology) for the full vocabulary list.

---

## Quick checklist

- [ ] Button labels: 1–3 words, verb-first, no articles ("Add source" not "Add a source"), no punctuation
- [ ] Icon tooltips: 1–2 words, standard icons use standard labels (Settings, Edit, Delete, etc.)
- [ ] Alt text: meaningful images describe context not appearance; decorative images use `alt=""`; functional images describe the action
- [ ] Error messages follow the formula: description → reason → resolution
- [ ] Passive voice in error messages to avoid blaming the user
- [ ] Sentence case for all UI labels
- [ ] No end punctuation on buttons or headings (except ? in confirmation dialogs)
- [ ] First word of UI labels is meaningful — not "a," "the," or "for"
- [ ] "and" not "&" in UI microcopy
- [ ] Numerals in UI, not written-out numbers

---

## Sources

- [Brand voice and tone](https://www.patternfly.org/content-design/brand-voice-and-tone)
- [Best practices](https://www.patternfly.org/content-design/best-practices)
- [Error messages](https://www.patternfly.org/content-design/writing-guides/error-messages)
- [Grammar: terminology](https://www.patternfly.org/content-design/grammar/terminology)
- [Accessibility and localization](https://www.patternfly.org/content-design/accessibility-and-localization)
