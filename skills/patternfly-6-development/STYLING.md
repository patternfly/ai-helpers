# PatternFly 6 Styling Guide

CSS classes, design tokens, and styling patterns for PatternFly 6.

## Class Naming Conventions

### Version Prefixes

```css
/* PatternFly v6 classes - ALWAYS use these */
.pf-v6-c-button          /* Components */
.pf-v6-u-m-md            /* Utilities */
.pf-v6-l-grid            /* Layouts */

/* NEVER use legacy prefixes */
.pf-v5-c-button          /* v5 - outdated */
.pf-c-button             /* v4 - outdated */
.pf-u-m-md               /* No version - outdated */
```

### Class Categories

| Prefix | Purpose | Example |
|--------|---------|---------|
| `pf-v6-c-` | Components | `pf-v6-c-button`, `pf-v6-c-card` |
| `pf-v6-u-` | Utilities | `pf-v6-u-m-md`, `pf-v6-u-text-align-center` |
| `pf-v6-l-` | Layouts | `pf-v6-l-grid`, `pf-v6-l-stack` |
| `pf-v6-m-` | Modifiers | `pf-v6-m-gutter`, `pf-v6-m-primary` |

## Design Tokens

### Token Types

Use **semantic tokens** (no numbers) for application styling. Avoid **base tokens** (with numbers) as they may change.

```css
/* Correct - Semantic tokens */
color: var(--pf-t--global--text--color--regular);
margin: var(--pf-t--global--spacer--md);

/* Avoid - Base tokens (internal use only) */
color: var(--pf-t--global--text--color--100);
```

### Spacing Tokens

```css
--pf-t--global--spacer--xs    /* 4px */
--pf-t--global--spacer--sm    /* 8px */
--pf-t--global--spacer--md    /* 16px */
--pf-t--global--spacer--lg    /* 24px */
--pf-t--global--spacer--xl    /* 32px */
--pf-t--global--spacer--2xl   /* 48px */
--pf-t--global--spacer--3xl   /* 64px */
```

### Color Tokens

```css
/* Text colors */
--pf-t--global--text--color--regular
--pf-t--global--text--color--subtle
--pf-t--global--text--color--disabled
--pf-t--global--text--color--on-brand

/* Background colors */
--pf-t--global--background--color--primary--default
--pf-t--global--background--color--secondary--default

/* Status colors */
--pf-t--global--color--status--success--default
--pf-t--global--color--status--warning--default
--pf-t--global--color--status--danger--default
--pf-t--global--color--status--info--default
```

### Chart Color Tokens

```css
/* Chart color families */
--pf-t-chart-color-blue-100    /* Lightest */
--pf-t-chart-color-blue-200
--pf-t-chart-color-blue-300    /* Base - use first */
--pf-t-chart-color-blue-400
--pf-t-chart-color-blue-500    /* Darkest */

/* Available families */
/* blue, green, teal, purple, orange, yellow, red-orange, black */

/* Usage order: 300 (base) → 100 → 500 → 200 → 400 */
```

### Typography Tokens

```css
--pf-t--global--font--family--body
--pf-t--global--font--family--heading
--pf-t--global--font--size--xs
--pf-t--global--font--size--sm
--pf-t--global--font--size--md
--pf-t--global--font--size--lg
--pf-t--global--font--size--xl
--pf-t--global--font--weight--normal
--pf-t--global--font--weight--bold
```

## Component Composition Patterns

### Priority Order

1. **Component composition** - Use PatternFly layout components
2. **Component props** - Use component-specific props for styling
3. **Utility classes** - Only when composition/props aren't sufficient

### Page Layout

```jsx
<Page>
  <Masthead>
    <MastheadMain>
      <MastheadBrand>App Name</MastheadBrand>
    </MastheadMain>
  </Masthead>
  <PageSidebar>
    <PageSidebarBody>
      <Nav>{/* Navigation */}</Nav>
    </PageSidebarBody>
  </PageSidebar>
  <PageSection>
    {/* Page content */}
  </PageSection>
</Page>
```

### Content Layout with Stack

```jsx
<PageSection>
  <Stack hasGutter>
    <StackItem>
      <Title headingLevel="h1">Page Title</Title>
    </StackItem>
    <StackItem>
      <Content>Page description</Content>
    </StackItem>
    <StackItem>
      {/* Main content */}
    </StackItem>
  </Stack>
</PageSection>
```

### Grid Layout

```jsx
<Grid hasGutter>
  <GridItem span={12} md={6} lg={4}>
    <Card><CardBody>Card 1</CardBody></Card>
  </GridItem>
  <GridItem span={12} md={6} lg={4}>
    <Card><CardBody>Card 2</CardBody></Card>
  </GridItem>
  <GridItem span={12} md={12} lg={4}>
    <Card><CardBody>Card 3</CardBody></Card>
  </GridItem>
</Grid>
```

### Flex Layout

```jsx
<Flex>
  <FlexItem>Item 1</FlexItem>
  <FlexItem grow={{ default: 'grow' }}>Item 2 (grows)</FlexItem>
  <FlexItem align={{ default: 'alignRight' }}>Item 3</FlexItem>
</Flex>
```

### Form Layout

```jsx
<Form>
  <FormGroup label="Username" isRequired fieldId="username">
    <TextInput id="username" isRequired />
  </FormGroup>
  <FormGroup label="Email" fieldId="email">
    <TextInput id="email" type="email" />
  </FormGroup>
  <ActionGroup>
    <Button variant="primary">Submit</Button>
    <Button variant="link">Cancel</Button>
  </ActionGroup>
</Form>
```

### Button Spacing

```jsx
// Correct - Use ActionGroup for button spacing
<ActionGroup>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</ActionGroup>

// Avoid - Manual spacing
<div>
  <Button className="pf-v6-u-mr-sm">Save</Button>
  <Button>Cancel</Button>
</div>
```

### Toolbar Alignment

```jsx
<Toolbar>
  <ToolbarContent>
    <ToolbarItem>Left content</ToolbarItem>
    <ToolbarItem align={{ default: 'alignEnd' }}>Right content</ToolbarItem>
  </ToolbarContent>
</Toolbar>
```

## Utility Classes

Use only when component composition is insufficient.

### Spacing Utilities

```css
/* Margin */
.pf-v6-u-m-{size}      /* All sides */
.pf-v6-u-mt-{size}     /* Top */
.pf-v6-u-mr-{size}     /* Right */
.pf-v6-u-mb-{size}     /* Bottom */
.pf-v6-u-ml-{size}     /* Left */
.pf-v6-u-mx-{size}     /* Horizontal */
.pf-v6-u-my-{size}     /* Vertical */

/* Padding */
.pf-v6-u-p-{size}      /* All sides */
.pf-v6-u-pt-{size}     /* Top */
/* ... same pattern as margin */

/* Sizes: xs, sm, md, lg, xl, 2xl, 3xl */
```

### Text Utilities

```css
.pf-v6-u-text-align-center
.pf-v6-u-text-align-left
.pf-v6-u-text-align-right
.pf-v6-u-font-weight-bold
.pf-v6-u-font-size-sm
.pf-v6-u-font-size-lg
```

### Display Utilities

```css
.pf-v6-u-display-none
.pf-v6-u-display-block
.pf-v6-u-display-flex
.pf-v6-u-display-inline
.pf-v6-u-display-inline-block
```

### Responsive Modifiers

```css
/* Breakpoint suffixes: -on-sm, -on-md, -on-lg, -on-xl, -on-2xl */
.pf-v6-u-display-none-on-sm
.pf-v6-u-display-block-on-md
.pf-v6-u-text-align-center-on-lg
```

### Width and Height

```css
.pf-v6-u-w-25
.pf-v6-u-w-50
.pf-v6-u-w-75
.pf-v6-u-w-100
.pf-v6-u-h-100
```

## Inline Styles

When utility classes don't exist, use design tokens in inline styles:

```jsx
// Correct - Design tokens
<div style={{ marginBottom: 'var(--pf-t--global--spacer--lg)' }} />

// Avoid - Hardcoded values
<div style={{ marginBottom: 24 }} />
<div style={{ marginBottom: '24px' }} />
```

## Icons

Always use PatternFly icons, never emojis:

```jsx
// Correct
import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
<ArrowUpIcon title="Trend up" />

// Wrong
<span role="img" aria-label="trend up">📈</span>
```

## External Links

Add external link icon for links opening new tabs:

```jsx
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';

<Button
  variant="link"
  component="a"
  href="https://patternfly.org"
  target="_blank"
  rel="noopener noreferrer"
  icon={<ExternalLinkAltIcon />}
  iconPosition="end"
>
  Learn more
</Button>
```

## Headings and Text

Always use PatternFly components for text:

```jsx
// Correct
import { Title, Content } from '@patternfly/react-core';
<Title headingLevel="h1">Dashboard</Title>
<Content component="p">Description text</Content>

// Wrong
<h1>Dashboard</h1>
<p>Description text</p>
```

## Do's and Don'ts Summary

### Do
- Use component composition (PageSection, Stack, Grid)
- Use component props for styling options
- Use semantic design tokens
- Use PatternFly icons
- Use Title and Content components

### Don't
- Use utility classes for basic layout
- Use hardcoded pixel values
- Use emojis for icons
- Use raw HTML elements (h1, p, div) for content
- Override PatternFly component internals
- Mix PatternFly versions
