# PatternFly Component Hierarchy for Figma — Deep Dive Reference

> **When to read this file:** Only when building Modal, Drawer, EmptyState, Table, DataList, DescriptionList, Tabs, Chatbot, Login, Catalog, or QuickStarts. The core hierarchy rules for Page, Card, Toolbar, and Nav are already inlined in SKILL.md — do not re-read those here.

## Modal

```
Modal (overlay frame with backdrop)
├── ModalHeader (title + close button)
├── ModalBody (scrollable content area)
└── ModalFooter (action buttons)
```

### Rules

- Always include all three regions: **ModalHeader**, **ModalBody**, **ModalFooter**.
- ModalHeader should contain a title and optionally a close button.
- ModalBody provides the scrollable content region.
- ModalFooter holds action buttons (primary action on the left, cancel/link on the right).
- Do not place arbitrary content directly in Modal without using the three region wrappers.

## Drawer

```
Drawer (horizontal auto-layout)
├── DrawerContent (main content area, FILL width)
│   └── DrawerContentBody (provides padding)
└── DrawerPanelContent (side panel, fixed or resizable width)
    ├── DrawerHead (panel header)
    │   ├── [title]
    │   └── DrawerActions
    │       └── DrawerCloseButton
    └── DrawerPanelBody (panel content, provides padding)
```

### Rules

- **DrawerPanelContent** is a sibling of DrawerContent, not nested inside it.
- Main content goes in **DrawerContentBody** inside DrawerContent.
- Panel header uses **DrawerHead** with **DrawerActions** containing the close button.
- Panel body content goes in **DrawerPanelBody**.

## EmptyState

```
EmptyState (centered vertical auto-layout)
├── EmptyStateHeader (icon + title)
│   └── EmptyStateIcon
├── EmptyStateBody (description text)
└── EmptyStateFooter
    └── EmptyStateActions (buttons)
```

### Rules

- **EmptyStateIcon** belongs inside **EmptyStateHeader**, not directly in EmptyState.
- Include both a title and a description for clarity.
- Primary action goes in **EmptyStateActions** inside **EmptyStateFooter**.

## Table

```
Table (vertical auto-layout)
├── Thead (header section)
│   └── Tr (header row)
│       └── Th (header cells)
└── Tbody (body section, can have multiple)
    └── Tr (data row)
        └── Td (data cells)
```

### Rules

- **Tr** must be inside **Thead** or **Tbody**, never directly in Table.
- **Th** cells belong in Thead rows; **Td** cells belong in Tbody rows.
- For expandable rows, the expanded content row is a sibling Tr in the same Tbody.

## DataList

```
DataList (vertical auto-layout)
└── DataListItem
    ├── DataListItemRow (always-visible row)
    │   ├── DataListControl (toggles, checkboxes)
    │   ├── DataListItemCells (content cells)
    │   └── DataListAction (action buttons)
    └── DataListContent (expandable, sibling of DataListItemRow)
```

### Rules

- **DataListContent** (expandable) is a sibling of **DataListItemRow**, not nested inside it.
- Each item must have a **DataListItemRow** with **DataListItemCells**.

## DescriptionList

```
DescriptionList (grid or vertical auto-layout)
└── DescriptionListGroup (REQUIRED for each key-value pair)
    ├── DescriptionListTerm (label)
    └── DescriptionListDescription (value)
```

### Rules

- Every term-description pair must be wrapped in a **DescriptionListGroup**. Never place terms or descriptions directly in DescriptionList.

## Tabs

```
Tabs (horizontal auto-layout for tab bar + content below)
├── Tab bar (horizontal auto-layout)
│   └── Tab (individual tab labels)
└── Tab panel (content for active tab)
```

### Rules

- Tab labels are distinct from tab panel content. Each Tab has a label (shown in the tab bar) and content (shown below when active).
- Only the active tab's panel content is visible.

## Sidebar (Generic Layout)

Not to be confused with PageSidebar — this is a general-purpose split layout.

```
Sidebar (horizontal auto-layout)
├── SidebarPanel (fixed or percentage width)
└── SidebarContent (FILL width)
```

### Rules

- Always include both **SidebarPanel** and **SidebarContent**. Omitting either breaks the split layout.

---

# Patterns & Extensions Library

The following components come from the **PatternFly 6: Patterns & Extensions** library. They are higher-level, pre-composed patterns built on top of the core components above.

## Chatbot

```
Chatbot (vertical auto-layout, fixed or responsive dimensions)
├── ChatbotContent (vertical auto-layout, FILL height)
│   ├── ChatbotWelcomePrompt (centered, shown when no messages)
│   └── MessageBox (vertical auto-layout, scrollable)
│       └── Message (per-message frame, role-based styling)
└── ChatbotFooter (horizontal auto-layout, bottom-pinned)
    └── MessageBar (input field + send button)
```

### Rules

- **Chatbot** is the outermost container. It can be embedded in a PageSection, Modal, or Drawer.
- **ChatbotContent** holds the message area and occupies the scrollable region.
- **ChatbotWelcomePrompt** is shown when the conversation is empty (title + description + optional prompt suggestions).
- **MessageBox** contains all **Message** instances, scrolling vertically.
- **Message** frames are styled by role: `user` messages align right, `assistant` messages align left.
- **ChatbotFooter** is always at the bottom, containing the **MessageBar** input.
- Do not place messages directly in Chatbot — they must be inside MessageBox inside ChatbotContent.

## Login Page

```
LoginPage (full-viewport frame, horizontal auto-layout)
├── LoginBrandArea (left/top — brand image or illustration)
└── LoginFormArea (right/bottom — form panel)
    ├── LoginHeader (logo + title)
    ├── LoginForm (vertical auto-layout)
    │   ├── FormGroup (username)
    │   ├── FormGroup (password)
    │   └── Button (submit, primary variant)
    └── LoginFooter (links: forgot password, SSO, language)
```

### Rules

- The Login page is a standalone full-page pattern — it does not use the standard Page > Masthead > PageSection shell.
- **LoginBrandArea** and **LoginFormArea** sit side-by-side on desktop and stack on mobile.
- The form panel should use standard PatternFly form components (FormGroup, TextInput, Button).
- Include accessible labels on all form fields.

## Error State Pages

```
ErrorStatePage (centered EmptyState, full-page)
├── EmptyStateHeader (icon + error title)
├── EmptyStateBody (description text)
└── EmptyStateFooter
    └── EmptyStateActions (navigation buttons)
```

Pre-composed variants:

| Pattern | Icon | Title | Primary action |
|---|---|---|---|
| Generic error | ExclamationCircleIcon (danger) | "Something went wrong" | "Return to homepage" |
| Not found (404) | PathMissingIcon | "Page not found" | "Return to homepage" |
| Access denied (403) | LockIcon | "Access denied" | "Return to homepage" |

### Rules

- Error pages use the **EmptyState** component with `status` and `variant` set appropriately.
- They are typically full-page (`variant="full"`, `isFullHeight`) with no Masthead or sidebar.
- Use the danger status for server errors, and custom/default for 404 and 403.
- Always provide a primary action to help the user navigate away.

## Catalog

```
CatalogPage (inside standard app shell)
├── Toolbar (filters, search, view toggle)
├── CatalogGrid (auto-layout with wrap)
│   └── CatalogTile (Card-based, repeated)
│       ├── CardHeader (icon + title)
│       ├── CardBody (description, tags)
│       └── CardFooter (action link)
```

### Rules

- Catalog uses the standard application shell (Page > Masthead > PageSection).
- The catalog content area lives inside a PageSection.
- **CatalogTile** is typically a Card with specific content structure. Import from the Patterns & Extensions library if a pre-built tile component exists.
- Include a Toolbar above the grid for search, category filters, and grid/list view toggle.
- Grid layout uses auto-layout with wrap and gap bound to PF spacer variables.

## QuickStarts

QuickStarts are guided tutorial overlays. They appear as a Drawer panel alongside the main application content.

```
QuickStartDrawer (Drawer pattern)
├── DrawerContent (main app content continues underneath)
│   └── DrawerContentBody
└── DrawerPanelContent (QuickStart panel)
    ├── QuickStartHeader (title, close button, progress indicator)
    ├── QuickStartBody (step instructions, prerequisites)
    └── QuickStartFooter (next/back navigation)
```

### Rules

- QuickStarts use the **Drawer** component from the core library — the Patterns & Extensions library provides the content structure.
- The QuickStart panel slides in from the right.
- Each step has a title, description, and optionally a verification check.
- Progress is shown via a step indicator in the header.

## Multi-Content Card (Component Groups)

An extended Card pattern for richer content displays.

```
MultiContentCard (Card base)
├── CardHeader (toggle bar for content switching)
├── CardBody (switchable content panels)
│   ├── Content panel 1
│   ├── Content panel 2
│   └── ...
└── CardFooter (optional)
```

### Rules

- Based on the standard Card hierarchy — all Card rules apply.
- The header contains a toggle mechanism (tabs or segmented control) to switch between content panels.
- Only one content panel is visible at a time.
