---
name: coding-standards
description: PatternFly React development standards. Use when writing, reviewing, or refactoring PatternFly React components, layouts, or styles.
---

# PatternFly React Development Standards

Enforce coding standards for **PatternFly React** applications based on official PatternFly guidelines.

## PatternFly MCP Server

This plugin provides the PatternFly MCP server. Use `searchPatternFlyDocs` and `usePatternFlyDocs` to look up current component documentation, props, and schemas before providing guidance.

---

## PatternFly React Requirements

### Supported Versions

- **React**: 17, 18 (React 19 coming soon)
- **PatternFly**: v6 only
- **TypeScript**: Recommended
- **Package Manager**: npm or Yarn

### Installation

```bash
npm install @patternfly/react-core --save

# Additional packages as needed:
npm install @patternfly/react-table --save
npm install @patternfly/react-charts --save
npm install @patternfly/react-icons --save
```

### Required CSS Import

Always import PatternFly base CSS before your application:

```tsx
import "@patternfly/react-core/dist/styles/base.css";
```

---

## Component Standards

### Structure Requirements

From [PatternFly React CONTRIBUTING.md](https://github.com/patternfly/patternfly-react/blob/main/CONTRIBUTING.md):

1. Prefer stateless functional components
2. Accept props as UI display parameters
3. Provide a single default export per component
4. Use PascalCase for component files/folders
5. Use `...props` for extensibility

```tsx
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export const UserCard = ({ user, onEdit, ...props }: UserCardProps) => (
  <Card {...props}>
    <CardTitle>{user.name}</CardTitle>
    <CardBody>
      <Content component="p">{user.email}</Content>
      {onEdit && <Button onClick={() => onEdit(user)}>Edit</Button>}
    </CardBody>
  </Card>
);
```

---

## Styling Standards

### Use Components Over Utility Classes

PatternFly provides layout components - use them instead of utility classes:

```tsx
// ✅ Correct - Use PatternFly layout components
<PageSection>
  <Stack hasGutter>
    <Title headingLevel="h1">Dashboard</Title>
    <Grid hasGutter>
      <GridItem span={8}>
        <Card>
          <CardTitle>Content</CardTitle>
          <CardBody>...</CardBody>
        </Card>
      </GridItem>
    </Grid>
  </Stack>
</PageSection>

// ❌ Wrong - Don't use utility classes for layout
<div className="pf-v6-u-m-md">
  <div className="pf-v6-u-mb-sm">Dashboard</div>
</div>
```

**Priority:**
1. Use PatternFly components (PageSection, Stack, Grid, ActionGroup)
2. Use component props (Table `borders={false}`, Button `variant="primary"`)
3. Only use utility classes when components don't apply

### Class Naming (PatternFly v6)

Always use `pf-v6-` prefix:

```css
.pf-v6-c-button  /* Components */
.pf-v6-u-m-md    /* Utilities */
.pf-v6-l-grid    /* Layouts */
```

Never use legacy prefixes (`pf-v5-`, `pf-v4-`, `pf-u-`, `pf-c-`).

### Design Tokens

Use semantic tokens (not base tokens ending in numbers):

```css
.custom-component {
  /* ✅ Semantic tokens */
  color: var(--pf-t--global--text--color--regular);
  margin: var(--pf-t--global--spacer--md);

  /* ❌ Don't use */
  color: #333333;
  color: var(--pf-t--global--text--color--100);
}
```

### Use PatternFly Components for Typography

```tsx
// ✅ Use PatternFly components
import { Title, Content } from "@patternfly/react-core";
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";

<Title headingLevel="h1">Dashboard</Title>
<Content component="p">Welcome message</Content>
<CheckIcon />

// ❌ Don't use raw HTML
<h1>Dashboard</h1>
<p>Welcome message</p>
```

---

## Accessibility (WCAG 2.1 Level AA)

### Keyboard Navigation

All interactive elements must support:
- **Tab/Shift+Tab**: Focus navigation
- **Enter/Space**: Activation
- **Arrow keys**: Navigation in menus, tabs, lists
- **Escape**: Close modals/overlays

### Focus Management

- Never remove focus indicators without alternatives
- Modals must trap focus
- Return focus to trigger element when closing overlays

### Color Contrast

- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+ or 14pt+ bold): 3:1 minimum
- **UI components**: 3:1 minimum
- Don't rely on color alone - add icons, labels, or patterns

### Screen Readers

- Use semantic HTML before ARIA attributes
- Add ARIA labels when text content isn't sufficient
- Test with screen readers during development

---

## React Best Practices

### State Management

Keep state as local as possible:
- **useState**: Component-specific UI state
- **useContext**: Shared state across component tree
- **useReducer**: Complex state with multiple update patterns

### Hooks

- Always include proper dependency arrays
- Custom hooks must start with `use` prefix
- For async in useEffect:

```tsx
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

### TypeScript

- Prefer type aliases over interfaces (unless extending)
- Avoid type casting (`as any`)
- Use `as const` for literal types

---

## Common Patterns

### Forms

```tsx
<Form>
  <FormGroup label="Username" isRequired>
    <TextInput />
  </FormGroup>
  <ActionGroup>
    <Button variant="primary">Submit</Button>
    <Button variant="link">Cancel</Button>
  </ActionGroup>
</Form>
```

### Data States

Always handle loading, error, and empty states:

```tsx
if (isLoading) return <Spinner />;
if (error) return <EmptyState titleText="Error" />;
if (!data?.length) return <EmptyState titleText="No results" />;
return <MyContent data={data} />;
```

### External Links

```tsx
<Button
  variant="link"
  component="a"
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  icon={<ExternalLinkAltIcon />}
  iconPosition="right"
>
  Learn more
</Button>
```

---

## Testing Standards

**"The more your tests resemble the way your software is used, the more confidence they can give you."**

- Test user behavior, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`, `getByText`)
- Don't test PatternFly components - they're already tested
- Use `userEvent` for interactions (not `fireEvent`)
- Use `screen` object for queries
- Use `render()` for full rendering (no shallow rendering)
- Mock at the network boundary, not component boundaries
- Use `jest.fn()` for verifying callback props

---

## Code Review Standards

From PatternFly CONTRIBUTING.md:

- Don't merge your own PRs
- Wait for CI to pass before merging
- Include Storybook/documentation links in PRs
- Use conventional commit formatting

---

## Linting and Formatting

- **ESLint**: JavaScript Standard Style
- **Prettier**: For code formatting
- Run `yarn lint --fix` before committing
- All tests must pass before PRs

---

## Quick Reference

**Do:**
- Use PatternFly components for layout
- Use component props before utility classes
- Import base CSS before your app
- Use `pf-v6-` class prefix
- Use semantic design tokens
- Test user behavior
- Follow accessibility requirements

**Don't:**
- Use utility classes for basic layout
- Use legacy class prefixes
- Use hardcoded colors/spacing
- Use raw HTML when components exist
- Test PatternFly internals

---

## Additional Resources

For detailed component patterns, see the [`docs/` directory](https://github.com/patternfly/ai-helpers/tree/main/docs):

- [Component Architecture Guidelines](https://github.com/patternfly/ai-helpers/blob/main/docs/guidelines/component-architecture.md)
- [Styling Standards](https://github.com/patternfly/ai-helpers/blob/main/docs/guidelines/styling-standards.md)
- [Table Component Patterns](https://github.com/patternfly/ai-helpers/blob/main/docs/components/data-display/table.md)
- [Chart Integration](https://github.com/patternfly/ai-helpers/blob/main/docs/charts/README.md)

---

## Sources

- [PatternFly.org](https://www.patternfly.org/)
- [PatternFly React CONTRIBUTING.md](https://github.com/patternfly/patternfly-react/blob/main/CONTRIBUTING.md)
- [PatternFly React Testing Wiki](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines)
- [React Documentation](https://react.dev/learn)
- [WCAG 2.1 Level AA](https://www.w3.org/WAI/WCAG21/quickref/)
