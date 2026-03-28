# PatternFly Variant Selection Guide for Figma

When importing PatternFly components from the design kit, select the correct variant. Variant names in the Figma component set correspond to prop values in code. Selecting the wrong variant produces visually incorrect screens that don't match the implementation.

## Button

### Variants

| Variant | When to use |
|---|---|
| `primary` | Main call-to-action. One per context (page section, modal, card). |
| `secondary` | Secondary actions alongside a primary button. |
| `tertiary` | Lower-emphasis actions. Less visual weight than secondary. |
| `link` | Inline or navigation actions. No background, just text color. |
| `plain` | Icon-only actions (kebab menu, close, etc.). No border or background. |
| `danger` | Destructive actions (delete, remove). Red styling. |
| `warning` | Caution actions. Yellow/amber styling. |

### Sizes

| Size | When to use |
|---|---|
| `default` | Standard size for most contexts. |
| `sm` | Compact contexts (toolbars, inline actions, tables). |
| `lg` | Hero/display actions, call-to-action banners. |

### Finding the variant in Figma

Button component sets typically use a variant property like `variant=primary, size=default`. Search for a variant combination like:

```
variant=primary, size=default
variant=secondary, size=sm
variant=danger, size=default
variant=link, size=default
variant=plain
```

If the button component set uses `defaultVariant`, it is usually `variant=primary, size=default`.

### Selection rules

- Only one primary button per visible context (modal footer, card, page section).
- Pair primary with secondary or link buttons, not with another primary.
- Use `danger` only for irreversible/destructive actions.
- Icon-only buttons use the `plain` variant and must have an accessible label.

## Alert

### Variants (status)

| Variant | When to use | Color |
|---|---|---|
| `danger` | Errors, failures, critical issues | Red |
| `warning` | Warnings, potential issues | Yellow/amber |
| `success` | Confirmations, completed actions | Green |
| `info` | Informational messages, tips | Blue |
| `custom` | Non-status messages | Gray or custom |

### Types

| Type | When to use |
|---|---|
| `default` | Page-level alerts, shown at top of content area |
| `inline` | Contextual alerts within a form or section |
| `toast` | Temporary notifications, auto-dismiss or user-dismiss |

### Selection rules

- Match the alert variant to the severity of the message.
- Use `inline` for form validation errors or section-specific messages.
- Use `toast` for transient notifications (success after save, etc.).
- Default alerts go at the top of a PageSection.

## Card

### Variants

| Variant / Prop | When to use |
|---|---|
| `default` | Standard card with border and background |
| `secondary` | Secondary background color (use for contrast in card grids) |
| `isPlain` | No border or background (for embedding in already-styled containers) |
| `isCompact` | Reduced padding for dense layouts (dashboards, data-heavy views) |
| `isLarge` | Increased padding for hero/feature cards |
| `isFullHeight` | Fill the parent container height (card grids with equal-height cards) |
| expandable | Card with collapsible content (requires CardHeader with expand toggle) |
| selectable | Card that can be selected (checkbox or radio, requires selectableActions) |
| clickable | Entire card is clickable (requires selectableActions with link) |

### Selection rules

- `isCompact` and `isLarge` are mutually exclusive.
- Use `isFullHeight` in grid layouts so cards in a row align.
- For selectable cards, always provide a `selectableActions` config in CardHeader.
- Expandable cards must include `CardExpandableContent`.

## Label

### Variants (color)

| Color | When to use |
|---|---|
| `grey` | Default, neutral information |
| `blue` | Informational, links, tags |
| `green` | Success, active, enabled |
| `orange` | Warning |
| `red` | Danger, error, critical |
| `purple` | Special category, feature flags |
| `teal` / `cyan` | Custom category |
| `gold` | Premium, highlighted |

### Variants (style)

| Style | When to use |
|---|---|
| `filled` | Default — solid background with contrasting text |
| `outline` | Lower emphasis — border only, no fill |

### Selection rules

- Use status-appropriate colors (green for success, red for errors).
- Filled labels for primary status indicators; outline labels for secondary/metadata.
- Labels can be dismissible (with close button) or static.

## Badge

| Variant | When to use |
|---|---|
| `read` | Default state (gray) — no new items |
| `unread` | Active state (blue) — new/unread items, counts requiring attention |

Use badges for numeric counts (notifications, items). For categorical labels, use Label instead.

## Table

### Variants

| Variant / Prop | When to use |
|---|---|
| `default` | Standard table with borders |
| `compact` | Reduced row height for data-dense views |
| `isStriped` | Zebra striping for readability in long tables |
| `isStickyHeader` | Header stays visible on scroll |
| `isBorderless` | Remove cell borders for cleaner look in simple lists |

### Selection rules

- Use `compact` in dashboards or when displaying many rows.
- Use `isStriped` when rows are visually similar and hard to track across columns.
- Use `isStickyHeader` for tables that scroll within their container.

## Tabs

### Variants

| Variant / Prop | When to use |
|---|---|
| `default` | Standard underline-style tabs |
| `isBox` | Box-style tabs (each tab has a visible border) |
| `isFilled` | Tabs stretch to fill available width |
| `isVertical` | Vertical tab list (side navigation pattern) |
| `light300` | Lighter background variant |

### Selection rules

- Use `default` for most navigation patterns.
- Use `isBox` for form sections or when tabs need stronger visual separation.
- Use `isFilled` when the tab bar should span the full container width.

## EmptyState

### Variants (size)

| Variant | When to use |
|---|---|
| `xs` | Small inline empty states (within a card or panel) |
| `sm` | Compact empty states |
| `lg` | Standard page-level empty states |
| `xl` | Full-page first-run or onboarding experiences |
| `full` | Full-height empty state filling the entire content area |

### Status variants

| Status | When to use |
|---|---|
| `danger` | Error states (failed to load, access denied) |
| `warning` | Warning states (degraded service, expiring soon) |
| `success` | Completion states (all done, no issues found) |
| `info` | Informational (no data yet, getting started) |
| `custom` | Non-status empty states |

### Selection rules

- Match the EmptyState size to its container: `xs`/`sm` in cards, `lg`/`xl` for page-level.
- Include an icon, title, description, and at least one action button.
- Use the `full` variant with `isFullHeight` to center the empty state in the available space.

## Modal

### Sizes

| Variant | Width | When to use |
|---|---|---|
| `small` | 35rem | Simple confirmations, short forms |
| `medium` | 52rem | Standard dialogs, moderate forms |
| `large` | 72.5rem | Complex content, wide tables, multi-column layouts |
| `default` | 42rem | General-purpose, most common |

### Selection rules

- Match modal size to content complexity. Don't use `large` for a simple confirmation.
- Always include ModalHeader, ModalBody, and ModalFooter.
- Primary action button goes on the left in ModalFooter; cancel/link on the right.

## Theme Awareness

PatternFly supports multiple themes. When designing in Figma, be aware that token values change across themes:

| Theme | Class | Notes |
|---|---|---|
| Default (light) | `:root` | Standard PatternFly light theme |
| Dark | `.pf-v6-theme-dark` | Dark backgrounds, light text |
| High contrast | `.pf-v6-theme-high-contrast` | Enhanced contrast for accessibility |
| Glass | `.pf-v6-theme-glass` | Semi-transparent backgrounds with blur |
| RedHat | `.pf-v6-theme-redhat` | Red Hat brand accent colors (red instead of blue for accent) |

### Theme-safe design rules

- Always use semantic tokens (not palette colors) so values resolve correctly per theme.
- Test `on-` foreground pairings: `on-brand/accent` resolves differently in RedHat dark vs default.
- RedHat theme changes accent from blue to red and uses pill-shaped radii for controls.
- Glass theme adds semi-transparent backgrounds and blur effects.

If designing for multiple themes, use Figma's variable modes to switch between theme values and verify the design works across all target themes.

---

## Patterns & Extensions Components

The following components come from the **PatternFly 6: Patterns & Extensions** library.

## Chatbot

### Display modes

| Mode | When to use |
|---|---|
| `default` (overlay) | Floating assistant triggered by a button, overlays content |
| `embedded` | Inline chatbot embedded within a PageSection or Card |
| `fullscreen` | Full-page chatbot experience (e.g., dedicated AI assistant view) |
| `docked` | Pinned to the side of the viewport as a Drawer panel |

### Message roles

| Role | Styling |
|---|---|
| `user` | Right-aligned, brand background color |
| `assistant` | Left-aligned, secondary background, may include avatar icon |
| `system` | Centered, subtle styling, informational |

### Selection rules

- Choose display mode based on how prominent the chatbot is in the experience.
- Embedded mode for primary chatbot experiences (dedicated chat pages).
- Overlay/docked for secondary assistant features alongside other content.
- Always include a ChatbotWelcomePrompt for the empty state.

## Login Page

### Variants

| Variant | When to use |
|---|---|
| `simple` | Standard username + password login |
| `with-SSO` | Login with SSO / social login buttons alongside form |
| `with-language` | Login with language selector in footer |
| `full-brand` | Full-width brand illustration on the left panel |
| `centered` | Centered login form without side brand panel (simpler layout) |

### Selection rules

- Use the brand panel variant when the product has a strong visual identity.
- Use the centered variant for internal tools or simpler login experiences.
- Include "Forgot password" and "Sign up" links in the footer when applicable.
- Ensure form fields have visible labels (not placeholder-only).

## Error State Pages

### Variants

| Pattern | Status | When to use |
|---|---|---|
| Generic error | `danger` | Server errors (500), unexpected failures |
| Not found | `custom` | Invalid URL, missing resource (404) |
| Access denied | `custom` | Insufficient permissions (403) |

### Selection rules

- Use the pre-composed error page patterns rather than building custom EmptyStates.
- Match the icon and title to the error type.
- Always include a primary action button to navigate the user out of the error state.
- For errors within a page section (not full-page), use inline EmptyState from the core library instead.

## Catalog Tile

### Variants

| Variant | When to use |
|---|---|
| `default` | Standard catalog item with icon, title, description |
| `with-badge` | Catalog item with category or status badge |
| `featured` | Highlighted or recommended item (may have accent border or background) |

### Selection rules

- Use consistent tile variants within a single catalog view.
- Include icon/logo, title, and a brief description at minimum.
- Use badges or labels to indicate categories, status, or "new" items.

## QuickStart

### States

| State | Visual treatment |
|---|---|
| `not-started` | Step indicators are empty/unfilled |
| `in-progress` | Current step highlighted, previous steps filled |
| `completed` | All step indicators filled, success message |

### Selection rules

- QuickStart panels appear as a Drawer — follow Drawer hierarchy rules.
- Show step progress in the header.
- Each step should have clear, concise instructions with optional verification.
