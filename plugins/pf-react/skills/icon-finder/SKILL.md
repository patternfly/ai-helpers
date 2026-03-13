---
name: icon-finder
description: Find icons from the Red Hat Design System (@rhds/icons) by use case. Searches the Red Hat Icons demo site by keyword, returns matching icon names with a visual HTML preview for comparison. Use when the user asks to find an icon, search for an icon by purpose, pick an icon for a UI, or get icon options for a use case.
---

# Icon Finder (Red Hat Icons)

Find UI icons from [@rhds/icons](https://github.com/RedHat-UX/red-hat-icons) based on a described use case.

## Workflow

1. **Interpret use case** – Derive 1–3 search terms from the user's message (e.g. "merge" → merge, combine, branch; "export" → export, download, share).
2. **Get icon list** – Fetch the demo site: `https://red-hat-icons.netlify.app/`. Extract **only** icon names from lines containing `set="ui"` — look for the pattern `set="ui" icon="<name>"`. Ignore icons from any other set.
3. **Match** – Filter the `ui` icon names by your search terms. Prefer exact or prefix match. When an icon has a `-fill` counterpart, treat them as **one result** (they share a card in the preview). Return **5–8** unique icon concepts.
4. **Generate preview** – Build an HTML file using the template below. Each icon is loaded via an `<img>` tag pointing to the raw GitHub URL — no API calls or base64 decoding needed. Write to `icon-finder-preview.html` in the user's workspace or home directory.
5. **Open preview** – Open the HTML file in the user's default browser (see "Opening the preview" section).
6. **Respond** – Show the match table. Then ask: *"Do any of these work, or would you like me to do a deeper search? I can cast a wider net using related concepts and synonyms you might not have thought of."*
7. **Deep search (only if the user asks for it)** – See "Deep search fallback" section below.

## Icon set

This skill uses **only** the `ui` set (interface actions, status, navigation — ~542 icons). Do not search or return icons from any other set (`standard`, `microns`, `social`).

## Response format

```markdown
### Matches for "[use case]"

| Icon | Fill | Use when |
|------|------|----------|
| `hybrid-cloud` | yes | Multi-provider dashboards, infrastructure overview pages. |
| `multi-cloud` | no | Provider comparison views, cloud strategy settings. |
...

**Usage:**
\`\`\`html
<rh-icon set="ui" icon="hybrid-cloud"></rh-icon>
\`\`\`

Install: `npm install @rhds/icons`

Do any of these work, or would you like me to do a deeper search? I can cast a wider net using related concepts and synonyms you might not have thought of.
```

## Raw SVG URL pattern

Each icon's SVG is available at:

```
https://raw.githubusercontent.com/RedHat-UX/red-hat-icons/main/src/ui/<icon-name>.svg
```

For example: `https://raw.githubusercontent.com/RedHat-UX/red-hat-icons/main/src/ui/cluster.svg`

## HTML preview template

Use this exact template. It loads PatternFly 6 CSS from a CDN — no build step required. Replace `<!-- ICONS -->` with one card per match. Icons are loaded as `<img>` tags — the user's browser fetches them directly from GitHub.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Icon Finder – Results</title>
  <link rel="stylesheet" href="https://unpkg.com/@patternfly/patternfly@6/patternfly.min.css">
  <style>
    .icon-finder-page { padding: var(--pf-t--global--spacer--xl); }
    .icon-finder-header { margin-bottom: var(--pf-t--global--spacer--lg); }
    .icon-card { text-align: center; }
    .icon-variants { display: flex; justify-content: center; gap: var(--pf-t--global--spacer--md); margin-bottom: var(--pf-t--global--spacer--sm); }
    .icon-variant { display: flex; flex-direction: column; align-items: center; text-decoration: none; color: inherit; cursor: pointer; }
    .icon-variant img { width: 40px; height: 40px; }
    .icon-variant span { font-size: var(--pf-t--global--font--size--xs); color: var(--pf-t--global--text--color--link--default); text-decoration: underline; margin-top: var(--pf-t--global--spacer--xs); }
    .icon-variant:hover img { transform: scale(1.15); }
    .icon-variant:hover span { color: var(--pf-t--global--text--color--link--hover); }
    .icon-name { font-weight: var(--pf-t--global--font--weight--body--bold); font-size: var(--pf-t--global--font--size--sm); word-break: break-word; }
    .icon-hint { font-size: var(--pf-t--global--font--size--xs); margin-top: var(--pf-t--global--spacer--xs); }
    .icon-finder-footer { margin-top: var(--pf-t--global--spacer--xl); }
  </style>
</head>
<body>
  <div class="icon-finder-page">
    <div class="icon-finder-header pf-v6-c-content">
      <h1>Icon Finder Results</h1>
      <p>From <a href="https://github.com/RedHat-UX/red-hat-icons">@rhds/icons</a> (set: UI)</p>
      <p><strong>Prompt:</strong> <!-- PROMPT --></p>
      <p><strong>Search terms:</strong> <!-- TERMS --></p>
    </div>
    <div class="pf-v6-l-gallery pf-m-gutter" style="--pf-v6-l-gallery--GridTemplateColumns--min: 160px;">
      <!-- ICONS -->
    </div>
    <div class="icon-finder-footer pf-v6-c-content">
      <p>Don't see what you need? <a href="https://docs.google.com/forms/d/e/1FAIpQLSfXbS0o6oeMA86CpmuTKIoZrrKVhbjKboBrHl2jIPJDfkt_MQ/viewform" target="_blank">Submit a custom icon request</a>.</p>
    </div>
  </div>
</body>
</html>
```

Each card replaces `<!-- ICONS -->`. All cards use the same structure — a `<div>` card with one or two icon variants inside. Each variant is an independently clickable `<a>`.

**Card with fill variant** (two variants side-by-side):

```html
<div class="pf-v6-c-card icon-card">
  <div class="pf-v6-c-card__body">
    <div class="icon-variants">
      <a class="icon-variant" href="https://github.com/RedHat-UX/red-hat-icons/blob/main/src/ui/ICON-NAME.svg" target="_blank">
        <img src="https://raw.githubusercontent.com/RedHat-UX/red-hat-icons/main/src/ui/ICON-NAME.svg" alt="ICON-NAME">
        <span>outline</span>
      </a>
      <a class="icon-variant" href="https://github.com/RedHat-UX/red-hat-icons/blob/main/src/ui/ICON-NAME-fill.svg" target="_blank">
        <img src="https://raw.githubusercontent.com/RedHat-UX/red-hat-icons/main/src/ui/ICON-NAME-fill.svg" alt="ICON-NAME-fill">
        <span>fill</span>
      </a>
    </div>
    <div class="icon-name">icon-name</div>
    <div class="icon-hint">UI context: <em>where in a software UI this icon fits</em></div>
  </div>
</div>
```

**Card without fill variant** (single variant):

```html
<div class="pf-v6-c-card icon-card">
  <div class="pf-v6-c-card__body">
    <div class="icon-variants">
      <a class="icon-variant" href="https://github.com/RedHat-UX/red-hat-icons/blob/main/src/ui/ICON-NAME.svg" target="_blank">
        <img src="https://raw.githubusercontent.com/RedHat-UX/red-hat-icons/main/src/ui/ICON-NAME.svg" alt="ICON-NAME">
        <span>outline</span>
      </a>
    </div>
    <div class="icon-name">icon-name</div>
    <div class="icon-hint">UI context: <em>where in a software UI this icon fits</em></div>
  </div>
</div>
```

Replace `<!-- PROMPT -->` with the user's original message and `<!-- TERMS -->` with a comma-separated list of the search terms derived in step 1 of the workflow.

## Opening the preview

After writing `icon-finder-preview.html`, open it directly in the user's default browser. The page loads PatternFly CSS from a CDN and icon SVGs from GitHub, so it works fine as a local file — no server needed.

### Command

From the directory containing `icon-finder-preview.html`:

- **macOS:** `open icon-finder-preview.html`
- **Linux:** `xdg-open icon-finder-preview.html`

### Cursor

Run the `open` command via the Shell tool. The browser launches automatically.

### Claude Code (terminal)

Run the `open` or `xdg-open` command. The browser launches automatically.

## Deep search fallback

The initial search matches on direct keywords only. If the user isn't satisfied, the deep search expands to synonyms, related concepts, and adjacent terminology they may not have thought of.

### How it works

1. **Expand the search terms** — Starting from the user's original use case, brainstorm 10–20 related terms across these categories:
   - **Synonyms:** direct alternatives (e.g. "merge" → combine, join, unite, fuse)
   - **Related concepts:** things in the same domain (e.g. "cloud cluster" → topology, network, hub, infrastructure, region)
   - **Abstract/metaphorical:** shapes or ideas that could represent the concept (e.g. "cluster" → nodes, grid, constellation, beehive, atom)
   - **Technical terms:** domain-specific jargon (e.g. "cloud environments" → tenant, orchestration, federation, interoperability)
2. **Re-scan the full icon list** — Using the already-fetched demo site content (step 2 of the main workflow), match all `ui` set icon names against the expanded term list.
3. **Deduplicate** — Remove any icons already shown in the initial results.
4. **Generate expanded preview** — Build a new `icon-finder-preview.html` with two sections:
   - "Original matches" — the initial results (kept for reference)
   - "Additional finds" — the new icons from the expanded search
   Use the same HTML template but add a section label before each gallery using PatternFly content styling:
   ```html
   <div class="pf-v6-c-content" style="margin: var(--pf-t--global--spacer--lg) 0 var(--pf-t--global--spacer--sm);"><h3>Section title</h3></div>
   ```
5. **Open and respond** — Follow steps 5–6 of the main workflow. Present the new icons in a separate table below the originals.

### Example expansion

For "cluster of different cloud environments":

| Category | Initial terms | Expanded terms |
|----------|--------------|----------------|
| Synonyms | cluster, cloud | group, collection, aggregate, pool |
| Related concepts | hybrid-cloud, multi-cloud, edge | topology, network, hub, infrastructure, region, zone, federation |
| Abstract | — | nodes, constellation, atom, venn-diagram, interconnect |
| Technical | — | tenant, orchestration, interoperability, data-connections, distribute |

### Guidelines

- Aim for **8–15 additional icons** in the expanded results — enough to be useful, not so many as to overwhelm.
- Don't repeat icons from the initial results. Each icon and its `-fill` variant count as a single result (shown side-by-side on one card).
- The deep search reuses the demo site content already fetched in step 2 — no additional network requests needed beyond what the main workflow already did.
- Works identically in Cursor and Claude Code — no browser or special tools required.

## Notes

- Icon names are the only metadata; there are no descriptions in the source. The agent infers meaning from the name. Card hints use the format `UI context: <em>description</em>` and should describe **where in a software UI the icon would be used** — not just reword the name. Think about specific pages, features, buttons, or dashboard elements where the icon fits. For example, prefer `UI context: <em>power status indicators, energy consumption dashboards</em>` over `UI context: <em>zappy energy</em>` for `electricity`. The same software-UI framing applies to the "Use when" column in the markdown response table.
- Many icons have outline and `-fill` variants. Show both side-by-side on a single card rather than using two separate cards.
- Do not clone the repo. Use the demo site for listing icons and raw GitHub URLs for rendering.
- Do NOT fetch individual SVG content from the GitHub API. The `<img>` tags in the HTML let the user's browser load them directly — this is much faster.
