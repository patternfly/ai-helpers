# PatternFly Token Guide for Figma — Deep Dive Reference

> **When to read this file:** Only when using status colors, on-context foreground pairing (`on-brand`, `on-danger`, etc.), font tokens, icon size tokens, or purpose-specific spacers. The core background, text, spacing, and border tokens are already inlined in SKILL.md's Core Token Set — do not re-read those here.

## How to Bind Variables in Figma

Use these Figma Plugin API patterns (from `figma-use`):

**Colors (fills/strokes):**
```js
const bgVar = await figma.variables.importVariableByKeyAsync("BG_VAR_KEY");
const paint = figma.variables.setBoundVariableForPaint(
  { type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', bgVar
);
frame.fills = [paint];
```

**Spacing (padding, gap):**
```js
const spacerVar = await figma.variables.importVariableByKeyAsync("SPACER_VAR_KEY");
frame.setBoundVariable("paddingTop", spacerVar);
frame.setBoundVariable("paddingBottom", spacerVar);
frame.setBoundVariable("itemSpacing", spacerVar);
```

**Border radius:**
```js
const radiusVar = await figma.variables.importVariableByKeyAsync("RADIUS_VAR_KEY");
frame.setBoundVariable("topLeftRadius", radiusVar);
frame.setBoundVariable("topRightRadius", radiusVar);
frame.setBoundVariable("bottomLeftRadius", radiusVar);
frame.setBoundVariable("bottomRightRadius", radiusVar);
```

### Purpose-specific spacers (preferred over generic scale)

| Usage | Token suffix | Value |
|---|---|---|
| Between actions (buttons) | `spacer/gap/action-to-action/default` | 1rem |
| Between plain/icon actions | `spacer/gap/action-to-action/plain` | 0.25rem |
| Between controls (inputs) | `spacer/gap/control-to-control/default` | 0.25rem |
| Icon inline with text | `spacer/gap/text-to-element/default` | 0.5rem |
| Icon inline (compact) | `spacer/gap/text-to-element/compact` | 0.25rem |
| Items in a group (horizontal) | `spacer/gap/group/horizontal` | 1rem |
| Items in a group (vertical) | `spacer/gap/group/vertical` | 0.5rem |
| Between groups (horizontal) | `spacer/gap/group-to-group/horizontal/default` | 3rem |
| Between groups (vertical) | `spacer/gap/group-to-group/vertical/default` | 1.5rem |
| Button horizontal padding | `spacer/action/horizontal/default` | 1.5rem |
| Button padding (spacious) | `spacer/action/horizontal/spacious` | 2rem |
| Button padding (compact) | `spacer/action/horizontal/compact` | 1rem |
| Control vertical padding | `spacer/control/vertical/default` | 0.5rem |
| Control horizontal padding | `spacer/control/horizontal/default` | 1rem |

## Font Tokens

### Size

| Figma variable path | CSS token | Figma px | CSS rem |
|---|---|---|---|
| `global/font/size/xs` | `--pf-t--global--font--size--xs` | 12 | 0.75rem |
| `global/font/size/sm` | `--pf-t--global--font--size--sm` | 14 | 0.875rem |
| `global/font/size/md` | `--pf-t--global--font--size--md` | 16 | 1rem |
| `global/font/size/lg` | `--pf-t--global--font--size--lg` | 18 | 1.125rem |
| `global/font/size/xl` | `--pf-t--global--font--size--xl` | 20 | 1.25rem |
| `global/font/size/2xl` | `--pf-t--global--font--size--2xl` | 24 | 1.5rem |
| `global/font/size/3xl` | `--pf-t--global--font--size--3xl` | 28 | 1.75rem |
| `global/font/size/4xl` | `--pf-t--global--font--size--4xl` | 36 | 2.25rem |

### Weight

| Context | Token suffix | Value |
|---|---|---|
| Body default | `font/weight/body/default` | 400 |
| Body bold | `font/weight/body/bold` | 500 |
| Heading default | `font/weight/heading/default` | 500 |
| Heading bold | `font/weight/heading/bold` | 700 |

### Line height

Only two line-height tokens exist:

| Context | Token suffix | Value |
|---|---|---|
| Body | `font/line-height/body` | 1.5 (unitless) |
| Heading | `font/line-height/heading` | 1.3 (unitless) |

Figma uses absolute pixel values; CSS uses unitless multipliers. Do not invent size-specific line-height variants.

### Font family

| Context | Token suffix |
|---|---|
| Body text | `font/family/body` |
| Headings | `font/family/heading` |
| Code / monospace | `font/family/mono` |

## Icon Size Tokens

| Named | Numbered | Figma px | CSS rem |
|---|---|---|---|
| sm | `icon/size/100` | 12 | 0.75rem |
| md | `icon/size/200` | 14 | 0.875rem |
| lg | `icon/size/250` | 16 | 1rem |
| xl | `icon/size/300` | 24 | 1.5rem |
| 2xl | `icon/size/400` | 56 | 3.5rem |
| 3xl | `icon/size/500` | 96 | 6rem |

## Status Color Tokens

| Status | Default | CSS token |
|---|---|---|
| Danger | `color/status/danger/100` | `--pf-t--global--color--status--danger--100` |
| Warning | `color/status/warning/100` | `--pf-t--global--color--status--warning--100` |
| Success | `color/status/success/100` | `--pf-t--global--color--status--success--100` |
| Info | `color/status/info/100` | `--pf-t--global--color--status--info--100` |
| Custom | `color/status/custom/100` | `--pf-t--global--color--status--custom--100` |

Each status has scales 100, 200, 300 for different intensity levels.

## On-Context Foreground Pairing

When placing text or icons on a colored background, use the matching `on-` token. Mismatched pairings may work in one theme but break in others.

| Background | Text token | Icon token |
|---|---|---|
| brand/default | text/color/on-brand/default | icon/color/on-brand/default |
| brand/accent/default | text/color/on-brand/accent/default | icon/color/on-brand/accent/default |
| status/danger/default | text/color/status/on-danger/default | icon/color/status/on-danger/default |
| status/success/default | text/color/status/on-success/default | icon/color/status/on-success/default |
| status/warning/default | text/color/status/on-warning/default | icon/color/status/on-warning/default |
| status/info/default | text/color/status/on-info/default | icon/color/status/on-info/default |
| background/disabled | text/color/on-disabled | icon/color/on-disabled |
| background/highlight | text/color/on-highlight | — |

The `on-` prefix must match the background variant precisely. Using `on-brand/default` on a `brand/accent` background may pass in the default theme but fail in RedHat dark theme.

## Contextual Token Pairing

Sibling properties on the same element should share the same context:

| Background context | Border token | Text/icon token |
|---|---|---|
| brand/default | border/color/brand/default | text/color/on-brand/default |
| brand/accent | border/color/brand/accent/default | text/color/on-brand/accent/default |
| status/danger | border/color/status/danger/default | text/color/status/on-danger/default |
| glass/primary | border/color/subtle (or glass-specific) | text/color/regular |

## Common Raw Value to Token Mappings

Quick reference for replacing hardcoded values with tokens:

| Figma raw value | PatternFly token |
|---|---|
| `#ffffff` (white bg) | `global/background/color/primary/default` |
| `#151515` (dark text) | `global/text/color/regular` |
| `#4d4d4d` (gray text) | `global/text/color/subtle` |
| `#0066cc` (link blue) | `global/text/color/link/default` |
| `#e0e0e0` (border) | `global/border/color/default` |
| 4px radius | `global/border/radius/100` |
| 6px radius | `global/border/radius/200` |
| 4px spacing | `global/spacer/100` |
| 8px spacing | `global/spacer/200` |
| 16px spacing | `global/spacer/300` |
| 24px spacing | `global/spacer/400` |
| 12px font | `global/font/size/xs` |
| 14px font | `global/font/size/sm` |
| 16px font | `global/font/size/md` |

## Figma px vs CSS rem

Figma outputs pixels; PatternFly CSS uses rem (1rem = 16px). This is expected — do not flag unit differences as value mismatches. Use the tables above for mapping.

## Palette Colors: Do Not Use Directly

Palette tokens (`--pf-t--color--{hue}--{shade}`) are raw color primitives. Always use semantic tokens (background, text, border, status) instead. Semantic tokens resolve correctly across all themes; palette tokens do not.
