---
name: pf-library-test-writer
description: Write unit tests for contributors to PatternFly libraries (patternfly-react, patternfly-chatbot, etc.), not for consumers of PatternFly components. Use `unit-test-generator` for consumer application tests instead.
---

Write unit tests for components and features within PatternFly ecosystem libraries (patternfly-react, patternfly-chatbot, patternfly-virtual-assistant, and other JS/TS-based PatternFly libraries). Unlike `unit-test-generator` which tests at the network boundary, this skill **mocks child components** for unit isolation of individual library components.

These conventions are based on the [PatternFly testing wiki](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines).

## Input

The user will provide a component file path, component code, or describe a new feature. Read the component source before writing tests.

## Test File Structure

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';
```

## File Organization

- **Separate test file per exported component.** Do not create monolithic test files.
- Name the file `ComponentName.test.tsx` next to the source file.

```text
Button/
├── Button.tsx
├── Button.test.tsx
├── ButtonVariant.tsx
└── ButtonVariant.test.tsx
```

## Mocking Child Components

Default to **mocking child components** for unit testing prop-passing behavior:

```typescript
jest.mock('../RandomHeader', () => () => <h1>Header text</h1>);
```

With props:

```typescript
jest.mock('../Header', () => ({
  Header: ({ children, ...props }) => <h1 {...props}>{children}</h1>
}));
```

## Test Nesting

- **Do NOT** wrap all tests in a `describe()` that just names the component.
- **Do** use `describe()` to group tests that share setup.
- Use `test()` outside `describe()`, `it()` inside `describe()`.

```typescript
test('renders with default props', () => { ... });
test('applies custom className', () => { ... });

describe('when disabled', () => {
  it('has disabled attribute', () => { ... });
  it('does not fire onClick', () => { ... });
});
```

## Snapshots

- **DO** use snapshots for component structure and element ordering.
- **DO NOT** use snapshots to verify CSS classes. Use `toHaveClass` instead.

```typescript
// Structure -- snapshot is appropriate
const { asFragment } = render(<MyLayout />);
expect(asFragment()).toMatchSnapshot();

// Classes -- use toHaveClass, not snapshot
expect(screen.getByRole('button')).toHaveClass('pf-m-primary');
```

## Coverage Checklist

Cover these for every component:

1. **Default rendering** -- renders with only required props
2. **Prop variations** -- each prop value produces expected output
3. **Custom className** -- merges with internal classes
4. **Spread props** -- extra props forwarded to root element
5. **Children** -- renders children correctly
6. **Callbacks** -- event handlers fire with correct arguments (and don't fire when they shouldn't)
7. **Conditional rendering** -- elements show/hide based on props
8. **Accessibility** -- ARIA roles, labels, keyboard interaction
9. **Snapshot** -- structure verification where appropriate (NOT for classes)

## Output

Output the complete test file ready to save. Name it `ComponentName.test.tsx`.
