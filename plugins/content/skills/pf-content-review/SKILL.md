---
name: pf-content-review
description: Audit and rewrite content to match PatternFly voice and tone. Use when contributing documentation, reviewing design guidelines, writing UI copy, or editing AI-generated content for patternfly.org.
---

# PatternFly Content Review

Audit or rewrite markdown content to match PatternFly's voice and tone standards — friendly, approachable, collaborative, and inventive.

## When to use

- Contributing new documentation or design guidelines to patternfly.org
- Reviewing externally sourced or AI-generated content before publishing to patternfly.org
- Editing existing docs that don't match PatternFly's voice
- Writing UI copy (alerts, tooltips, buttons, error messages) for PatternFly components or Red Hat products

## Workflow

### Step 1: Gather input

Accept one of:
- A **file path** to a markdown file
- **Pasted markdown** content

If neither is provided, ask the user to supply a file path or paste the content.

Then ask which output mode they want:
- **Audit** — annotated list of issues with suggested fixes, without rewriting the file
- **Rewrite** — revised content ready to copy and paste (or apply directly to the file)

### Step 2: Review against voice and tone rules

If the `pf-voice-and-tone` agent is active, use its embedded rules. Otherwise, apply the following rules directly.

#### Voice and tone
- [ ] Reads as friendly, approachable, collaborative, and inventive — not formal, arrogant, or jargon-heavy
- [ ] Tone fits the context: casual for announcements, informative and supportive for instructions, professional for problems or failures

#### Point of view and sentence voice
- [ ] Second person ("you/your") throughout — not "users can" or "they can"
- [ ] Active voice by default
- [ ] Passive voice only to avoid blaming the user (error messages)

#### Capitalization
- [ ] Sentence case for all headings (not title case)
- [ ] Component names lowercase in prose ("the card component," not "the Card component")
- [ ] Proper nouns and acronyms capitalized (React, PatternFly, HTML, URL)

#### Vocabulary flags
- [ ] No "please" in UI text
- [ ] No "successfully" in success alerts or confirmations
- [ ] No "utilize" — use "use"
- [ ] No "modify" or "change" — use "edit"
- [ ] No "new" or "add" for creating — use "create"
- [ ] No "e.g.," "i.e.," or "etc." — write them out
- [ ] No "click here" — descriptive link text instead
- [ ] No jargon, colloquialisms, idioms, or culture-specific references

#### Structure and clarity
- [ ] Instructions lead with the benefit: "To [goal], [action]" — not "[action] to [goal]"
- [ ] Language is positive and action-oriented
- [ ] Short sentences and short paragraphs — no filler
- [ ] Lists use parallel structure (same part of speech to start each item)
- [ ] Descriptive hyperlinks with relative URLs for patternfly.org pages

#### Punctuation
- [ ] No end punctuation on headings or button labels
- [ ] Oxford comma used in lists
- [ ] No ampersands (&) — write "and"
- [ ] Exclamation marks only for genuine excitement, and only after a few words
- [ ] UI element references are bold, not quoted: **Submit** not "Submit"

#### Tense
- [ ] Present tense throughout

### Step 3: Produce output

**Audit mode**: Present a numbered list of issues. For each:
- Quote the problematic text (or heading)
- Name the rule it violates
- Suggest the corrected version

Example format:
```
1. "Users can simplify their designs" → Second person: "Simplify your designs"
2. "Please click the button to continue" → Remove "please": "Click the button to continue"
3. "Click here to learn more" → Descriptive link text: "Learn more about [topic]"
4. "Configuration Successfully Saved" → Sentence case + no "successfully": "Configuration saved"
```

**Rewrite mode**: Return the full revised content in a fenced markdown code block, ready to copy and paste. After the block, note any significant structural changes in 1–3 sentences (for example: "Rewrote 4 headings to sentence case. Removed 'please' throughout. Restructured 3 instructions to lead with the benefit.").

### Step 4: Offer a follow-up

After completing the review, offer once:
- **Audit mode**: "Do you want me to apply these changes to the file?"
- **Rewrite mode**: "Do you want me to write this to the file?" (then apply with the Edit tool if yes)

Do not offer more than once.
