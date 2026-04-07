# Page Layout Components

Detailed reference for Page, PageSection, PageGroup, PageSidebar, and Masthead.

## Table of Contents
- [Page](#page)
- [PageSection](#pagesection)
- [PageBody](#pagebody)
- [PageGroup](#pagegroup)
- [PageBreadcrumb](#pagebreadcrumb)
- [PageSidebar](#pagesidebar)
- [PageSidebarBody](#pagesidebarbody)
- [PageToggleButton](#pagetogglebutton)
- [Masthead](#masthead)

## Page

Root container that manages layout, sidebar state, responsive breakpoints, and context.

**Renders:** `<div class="pf-v6-c-page">` with CSS grid layout

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `masthead` | ReactNode | Masthead component (prop, not child) |
| `sidebar` | ReactNode | PageSidebar component (prop, not child) |
| `isManagedSidebar` | boolean | Auto-manage sidebar open/close on resize |
| `isContentFilled` | boolean | Enable isFilled on PageSection children |
| `defaultManagedSidebarIsOpen` | boolean | Initial sidebar state |
| `onPageResize` | function | Callback on page resize |

**Context provided:** `PageContext` with `isManagedSidebar`, `isNavOpen`, `onNavToggle`, `width`, `height`, `getBreakpoint`

**Layout structure:** Page creates a CSS grid with areas for masthead, sidebar, and main content container. The main content container wraps all direct children.

### Anti-pattern: main content without PageSection

`PageSection` applies section padding, background, and vertical fill. A plain wrapper skips those classes and often leads to custom CSS “fixes.”

```tsx
// Wrong — raw div as main content child
<Page masthead={header}>
  <div className="my-content">Hello</div>
</Page>

// Correct
<Page masthead={header}>
  <PageSection>Hello</PageSection>
</Page>
```

## PageSection

Main content container for page content areas.

**Renders:** `<section class="pf-v6-c-page__main-section">`

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `type` | 'default' \| 'subnav' \| 'breadcrumb' \| 'tabs' \| 'wizard' | Section type |
| `variant` | 'default' \| 'secondary' | Background color variant |
| `padding` | breakpoint object | Padding control per breakpoint |
| `isFilled` | boolean | Grow to fill vertical space |
| `hasBodyWrapper` | boolean | Auto-wrap children in PageBody (default: true) |
| `isWidthLimited` | boolean | Limit content width |
| `stickyOnBreakpoint` | breakpoint object | Make section sticky at breakpoints |
| `hasOverflowScroll` | boolean | Enable overflow scrolling |

**What it provides:** Background color, padding control, vertical fill behavior, sticky positioning. Auto-wraps children in `PageBody` for horizontal padding.

## PageBody

Content wrapper that applies horizontal padding/insets.

**Renders:** `<div class="pf-v6-c-page__main-body">`

Usually auto-injected by `PageSection`. Use manually only when you need multiple padded areas within one section:

```tsx
<PageSection hasBodyWrapper={false}>
  <PageBody>Area 1</PageBody>
  <PageBody>Area 2</PageBody>
</PageSection>
```

## PageGroup

Groups related sections visually and semantically.

**Renders:** `<div class="pf-v6-c-page__main-group">`

Use when you want breadcrumb + subnav + content section to behave as a unit. Supports the same fill/sticky/shadow props as PageSection.

```tsx
<PageGroup stickyOnBreakpoint={{ default: 'top' }}>
  <PageBreadcrumb><Breadcrumb>...</Breadcrumb></PageBreadcrumb>
  <PageSection type="subnav">...</PageSection>
</PageGroup>
<PageSection isFilled>Main content</PageSection>
```

## PageBreadcrumb

Specialized section for breadcrumb navigation.

**Renders:** `<section class="pf-v6-c-page__main-breadcrumb">`

Auto-wraps children in PageBody. Shares layout props with PageSection (isWidthLimited, stickyOnBreakpoint, etc.).

## PageSidebar

Vertical sidebar container. **Must be passed via the `sidebar` prop on Page, not as a child.**

**Renders:** `<div class="pf-v6-c-page__sidebar">`

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `isSidebarOpen` | boolean | Controls open/closed state |

**Required children:** At least one `PageSidebarBody`. Without it, sidebar content has no styling or spacing.

## PageSidebarBody

Content container within sidebar.

**Renders:** `<div class="pf-v6-c-page__sidebar-body">`

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `usePageInsets` | boolean | Apply page-level insets |
| `isFilled` | boolean | Grow to fill vertical space |
| `isContextSelector` | boolean | Special styling for context switcher |

Multiple PageSidebarBody components stack vertically:

```tsx
<PageSidebar isSidebarOpen={true}>
  <PageSidebarBody isContextSelector>Context switcher</PageSidebarBody>
  <PageSidebarBody usePageInsets isFilled>Navigation</PageSidebarBody>
</PageSidebar>
```

### Anti-pattern: sidebar content without PageSidebarBody

```tsx
// Wrong — nav or text directly in PageSidebar (no spacing / layout classes)
<PageSidebar isSidebarOpen>
  <Nav>...</Nav>
</PageSidebar>

// Correct
<PageSidebar isSidebarOpen>
  <PageSidebarBody usePageInsets>
    <Nav>...</Nav>
  </PageSidebarBody>
</PageSidebar>
```

## PageToggleButton

Sidebar toggle button. **Goes in Masthead, not in Page.**

```tsx
<Masthead>
  <MastheadMain>
    <MastheadToggle>
      <PageToggleButton
        isHamburgerButton
        aria-label="Global navigation"
        isSidebarOpen={open}
        onSidebarToggle={toggle}
      />
    </MastheadToggle>
    <MastheadBrand><MastheadLogo component="a" href="/">Logo</MastheadLogo></MastheadBrand>
  </MastheadMain>
  <MastheadContent>Right content</MastheadContent>
</Masthead>
```

## Masthead

Application header component.

**Renders:** `<header class="pf-v6-c-masthead">`

**Key props:**
| Prop | Type | Purpose |
|------|------|---------|
| `display` | breakpoint object | 'inline' or 'stack' per breakpoint |
| `inset` | breakpoint object | Inset values per breakpoint |

**Hierarchy:**
- `MastheadMain` — left-aligned container (toggle + brand)
- `MastheadToggle` — wrapper for toggle button
- `MastheadBrand` — wrapper for logo/brand
- `MastheadLogo` — the logo itself (needs `component` prop for element type)
- `MastheadContent` — right-aligned container for nav, search, user menu

**Important:** Masthead consumes `PageContext` for breakpoint info. It should be used within a `Page` component for responsive behavior to work correctly.

### Anti-pattern: skipping MastheadMain

Toggle and brand must sit under **`MastheadMain`** so flex layout and spacing stay correct.

```tsx
// Wrong — brand/toggle not grouped in MastheadMain
<Masthead>
  <MastheadToggle><PageToggleButton ... /></MastheadToggle>
  <MastheadBrand><MastheadLogo>App</MastheadLogo></MastheadBrand>
  <MastheadContent>...</MastheadContent>
</Masthead>

// Correct
<Masthead>
  <MastheadMain>
    <MastheadToggle><PageToggleButton ... /></MastheadToggle>
    <MastheadBrand><MastheadLogo component="a" href="/">App</MastheadLogo></MastheadBrand>
  </MastheadMain>
  <MastheadContent>...</MastheadContent>
</Masthead>
```

## Full Page Layout Example

```tsx
const masthead = (
  <Masthead>
    <MastheadMain>
      <MastheadToggle>
        <PageToggleButton isHamburgerButton aria-label="Nav" isSidebarOpen={open} onSidebarToggle={toggle} />
      </MastheadToggle>
      <MastheadBrand>
        <MastheadLogo component="a" href="/">My App</MastheadLogo>
      </MastheadBrand>
    </MastheadMain>
    <MastheadContent>
      <Toolbar><ToolbarContent><ToolbarItem>User menu</ToolbarItem></ToolbarContent></Toolbar>
    </MastheadContent>
  </Masthead>
);

const sidebar = (
  <PageSidebar isSidebarOpen={open}>
    <PageSidebarBody usePageInsets>
      <Nav onSelect={onSelect}>
        <NavList>
          <NavItem to="/dashboard" isActive={active === 'dashboard'}>Dashboard</NavItem>
          <NavItem to="/settings" isActive={active === 'settings'}>Settings</NavItem>
        </NavList>
      </Nav>
    </PageSidebarBody>
  </PageSidebar>
);

<Page masthead={masthead} sidebar={sidebar} isManagedSidebar>
  <PageSection type="breadcrumb">
    <Breadcrumb>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem isActive>Current</BreadcrumbItem>
    </Breadcrumb>
  </PageSection>
  <PageSection>
    <Title headingLevel="h1">Page Title</Title>
  </PageSection>
  <PageSection isFilled>
    Main content goes here
  </PageSection>
</Page>
```
