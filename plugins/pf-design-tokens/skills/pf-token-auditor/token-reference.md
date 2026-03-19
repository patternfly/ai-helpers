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

**Figma line-height mapping:** Figma expresses line-heights as absolute pixel values per font size. These all map to the two CSS tokens above:

| Figma Variable | Pixel Value | Calculation | CSS Token |
|---|---|---|---|
| `global/font/line-height/figma-only/body/default` | `21px` | 14px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/body/large` | `24px` | 16px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/body/small` | `18px` | 12px × 1.5 | `--pf-t--global--font--line-height--body` |
| `global/font/line-height/figma-only/heading/xs` | `24px` | heading context | `--pf-t--global--font--line-height--heading` |

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
