# Navigation and Toolbar Components

Detailed reference for Nav, Tabs, and Toolbar.

## Table of Contents
- [Nav](#nav)
- [Tabs](#tabs)
- [Toolbar](#toolbar)

## Nav

Navigation component for sidebar or horizontal navigation.

### Hierarchy

```
Nav (context provider)
└── NavList (REQUIRED — provides ul and scroll management)
    ├── NavItem (link or button)
    ├── NavExpandable (collapsible group, requires title)
    │   └── NavItem (nested items)
    └── NavGroup (titled section — creates its own NavList internally)
        └── NavItem
```

### Key Props

**Nav:**
| Prop | Purpose |
|------|---------|
| `onSelect` | Selection callback (selectedItem, event) |
| `onToggle` | Expandable toggle callback |
| `aria-label` | Required accessible name |
| `variant` | 'default' \| 'horizontal' \| 'horizontal-subnav' |

**NavItem:**
| Prop | Purpose |
|------|---------|
| `to` | Link destination |
| `isActive` | Active state |
| `itemId` | Item identifier for onSelect |
| `preventDefault` | Prevent default link navigation |
| `flyout` | Menu component for flyout |
| `component` | Custom component (e.g., React Router Link) |

**NavExpandable:**
| Prop | Purpose |
|------|---------|
| `title` | Required display text |
| `groupId` | Group identifier |
| `isExpanded` | Expansion state |
| `isActive` | Whether group contains active item |

**NavGroup:**
| Prop | Purpose |
|------|---------|
| `title` | Required section title |

### Patterns

**Simple navigation:**
```tsx
<Nav onSelect={({ itemId }) => setActive(itemId)} aria-label="Main nav">
  <NavList>
    <NavItem itemId="dashboard" isActive={active === 'dashboard'} to="/dashboard">
      Dashboard
    </NavItem>
    <NavItem itemId="users" isActive={active === 'users'} to="/users">
      Users
    </NavItem>
  </NavList>
</Nav>
```

**With expandable sections:**
```tsx
<Nav onSelect={onSelect} onToggle={onToggle} aria-label="Nav with groups">
  <NavList>
    <NavExpandable title="Admin" groupId="admin" isExpanded={expanded.admin}>
      <NavItem groupId="admin" itemId="users" isActive={active === 'users'}>Users</NavItem>
      <NavItem groupId="admin" itemId="roles" isActive={active === 'roles'}>Roles</NavItem>
    </NavExpandable>
    <NavExpandable title="Settings" groupId="settings" isExpanded={expanded.settings}>
      <NavItem groupId="settings" itemId="general">General</NavItem>
    </NavExpandable>
  </NavList>
</Nav>
```

**Grouped navigation:**
```tsx
<Nav onSelect={onSelect} aria-label="Grouped nav">
  <NavGroup title="System">
    <NavItem itemId="overview">Overview</NavItem>
    <NavItem itemId="performance">Performance</NavItem>
  </NavGroup>
  <NavGroup title="User">
    <NavItem itemId="profile">Profile</NavItem>
  </NavGroup>
</Nav>
```

### Critical Rules

1. **NavList is required** — items directly under Nav won't work
2. **NavGroup creates its own NavList** — don't nest NavList inside NavGroup
3. **NavItem cannot have both `to` and `flyout`** — will cause console errors
4. **NavExpandable requires `title`** — won't render properly without it

### Anti-pattern: NavItem directly under Nav

```tsx
// Wrong
<Nav aria-label="Main">
  <NavItem to="/">Home</NavItem>
</Nav>

// Correct
<Nav aria-label="Main">
  <NavList>
    <NavItem to="/">Home</NavItem>
  </NavList>
</Nav>
```

### Anti-pattern: extra NavList inside NavGroup

`NavGroup` renders its own list wrapper — wrapping its children again breaks structure.

```tsx
// Wrong
<NavGroup title="Section">
  <NavList>
    <NavItem>Item</NavItem>
  </NavList>
</NavGroup>

// Correct
<NavGroup title="Section">
  <NavItem>Item</NavItem>
</NavGroup>
```

## Tabs

Tabbed content component.

### Hierarchy

```
Tabs (requires activeKey or defaultActiveKey)
└── Tab (uses title prop for label, children for panel content)
    └── [panel content as children]
```

### Key Props

**Tabs:**
| Prop | Purpose |
|------|---------|
| `activeKey` | Controlled active tab (use with onSelect) |
| `defaultActiveKey` | Uncontrolled initial active tab |
| `onSelect` | Tab selection callback |
| `isBox` | Box styling |
| `isFilled` | Fill available width |
| `isVertical` | Vertical orientation |
| `variant` | 'default' \| 'light300' |
| `mountOnEnter` | Only mount tab content when first selected |
| `unmountOnExit` | Unmount tab content when deselected |
| `aria-label` | Required for accessibility |

**Tab:**
| Prop | Purpose |
|------|---------|
| `eventKey` | Required unique identifier |
| `title` | Tab label (ReactNode — use TabTitleText/TabTitleIcon) |
| `isDisabled` | Disable tab |
| `isAriaDisabled` | Accessible disabled state |
| `href` | Render tab as link |
| `actions` | Tab action elements (close button, etc.) |

### Title Composition

Tab labels use `title` prop with these helper components:

```tsx
// Text only
<Tab eventKey={0} title={<TabTitleText>Users</TabTitleText>}>

// Icon + text
<Tab eventKey={1} title={
  <>
    <TabTitleIcon><UsersIcon /></TabTitleIcon>
    <TabTitleText>Users</TabTitleText>
  </>
}>

// Just icon
<Tab eventKey={2} title={<TabTitleIcon><CogIcon /></TabTitleIcon>}>
```

### Controlled Tabs

```tsx
const [activeTab, setActiveTab] = useState(0);

<Tabs activeKey={activeTab} onSelect={(e, key) => setActiveTab(key)} aria-label="Settings tabs">
  <Tab eventKey={0} title={<TabTitleText>General</TabTitleText>}>
    General settings content
  </Tab>
  <Tab eventKey={1} title={<TabTitleText>Security</TabTitleText>}>
    Security settings content
  </Tab>
  <Tab eventKey={2} title={<TabTitleText>Notifications</TabTitleText>}>
    Notification preferences content
  </Tab>
</Tabs>
```

### Uncontrolled Tabs

```tsx
<Tabs defaultActiveKey={0} aria-label="Simple tabs">
  <Tab eventKey={0} title={<TabTitleText>Tab 1</TabTitleText>}>Content 1</Tab>
  <Tab eventKey={1} title={<TabTitleText>Tab 2</TabTitleText>}>Content 2</Tab>
</Tabs>
```

### TabContent (External)

For cases where tab content needs to live outside the Tabs component:

```tsx
<Tabs activeKey={activeTab} onSelect={(e, key) => setActiveTab(key)}>
  <Tab eventKey={0} title={<TabTitleText>Tab 1</TabTitleText>} tabContentRef={tab1Ref} />
  <Tab eventKey={1} title={<TabTitleText>Tab 2</TabTitleText>} tabContentRef={tab2Ref} />
</Tabs>
<TabContent eventKey={0} ref={tab1Ref} hidden={activeTab !== 0}>Content 1</TabContent>
<TabContent eventKey={1} ref={tab2Ref} hidden={activeTab !== 1}>Content 2</TabContent>
```

### Critical Rules

1. **Tab labels go in `title` prop**, not as children — children become the panel content
2. **Tabs should only contain Tab** components as direct children
3. **Each Tab needs a unique `eventKey`**
4. Don't use both `activeKey` and `defaultActiveKey`
5. Use `TabTitleText` and `TabTitleIcon` for proper styling of tab labels

### Anti-pattern: tab label as child instead of `title`

Children of **`Tab`** are the **panel body**, not the visible tab label.

```tsx
// Wrong — "Users" becomes panel content, not the tab text
<Tabs activeKey={key} onSelect={onSelect} aria-label="Example">
  <Tab eventKey={0}>Users</Tab>
</Tabs>

// Correct
<Tabs activeKey={key} onSelect={onSelect} aria-label="Example">
  <Tab eventKey={0} title={<TabTitleText>Users</TabTitleText>}>
    Users panel content here
  </Tab>
</Tabs>
```

## Toolbar

Action bar component for filters, bulk actions, and pagination.

### Hierarchy

```
Toolbar
└── ToolbarContent (REQUIRED — layout structure + context)
    ├── ToolbarGroup (optional grouping with variant)
    │   └── ToolbarItem (REQUIRED around each control)
    ├── ToolbarItem (direct child also OK)
    ├── ToolbarToggleGroup (responsive collapsible section)
    │   ├── ToolbarItem
    │   └── ToolbarGroup
    │       └── ToolbarFilter (filter with label management)
    └── ToolbarItem variant="pagination"
```

### Key Props

**Toolbar:**
| Prop | Purpose |
|------|---------|
| `clearAllFilters` | Callback for "clear all" button |
| `clearFiltersButtonText` | Custom clear button text |
| `collapseListedFiltersBreakpoint` | When to collapse filter labels |
| `isExpanded` | Consumer-managed toggle state |
| `toggleIsExpanded` | Consumer-managed toggle callback |

**ToolbarContent:**
| Prop | Purpose |
|------|---------|
| `visibility` | Breakpoint visibility control |
| `alignItems` | Alignment: 'center' \| 'start' \| 'baseline' |

**ToolbarGroup:**
| Prop | Purpose |
|------|---------|
| `variant` | 'filter-group' \| 'action-group' \| 'action-group-inline' \| 'action-group-plain' \| 'label-group' |
| `visibility` | Breakpoint visibility |
| `align` | Breakpoint alignment |

**ToolbarItem:**
| Prop | Purpose |
|------|---------|
| `variant` | 'separator' \| 'pagination' \| 'label' \| 'label-group' \| 'expand-all' |
| `visibility` | Breakpoint visibility |
| `align` | Breakpoint alignment |

**ToolbarFilter:**
| Prop | Purpose |
|------|---------|
| `labels` | Active filter labels |
| `deleteLabel` | Remove single label callback |
| `deleteAllLabels` | Remove all labels in category |
| `categoryName` | Label group category name |

**ToolbarToggleGroup:**
| Prop | Purpose |
|------|---------|
| `toggleIcon` | Icon shown when collapsed |
| `breakpoint` | When to collapse: 'md' \| 'lg' \| 'xl' \| '2xl' |

### Context System

**ToolbarContext** (Toolbar level): manages `isExpanded`, filter counts, clear all filters, toolbar ID

**ToolbarContentContext** (ToolbarContent level): manages expandable content refs, label container refs

### Patterns

**Simple action toolbar:**
```tsx
<Toolbar>
  <ToolbarContent>
    <ToolbarItem>
      <Button variant="primary">Create</Button>
    </ToolbarItem>
    <ToolbarItem>
      <Button variant="secondary">Edit</Button>
    </ToolbarItem>
    <ToolbarItem variant="separator" />
    <ToolbarItem>
      <Button variant="plain" icon={<TrashIcon />} />
    </ToolbarItem>
  </ToolbarContent>
</Toolbar>
```

**Toolbar with filters:**
```tsx
<Toolbar clearAllFilters={clearAll} collapseListedFiltersBreakpoint="xl">
  <ToolbarContent>
    <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
      <ToolbarItem>
        <SearchInput value={search} onChange={setSearch} />
      </ToolbarItem>
      <ToolbarGroup variant="filter-group">
        <ToolbarFilter
          labels={statusFilters}
          deleteLabel={(cat, label) => removeFilter('status', label)}
          categoryName="Status"
        >
          <Select>...</Select>
        </ToolbarFilter>
      </ToolbarGroup>
    </ToolbarToggleGroup>
    <ToolbarItem variant="pagination" align={{ default: 'alignEnd' }}>
      <Pagination count={100} />
    </ToolbarItem>
  </ToolbarContent>
</Toolbar>
```

**Grouped actions:**
```tsx
<Toolbar>
  <ToolbarContent>
    <ToolbarGroup variant="action-group">
      <ToolbarItem><Button>Action 1</Button></ToolbarItem>
      <ToolbarItem><Button>Action 2</Button></ToolbarItem>
    </ToolbarGroup>
    <ToolbarGroup variant="action-group-plain">
      <ToolbarItem><Button variant="plain" icon={<EditIcon />} /></ToolbarItem>
      <ToolbarItem><Button variant="plain" icon={<CloneIcon />} /></ToolbarItem>
    </ToolbarGroup>
  </ToolbarContent>
</Toolbar>
```

### Critical Rules

1. **ToolbarContent is never optional** — it provides the layout structure and context
2. **ToolbarItem wraps every control** — provides proper spacing between items
3. **ToolbarFilter wraps filter controls** only when you need applied-filter labels below the toolbar
4. **ToolbarToggleGroup** is only needed for responsive collapse behavior — simple toolbars don't need it

### Anti-pattern: controls directly in Toolbar or ToolbarContent

`ToolbarContent` establishes layout context; **`ToolbarItem`** applies spacing around each control.

```tsx
// Wrong
<Toolbar>
  <Button>Action</Button>
  <SearchInput />
</Toolbar>

// Also wrong — missing ToolbarItem inside ToolbarContent
<Toolbar>
  <ToolbarContent>
    <Button>Action</Button>
  </ToolbarContent>
</Toolbar>

// Correct
<Toolbar>
  <ToolbarContent>
    <ToolbarItem><Button>Action</Button></ToolbarItem>
    <ToolbarItem><SearchInput /></ToolbarItem>
  </ToolbarContent>
</Toolbar>
```
