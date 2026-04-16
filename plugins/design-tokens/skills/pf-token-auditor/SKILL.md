---
name: pf-token-auditor
description: Validate and bridge Figma design styles to PatternFly 6 design tokens. In Cursor, MUST use the AskQuestion tool for batch and per-fix apply choices (never static “How would you like to proceed?” bullets as the only UI). Use when auditing Figma designs against PatternFly tokens, validating token naming, translating Figma styles to composite tokens, or when the user mentions "token validation", "token audit", "design tokens", "Figma audit", "Figma variables", "token bridge", or "PF tokens".
---

# PatternFly Design Token Auditor & Bridge

Audit designs (from Figma or raw CSS) against the PatternFly token architecture. Bridge Figma style outputs to PatternFly 6 composite and semantic tokens.

For token categories, unit mappings, theme files, and pairing tables, see [token-reference.md](token-reference.md).

## Workflow

### Step 1: Gather Input

**Figma URL provided?** Extract variables and design context using the Figma MCP (`get_variable_defs`, `get_design_context`). Track `data-node-id` attributes for elements that may need screenshots in findings. **Retain `fileKey`** (and branch key if the URL is `/design/.../branch/.../`) from that URL — you need it to build [**Open in Figma** deep links](#figma-deep-links) for each finding.

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
- **Figma deep link:** For every finding tied to a **specific layer or component instance**, include a markdown link **Open in Figma** that jumps straight to that node (see [Figma deep links](#figma-deep-links)). Use the **innermost node** where the property lives (not only the page frame), when known from `data-node-id` or inspection.
- **Affected nodes (multi-node findings):** If the report lists several layers in one finding (e.g. `Affected nodes: 1259:780 (Primary Default text), 1259:782 (Primary Hover text)`), **every node id must be clickable** — each id gets its own deep link using the same `fileKey` / slug as the audit file (see [Affected nodes line format](#affected-nodes-line-format)). Do **not** leave bare `1259:780` ids without links.
- **Element screenshot:** Call `get_screenshot` via the Figma MCP for the finding's element node. Present findings one at a time — call the screenshot, then immediately write the finding below it. Do NOT batch screenshots. Skip screenshots for validated tokens.
- **Both token names:** Every table must include the Figma variable name AND the CSS token equivalent
- **Token description:** Cited from patternfly.org or Figma, quoted inline
- **Explanation:** Why the token is correct, incorrect, or being suggested — referencing the description

### Finding table format

Use tables for each finding type:

| Detail | Value |
|--------|-------|
| Layer | `{node name}` (`{node-id}`) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id={idWithHyphens}) |
| Property | `{css property}` |
| Current | `{Figma variable}` → `{CSS token}` |
| — description | *"{official usage description}"* |
| Recommended | `{correct token}` (if applicable) |
| — description | *"{description of recommended token}"* |
| Reason | `{brief explanation}` |

For FIGMA FIX NEEDED findings, include: Node ID, **Open in Figma** link, Property, Current (hardcoded value), Bind to (Figma variable name), and How (brief Figma instructions).

### Affected nodes line format

When a single finding touches **more than one** layer, add an **Affected nodes** summary. Each entry must include a **Figma deep link** (same [URL rules](#figma-deep-links): `node-id` uses hyphens).

**Bad (bare ids — user must hunt in Figma):**

```text
Affected nodes: 1259:780 (Primary Default text), 1259:782 (Primary Hover text)
```

**Good — option A (link on node id, compact):**

```markdown
**Affected nodes:** [`1259:780`](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-780) (Primary Default text), [`1259:782`](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-782) (Primary Hover text)
```

**Good — option B (`Open in Figma` per node, easier to scan):**

```markdown
**Affected nodes:**
- `1259:780` — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-780) (Primary Default text)
- `1259:782` — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=1259-782) (Primary Hover text)
```

You may also add a **Layer** row in the finding table listing the same links; keep **Affected nodes** in sync with that list.

### Figma deep links

Build a URL so the user can open the exact node in the browser (and in the desktop app when logged in):

1. **`fileKey`** — From `https://www.figma.com/design/{fileKey}/...` use `{fileKey}`. If the URL is `.../design/{fileKey}/branch/{branchKey}/...`, use **`branchKey`** as `fileKey` (Figma’s rule for branched files).
2. **`node-id` query** — Use the node id from the file (e.g. `12:345` from MCP or `data-node-id`). In the query string, **replace `:` with `-`**: `node-id=12-345`.
3. **Path segment after `fileKey`** — Reuse the file name slug from the user’s URL (e.g. `My-File-Name`) or a short title; Figma resolves the file from `fileKey` even if the slug is imperfect.

**Template:**

```text
https://www.figma.com/design/{fileKey}/{fileSlug}?node-id={idWithHyphens}
```

**Example:** Node `41:7106` in file `hIHHno4fZBKmTifVjuNqiz`:

```text
https://www.figma.com/design/hIHHno4fZBKmTifVjuNqiz/Login-Screen---PatternFly?node-id=41-7106
```

In markdown: `[Open in Figma](https://www.figma.com/design/hIHHno4fZBKmTifVjuNqiz/Login-Screen---PatternFly?node-id=41-7106)` (node `41:7106`).

If the audit used a URL but **no** stable node id exists (e.g. file-level variable only), link to the file root with `?node-id=0-1` only when appropriate, or omit the link and say why.

### Validated tokens summary

End with a table of all passing tokens:

| Property | Figma Variable | CSS Token | Verdict |
|----------|---------------|-----------|---------|
| {property} | `{figma var}` | `{css token}` | PASS |

When a PASS row maps to a **single identifiable node**, add an **Open in Figma** link in that row or an adjacent column; omit if the pass is file-wide or aggregated.

## Step 7: Apply Recommendations in Figma

After presenting findings, offer to apply actionable recommendations directly in the Figma file using the `figma-use` skill. Only findings with a concrete fix are actionable:

| Actionable Status | Figma Action |
|-------------------|--------------|
| FIGMA FIX NEEDED | Bind the hardcoded property to the recommended Figma variable |
| CONTEXT MISMATCH | Rebind the property to the correct context variable |
| COMPOSITE FOUND | Replace individual properties with the composite variable binding |
| SYNC REQUIRED | Update the Figma variable value to match the CSS token value |

Non-actionable statuses (VALIDATED, IMPLEMENTATION DRIFT, ESCALATION RECOMMENDED) are skipped — they require code changes or upstream proposals, not Figma edits.

### CRITICAL — Cursor: `AskQuestion` is mandatory (not markdown bullets)

When there is **at least one** actionable fix (`{N} > 0`), the assistant turn that lists those fixes **MUST include a real `AskQuestion` tool invocation** so the user gets **clickable options**. A markdown-only list is **not** a substitute.

**FORBIDDEN — do not ship this as the only “picker” UI:**

```markdown
How would you like to proceed?

- Update all — apply all …
- Update individually — …
- Skip — …
```

(or the same wording with `•` bullets). That forces the user to **type** in chat and **does not** render as clickable choices.

**REQUIRED in Cursor:** In the **same turn** as the numbered findings (right after the list), call the **`AskQuestion`** tool. The user then clicks an option; you **branch on the returned option `id`**, not on typed keywords.

If your environment **does not** expose `AskQuestion`, say so once, then use a **numbered reply** fallback (`Reply 1, 2, or 3:`) — never imply that informal text like “update all” is preferred.

#### `AskQuestion` invocation shape (copy and adapt)

Use the tool exactly as your host defines it; structurally it matches:

```json
{
  "title": "Apply Figma fixes",
  "questions": [
    {
      "id": "pf-token-auditor-batch-mode",
      "prompt": "How should these {N} fixes be applied in Figma?",
      "options": [
        { "id": "update_all", "label": "Update all — apply every fix in one batch" },
        { "id": "update_individually", "label": "Update individually — approve each fix" },
        { "id": "skip", "label": "Skip — leave Figma unchanged" }
      ]
    }
  ]
}
```

Replace `{N}` in `prompt` with the real count. **Do not** duplicate those three choices as a markdown list beneath the tool call unless you also show the tool call — the **tool call** is what creates the click UI.

Per-item mode (same turn as the `[i/N]` detail block):

```json
{
  "title": "Fix {i} of {N}",
  "questions": [
    {
      "id": "pf-token-auditor-fix-{i}",
      "prompt": "What should we do for finding {i}/{N}?",
      "options": [
        { "id": "apply", "label": "Update — apply this fix (skill recommendation)" },
        { "id": "provide_own", "label": "Provide my own solution — I'll describe a different fix" },
        { "id": "skip", "label": "Skip — leave unchanged" },
        { "id": "apply_remaining", "label": "Update remaining — apply this and all following fixes" }
      ]
    }
  ]
}
```

Map field names to whatever your Cursor **`AskQuestion`** tool schema expects (`questions`, `prompt`, `options`, etc.).

### Confirmation Prompt

1. Present actionable findings as a **numbered list** in the message. **Each line must include** the node id, an **[Open in Figma](...)** markdown link (built per [Figma deep links](#figma-deep-links)), and the short fix summary.
2. **In the same assistant turn**, call **`AskQuestion`** with exactly one question:

| When | `AskQuestion` setup |
|------|---------------------|
| `{N} > 0` actionable items | **Question id:** `pf-token-auditor-batch-mode` — **Prompt:** e.g. `How should these {N} fixes be applied in Figma?` — **Options:** `update_all` = "Update all — apply every fix in one batch"; `update_individually` = "Update individually — approve each fix"; `skip` = "Skip — leave Figma unchanged" |
| `{N} === 0` | Do **not** call `AskQuestion`. State that there are no actionable Figma edits. |

3. **Branch on the returned option id** (not on free text):
   - **`update_all`** → run grouped `use_figma` fixes for every actionable finding, then post-application summary.
   - **`skip`** → do not write to Figma; optionally restate what was skipped.
   - **`update_individually`** → for each finding in order, show the detail block in the message, then **call `AskQuestion` again in that same turn** (never only markdown bullets for the four choices). **Question id:** `pf-token-auditor-fix-{index}` — **Options:** `apply` = "Update — apply this fix (skill recommendation)"; `provide_own` = "Provide my own solution — I'll describe a different fix for this node"; `skip` = "Skip — leave unchanged"; `apply_remaining` = "Update remaining — apply this and all following fixes". On **`apply_remaining`**, apply the current fix then switch to batch mode for the rest. On **`skip`**, move to the next finding. On **`provide_own`**, follow **Custom solution** below, then continue to the next finding.

Example copy to show **above** the picker (still include this in the assistant message):

```
I found {N} actionable recommendations that can be applied directly in Figma:

  1. [FIGMA FIX NEEDED] Node "Card Header" (`123:456`) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=123-456) — bind `background-color` (#ffffff) → `background/color/primary/default`
  2. [CONTEXT MISMATCH] Node "Alert Icon" (`789:012`) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=789-012) — rebind `fill` …
  3. [COMPOSITE FOUND] Node "Modal" (`44:99`) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=44-99) — replace shadow primitives → `box-shadow/md`
  ...
```

Per-item detail when **`update_individually`** (show in message, then show picker):

```
[1/{N}] FIGMA FIX NEEDED — Node "Card Header" (node-id: 123:456) — [Open in Figma](https://www.figma.com/design/{fileKey}/{fileSlug}?node-id=123-456)
  Property: background-color
  Current:  #ffffff (hardcoded)
  Fix:      Bind to variable `background/color/primary/default`
```

#### Custom solution (`provide_own`)

`AskQuestion` cannot capture free text. When the user selects **Provide my own solution**:

1. **Stop** and ask **one short chat prompt** for their alternative, referencing the same **node-id** and finding index, e.g.: *"Describe your fix for [1/{N}] (node `123:456`): which property, which Figma variable name (slash path), or raw value? Anything to avoid?"*
2. **Play back** a one-line execution plan (what will change in Figma) and wait for a clear **yes** (or a revised description) before calling `use_figma`.
3. Implement only what they specified via `figma-use` / `use_figma`; if their request is unsafe or ambiguous, ask a clarifying question instead of guessing.
4. Record the outcome in the post-application summary as **user-specified** (not the default skill recommendation).

**Other clients:** If `AskQuestion` is not available, say so once and use a numbered reply ("Reply **1**, **2**, **3**, or **4**:") that maps 1→`apply`, 2→`provide_own`, 3→`skip`, 4→`apply_remaining` — still avoid open-ended phrasing for the first three.

#### Example: how this presents in chat (Cursor)

Below, `┌─ AskQuestion ─────────────────┐` means Cursor’s **clickable choice card** (not plain text the user must type).

**After the audit — batch mode**

```
Assistant:
Here are 3 actionable recommendations that can be applied in Figma:

  1. [FIGMA FIX NEEDED] Node "Card Header" (`12:345`) — [Open in Figma](https://www.figma.com/design/AbCdEfGh/My-App?node-id=12-345) — bind background (#ffffff) → `background/color/primary/default`
  2. [CONTEXT MISMATCH] Node "Alert Icon" (`98:701`) — [Open in Figma](https://www.figma.com/design/AbCdEfGh/My-App?node-id=98-701) — rebind fill → `icon/color/on-brand/accent/default`
  3. [COMPOSITE FOUND] Node "Modal" (`44:2001`) — [Open in Figma](https://www.figma.com/design/AbCdEfGh/My-App?node-id=44-2001) — use composite `box-shadow/md`

┌─ AskQuestion ─────────────────────────────────────────────┐
│ How should these 3 fixes be applied in Figma?              │
│ ○ Update all — apply every fix in one batch               │
│ ○ Update individually — approve each fix                  │
│ ○ Skip — leave Figma unchanged                            │
└─────────────────────────────────────────────────────────────┘

User: (clicks) Update individually
```

**Item 1 of 3 — per-item picker (includes “own solution”)**

```
Assistant:
[1/3] FIGMA FIX NEEDED — Node "Card Header" (node-id: 12:345) — Open in Figma: https://www.figma.com/design/AbCdEfGh/My-App?node-id=12-345
  Property: background-color
  Current:  #ffffff (hardcoded)
  Fix:      Bind to variable `background/color/primary/default`

┌─ AskQuestion ─────────────────────────────────────────────┐
│ What should we do for fix 1/3?                            │
│ ○ Update — apply this fix (skill recommendation)           │
│ ○ Provide my own solution — I'll describe a different fix  │
│ ○ Skip — leave unchanged                                   │
│ ○ Update remaining — apply this and all following fixes    │
└─────────────────────────────────────────────────────────────┘

User: (clicks) Provide my own solution
```

**After “Provide my own solution” — chat captures the alternative**

```
Assistant:
Describe your fix for [1/3] (node `12:345`): which property, which Figma variable name (slash path), or raw value? Anything to avoid?

User:
Use `background/color/secondary/default` instead — design wants a subtle gray header, not primary white.

Assistant:
Plan: On node `12:345`, bind fill/background to variable `background/color/secondary/default` (replacing the skill’s primary default). Reply **yes** to run this in Figma, or tell me what to change.

User: yes

Assistant: (runs use_figma … then continues to [2/3] with another AskQuestion)
```

### Execution via figma-use

Before executing any fixes, load the `figma-use` skill. All `use_figma` calls must follow its critical rules — including the pre-flight checklist and incremental workflow pattern.

#### Grouping strategy

Group approved fixes into `use_figma` calls by operation type to minimize round-trips while keeping scripts small and recoverable:

1. **Variable binding fixes** (FIGMA FIX NEEDED, CONTEXT MISMATCH) — group by parent node when possible
2. **Composite replacements** (COMPOSITE FOUND) — one call per node (composites touch multiple properties)
3. **Value sync fixes** (SYNC REQUIRED) — group by variable collection

Each `use_figma` call must:
- Target nodes by their `node-id` from the audit findings
- Return all mutated node IDs: `return { mutatedNodeIds: [...] }`
- Be validated after execution — call `get_metadata` or `get_screenshot` on the affected node to confirm the fix applied correctly

#### Variable binding pattern

To bind a node property to an existing Figma variable:

```js
const node = await figma.getNodeByIdAsync("TARGET_NODE_ID");
const variables = await figma.variables.getLocalVariablesAsync();
const targetVar = variables.find(v => v.name === "VARIABLE_NAME");

const fills = [...node.fills];
fills[0] = figma.variables.setBoundVariableForPaint(fills[0], "color", targetVar);
node.fills = fills;

return { mutatedNodeIds: [node.id] };
```

Adapt for strokes, effects, or other properties as needed. For value syncs, update the variable value in the appropriate mode rather than rebinding nodes.

### Post-Application Summary

After all approved fixes are applied, present a summary:

```
Applied {M} of {N} fixes:
  ✓ [1] Node "Card Header" — bound background-color to variable
  ✓ [2] Node "Alert Icon" — rebound fill to correct context
  ✗ [3] Node "Modal" — skipped by user
```

If any fix failed during execution, report the error and suggest manual remediation.

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
