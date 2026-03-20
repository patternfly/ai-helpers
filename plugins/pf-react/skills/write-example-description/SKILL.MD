---
name: patternfly-example-descriptions
description: >-
  Helps PatternFly developers write and refine example descriptions and demo
  descriptions for PatternFly.org. Covers (1) component example MD files: prose
  under each ### heading before the ts block in
  packages/react-core/src/components/*/examples/*.md; (2) demo MD files: prose
  under ## Demos / ### Demo name in packages/react-core/src/demos. Uses
  PatternFly MCP for UX writing and content guidelines, suggests cross-links,
  and asks the user to accept or request changes. Run only when the user asks.
---

# PatternFly example and demo descriptions

Use this skill when a PatternFly developer needs to write or edit:

1. **Component example descriptions** – the text under each `### Example name` (h3) and above the ` ```ts file='./ExampleName.tsx' ``` ` block in `packages/react-core/src/components/*/examples/*.md`. This content appears on the **React** tab of component pages on PatternFly.org.
2. **Demo descriptions** – the text under each `### Demo name` in `packages/react-core/src/demos`. Demos appear as a separate **Demos** tab on the component/pattern page (alongside React examples, HTML, Design guidelines, and sometimes Accessibility).

Content should be clear, on-brand, and cross-linked where helpful. For **component examples**, use a concept intro only when the example introduces **unique functionality or the primary use** of the component (e.g. Basic); for **variations and follow-on examples**, jump straight to the benefit/implementation (e.g. "To remove the home link…"). See "Lead with the benefit (component examples)" below. The skill can also be used for short intros (e.g. composable blurbs under `## Examples` or an intro under `## Demos`). **Apply this skill only when the user asks** for help writing or editing example or demo descriptions; do not invoke it proactively. After completing a request, you may offer once to check the file for other opportunities.

## Who this is for

- A developer who just added a new example or demo and needs a first draft of the description.
- Anyone closing gaps where examples or demos have no description or only a heading.
- Non-writers who want a strong first draft that can be reviewed by content design later or published as-is when time is limited.

## Workflow

1. **Gather context**
   - Identify the file type: **component examples** (`.../components/*/examples/*.md`) or **demos** (`.../demos/**/*.md`), and the specific example or demo (heading + ts file).
   - Read the example’s or demo’s TSX/implementation if needed to understand what it shows and which props/features are used.
   - Read any existing description and nearby examples/demos in the same MD file for tone and length.

2. **Align with PatternFly content guidelines**
   - Call the **PatternFly MCP** to load current guidance:
     - Use `searchPatternFlyDocs` with `searchQuery: "writing"` (or `"patternfly design guidelines"` or `"content design"`) to find content design resources.
     - Use `usePatternFlyDocs` with `name: "Writing"` (or `"content design"` or the returned resource names/URLs) to fetch:
       - **Brand voice and tone** – friendly, approachable, collaborative, inventive; avoid jargon and fluff.
       - **Best practices** – clear, concise, user-focused; lead with benefit; positive, action-oriented language.
       - **PatternFly design guidelines** – present tense; second person ("you"); active voice; sentence-case headings; descriptive hyperlinks; relative URLs for PatternFly pages. (Note: bolding component names on first use applies to design guidelines pages, not example documentation—do not bold component names in example descriptions.)
       - **Accessibility and localization** – plain language, short sentences, consistent terminology.
   - Apply these when drafting or revising the example or demo description.

3. **Draft the description**
   - **For component examples:** **When the example introduces unique functionality or the primary use** (e.g. Basic): use a **concept intro sentence** ("A [component] gives users…") then **technical implementation sentence(s)**. **When the example is a variation or follow-on** (e.g. "Without home link", "With dropdown"): skip the concept intro and start with the benefit/implementation—e.g. "To remove the home link, use…" or "To add a dropdown to a breadcrumb item, use…". Always lead with the benefit in the first sentence the reader sees; keep concept and implementation in separate sentences when you use a concept intro. Do **not** bold component names in example descriptions.
   - **For demos:** Use the demo-specific structure below (opening sentence + "In this demo:" + bullet list of props/features). Mention what the demo shows and how key props or features are used.
   - In both cases: Use "you" and active voice, and be direct and concise. **Punctuation:** Avoid semicolons. Prefer commas or new sentences to join ideas. Use em dashes occasionally if they improve clarity. Use backticks for prop/attribute names (e.g. `isExpanded`). **Example and demo headings (h3):** Use sentence case—only the first word and proper nouns capitalized (e.g. "Read only", "Expanded with array", "Inline compact with truncation"). **Component names:** Do not capitalize component names unless at the beginning of a sentence. When referring to the React component in a code way, use angle-bracket form: `<ComponentName>`. **Only mention the React component (e.g. `<DataList>`) when multiple components are involved or it helps clarify the sentence**—otherwise just "use `propName`" or "set `propName`" is enough (e.g. "To reduce vertical spacing between rows, use `isCompact`." not "set `isCompact` on `<DataList>`"). In running prose, use lowercase: "the page component," "the notification drawer."
   - Add **cross-links** only when **directly relevant**—e.g. when referencing a specific example of another component, or when the reader would likely want to cross-check. Generally, linking to other components or patterns mentioned in the description is usually relevant. When building component links:
     - **Nested components**: If the target component’s MD file has a `subsection` in its frontmatter, use `/components/<subsection>/<id-lowercase>` (e.g. Form with `subsection: forms` → `/components/forms/form`). Otherwise use `/components/<id-lowercase>` (e.g. `/components/button`, `/components/card`).
     - Use `[Component label](/components/...)` or `/components/.../design-guidelines` when pointing to design/usage.
     - **Pattern**: `[Pattern label](/patterns/pattern-name)`.
     - **Same-page example**: `[link text](#anchor)`. Anchor = heading text lowercased, spaces to hyphens (e.g. `#selectable`, `#cards-as-tiles`).
     - **Content design**: `/content-design/overview` as a generic landing, or specific paths like `/content-design/writing-guides/tooltips`. Paths here can be less consistent; use overview when unsure.
     - **Foundations and styles**: e.g. `/foundations-and-styles/iconography`, `/foundations-and-styles/design-tokens/overview`.
   - Use **relative** paths only; use descriptive link text (not "click here").

### Lead with the benefit (component examples)

**When to use a concept intro:** If the example is the **first or Basic one** and introduces what the component is, use a concept intro. Sometimes you’ll also want a concept intro for a **later example** when there are **complex implementation details** to share—that’s an option when it helps the reader.

**When to skip the concept intro:** For **variations and follow-on examples** (e.g. "Without home link", "With heading", "With dropdown"), **jump straight to the benefit/implementation**. Start with "To [do x], use…" or "To [achieve y],…" so the reader still sees the outcome first, but don’t repeat what the component is.

**When in doubt:** Prefer the shorter description and one clear benefit sentence.

**With concept intro** (e.g. Basic / primary use):

1. **Concept intro sentence:** What the component displays or does (e.g. "A basic data list displays a structured set of items, each with one or more cells in a row." or "A back to top component gives users a quick way to return to the top of a long page.")
2. **Optional component structure sentence(s):** When it helps clarify, describe the hierarchy using `<ComponentName>` (e.g. "A `<DataListItem>` includes a `<DataListItemRow>` containing one or more `<DataListItemCells>`.")
3. **Technical implementation sentence(s):** How to use props or control behavior (e.g. "In a `<DataListCell>` you can control the layout of content by using `isFilled` and `alignRight`.") and any real-use caveats.

**Preferred example (data list Basic):**

```markdown
A basic data list displays a structured set of items, each with one or more cells in a row.

A `<DataListItem>` includes a `<DataListItemRow>` containing one or more `<DataListItemCells>`. In a `<DataListCell>` you can control the layout of content by using `isFilled` and `alignRight`.
```

**Another example (back to top):**

```markdown
A back to top component gives users a quick way to return to the top of a long page. This example sets `isAlwaysVisible` so the control is visible in the short demo. In a real page, the control should appear after the user scrolls 400px.
```

**Without concept intro** (variation / follow-on): Start with "To [benefit], use…" and **do not name the React component unless multiple components are involved or it clarifies**. Prefer "use `propName`" over "set `propName` on `<ComponentName>`."

```markdown
To reduce vertical spacing between rows, use `isCompact`.
```

```markdown
To remove the home link from the breadcrumb, use [prop or approach].
```

Use the same "To [benefit], use…" shape for variation examples; only omit the concept intro sentence so you don’t repeat the concept on every example.

**Avoid / Prefer:**

- **Avoid:** "Use isCompact to reduce spacing." **Prefer:** "To reduce vertical spacing between rows, use `isCompact`."
- **Avoid:** "Passing `isBordered` to an Avatar will add a border." **Prefer:** "To add a border to an avatar and further separate it from the background, use `isBordered`."

### Demo description structure

For **demos**, prefer this format so readers know what the demo shows and how it’s built:

1. **Opening sentence:** Lead with what the demo shows—**vary the phrasing**. Options include a short descriptive sentence (e.g. "A basic notification drawer opens from the masthead and displays a list of notifications.") or user-focused ("You can [achieve X] by [approach]."). Avoid repeating "This demo demonstrates" across demos.
2. **"In this demo:" or "This demo includes:"** followed by a bullet list. Each item can tie a prop or feature to what it does, or describe an element in the demo:
   - "The `propName` prop is used to [effect]." / "A `ref`, which is passed to [thing] and used with the [component]'s `onExpand` callback to [effect]."
   - "[Thing] with [details], in both [state A] and [state B] states."

Example (descriptive style):

```markdown
A basic notification drawer opens from the masthead and displays a list of notifications.

This demo includes:

- A `ref`, which is passed to the notification drawer and used with the page component's `onNotificationDrawerExpand` callback to move focus into the drawer when it opens.
- Notification items with a header and body, in both "read" and "unread" states.
```

Use lowercase for component names in prose ("the page component"); use `<ComponentName>` when referring to the React component in a code way (e.g. "pass `ref` to the `<Page>` component").

Keep bullets concise; use backticks for prop/component names. **Length:** A very simple demo may need only an opening sentence (no bullets). Other demos may have multiple sentences and lists of 5+ bullets—that’s fine. What matters is capturing the **unique aspects** of the demo, **why the demo matters**, and **what it is showing to users**. Cross-link to components or patterns when directly relevant (same rules as component examples).

4. **Present and iterate**
   - **Share the suggested description in raw markdown** (e.g. in a fenced code block or clearly formatted block) so the user can easily copy and paste. Write the example description in markdown (links, backticks for props, etc.).
   - Ask the user to either:
     - **Accept** the suggestion (then insert it into the MD file), or
     - **Request changes** by saying what they don’t like (e.g. too long, wrong emphasis, different link).
   - If they request changes, revise and show again; repeat until they accept or are satisfied.
   - Optionally, once done: "Do you want me to check this file for other opportunities?" (e.g. other examples missing descriptions). Do not over-suggest this; ask at most once per interaction.

5. **Apply the final text**
   - **Component examples:** Insert or replace the description after the `### Example name` line and before the ` ```ts file='./...' ``` ` block.
   - **Demos:** Insert or replace the description after the `### Demo name` line and before the ` ```ts file='./...' ``` ` block (demos may use `isFullscreen` on the code block).
   - **Rewriting vs updating:** If the user is **rewriting** (replacing) existing content, the new description can **override** existing content, including tables—but **make the user aware** that you removed or replaced something (e.g. "I replaced the previous paragraph and the table with the description below."). If they are **updating or adding** (not doing a full rewrite), tack the new content on where appropriate; do not replace existing prose or tables unless they asked for a rewrite.
   - If the user would like content design review, suggest they tag the content designer for review (no need to add PR labels; a brief note is enough).

## MD structure reference

**Component examples** (`packages/react-core/src/components/*/examples/*.md`):

```markdown
### Example heading

**If primary/unique (e.g. Basic):** [Concept intro: "A [component] gives users [benefit]."] [Technical implementation sentence(s).] **If variation/follow-on:** [Start with "To [benefit], use…" or "To [do x],…"; no concept intro.] Optional [cross-link](/components/other) if relevant.

```ts file='./ExampleName.tsx'
```
```

**Demos** (`packages/react-core/src/demos/**/*.md`):

```markdown
## Demos

Optional intro paragraph under ## Demos (e.g. focus management note).

### Demo heading

[Varied opening: e.g. "A basic [thing] opens from… and displays…" or "You can [xyz] by [abc]."]

This demo includes:

- [Bullet tying prop/feature to effect, or describing element.]
- [Bullet…]

```ts file='./examples/DemoName.tsx' isFullscreen
```
```

- Descriptions are optional but recommended; some examples and demos have none.
- Same-file anchors (component examples): from the exact heading text, lowercased, spaces → hyphens (e.g. "Cards as tiles" → `#cards-as-tiles`).

## Link conventions (PatternFly.org)

| Target | Path form | Example |
|--------|-----------|--------|
| Component (no subsection) | `/components/<id-lowercase>` | `/components/card`, `/components/button` |
| Component (with subsection in frontmatter) | `/components/<subsection>/<id-lowercase>` | `/components/forms/form`, `/components/menus/menu` |
| Component design guidelines | `/components/.../design-guidelines` | `/components/tooltip/design-guidelines` |
| Component accessibility | `/components/.../accessibility` | `/components/alert/accessibility` |
| Pattern | `/patterns/<name>` | `/patterns/primary-detail` |
| Same-page example | `#anchor` | `#selectable`, `#cards-as-tiles` |
| Content design (generic) | `/content-design/overview` | Use when linking to content design generally |
| Content design (specific) | `/content-design/...` | `/content-design/writing-guides/tooltips` |
| Foundations and styles | `/foundations-and-styles/...` | `/foundations-and-styles/iconography`, `/foundations-and-styles/design-tokens/overview` |

Determine component paths by checking the target component’s MD frontmatter for `subsection` (e.g. `subsection: forms` → `/components/forms/form`). Design guidelines and some writing guides live in patternfly-org; the docs site exposes the paths above.

## Quality checks

Before suggesting the description:

- [ ] When in doubt, prefer the shorter description and one clear benefit sentence.
- [ ] No semicolons in descriptions. Prefer commas or new sentences (em dashes occasionally).
- [ ] Matches brand voice (friendly, clear, no jargon, "you" and active voice).
- [ ] Example and demo headings (h3) in sentence case (first word and proper nouns only). Component names: lowercase in prose unless starting a sentence; use `<ComponentName>` when referring to the React component as code. Do not bold component names in example or demo descriptions.
- [ ] **Component examples:** Concept intro only for unique/primary-use examples (e.g. Basic); optional component-structure sentence using `<ComponentName>` when it helps; variation examples start with "To [benefit], use…" and omit component name unless multiple or clarifying. Props in backticks.
- [ ] **Demos:** Varied opening; "In this demo:" or "This demo includes:" with bullet list of props/features and what they do.
- [ ] Cross-links only where directly relevant; use subsection for nested components.
- [ ] Relative URLs only; descriptive link text.
- [ ] Suggested text shared in raw markdown so the user can copy and paste.

## Optional: when the user hasn’t specified a file or example

If the user asks for help with "example descriptions" or "demo descriptions" but doesn’t point to a file or example:

- Ask which file they want to work on (component examples path or demos path) and which example or demo (heading or ts file name).
- Optionally list examples or demos in that file that are missing descriptions so they can choose.