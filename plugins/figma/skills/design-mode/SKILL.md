---
name: design-mode
 description: Create and edit Figma design files using the Figma MCP workflow with PatternFly-approved libraries only. Use when the user asks to build, update, restyle, or restructure Figma frames/components and wants write operations.
disable-model-invocation: true
---

# Design Mode

Use this skill for write-focused design tasks in Figma.

## Required prerequisite

Before any `use_figma` call, load and follow the `figma-use` skill.

- Never call `use_figma` directly without first loading `figma-use`.
- If the task includes broad screen creation from code, pair `figma-use` with `figma-generate-design`.

## Approved component sources (strict)

Use components and patterns only from these two Figma files:

- https://www.figma.com/design/VMEX8Xg2nzhBX8rfBx53jp/PatternFly-6--Components?m=auto
- https://www.figma.com/design/MSr6kVEOuAxmPOkjg7x8PO/PatternFly-6--Patterns---Extensions?m=auto

Rules:

- Do not use components from any other library or file.
- Do not create ad-hoc replacement components when an approved component/pattern exists.
- If a needed component/pattern is missing in these sources, stop and ask the user before proceeding.

## Pattern-first selection (strict)

Whenever possible, prefer larger patterns denoted with the `🧰` emoji.

- Select `🧰` patterns before assembling equivalent UI from smaller components.
- Only compose from smaller components when no suitable `🧰` pattern exists for the requirement.

## Page creation behavior (strict)

If the user asks to "make a new page":

- Do not replace, clear, or mutate existing page content as the starting point.
- Create a new top-level frame for subsequent changes.
- Apply all new work to that new frame unless the user explicitly asks to edit an existing frame.

## When to use

Use this skill when a request includes one or more of the following:

- "Create this in Figma", "edit this Figma file", "update this screen"
- "Make a new page" or equivalent phrasing for a new screen
- Layout restructuring (auto-layout, spacing, constraints, frame hierarchy)
- Component/variant updates, token/variable binding, or style cleanup
- Figma URL-driven implementation work

## Workflow

1. Confirm target
   - Identify `fileKey` and `nodeId` from the Figma URL when provided.
   - Clarify expected output (new frame, edits to an existing frame, component updates).

2. Load prerequisite skill
   - Invoke the `figma-use` skill instructions first.

3. Resolve approved assets with pattern-first priority
   - Search and import from the two approved PatternFly files only.
   - Prefer matching `🧰` patterns first, then fall back to smaller components if needed.
   - Verify each chosen component/pattern comes from an approved source.

4. Handle page intent
   - If request is "make a new page", create a new top-level frame first.
   - Otherwise, edit only the user-specified existing frame/scope.

5. Make incremental edits
   - Prefer editing existing nodes/components over rebuilding from scratch (except new-page requests).
   - Use approved design-system components and variables instead of hardcoded values.
   - Apply changes in small batches and verify after each batch.

6. Validate outcome
   - Check hierarchy, alignment, spacing, constraints, and variant states.
   - Ensure all inserted components/patterns come from approved sources only.
   - Confirm `🧰` patterns were used whenever a suitable option exists.

## Guardrails

- Reuse approved library assets first; avoid duplicate ad-hoc components.
- Bind variables/tokens where possible (color, type, spacing, radius).
- Keep names semantic and stable for handoff (frames, components, variants).
- If requirements are ambiguous, ask a focused clarification question before making large edits.
