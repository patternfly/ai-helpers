# Container Components

Detailed reference for Card, Modal, Drawer, EmptyState, and Sidebar.

## Table of Contents
- [Card](#card)
- [Modal](#modal)
- [Drawer](#drawer)
- [EmptyState](#emptystate)
- [Sidebar](#sidebar)

## Card

### Hierarchy

```
Card
├── CardHeader (optional — for title with actions or expand toggle)
│   └── CardTitle (title text, can also use subtitle prop)
├── CardBody (content — provides padding, supports isFilled)
├── CardFooter (bottom section)
└── CardExpandableContent (expandable only)
    ├── CardBody
    └── CardFooter
```

### Key Props

**Card:**
| Prop | Purpose |
|------|---------|
| `isExpanded` | Controls expandable content visibility |
| `isSelectable` | Makes card selectable (needs CardHeader.selectableActions) |
| `isClickable` | Makes card clickable (needs CardHeader.selectableActions) |
| `isCompact` | Compact styling |
| `isLarge` | Large styling (conflicts with isCompact) |
| `isFullHeight` | Fill container height |
| `isPlain` | Remove border and background |
| `variant` | 'default' or 'secondary' |

**CardHeader:**
| Prop | Purpose |
|------|---------|
| `onExpand` | Expand toggle callback (required for expandable) |
| `actions` | Custom action elements |
| `selectableActions` | Checkbox/radio/click configuration |
| `isToggleRightAligned` | Move expand toggle to right |

**CardBody:**
| Prop | Purpose |
|------|---------|
| `isFilled` | Fill available height (default: true) |
| `component` | HTML element to render as |

### Expandable Card Pattern

```tsx
<Card id="card-1" isExpanded={isExpanded}>
  <CardHeader onExpand={(e, id) => setExpanded(!isExpanded)}>
    <CardTitle>Expandable Card</CardTitle>
  </CardHeader>
  <CardExpandableContent>
    <CardBody>This content toggles</CardBody>
    <CardFooter>Footer in expanded area</CardFooter>
  </CardExpandableContent>
</Card>
```

### Selectable Card Pattern

```tsx
<Card id="card-1" isSelectable isSelected={selected}>
  <CardHeader
    selectableActions={{
      selectableActionId: 'check-1',
      selectableActionAriaLabelledby: 'card-1',
      onChange: (e, checked) => setSelected(checked),
    }}
  >
    <CardTitle>Selectable Card</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

### Context

Card uses `CardContext` to pass `cardId`, `isExpanded`, `isClickable`, `isSelectable`, `isSelected`, `isClicked`, `isDisabled` to children. `CardExpandableContent` reads `isExpanded` from context to show/hide.

### Anti-pattern: body content not in CardBody

`CardBody` supplies padding and fill behavior. Raw nodes inside **`Card`** sit flush to the border unless you use **`CardHeader`** / **`CardBody`** / **`CardFooter`** (or expandable content) intentionally.

```tsx
// Wrong
<Card>
  <p>Description text with no padding wrapper</p>
</Card>

// Correct
<Card>
  <CardBody>
    <p>Description text with no padding wrapper</p>
  </CardBody>
</Card>
```

## Modal

### Hierarchy

```
Modal (creates portal + backdrop + focus trap)
├── ModalHeader (title + optional description)
├── ModalBody (scrollable content)
└── ModalFooter (action buttons)
```

### Key Props

**Modal:**
| Prop | Purpose |
|------|---------|
| `isOpen` | Show/hide modal |
| `onClose` | Close callback — required for X button to render |
| `aria-labelledby` | References ModalHeader labelId |
| `aria-label` | Alternative to aria-labelledby |
| `aria-describedby` | References ModalBody id |
| `variant` | 'default' \| 'small' \| 'medium' \| 'large' |
| `appendTo` | Portal target element |

**ModalHeader:**
| Prop | Purpose |
|------|---------|
| `title` | Modal title text |
| `labelId` | ID for aria-labelledby reference |
| `description` | Optional description text |
| `descriptorId` | ID for aria-describedby reference |

### Accessibility Requirements

- Must provide either `aria-label` on Modal OR `labelId` on ModalHeader with matching `aria-labelledby` on Modal
- `ModalBody` should have an `id` if referenced by `aria-describedby`

### Example

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setOpen(false)}
  aria-labelledby="modal-title"
  aria-describedby="modal-body"
>
  <ModalHeader title="Confirm Action" labelId="modal-title" />
  <ModalBody id="modal-body">Are you sure?</ModalBody>
  <ModalFooter>
    <Button onClick={confirm}>Confirm</Button>
    <Button variant="link" onClick={() => setOpen(false)}>Cancel</Button>
  </ModalFooter>
</Modal>
```

### Anti-pattern: incomplete Modal structure

Skipping **`ModalHeader`**, **`ModalBody`**, or **`ModalFooter`** breaks the intended scroll regions and footer alignment. Omitting **`aria-labelledby`** / **`aria-label`** fails accessibility expectations.

```tsx
// Wrong — arbitrary children, no regions / labeling
<Modal isOpen={open} onClose={close}>
  <div>Are you sure?</div>
  <Button onClick={close}>OK</Button>
</Modal>

// Correct — see [Example](#example) above for full pattern with aria-labelledby
```

## Drawer

### Hierarchy

```
Drawer (context provider)
└── DrawerContent panelContent={<DrawerPanelContent />}
    └── DrawerContentBody (main content, provides padding)

DrawerPanelContent (passed as prop)
├── DrawerHead (panel header)
│   ├── [title content]
│   └── DrawerActions
│       └── DrawerCloseButton
├── DrawerPanelDescription (optional)
└── DrawerPanelBody (panel content, provides padding)
```

### Key Props

**Drawer:**
| Prop | Purpose |
|------|---------|
| `isExpanded` | Panel visibility |
| `isInline` | Inline mode (no overlay) |
| `position` | 'start' \| 'end' \| 'bottom' |
| `onExpand` | Callback when panel expands |

**DrawerPanelContent:**
| Prop | Purpose |
|------|---------|
| `isResizable` | Enable resize handle |
| `minSize` | Minimum panel size |
| `defaultSize` | Default panel size |
| `maxSize` | Maximum panel size |
| `focusTrap` | Focus trap configuration |

**DrawerContentBody / DrawerPanelBody:**
| Prop | Purpose |
|------|---------|
| `hasPadding` | Enable padding |

### Critical pattern and anti-patterns

`panelContent` is a **prop** on `DrawerContent`, not a child. Main column content belongs in **`DrawerContentBody`**.

#### Anti-pattern: panel as child, main column without DrawerContentBody

```tsx
// Wrong — panel nested as child; main area not wrapped
<Drawer isExpanded={expanded}>
  <DrawerContent>
    <div>Main content</div>
    <DrawerPanelContent>
      <DrawerHead>
        Title
        <DrawerActions><DrawerCloseButton onClick={close} /></DrawerActions>
      </DrawerHead>
      <DrawerPanelBody>Panel</DrawerPanelBody>
    </DrawerPanelContent>
  </DrawerContent>
</Drawer>

// Correct — panelContent prop; main column in DrawerContentBody
<Drawer isExpanded={expanded}>
  <DrawerContent
    panelContent={
      <DrawerPanelContent>
        <DrawerHead>
          Title
          <DrawerActions><DrawerCloseButton onClick={close} /></DrawerActions>
        </DrawerHead>
        <DrawerPanelBody>Panel</DrawerPanelBody>
      </DrawerPanelContent>
    }
  >
    <DrawerContentBody>Main content</DrawerContentBody>
  </DrawerContent>
</Drawer>
```

#### Example: `onExpand` and `DrawerPanelBody` padding

```tsx
<Drawer isExpanded={expanded} onExpand={onExpand}>
  <DrawerContent
    panelContent={
      <DrawerPanelContent>
        <DrawerHead>
          <span>Panel Title</span>
          <DrawerActions>
            <DrawerCloseButton onClick={() => setExpanded(false)} />
          </DrawerActions>
        </DrawerHead>
        <DrawerPanelBody hasNoPadding>Panel content</DrawerPanelBody>
      </DrawerPanelContent>
    }
  >
    <DrawerContentBody>Main page content</DrawerContentBody>
  </DrawerContent>
</Drawer>
```

## EmptyState

### Hierarchy

```
EmptyState (can accept titleText + icon as props, OR use children)
├── EmptyStateHeader
│   └── EmptyStateIcon (icon wrapper)
├── EmptyStateBody (description text)
└── EmptyStateFooter
    └── EmptyStateActions (button groups)
```

### Key Props

**EmptyState:**
| Prop | Purpose |
|------|---------|
| `titleText` | Title (alternative to EmptyStateHeader child) |
| `icon` | Icon component (alternative to EmptyStateIcon) |
| `headingLevel` | h1-h6 (defaults to h1) |
| `status` | 'danger' \| 'warning' \| 'success' \| 'info' \| 'custom' |
| `variant` | 'xs' \| 'sm' \| 'lg' \| 'xl' \| 'full' |
| `isFullHeight` | Fill container height |

### Two Approaches

**Props approach (simpler):**
```tsx
<EmptyState titleText="No results found" icon={SearchIcon} headingLevel="h2">
  <EmptyStateBody>Try adjusting your filters.</EmptyStateBody>
  <EmptyStateFooter>
    <EmptyStateActions>
      <Button>Clear filters</Button>
    </EmptyStateActions>
  </EmptyStateFooter>
</EmptyState>
```

**Children approach (more control):**
```tsx
<EmptyState>
  <EmptyStateHeader>
    <EmptyStateIcon icon={SearchIcon} />
    No results found
  </EmptyStateHeader>
  <EmptyStateBody>Try adjusting your filters.</EmptyStateBody>
  <EmptyStateFooter>
    <EmptyStateActions>
      <Button>Clear filters</Button>
    </EmptyStateActions>
  </EmptyStateFooter>
</EmptyState>
```

Don't mix both approaches — pick one.

### Anti-pattern: EmptyStateIcon outside EmptyStateHeader

The icon must sit under **`EmptyStateHeader`** so spacing and status styling apply.

```tsx
// Wrong
<EmptyState>
  <EmptyStateIcon icon={SearchIcon} />
  <EmptyStateBody>No results</EmptyStateBody>
</EmptyState>

// Correct (children approach)
<EmptyState>
  <EmptyStateHeader>
    <EmptyStateIcon icon={SearchIcon} />
    No results
  </EmptyStateHeader>
  <EmptyStateBody>Try different filters.</EmptyStateBody>
</EmptyState>
```

### Anti-pattern: mixing shortcut props with explicit header tree

```tsx
// Wrong — titleText + icon props alongside EmptyStateHeader children
<EmptyState titleText="Oops" icon={SearchIcon}>
  <EmptyStateHeader>Custom title</EmptyStateHeader>
</EmptyState>

// Correct — pick props OR explicit header (see [Two Approaches](#two-approaches) above)
```

## Sidebar

Generic layout component (not PageSidebar).

### Hierarchy

```
Sidebar
├── SidebarPanel (side content)
└── SidebarContent (main content)
```

### Key Props

**Sidebar:**
| Prop | Purpose |
|------|---------|
| `orientation` | 'stack' (vertical) \| 'split' (side-by-side) |
| `isPanelRight` | Panel on right side |
| `hasGutter` | Gap between panel and content |
| `hasBorder` | Border between panel and content (split only) |
| `hasNoBackground` | Remove background from both |

**SidebarPanel:**
| Prop | Purpose |
|------|---------|
| `variant` | 'default' \| 'sticky' \| 'static' |
| `width` | Breakpoint object: `{ md: 'width_25', lg: 'width_33' }` |
| `hasPadding` | Enable padding |

**SidebarContent:**
| Prop | Purpose |
|------|---------|
| `hasPadding` | Enable padding |
| `hasNoBackground` | Remove background |

### Example

```tsx
<Sidebar orientation="split" isPanelRight={false} hasGutter hasBorder>
  <SidebarPanel variant="sticky" width={{ md: 'width_25' }} hasPadding>
    Filter panel
  </SidebarPanel>
  <SidebarContent hasPadding>
    Main content area
  </SidebarContent>
</Sidebar>
```

### Anti-pattern: only one branch of Sidebar

Use **`SidebarPanel`** and **`SidebarContent`** together — omitting either breaks the split layout.

```tsx
// Wrong — content only, no panel structure
<Sidebar orientation="split">
  <div>Filters</div>
  <div>Results</div>
</Sidebar>

// Correct — use SidebarPanel + SidebarContent as in the full example in this section
```