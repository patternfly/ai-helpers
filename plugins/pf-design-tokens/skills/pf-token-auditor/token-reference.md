# PatternFly Token Reference

## Token Categories

### Color (Palette — do NOT use directly)
```
--pf-t--color--{hue}--{shade}
```
Hues: `black`, `white`, `blue`, `gray`, `green`, `orange`, `purple`, `red`, `red-orange`, `teal`, `yellow`
Shades: `05`-`95` (increments of 5 or 10)

### Background Color
```
--pf-t--global--background--color--{context}--{state}
```
Contexts: `primary`, `secondary`, `action-plain`, `control`, `glass--primary`, `glass--floating`
States: `default`, `hover`, `clicked`

Numbered scale: `--pf-t--global--background--color--100` through `--700`

### Text Color
```
--pf-t--global--text--color--{context}--{state}
```
Contexts: `regular`, `subtle`, `inverse`, `disabled`, `required`, `brand`, `link`, `on-brand`, `on-brand--accent`, `on-brand--subtle`, `on-disabled`, `on-highlight`
States: `default`, `hover`, `clicked`, `visited` (link)

### Icon Color
```
--pf-t--global--icon--color--{context}--{state}
```
Contexts: `regular`, `subtle`, `inverse`, `disabled`, `brand`, `on-brand`, `on-brand--accent`, `on-disabled`
Semantic: `severity--critical`, `severity--important`, `severity--moderate`, `severity--minor`, `severity--none`, `status--warning`

### Border
```
--pf-t--global--border--color--{context}--{state}
--pf-t--global--border--width--{scale}
--pf-t--global--border--radius--{scale}
```
Width scale: `100` (1px), `200` (2px), `300` (3px), `400` (4px)
Radius scale: `0` (0px), `100` (4px), `200` (6px), `300` (16px), `400` (24px), `500` (pill/999px)

### Font
```
--pf-t--global--font--size--{scale}
--pf-t--global--font--weight--{context}
--pf-t--global--font--line-height--{context}
--pf-t--global--font--family--{context}
```
Size scale: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
Size by body: `--pf-t--global--font--size--body--default` (14px/sm), `--body--lg` (16px/md), `--body--sm` (12px/xs)
Size by heading: `--pf-t--global--font--size--heading--h1` through `--h6`, `--xs` through `--2xl`
Weight: `body--default` (400), `body--bold` (500), `heading--default` (500), `heading--bold` (700)
Family: `body`, `heading`, `mono`
Line-height (**only two tokens exist**):
- `--pf-t--global--font--line-height--body` → `1.5` (unitless)
- `--pf-t--global--font--line-height--heading` → `1.3` (unitless)

### Icon Size
```
--pf-t--global--icon--size--{scale}
```
CSS uses `rem`, Figma outputs `px`:

| Named | Numbered | CSS (rem) | Figma (px) |
|---|---|---|---|
| `sm` | `100` | `0.75rem` | `12` |
| `md` | `200` | `0.875rem` | `14` |
| `lg` | `250` | `1rem` | `16` |
| `xl` | `300` | `1.5rem` | `24` |
| `2xl` | `400` | `3.5rem` | `56` |
| `3xl` | `500` | `6rem` | `96` |

Font-relative icon sizes also exist: `--pf-t--global--icon--size--font--body--default`, `--font--body--lg`, `--font--body--sm`, `--font--heading--h1` through `--h6`.

### Spacing
```
--pf-t--global--spacer--{scale}
```
Numbered: `100` (0.25rem) through `800`
Named: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
Special: `gap--group--horizontal`, `gap--group--vertical`, `gap--action-to-action--*`

### Box Shadow (Composites in tokens-local.scss)
```
--pf-t--global--box-shadow--{size}
--pf-t--global--box-shadow--{size}--{direction}
```
Sizes: `sm`, `md`, `lg`
Directions: `top`, `bottom`, `left`, `right`

Primitive components (in tokens-default.scss):
- `--pf-t--global--box-shadow--X--{scale}` (50-800)
- `--pf-t--global--box-shadow--Y--{scale}` (50-800)
- `--pf-t--global--box-shadow--blur--{scale}` (100-300)
- `--pf-t--global--box-shadow--color--{scale}` (100-200)
- `--pf-t--global--box-shadow--spread--{scale}` (100-400)

When Figma outputs individual shadow properties, recommend the single composite:
```scss
/* Individual → Composite */
box-shadow: var(--pf-t--global--box-shadow--sm); /* replaces X, Y, blur, spread, color primitives */
```

### Glass (Composites in tokens-local.scss)
```
--pf-t--global--background--color--glass--{context}--default
--pf-t--global--background--filter--glass--blur--{context}
--pf-t--global--background--opacity--glass--{context}
```
Contexts: `primary`, `floating`

Glass theme activates via `.pf-v6-theme-glass` which overrides opacity (100% -> 80%) and blur (0px -> 12.5px).

### Motion
```
--pf-t--global--duration--{scale}
--pf-t--global--delay--{scale}
--pf-t--global--timing-function--{context}
```
Duration scale: `50`, `100`-`600`
Delay scale: `100`-`400`

### Status Colors
```
--pf-t--global--color--status--{status}--{scale}
```
Statuses: `danger`, `warning`, `success`, `info`, `custom`
Scale: `100`, `200`, `300`

### Focus
```
--pf-t--global--focus-ring--{property}
```

### Z-index
```
--pf-t--global--z-index--{scale}
```

### Breakpoints
```
--pf-t--global--breakpoint--{scale}
```
CSS uses `rem`, Figma outputs `px`:

| Named | Numbered | CSS (rem) | Figma (px) |
|---|---|---|---|
| `xs` | `100` | `0rem` | `0` |
| `sm` | `200` | `36rem` | `576` |
| — | `250` | `40rem` | `640` |
| `md` | `300` | `48rem` | `768` |
| — | `350` | `60rem` | `960` |
| `lg` | `400` | `62rem` | `992` |
| `xl` | `500` | `75rem` | `1200` |
| — | `550` | `80rem` | `1280` |
| `2xl` | `600` | `90.625rem` | `1450` |

---

## Figma-to-CSS Unit Mapping

Figma outputs `px`; PatternFly CSS uses `rem` (`1rem = 16px`). Do NOT flag unit differences as value mismatches.

### Font Size

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

### Line-Height

Figma outputs absolute `px`; CSS uses unitless multipliers. Only **two** line-height tokens exist:

| Figma Variable | Pixel Value | Calculation | CSS Token |
|---|---|---|---|
| `global/font/line-height/figma-only/body/default` | `21px` | 14px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/body/large` | `24px` | 16px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/body/small` | `18px` | 12px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/heading/xs` | `24px` | heading context | `--pf-t--global--font--line-height--heading` |

Do NOT invent size-specific variants like `--body--lg` — they don't exist.

---

## Purpose-Specific Spacer Tokens

Always prefer purpose-specific tokens over generic scale tokens (`spacer--xs` through `spacer--4xl`).

### Gap Tokens

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

### Action, Control, and Inset Tokens

| Token | Value | Use when... |
|---|---|---|
| `spacer--action--horizontal--default` | `1.5rem` | Horizontal padding inside a default action/button |
| `spacer--action--horizontal--spacious` | `2rem` | Horizontal padding inside a CTA/display-lg action |
| `spacer--action--horizontal--compact` | `1rem` | Horizontal padding inside a compact action |
| `spacer--control--vertical--default` | `0.5rem` | Vertical padding inside controls |
| `spacer--control--vertical--spacious` | `1rem` | Vertical padding inside CTA/display-lg controls |
| `spacer--control--horizontal--default` | `1rem` | Horizontal padding inside controls (inputs, toggles) |

---

## On-Context Foreground Pairing

Foreground elements (text, icons) on a colored background must use `on-` tokens that exactly match the background context.

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

The `on-` prefix must match the background variant precisely. Using `on-brand--default` on a `brand--accent` background may pass in one theme but will fail in others (e.g., RedHat dark where `on-brand--accent` resolves to `--text--color--regular` instead of `--inverse`).

---

## Contextual Token Pairing

Sibling properties on the same element should share the same context:

| Background Context | Border Token | Text/Icon Token |
|---|---|---|
| `glass--primary` | `border--color--glass--default` (if available) or `border--color--subtle` | `text--color--regular` |
| `brand--default` | `border--color--brand--default` | `text--color--on-brand--default` |
| `brand--accent` | `border--color--brand--accent--default` | `text--color--on-brand--accent--default` |
| `status--danger` | `border--color--status--danger--default` | `text--color--status--on-danger--default` |

If a context-specific border token does not yet exist in CSS, flag as ESCALATION RECOMMENDED.

---

## Common Figma-to-Token Mappings

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

---

## RedHat Theme Key Overrides

The RedHat theme (`tokens-redhat.scss`) changes 8 tokens from the default theme:

| Token | Default Theme | RedHat Theme |
|---|---|---|
| `--color--brand--accent--default` | `--color--brand--default` (blue) | `--color--brand--accent--100` (red `#ee0000`) |
| `--color--brand--accent--clicked` | `--color--brand--clicked` (blue) | `--color--brand--accent--200` (dark red) |
| `--color--brand--accent--hover` | `--color--brand--hover` (blue) | `--color--brand--accent--200` (dark red) |
| `--border--color--brand--accent--*` | `--color--brand--accent--*` | `--color--brand--accent--400` (black) |
| `--border--radius--action--plain--default` | `--border--radius--small` (6px) | `--border--radius--pill` (999px) |
| `--border--radius--control--default` | `--border--radius--small` (6px) | `--border--radius--pill` (999px) |

The RedHat dark/glass/HC variants (`tokens-redhat-dark.scss`, etc.) further override foreground tokens. Notably, `--text--color--on-brand--accent--default` changes to `--text--color--regular` in RedHat dark and RedHat glass dark modes.

## Theme File Map

| Class Selector | File | Inherits |
|---------------|------|----------|
| `:root` | `tokens-palette.scss` + `tokens-default.scss` + `tokens-local.scss` | — |
| `.pf-v6-theme-dark` | `tokens-dark.scss` | default |
| `.pf-v6-theme-high-contrast` | `tokens-highcontrast.scss` | default |
| `.pf-v6-theme-high-contrast.pf-v6-theme-dark` | `tokens-highcontrast-dark.scss` | dark |
| `.pf-v6-theme-glass` | `tokens-glass.scss` | default |
| `.pf-v6-theme-glass.pf-v6-theme-dark` | `tokens-glass-dark.scss` | dark |
| `.pf-v6-theme-redhat` | `tokens-redhat.scss` | default |
| `.pf-v6-theme-redhat.pf-v6-theme-dark` | `tokens-redhat-dark.scss` | redhat |
| `.pf-v6-theme-redhat.pf-v6-theme-high-contrast` | `tokens-redhat-highcontrast.scss` | redhat |
| `.pf-v6-theme-redhat.pf-v6-theme-high-contrast.pf-v6-theme-dark` | `tokens-redhat-highcontrast-dark.scss` | redhat + dark |
| `.pf-v6-theme-redhat.pf-v6-theme-glass` | `tokens-redhat-glass.scss` | redhat |
| `.pf-v6-theme-redhat.pf-v6-theme-glass.pf-v6-theme-dark` | `tokens-redhat-glass-dark.scss` | redhat + dark |
