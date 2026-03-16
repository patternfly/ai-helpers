---
name: pf-token-auditor
description: Validate and bridge Figma design styles to PatternFly 6 design tokens. Use when auditing Figma designs against PatternFly tokens, validating token naming, translating Figma styles to composite tokens, or when the user mentions "token validation", "token audit", "design tokens", "Figma audit", "Figma variables", "token bridge", or "PF tokens".
---

# PatternFly Design Token Validator & Bridge

Audit designs (from Figma or raw CSS) against the PatternFly Token Architecture. Bridge Figma style outputs to PatternFly 6 composite and semantic tokens.

## Workflow

### Step 1: Gather Input

Determine the input type:

**Figma URL provided?** Use the Figma MCP:
1. Call `get_variable_defs` (server: `plugin-figma-figma`) with `nodeId` and `fileKey` to extract Figma variables.
2. Call `get_design_context` to get code output and screenshot of the full frame.
3. **Collect element node IDs.** The `get_design_context` output includes `data-node-id` attributes on each element. Track node IDs for any elements that will be flagged in findings — these will be used to capture element-level screenshots during the handoff step.
4. **Identify the active theme and mode.** Figma variables have an "Extended Collection" (theme) and a mode applied to each frame. Determine which are active by inspecting the resolved values:
   - If brand accent colors resolve to red (`#ee0000`), the **RedHat theme** is active (overrides in `tokens-redhat*.scss`).
   - If brand accent colors resolve to blue (`#0066cc`), the **default (upstream)** theme is active.
   - Mode is indicated by the variable collection mode: Light, Dark, Glass Light, Glass Dark, High Contrast Light, High Contrast Dark.
   - Always validate token values against the **correct theme file**, not just `tokens-default.scss`.

**Manual CSS / token values provided?** Parse the values directly. Ask which theme/mode if not specified.

### Step 2: Gather Token Descriptions

For each token referenced in the design, look up its official usage description. These descriptions serve as authoritative evidence when validating or suggesting tokens.

**Sources (in priority order):**

1. **PatternFly docs** — Fetch from `https://www.patternfly.org/tokens/all-patternfly-tokens` or use the PatternFly Docs MCP (`searchPatternFlyDocs` with the token name). Each semantic token has a "Description" column explaining its intended use case.
2. **Figma variable descriptions** — Figma variables may have descriptions set by the design team. These are visible in the `get_variable_defs` output or Figma's variable inspector.

**How to use descriptions:**

- When **validating** a token: cite the description to confirm correct usage. Example: `global/text/color/regular` — *"Use as the primary color for standard text, like heading/body copy."* — confirms it is appropriate for body text on a standard background.
- When **flagging a mismatch**: cite the description to explain why the token is wrong. Example: `global/text/color/status/on-warning/default` — *"Use as the default color for text that is placed on a warning background color, like in banners."* — makes it clear this token is not appropriate for text on a glass/white background.
- When **suggesting an alternative**: cite the replacement token's description to justify the recommendation. Example: recommend `global/text/color/on-brand/accent/default` because *"Use as the default color for text placed on a brand accent background"* matches the design's `brand/accent` background context.
- Include the description inline in the finding, quoted and attributed. This makes findings self-documenting and removes ambiguity about why a token is or isn't appropriate.

### Step 3: Classify Each Token

For every design property extracted, classify it against the PatternFly token hierarchy:

| Layer | Prefix Pattern | Verdict |
|-------|---------------|---------|
| Palette | `--pf-t--color--{hue}--{shade}` | REJECT - never use directly |
| Base | `--pf-t--global--color--{concept}--{number}` | WARN - prefer semantic |
| Semantic | `--pf-t--global--{concept}--color--{context}--{state}` | PASS |
| Component | `--pf-v6-c-{component}--{Property}` | PASS (if referencing semantic tokens) |
| Raw hex/rgb | `#abc123`, `rgb(...)` | REJECT - must use a token |

### Step 4: Validate Naming

Token names must follow: `--pf-t--global--{concept}--{property}--{modifier}--{state}`

- **concept**: `spacer`, `font`, `background`, `border`, `box-shadow`, `icon`, `text`, `color`
- **property**: `size`, `color`, `weight`, `width`, `radius`
- **modifier**: `100`-`800`, `xs`-`4xl`, `sm`/`md`/`lg`, `primary`/`secondary`
- **state**: `default`, `hover`, `clicked`, `disabled`

Tokens are concept-based, never element-based:
- WRONG: `--pf-t--global--h1--font--size`
- RIGHT: `--pf-t--global--font--size--heading--h1`

### Step 5: Apply Validation Rules

#### Rule 0 — Prefer Purpose-Specific Semantic Tokens Over Generic Scale Tokens
When suggesting a token for a spacing, sizing, or any property, always cross-reference the **full set of purpose-specific semantic tokens** before falling back to a generic scale token. Purpose-specific tokens encode design intent and may be overridden independently in themes or component contexts.

**Spacer example — gap between actions:**
- WRONG: `--pf-t--global--spacer--md` (generic scale token, `1rem`)
- RIGHT: `--pf-t--global--spacer--gap--action-to-action--default` (purpose-specific, `1rem`)

Both resolve to `1rem`, but `action-to-action` communicates *why* the space exists and can be adjusted independently.

**Semantic spacer gap tokens to cross-reference:**

| Token | Value | Use when... |
|---|---|---|
| `spacer--gap--action-to-action--default` | `1rem` | Spacing between actions (buttons) in an action group |
| `spacer--gap--action-to-action--plain` | `0.25rem` | Spacing between plain/icon actions |
| `spacer--gap--control-to-control--default` | `0.25rem` | Spacing between controls (input groups, filter groups) |
| `spacer--gap--text-to-element--default` | `0.5rem` | Spacing an icon or badge inline with text |
| `spacer--gap--text-to-element--compact` | `0.25rem` | Compact variant of above |
| `spacer--gap--group--horizontal` | `1rem` | Horizontal spacing between items in a group (label + input) |
| `spacer--gap--group--vertical` | `0.5rem` | Vertical spacing between items in a group (label, input, helper text) |
| `spacer--gap--group-to-group--horizontal--default` | `3rem` | Horizontal spacing between groups of elements |
| `spacer--gap--group-to-group--vertical--default` | `1.5rem` | Vertical spacing between groups (stacked form groups) |

Also check for purpose-specific **action**, **control**, and **inset** spacer tokens:

| Token | Value | Use when... |
|---|---|---|
| `spacer--action--horizontal--default` | `1.5rem` | Horizontal padding inside a default action/button |
| `spacer--action--horizontal--spacious` | `2rem` | Horizontal padding inside a CTA/display-lg action |
| `spacer--action--horizontal--compact` | `1rem` | Horizontal padding inside a compact action |
| `spacer--control--vertical--default` | `0.5rem` | Vertical padding inside controls |
| `spacer--control--vertical--spacious` | `1rem` | Vertical padding inside CTA/display-lg controls |
| `spacer--control--horizontal--default` | `1rem` | Horizontal padding inside controls (inputs, toggles) |

Always cite the token's description to justify why it is the most appropriate match. Only suggest a generic scale token (`spacer--xs` through `spacer--4xl`) when no purpose-specific token exists for the context.

#### Rule 1 — No Palette Tokens
Palette tokens (`--pf-t--color--blue--50`) are raw values. Always map to semantic equivalents.

```scss
/* REJECT */  color: var(--pf-t--color--blue--50);
/* ACCEPT */  color: var(--pf-t--global--text--color--link--default);
```

#### Rule 2 — On-{Context} Foreground Matching
Foreground elements (text, icons) must use `on-` tokens that **exactly match** the background context. This ensures correct contrast across all themes and modes (AA in default/glass, AAA in high-contrast).

| Background Token | Text Token | Icon Token |
|---|---|---|
| `color--brand--default` | `text--color--on-brand--default` | `icon--color--on-brand--default` |
| `color--brand--accent--default` | `text--color--on-brand--accent--default` | `icon--color--on-brand--accent--default` |
| `color--brand--subtle--default` | `text--color--on-brand--subtle--default` | `icon--color--on-brand--subtle--default` |
| `color--status--danger--default` | `text--color--status--on-danger--default` | `icon--color--status--on-danger--default` |
| `color--status--success--default` | `text--color--status--on-success--default` | `icon--color--status--on-success--default` |
| `color--status--warning--default` | `text--color--status--on-warning--default` | `icon--color--status--on-warning--default` |
| `color--status--info--default` | `text--color--status--on-info--default` | `icon--color--status--on-info--default` |
| `color--status--custom--default` | `text--color--status--on-custom--default` | `icon--color--status--on-custom--default` |
| `background--color--disabled` | `text--color--on-disabled` | `icon--color--on-disabled` |
| `background--color--highlight` | `text--color--on-highlight` | — |

The `on-` prefix must match the background variant precisely. Using `on-brand--default` on a `brand--accent` background is WRONG — it may have correct contrast in the default theme but WILL FAIL in other themes (e.g., RedHat dark where `on-brand--accent` resolves to `--text--color--regular` instead of `--inverse`).

#### Rule 3 — Figma-to-CSS Unit Mapping
Figma can only express sizes in pixels. PatternFly CSS tokens use `rem` for font sizes, icon sizes, spacers, and breakpoints, and unitless multipliers for line-heights. When validating Figma values against CSS token values, convert using `1rem = 16px` (base font size). Do NOT flag a unit difference as a value mismatch.

**Font size:** Figma outputs `px`, CSS uses `rem`.

| Figma (px) | CSS Token | CSS Value |
|---|---|---|
| `12` | `--pf-t--global--font--size--xs` | `0.75rem` |
| `14` | `--pf-t--global--font--size--sm` | `0.875rem` |
| `16` | `--pf-t--global--font--size--md` | `1rem` |
| `18` | `--pf-t--global--font--size--lg` | `1.125rem` |
| `20` | `--pf-t--global--font--size--xl` | `1.25rem` |
| `24` | `--pf-t--global--font--size--2xl` | `1.5rem` |
| `28` | `--pf-t--global--font--size--3xl` | `1.75rem` |
| `36` | `--pf-t--global--font--size--4xl` | `2.25rem` |

**Icon size:** Figma outputs `px`, CSS uses `rem`.

| Figma (px) | CSS Token | CSS Value |
|---|---|---|
| `12` | `--pf-t--global--icon--size--sm` | `0.75rem` |
| `14` | `--pf-t--global--icon--size--md` | `0.875rem` |
| `16` | `--pf-t--global--icon--size--lg` | `1rem` |
| `24` | `--pf-t--global--icon--size--xl` | `1.5rem` |
| `56` | `--pf-t--global--icon--size--2xl` | `3.5rem` |
| `96` | `--pf-t--global--icon--size--3xl` | `6rem` |

**Breakpoint:** Figma outputs `px`, CSS uses `rem`.

| Figma (px) | CSS Token | CSS Value |
|---|---|---|
| `576` | `--pf-t--global--breakpoint--sm` | `36rem` |
| `768` | `--pf-t--global--breakpoint--md` | `48rem` |
| `992` | `--pf-t--global--breakpoint--lg` | `62rem` |
| `1200` | `--pf-t--global--breakpoint--xl` | `75rem` |
| `1450` | `--pf-t--global--breakpoint--2xl` | `90.625rem` |

**Line-height:** Figma outputs absolute `px`, CSS uses unitless multipliers. Only **two** line-height tokens exist:

- `--pf-t--global--font--line-height--body` → `1.5`
- `--pf-t--global--font--line-height--heading` → `1.3`

All Figma `figma-only/body/*` line-height variables map to `--body`. All `figma-only/heading/*` map to `--heading`. Do NOT invent size-specific variants like `--body--lg` — they don't exist.

See the full mapping tables in [token-reference.md](token-reference.md).

#### Rule 4 — Composite Token Bridge
When Figma outputs individual shadow or glass properties, recommend the single composite token.

**Box Shadow** — Use composites from `tokens-local.scss`:

```scss
/* BEFORE: Figma outputs individual properties */
box-shadow:
  var(--pf-t--global--box-shadow--X--sm--default)
  var(--pf-t--global--box-shadow--Y--sm--default)
  var(--pf-t--global--box-shadow--blur--sm)
  var(--pf-t--global--box-shadow--spread--sm--default)
  var(--pf-t--global--box-shadow--color--sm--default);

/* AFTER: Single composite token */
box-shadow: var(--pf-t--global--box-shadow--sm);
```

Available composites: `--sm`, `--md`, `--lg` (each with `--top`, `--bottom`, `--left`, `--right` directional variants).

**Glass Background** — Use composites from `tokens-local.scss`:

```scss
/* Composite glass tokens (use color-mix internally) */
background-color: var(--pf-t--global--background--color--glass--primary--default);
backdrop-filter: var(--pf-t--global--background--filter--glass--blur--primary);

/* Floating variant */
background-color: var(--pf-t--global--background--color--glass--floating--default);
backdrop-filter: var(--pf-t--global--background--filter--glass--blur--floating);
```

#### Rule 5 — Theme & Collection Awareness
Validate against the correct theme. The Figma variable collection determines which CSS override file applies:

**Default theme** (no extended collection):

| Mode | Theme Class | Token File |
|------|------------|------------|
| Light | _(none)_ | `tokens-default.scss` |
| Dark | `.pf-v6-theme-dark` | `tokens-dark.scss` |
| HC Light | `.pf-v6-theme-high-contrast` | `tokens-highcontrast.scss` |
| HC Dark | `.pf-v6-theme-high-contrast.pf-v6-theme-dark` | `tokens-highcontrast-dark.scss` |
| Glass Light | `.pf-v6-theme-glass` | `tokens-glass.scss` |
| Glass Dark | `.pf-v6-theme-glass.pf-v6-theme-dark` | `tokens-glass-dark.scss` |

**RedHat theme** (extended collection = "Red Hat color tokens"):

| Mode | Theme Class | Token File |
|------|------------|------------|
| Light | `.pf-v6-theme-redhat` | `tokens-redhat.scss` |
| Dark | `.pf-v6-theme-redhat.pf-v6-theme-dark` | `tokens-redhat-dark.scss` |
| HC Light | `.pf-v6-theme-redhat.pf-v6-theme-high-contrast` | `tokens-redhat-highcontrast.scss` |
| HC Dark | `...high-contrast.pf-v6-theme-dark` | `tokens-redhat-highcontrast-dark.scss` |
| Glass Light | `.pf-v6-theme-redhat.pf-v6-theme-glass` | `tokens-redhat-glass.scss` |
| Glass Dark | `...glass.pf-v6-theme-dark` | `tokens-redhat-glass-dark.scss` |

Key RedHat overrides: `--pf-t--global--color--brand--accent--default` points to `--accent--100` (red `#ee0000`) instead of `--brand--default` (blue).

When drift-checking values (Rule 7), compare against the **active theme file**, not just `tokens-default.scss`.

#### Rule 6 — Contextual Token Pairing
Tokens for sibling properties (background, border, text, icon) on the same element should share the same context. When a component uses a context-specific background, its border and foreground tokens should match that context:

| Background Context | Border Token | Text/Icon Token |
|---|---|---|
| `glass--primary` | `border--color--glass--default` (if available) or `border--color--subtle` | `text--color--regular` |
| `brand--default` | `border--color--brand--default` | `text--color--on-brand--default` |
| `brand--accent` | `border--color--brand--accent--default` | `text--color--on-brand--accent--default` |
| `status--danger` | `border--color--status--danger--default` | `text--color--status--on-danger--default` |

If a context-specific border token does not yet exist in CSS (e.g., `border--color--glass--default`), flag it as an ESCALATION RECOMMENDED finding — the design intent is valid but the token may need to be proposed.

#### Rule 7 — Figma-to-Code Drift Detection
Token values in the Figma source file may be updated before the CSS is regenerated. When a Figma variable value differs from its corresponding CSS token value:

1. **Do NOT treat this as an error.** The Figma file is the upstream source of truth; `tokens-default.scss` is generated output.
2. Flag it as **SYNC REQUIRED** — the CSS tokens need regeneration from the Figma source.
3. Report both values so the team can confirm intent and trigger a token build.

```markdown
**SYNC REQUIRED:** `global/box-shadow/blur/sm`
- Figma (source of truth): `6px`
- CSS (generated, stale): `4px` (`--pf-t--global--box-shadow--blur--100`)
- Action: Regenerate CSS tokens from Figma source, or confirm design intent with the team.
```

#### Rule 8 — Unbound Figma Properties
When the generated code contains hardcoded values (raw `px`, hex, etc.) that are NOT backed by a Figma variable, this means the property was never bound to a variable in the Figma file. The Figma MCP cannot write changes back to designs.

Report these as **FIGMA FIX NEEDED** with actionable instructions:

```markdown
**FIGMA FIX NEEDED:** Hardcoded `8px` gap
- Node ID: `I10953:21650;10922:5688`
- Property: Auto layout → Gap
- Current: `8px` (hardcoded, no variable binding)
- Fix: Bind to `global/spacer/sm`
- How: Select the frame in Figma → right panel → Auto layout gap →
  click the variable icon (⬡) → search `global/spacer/sm` → apply.
```

#### Rule 9 — Component Implementation Cross-Check
When the Figma design represents a known PatternFly component or variant, cross-reference the design's token usage against the actual component SCSS implementation in the codebase. This catches two important scenarios:
- **Unintentional error** — the designer applied the wrong token to an element.
- **Design proposal** — the designer is intentionally suggesting a new or different token, which needs to go through the proposal process.

**How to perform the cross-check:**

1. **Identify the component.** From the Figma frame name, layer names, or CSS class output, determine which PatternFly component is being designed and which variant/modifier is active (e.g., `button` + `pf-m-secondary` + `pf-m-display-lg` = secondary CTA).

2. **Locate the component SCSS.** Search `src/patternfly/components/{ComponentName}/{component}.scss` for the component's CSS custom property declarations. Each variant's token assignments are declared under their modifier class (e.g., `&.pf-m-secondary` within `&.pf-m-display-lg`).

3. **Extract the implementation tokens.** Build a map of property → token for the identified variant. Focus on:
   - `--Color` (text color)
   - `--BackgroundColor`
   - `--BorderColor`
   - `--BorderWidth`
   - `--BorderRadius`
   - `__icon--Color`
   - Hover, clicked, and disabled states
   - Padding, gap, font properties

4. **Compare Figma vs. implementation.** For each property in the Figma design, check if the applied Figma variable maps to the same semantic token as the component SCSS. Flag differences as **IMPLEMENTATION DRIFT**:

   ```markdown
   **IMPLEMENTATION DRIFT:** Secondary CTA background color
   - Figma design: `global/background/color/primary/default` → `--pf-t--global--background--color--primary--default`
   - Component SCSS: `transparent` (no BackgroundColor override; inherits base `transparent`)
   - Component: `.pf-v6-c-button.pf-m-secondary.pf-m-display-lg`
   - File: `src/patternfly/components/Button/button.scss` (lines 310-319)
   - Assessment: The current implementation uses a transparent background for secondary CTA.
     This may be a design proposal for a new filled secondary CTA, or an error.
   - Action: Confirm with the design team whether this is an intentional proposal or a mistake.
     If intentional, open a proposal: [GitHub Token Proposal](https://github.com/patternfly/design-tokens/issues/new)
   ```

5. **Assessment guidance.** Help the user understand the discrepancy:
   - If the Figma design adds a property where the implementation has none (e.g., adding a background to a transparent button), flag it as a possible new proposal.
   - If the Figma design uses a different token for a property that already has one (e.g., `text--color--regular` instead of `text--color--on-brand--default`), flag it as a likely error.
   - If the Figma design omits a property that the implementation defines, note it as a possible simplification or oversight.
   - Always include the component file path and line range for easy reference.

**When to apply this rule:**
- Always apply when the design clearly represents a specific PatternFly component (button, card, alert, modal, etc.).
- Skip when the design is a custom/novel layout that doesn't map to an existing component.
- When uncertain which component or variant is being designed, ask the user before proceeding.

### Step 6: Search Local Definitions & Component Implementation

Before escalating, search the codebase for a matching token and cross-reference the component:

1. Search `src/patternfly/base/tokens/tokens-local.scss` for composites and temporary tokens.
2. Search `src/patternfly/base/tokens/tokens-default.scss` for semantic tokens.
3. **Cross-check component SCSS** (Rule 9): If the design maps to a known PatternFly component, read `src/patternfly/components/{ComponentName}/{component}.scss` and compare the variant's token assignments against the Figma design. Flag any differences as IMPLEMENTATION DRIFT.
4. Use PatternFly Docs MCP: call `searchPatternFlyDocs` (server: `user-patternfly-docs`) with the concept name.
5. Call `usePatternFlyDocs` with `name: "Design tokens"` for documentation.

### Step 7: Produce Handoff

**Element-level screenshots:** Before writing the handoff, call `get_screenshot` (server: `plugin-figma-figma`) for each element node ID that has a finding (IMPLEMENTATION DRIFT, CONTEXT MISMATCH, FIGMA FIX NEEDED, etc.). This gives the reader immediate visual context for each flagged issue. Include the screenshot image directly above or alongside the finding it relates to.

Screenshot workflow:
1. Gather the list of unique node IDs from findings (from `data-node-id` attributes collected in Step 1).
2. **Present findings one at a time.** For each finding, call `get_screenshot` for that finding's element node, then immediately write the finding text below it. This ensures the screenshot appears visually inline with the finding it relates to.
3. Do NOT batch all `get_screenshot` calls together — batching causes all images to appear grouped at the top, disconnected from their findings.
4. For VALIDATED tokens, screenshots are not needed — only flagged findings get visual evidence.
5. Composite, sync, and escalation findings that reference the full frame (not a specific element) can skip screenshots.

Use this output format:

```markdown
### Token Handoff

> **Status:** [VALIDATED | COMPOSITE FOUND | CONTEXT MISMATCH | IMPLEMENTATION DRIFT | SYNC REQUIRED | FIGMA FIX NEEDED | ESCALATION RECOMMENDED]

<!-- Screenshot of the flagged element, captured via get_screenshot for the element's node ID -->

#### Property: `{css-property}`
**Figma Value:** `{raw value or Figma variable name}`
**PatternFly Token:** `var({token-name})`
**Token Description:** *"{official usage description from patternfly.org or Figma}"*
**Why:** {Brief explanation of why this token is correct, incorrect, or being suggested — referencing the description}

#### Implementation (if composite found)

Before:
\`\`\`scss
{expanded properties}
\`\`\`

After:
\`\`\`scss
{single composite token}
\`\`\`

#### Figma-to-Code Drift (if sync required)

| Source | Value |
|--------|-------|
| Figma (upstream) | `{figma value}` |
| CSS (generated) | `{css value}` |
| Action | Regenerate tokens or confirm intent |

#### Context Mismatch (if on-color or contextual pairing is wrong)

<!-- Screenshot of the element with the mismatched token -->

| Detail | Value |
|--------|-------|
| Property | `{e.g., color}` |
| Current token | `{Figma variable → CSS token}` |
| — description | *"{usage description — explains the intended use, e.g., 'text on a warning background'}"* |
| Recommended | `{correct CSS token}` |
| — description | *"{usage description of the recommended token, e.g., 'text on a brand accent background'}"* |
| Reason | The background context is `{context}`, so the foreground token must be `on-{context}` per the on-color principle |

#### Figma Fix (if unbound property found)

<!-- Screenshot of the element with the hardcoded value -->

| Detail | Value |
|--------|-------|
| Node ID | `{node-id}` |
| Property | `{auto layout gap, fill, etc.}` |
| Current | `{hardcoded value}` |
| Bind to | `{figma variable name}` |
| How | Select frame → right panel → property → click ⬡ → search variable → apply |

#### Implementation Drift (if component cross-check finds a discrepancy)

<!-- Screenshot of the Figma element being cross-checked -->

| Detail | Value |
|--------|-------|
| Property | `{css property, e.g., background-color}` |
| Figma design uses | `{Figma variable → CSS token}` |
| — description | *"{usage description of the Figma token}"* |
| Component SCSS uses | `{current token or value}` |
| — description | *"{usage description of the SCSS token}"* |
| Component selector | `{e.g., .pf-v6-c-button.pf-m-secondary.pf-m-display-lg}` |
| File | `{path}` (lines `{start}-{end}`) |
| Assessment | `{likely error / possible design proposal / component not yet updated}` |
| Action | `{confirm with design team / open proposal / fix Figma}` |

#### Multi-Mode Values

| Mode | Value |
|------|-------|
| Light | `{value}` |
| Dark | `{value}` |
| Glass Light | `{value}` |
| Glass Dark | `{value}` |
| HC Light | `{value}` |
| HC Dark | `{value}` |
```

## Quick Reference: Common Figma-to-Token Mappings

| Figma Property | Raw Value | PatternFly Token |
|---------------|-----------|-----------------|
| Fill (white bg) | `#ffffff` | `--pf-t--global--background--color--primary--default` |
| Fill (dark bg) | `#151515` | `--pf-t--global--background--color--primary--default` (dark theme) |
| Text color | `#151515` | `--pf-t--global--text--color--regular` |
| Subtle text | `#4d4d4d` | `--pf-t--global--text--color--subtle` |
| Link color | `#0066cc` | `--pf-t--global--text--color--link--default` |
| Border | `#e0e0e0` | `--pf-t--global--border--color--default` |
| Border radius 4px | `4px` | `--pf-t--global--border--radius--100` |
| Border radius 6px | `6px` | `--pf-t--global--border--radius--200` |
| Small shadow | `0 1px 4px 0 rgba(41,41,41,.15)` | `--pf-t--global--box-shadow--sm` |
| Medium shadow | (expanded) | `--pf-t--global--box-shadow--md` |
| Large shadow | (expanded) | `--pf-t--global--box-shadow--lg` |
| Spacing 4px | `4px` / `0.25rem` | `--pf-t--global--spacer--100` |
| Spacing 8px | `8px` / `0.5rem` | `--pf-t--global--spacer--200` |
| Spacing 16px | `16px` / `1rem` | `--pf-t--global--spacer--300` |
| Spacing 24px | `24px` / `1.5rem` | `--pf-t--global--spacer--400` |
| Font 12px | `0.75rem` | `--pf-t--global--font--size--xs` |
| Font 14px | `0.875rem` | `--pf-t--global--font--size--sm` |
| Font 16px | `1rem` | `--pf-t--global--font--size--md` |
| Danger/error | `#b1380b` | `--pf-t--global--color--status--danger--default` |
| Success | `#3d7317` | `--pf-t--global--color--status--success--default` |
| Warning | `#ffcc17` | `--pf-t--global--color--status--warning--default` |

## Escalation

If no matching token exists after searching local definitions:

1. State: "I've scanned the local token definitions and a direct match does not yet exist."
2. Provide these links:
   - **Community Slack:** [PatternFly Slack](https://join.slack.com/t/patternfly/shared_invite/zt-3spaxzss2-w1PPDTgvqENVqNvhPDQP~w)
   - **Propose a Token:** [GitHub Token Proposal](https://github.com/patternfly/design-tokens/issues/new)

## Source Files

All token definitions live in `src/patternfly/base/tokens/`:
- `tokens-palette.scss` — raw color palette (hex values)
- `tokens-default.scss` — light theme semantic tokens (generated)
- `tokens-local.scss` — composite tokens, glass composites, temporary tokens
- `tokens-dark.scss`, `tokens-glass.scss`, `tokens-highcontrast.scss` — theme overrides

For the full token category reference, see [token-reference.md](token-reference.md).
