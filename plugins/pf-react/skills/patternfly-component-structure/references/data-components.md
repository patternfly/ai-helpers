# Data Display Components

Detailed reference for Table, DataList, and DescriptionList.

## Table of Contents
- [Table](#table)
- [DataList](#datalist)
- [DescriptionList](#descriptionlist)

## Table

PatternFly uses a composable table approach with semantic HTML elements.

**Package:** `@patternfly/react-table`

### Hierarchy

```
Table
├── Caption (optional, must be first child)
├── Thead
│   └── Tr
│       └── Th (header cells — require accessible names)
└── Tbody (can have multiple)
    └── Tr
        └── Td (data cells)
            └── ExpandableRowContent (for expandable rows)
```

### Key Props

**Table:**
| Prop | Purpose |
|------|---------|
| `aria-label` | Accessible table name |
| `variant` | 'compact' for dense tables |
| `isStickyHeader` | Sticky header row |
| `gridBreakpoint` | Breakpoint for grid mode on mobile |
| `isStriped` | Zebra striping |
| `isExpandable` | Enable row expansion |
| `isTreeTable` | Enable tree table structure |

**Th:**
| Prop | Purpose |
|------|---------|
| `sort` | Sort configuration object |
| `select` | Select-all configuration |
| `width` | Column width (10, 15, 20, 25, 30, ..., 100) |
| `screenReaderText` | Accessible name when no visible text |

**Td:**
| Prop | Purpose |
|------|---------|
| `dataLabel` | Column name for mobile responsive view |
| `select` | Row selection configuration |
| `expand` | Row expansion configuration |
| `actions` | Row action items |
| `compoundExpand` | Compound expansion configuration |
| `colSpan` | Column span (for expandable content rows) |

### Basic Table

```tsx
<Table aria-label="Users table">
  <Thead>
    <Tr>
      <Th>Name</Th>
      <Th>Email</Th>
      <Th>Role</Th>
    </Tr>
  </Thead>
  <Tbody>
    {users.map(user => (
      <Tr key={user.id}>
        <Td dataLabel="Name">{user.name}</Td>
        <Td dataLabel="Email">{user.email}</Td>
        <Td dataLabel="Role">{user.role}</Td>
      </Tr>
    ))}
  </Tbody>
</Table>
```

### Expandable Row Pattern

```tsx
<Table aria-label="Expandable table">
  <Thead>
    <Tr>
      <Th screenReaderText="Row expansion" />
      <Th>Name</Th>
      <Th>Details</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td expand={{ rowIndex: 0, isExpanded, onToggle: () => setExpanded(!isExpanded) }} />
      <Td dataLabel="Name">Item 1</Td>
      <Td dataLabel="Details">Summary</Td>
    </Tr>
    {isExpanded && (
      <Tr isExpanded>
        <Td colSpan={3}>
          <ExpandableRowContent>
            Expanded detail content here
          </ExpandableRowContent>
        </Td>
      </Tr>
    )}
  </Tbody>
</Table>
```

### Sortable Table Pattern

```tsx
<Table aria-label="Sortable table">
  <Thead>
    <Tr>
      <Th sort={{
        sortBy: { index: activeSortIndex, direction: activeSortDirection },
        onSort: (_e, index, direction) => { setActiveSortIndex(index); setActiveSortDirection(direction); },
        columnIndex: 0,
      }}>Name</Th>
      <Th sort={{ /* similar config for column 1 */ }}>Date</Th>
    </Tr>
  </Thead>
  <Tbody>{/* sorted rows */}</Tbody>
</Table>
```

### Context

`Table` provides `TableContext` with variant and other state. `Tr` and `Td` consume this context — they must be descendants of `Table`.

## DataList

Flexible list component for non-tabular data.

**Package:** `@patternfly/react-core`

### Hierarchy

```
DataList (ul, requires aria-label)
└── DataListItem (li, requires aria-labelledby)
    ├── DataListItemRow (always-visible row)
    │   ├── DataListControl (optional: toggles, checkboxes, drag handles)
    │   │   ├── DataListToggle
    │   │   ├── DataListCheck
    │   │   └── DataListDragButton
    │   ├── DataListItemCells (REQUIRED cell container)
    │   │   └── [DataListCell passed via dataListCells prop]
    │   └── DataListAction (action buttons/dropdowns)
    └── DataListContent (expandable content, requires aria-label)
```

### Key Props

**DataList:**
| Prop | Purpose |
|------|---------|
| `aria-label` | Required accessible name |
| `onSelectDataListItem` | Selection callback |
| `selectedDataListItemId` | Currently selected item |
| `isCompact` | Compact styling |
| `onDragFinish` | Drag-and-drop reorder callback |

**DataListItem:**
| Prop | Purpose |
|------|---------|
| `aria-labelledby` | Required reference to content for accessibility |
| `isExpanded` | Expansion state |
| `id` | Item identifier |

**DataListItemCells:**
| Prop | Purpose |
|------|---------|
| `dataListCells` | Array of DataListCell elements |

**DataListCell:**
| Prop | Purpose |
|------|---------|
| `width` | 1-5 relative width |
| `isFilled` | Fill available space |
| `alignRight` | Right-align content |
| `isIcon` | Icon cell styling |

**DataListAction:**
| Prop | Purpose |
|------|---------|
| `id` | Required identifier |
| `aria-labelledby` | Required accessibility reference |
| `aria-label` | Required accessible name |
| `isPlainButtonAction` | Plain button styling |

### Basic DataList

```tsx
<DataList aria-label="Data list example">
  <DataListItem aria-labelledby="item-1">
    <DataListItemRow>
      <DataListItemCells
        dataListCells={[
          <DataListCell key="name"><span id="item-1">Item Name</span></DataListCell>,
          <DataListCell key="desc">Description text</DataListCell>,
        ]}
      />
    </DataListItemRow>
  </DataListItem>
</DataList>
```

### Expandable DataList

```tsx
<DataList aria-label="Expandable data list">
  <DataListItem aria-labelledby="item-1" isExpanded={expanded}>
    <DataListItemRow>
      <DataListControl>
        <DataListToggle onClick={() => setExpanded(!expanded)} isExpanded={expanded} id="toggle-1" />
      </DataListControl>
      <DataListItemCells
        dataListCells={[
          <DataListCell key="name"><span id="item-1">Item</span></DataListCell>,
        ]}
      />
      <DataListAction id="action-1" aria-labelledby="item-1 action-1" aria-label="Actions">
        <Dropdown>...</Dropdown>
      </DataListAction>
    </DataListItemRow>
    <DataListContent aria-label="Item details" isHidden={!expanded}>
      Expanded content here
    </DataListContent>
  </DataListItem>
</DataList>
```

### Critical Rules

1. **DataListItemCells is required** — cells go in the `dataListCells` prop, not as direct children
2. **DataListContent is a sibling of DataListItemRow**, not nested inside it
3. **DataListControl wraps toggle/check/drag** — don't put these directly in DataListItemRow
4. **aria-labelledby on DataListItem** must reference an element inside the item for accessibility

## DescriptionList

Key-value pair display component.

**Package:** `@patternfly/react-core`

### Hierarchy

```
DescriptionList (dl element)
└── DescriptionListGroup (REQUIRED wrapper for each pair)
    ├── DescriptionListTerm (dt — the label)
    └── DescriptionListDescription (dd — the value)
```

### Key Props

**DescriptionList:**
| Prop | Purpose |
|------|---------|
| `isHorizontal` | Horizontal layout (term and description side by side) |
| `isAutoFit` | Auto-fit columns based on available space |
| `isCompact` | Compact spacing |
| `columnModifier` | Columns per breakpoint |
| `displaySize` | 'default' \| 'lg' \| '2xl' |
| `orientation` | Breakpoint object for horizontal/vertical per breakpoint |

**DescriptionListTerm:**
| Prop | Purpose |
|------|---------|
| `icon` | Leading icon element |

### Example

```tsx
<DescriptionList isHorizontal columnModifier={{ lg: '2Col', xl: '3Col' }}>
  <DescriptionListGroup>
    <DescriptionListTerm>Name</DescriptionListTerm>
    <DescriptionListDescription>John Doe</DescriptionListDescription>
  </DescriptionListGroup>
  <DescriptionListGroup>
    <DescriptionListTerm>Email</DescriptionListTerm>
    <DescriptionListDescription>john@example.com</DescriptionListDescription>
  </DescriptionListGroup>
  <DescriptionListGroup>
    <DescriptionListTerm>Role</DescriptionListTerm>
    <DescriptionListDescription>Administrator</DescriptionListDescription>
  </DescriptionListGroup>
</DescriptionList>
```

### With Help Text

```tsx
<DescriptionListGroup>
  <DescriptionListTermHelpText>
    <DescriptionListTermHelpTextButton>Uptime</DescriptionListTermHelpTextButton>
  </DescriptionListTermHelpText>
  <DescriptionListDescription>99.9%</DescriptionListDescription>
</DescriptionListGroup>
```

### Critical Rules

1. **DescriptionListGroup is required** — never put Term or Description directly in DescriptionList
2. Always pair a Term with a Description
3. Use `icon` prop on DescriptionListTerm for icons, not as child content
