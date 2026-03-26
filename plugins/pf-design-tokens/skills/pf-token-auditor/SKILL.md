---
name: pf-token-auditor
description: Validate and bridge Figma design styles to PatternFly 6 design tokens. Use when auditing Figma designs against PatternFly tokens, validating token naming, translating Figma styles to composite tokens, or when the user mentions "token validation", "token audit", "design tokens", "Figma audit", "Figma variables", "token bridge", or "PF tokens".
---

# PatternFly Design Token Auditor & Bridge

Audit designs (from Figma or raw CSS) against the PatternFly token architecture. Bridge Figma style outputs to PatternFly 6 composite and semantic tokens.

For token categories, unit mappings, theme files, and pairing tables, see [token-reference.md](token-reference.md).

## Workflow

### Step 1: Gather Input

**Figma URL provided?** Extract variables and design context using the Figma MCP (`get_variable_defs`, `get_design_context`). Track `data-node-id` attributes for elements that may need screenshots in findings.

Identify the active theme and mode from resolved brand accent colors:
- Red (`#ee0000`) → **RedHat theme**
- Blue (`#0066cc`) → **default (upstream) theme**

Always validate against the correct theme file (see Theme File Map in [token-reference.md](token-reference.md)).

**Manual CSS / token values provided?** Parse directly. Ask which theme/mode if not specified.

### Step 2: Gather Token Descriptions

Look up each token's official usage description from [patternfly.org/tokens](https://www.patternfly.org/tokens/all-patternfly-tokens) or via the PatternFly MCP (`searchPatternFlyDocs`). Cite descriptions as evidence in every finding — when validating, flagging, or suggesting alternatives.

### Step 3: Classify Each Token

Classify every design property against the PatternFly token hierarchy:

| Layer | Prefix Pattern | Verdict |
|-------|---------------|---------|
| Palette | `--pf-t--color--{hue}--{shade}` | REJECT |
| Base | `--pf-t--global--color--{concept}--{number}` | WARN |
| Semantic | `--pf-t--global--{concept}--color--{context}--{state}` | PASS |
| Component | `--pf-v6-c-{component}--{Property}` | PASS |
| Raw hex/rgb | `#abc123`, `rgb(...)` | REJECT |

### Step 4: Validate Naming

Token names follow: `--pf-t--global--{concept}--{property}--{modifier}--{state}`. Tokens are concept-based, never element-based (`font--size--heading--h1`, not `h1--font--size`).

### Step 5: Apply Validation Rules

#### Rule 0 — Prefer Purpose-Specific Semantic Tokens
Always cross-reference purpose-specific semantic tokens (see [token-reference.md](token-reference.md#purpose-specific-spacer-tokens)) before falling back to generic scale tokens. Purpose-specific tokens encode design intent and can be overridden independently.

- WRONG: `--pf-t--global--spacer--md` (generic)
- RIGHT: `--pf-t--global--spacer--gap--action-to-action--default` (purpose-specific)

#### Rule 1 — No Palette Tokens
Palette tokens are raw values. Always map to semantic equivalents.

#### Rule 2 — On-{Context} Foreground Matching
Foreground elements (text, icons) on a colored background must use `on-` tokens that exactly match the background context. Using `on-brand--default` on a `brand--accent` background is wrong — it may pass in one theme but fail in others. See the full pairing table in [token-reference.md](token-reference.md#on-context-foreground-pairing).

#### Rule 3 — Figma-to-CSS Unit Mapping
Figma outputs `px`; PatternFly CSS uses `rem` (font/icon/spacer/breakpoint) and unitless multipliers (line-height). Convert with `1rem = 16px`. Do NOT flag unit differences as value mismatches. Only two line-height tokens exist (`--body` = 1.5, `--heading` = 1.3). See mapping tables in [token-reference.md](token-reference.md#figma-to-css-unit-mapping).

#### Rule 4 — Composite Token Bridge
When Figma outputs individual shadow or glass properties, recommend the single composite token (`--box-shadow--sm/md/lg`, `--background--color--glass--primary--default`). See composites in [token-reference.md](token-reference.md#box-shadow-composites-in-tokens-localscss).

#### Rule 5 — Theme & Collection Awareness
Validate against the correct theme. Determine theme from the Figma variable collection and mode. Compare values against the active theme file, not just `tokens-default.scss`. See the Theme File Map in [token-reference.md](token-reference.md#theme-file-map).

#### Rule 6 — Contextual Token Pairing
Sibling properties (background, border, text, icon) on the same element should share the same context. If a context-specific token does not yet exist in CSS, flag as ESCALATION RECOMMENDED. See pairing table in [token-reference.md](token-reference.md#contextual-token-pairing).

#### Rule 7 — Figma-to-Code Drift Detection
When a Figma variable value differs from its CSS token value, do NOT treat as an error. Figma is the upstream source of truth. Flag as **SYNC REQUIRED** and report both values.

#### Rule 8 — Unbound Figma Properties
Hardcoded values not backed by a Figma variable need fixing in the Figma file. Only suggest semantic tokens as replacements — never base/numbered tokens. If no semantic token exists, state that explicitly and provide the closest matches.

#### Rule 9 — Component Implementation Cross-Check
When the design represents a known PatternFly component, compare the Figma token usage against the component's SCSS implementation. Flag differences as **IMPLEMENTATION DRIFT** — distinguish between likely errors and intentional design proposals. Include the component file path and selector for reference.

### Step 6: Search Local Definitions

Before escalating, search `src/patternfly/base/tokens/` (local, default, palette) and component SCSS for matching tokens. Use the PatternFly MCP for documentation lookups.

## Handoff Format

Each finding must include:

- **Status label:** VALIDATED, COMPOSITE FOUND, CONTEXT MISMATCH, IMPLEMENTATION DRIFT, SYNC REQUIRED, FIGMA FIX NEEDED, or ESCALATION RECOMMENDED
- **Element screenshot:** Call `get_screenshot` via the Figma MCP for the finding's element node. Present findings one at a time — call the screenshot, then immediately write the finding below it. Do NOT batch screenshots. Skip screenshots for validated tokens.
- **Both token names:** Every table must include the Figma variable name AND the CSS token equivalent
- **Token description:** Cited from patternfly.org or Figma, quoted inline
- **Explanation:** Why the token is correct, incorrect, or being suggested — referencing the description

### Finding table format

Use tables for each finding type:

| Detail | Value |
|--------|-------|
| Property | `{css property}` |
| Current | `{Figma variable}` → `{CSS token}` |
| — description | *"{official usage description}"* |
| Recommended | `{correct token}` (if applicable) |
| — description | *"{description of recommended token}"* |
| Reason | `{brief explanation}` |

For FIGMA FIX NEEDED findings, include: Node ID, Property, Current (hardcoded value), Bind to (Figma variable name), and How (brief Figma instructions).

### Validated tokens summary

End with a table of all passing tokens:

| Property | Figma Variable | CSS Token | Verdict |
|----------|---------------|-----------|---------|
| {property} | `{figma var}` | `{css token}` | PASS |

## Escalation

If no matching token exists:

1. State: "No direct match exists in the current token definitions."
2. Provide:
   - [PatternFly Slack](https://join.slack.com/t/patternfly/shared_invite/zt-3spaxzss2-w1PPDTgvqENVqNvhPDQP~w)
   - [GitHub Token Proposal](https://github.com/patternfly/design-tokens/issues/new)

## Source Files

Token definitions live in `src/patternfly/base/tokens/`:
- `tokens-palette.scss` — raw color palette
- `tokens-default.scss` — light theme semantic tokens
- `tokens-local.scss` — composite tokens, glass composites
- `tokens-dark.scss`, `tokens-glass.scss`, `tokens-highcontrast.scss` — theme overrides

For the full token category reference, see [token-reference.md](token-reference.md).
