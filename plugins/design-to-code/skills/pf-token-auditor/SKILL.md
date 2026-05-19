---
name: pf-token-auditor
description: Validate and bridge Figma design styles to PatternFly 6 design tokens. Use when auditing Figma designs against PatternFly tokens, validating token naming, translating Figma styles to composite tokens, or when the user mentions "token validation", "token audit", "design tokens", "Figma audit", "Figma variables", "token bridge", or "PF tokens".
disable-model-invocation: true
---

# PatternFly Design Token Auditor & Bridge

Audit designs (from Figma or raw CSS) against the PatternFly token architecture. Bridge Figma style outputs to PatternFly 6 composite and semantic tokens.

For token categories, unit mappings, theme files, and pairing tables, see [token-reference.md](token-reference.md).

This skill specifies **what** a good audit delivers; it does not prescribe **how** to fetch Figma data, call APIs, or order tool use—use whatever your environment already exposes for Figma, docs, and code search.

## What a successful audit delivers

1. **Correct theme lens** — Judgments match the right PatternFly theme (default vs Red Hat, etc.); see Theme File Map in [token-reference.md](token-reference.md#theme-file-map).
2. **Defensible findings** — Each issue or pass ties to token semantics, cites descriptions where it matters, and names both Figma-side and CSS-side tokens when relevant.
3. **Navigable context** — For Figma-sourced work, the reader can **open the exact layer(s)** from the report (deep links; multi-node findings link every node).
4. **Honest gaps** — Unknowns and missing tokens are labeled as such, with escalation paths when there is no definition to apply.
5. **Optional Figma edits** — If the user opts in, the file afterward reflects **only** what they agreed to apply ([Applying changes in Figma](#applying-changes-in-figma-figma-use)).

## Inputs you must satisfy (outcomes)

**Theme:** Infer default vs Red Hat from brand accent when present: `#ee0000` → Red Hat; `#0066cc` → default upstream.

**Figma audits:** You can name layers, variables, and **stable node ids** for anything you cite; you can build correct file URLs (including branch files). Retain `fileKey` / branch key from the user’s link for deep links.

**CSS-only audits:** Interpret the values given; confirm theme/mode if ambiguous.

## Descriptions, classification, and naming

**Evidence:** Findings that recommend or reject a token should quote or paraphrase **official usage** from [PatternFly tokens](https://www.patternfly.org/tokens/all-patternfly-tokens) or project docs when that strengthens the verdict.

**Hierarchy:** Classify each property:

| Layer | Prefix Pattern | Verdict |
|-------|---------------|---------|
| Palette | `--pf-t--color--{hue}--{shade}` | REJECT |
| Base | `--pf-t--global--color--{concept}--{number}` | WARN |
| Semantic | `--pf-t--global--{concept}--color--{context}--{state}` | PASS |
| Component | `--pf-v6-c-{component}--{Property}` | PASS |
| Raw hex/rgb | `#abc123`, `rgb(...)` | REJECT |

**Naming shape:** Tokens are concept-based, never element-based (`font--size--heading--h1`, not `h1--font--size`). Full shape: `--pf-t--global--{concept}--{property}--{modifier}--{state}`.

## Judgment criteria (Rules 0–9)

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

#### Rule 5 — Theme & collection awareness
**Outcome:** Judgments use the theme the design is actually using (collections, modes, brand accents)—not the wrong theme file. See Theme File Map in [token-reference.md](token-reference.md#theme-file-map).

#### Rule 6 — Contextual Token Pairing
Sibling properties (background, border, text, icon) on the same element should share the same context. If a context-specific token does not yet exist in CSS, flag as ESCALATION RECOMMENDED. See pairing table in [token-reference.md](token-reference.md#contextual-token-pairing).

#### Rule 7 — Figma-to-Code Drift Detection
When a Figma variable value differs from its CSS token value, do NOT treat as an error. Figma is the upstream source of truth. Flag as **SYNC REQUIRED** and report both values.

#### Rule 8 — Unbound Figma Properties
Hardcoded values not backed by a Figma variable need fixing in the Figma file. Only suggest semantic tokens as replacements — never base/numbered tokens. If no semantic token exists, state that explicitly and provide the closest matches.

#### Rule 9 — Component Implementation Cross-Check
When the design represents a known PatternFly component, compare the Figma token usage against the component's SCSS implementation. Flag differences as **IMPLEMENTATION DRIFT** — distinguish between likely errors and intentional design proposals. Include the component file path and selector for reference.

## Before escalating

**Outcome:** “No matching token” only after you have checked PatternFly token sources (e.g. `src/patternfly/base/tokens/` and component SCSS when available, plus docs)—so the gap is real, not a search miss.

## Report the user receives

**Outcome:** Someone reading the audit can **understand each verdict**, **trust the evidence**, **open the right Figma layers** (when applicable), and **act** on fixes without re-deriving context.

**Each finding should make clear:**

- **Status** — One of: VALIDATED, COMPOSITE FOUND, CONTEXT MISMATCH, IMPLEMENTATION DRIFT, SYNC REQUIRED, FIGMA FIX NEEDED, ESCALATION RECOMMENDED.
- **Where** — Layer name, node id(s), and an **Open in Figma** deep link to the **innermost** relevant node when the source is Figma ([link format](#figma-deep-links)).
- **What & why** — Property, current vs recommended mapping, short reason, and quoted or cited token **descriptions** when they carry the argument.
- **Visual grounding (issues)** — For non-passing Figma findings, include something that shows the problem (e.g. a crop or screenshot of that node)—enough that the issue is recognizable without opening the file.
- **Both names** — Figma variable path (or raw value) and CSS token where both exist.

### Finding table (expected shape)

| Detail | Value |
|--------|-------|
| Layer | `{node name}` (`{node-id}`) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id={idWithHyphens}) |
| Property | `{css property}` |
| Current | `{Figma variable}` → `{CSS token}` |
| — description | *"{official usage description}"* |
| Recommended | `{correct token}` (if applicable) |
| — description | *"{description of recommended token}"* |
| Reason | `{brief explanation}` |

For **FIGMA FIX NEEDED**, the reader should also see what to bind, from what, and how to do it in plain language (Figma-variable slash path, not Plugin API).

### Multi-node (“Affected nodes”) findings

**Outcome:** If several layers share one finding, **every** listed node is one click from the report—no bare `1259:780` lists. Example: [`1259:780`](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-780) (Primary Default text), [`1259:782`](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-782) (Primary Hover text)—or one **Open in Figma** link per bullet line.

### Figma deep links

**Outcome:** Links open the **correct file and node** (including branch files).

Use `https://www.figma.com/design/{fileKey}/{fileSlug}?node-id={idWithHyphens}` where **`node-id` uses hyphens** (`41:7106` → `node-id=41-7106`). For `/design/.../branch/{branchKey}/...`, **`branchKey` is the `fileKey`**. Reuse the file slug from the user’s URL when you have it. Example: `[Open in Figma](https://www.figma.com/design/hIHHno4fZBKmTifVjuNqiz/Login-Screen---PatternFly?node-id=41-7106)` for node `41:7106`. If no stable node exists, omit the link and say why.

### Validated tokens summary

**Outcome:** Passes are listed in a compact table (property, Figma variable, CSS token, PASS). Add **Open in Figma** per row when a pass maps to a single identifiable node; skip the column when the pass is file-wide or aggregated.

## Optional: apply fixes in Figma

**Scope:** Only statuses with a direct Figma edit path—see mapping:

| Actionable Status | Intended result in the file |
|-------------------|------------------------------|
| FIGMA FIX NEEDED | Hardcoded value → recommended variable binding |
| CONTEXT MISMATCH | Property rebound to the correct semantic context |
| COMPOSITE FOUND | Primitives replaced by the composite token / variable |
| SYNC REQUIRED | Variable value aligned with the agreed source of truth |

VALIDATED, IMPLEMENTATION DRIFT, and ESCALATION RECOMMENDED are **out of scope** for file writes unless the user explicitly asks otherwise.

### User choice (outcomes)

**Outcome:** The user always has an **unambiguous** way to say: apply everything, walk item-by-item, skip, per-item apply / skip / apply-rest, or propose a **custom** fix for one item—without inferring intent from vague chat.

**Contract — stable ids** (map host pickers or numbered replies to behavior):

| Id (batch) | Meaning |
|------------|---------|
| `update_all` | Apply every actionable finding |
| `update_individually` | Confirm each finding before it runs |
| `skip` | Change nothing in Figma |

| Id (per item) | Meaning |
|----------------|---------|
| `apply` | Apply the skill’s recommendation for this item |
| `provide_own` | User supplies an alternative; you confirm, then apply only that |
| `skip` | Leave this item unchanged |
| `apply_remaining` | Apply this item and all later items without further prompts |

**Outcome:** Prefer the host’s **structured choice** when it exists; otherwise offer **numbered replies** (`1`/`2`/`3` etc.) with the id mapping printed beside the numbers. Do not end with only informal bullets and no explicit mapping.

**Custom path (`provide_own`) outcome:** The user’s alternative is captured in chat, **restated as a one-line plan**, **explicitly confirmed**, then applied (or clarified if unsafe/ambiguous). The final summary marks those as **user-specified**.

### Applying changes in Figma (figma-use)

**Outcome:** The Figma file matches what the user **actually chose**—all, some, none, or a **confirmed** custom alternative. Skipped findings stay untouched.

**Delegation:** Performing edits belongs in the **`figma-use`** skill (how to drive the file, validate edits, and recover from errors). This auditor only supplies a **complete brief**: resolved apply-path ids, scope of findings to run now, and per-finding node ids, names, statuses, properties, and target bindings or values (including user-approved custom text for `provide_own`).

**After edits:** The user can see what landed, what did not, and what was never attempted—without this file duplicating Plugin API or script guidance.

### Post-application

**Outcome:** A short inventory—applied, skipped, failed (with enough to retry or fix manually)—so the session does not end ambiguously.

## Escalation

**Outcome:** If no PatternFly token fits, say so plainly and point to **community** ([PatternFly Slack](https://join.slack.com/t/patternfly/shared_invite/zt-3spaxzss2-w1PPDTgvqENVqNvhPDQP~w)) and **formal proposals** ([GitHub Token Proposal](https://github.com/patternfly/design-tokens/issues/new)) instead of inventing names in the audit.

## Where token definitions live (reference)

Token definitions live in `src/patternfly/base/tokens/`:
- `tokens-palette.scss` — raw color palette
- `tokens-default.scss` — light theme semantic tokens
- `tokens-local.scss` — composite tokens, glass composites
- `tokens-dark.scss`, `tokens-glass.scss`, `tokens-highcontrast.scss` — theme overrides

For the full token category reference, see [token-reference.md](token-reference.md).
