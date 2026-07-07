---
name: pf-content-review
description: Review content against PatternFly and Red Hat voice and tone standards. Use when contributing to patternfly.org, writing UI copy for Red Hat products, reviewing design guidelines, or editing externally sourced or AI-generated content.
disable-model-invocation: true
---

# PatternFly Content Review

Audit or rewrite markdown content to match PatternFly and Red Hat voice and tone standards — friendly, approachable, collaborative, and inventive.

## When to use

- Contributing new documentation or design guidelines to patternfly.org
- Writing UI copy (alerts, tooltips, buttons, error messages) for PatternFly components or Red Hat products
- Reviewing externally sourced or AI-generated content before publishing
- Editing existing docs that don't match the voice and tone standards

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

Apply the pf-voice-and-tone agent's rules as the review checklist — it covers brand voice, point of view, capitalization, vocabulary flags, structural patterns, punctuation, and the quick checklist. For component-specific microcopy (buttons, tooltips, alt text, error messages), also consult the pf-microcopy agent in the design-guide plugin. If neither agent is active, consult the [PatternFly content design guidelines](https://www.patternfly.org/content-design/overview) directly.

Skip code blocks, inline code, URLs, YAML frontmatter, and proper nouns (component names, product names) during review — these are not prose and should not be flagged.

### Step 3: Produce output

If no issues are found, say so and list which standards were checked.

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
