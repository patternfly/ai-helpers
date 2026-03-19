Write unit tests for components and features within the PatternFly ecosystem (patternfly-react, patternfly-chatbot, patternfly-virtual-assistant, and other JS/TS-based PatternFly libraries). All tests must strictly follow the [official PatternFly testing guidelines](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines).

## Input

The user will provide a component file path, component code, or describe a new feature. Read the component source before writing tests.

## How to Write Tests

1. Read the component source to understand its props, children, and behavior.
2. If the PatternFly MCP server is available, use `usePatternFlyDocs` to check the component's props schema, variants, and accessibility requirements.
3. Generate a complete test file following every rule below.

## Test File Structure

```typescript
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';
```

## File Organization

- **Separate test file per exported component.** Do not create monolithic test files.
- Name the file `ComponentName.test.tsx` next to the source file.

```
Button/
├── Button.tsx
├── Button.test.tsx
├── ButtonVariant.tsx
└── ButtonVariant.test.tsx
```

## Rendering

- Use RTL's `render`. There is no shallow rendering -- mock child components instead.
- Use the **`screen` object** for all queries. Do NOT assign `render`'s return to a variable for querying.
- The **one exception**: destructure `asFragment` from `render` for snapshot testing.

```typescript
// Queries -- use screen
render(<MyComponent />);
screen.getByRole('button', { name: 'Submit' });

// Snapshots -- destructure asFragment
const { asFragment } = render(<MyComponent />);
expect(asFragment()).toMatchSnapshot();
```

## Queries

**Priority -- always try in this order:**

1. `getByRole` with `name` option (default choice for almost everything)
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByAltText`
7. `getByTitle`
8. `getByTestId` (last resort only)

```typescript
screen.getByRole('button', { name: 'Save' });
screen.getByRole('heading', { name: 'Dashboard' });
screen.getByRole('checkbox', { name: 'Accept terms' });
```

**Query types:**

- `getBy` / `getAllBy` -- default. Throws if not found.
- `queryBy` / `queryAllBy` -- ONLY for asserting absence.
- `findBy` / `findAllBy` -- for async elements. Returns a promise.

```typescript
expect(screen.getByRole('button')).toBeInTheDocument();
expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
expect(await screen.findByText('Loaded')).toBeInTheDocument();
```

**Never use:** array indexing (`getAllBy[1]`), class selectors (`.querySelector`), or internal DOM structure.

## User Interactions

Always `userEvent`, never `fireEvent`:

```typescript
const user = userEvent.setup();
await user.click(screen.getByRole('button', { name: 'Submit' }));
await user.type(screen.getByRole('textbox', { name: 'Name' }), 'alice');
await user.keyboard('{Escape}');
```

## Using act()

RTL handles `act()` automatically. If you get "not wrapped in act" warnings, resolve in this order:

1. Use a `find` query instead of `get`
2. Use `waitFor`
3. Mock the operation
4. Wrap in `act()` only as a last resort

**Exception:** wrap `advanceTimersByTime` in `act()` when using Jest fake timers.

## Assertions

Use [jest-dom matchers](https://github.com/testing-library/jest-dom#table-of-contents), not generic Jest matchers. Use the most specific matcher:

```typescript
// Correct
expect(button).toBeDisabled();
expect(element).toHaveClass('pf-m-primary');
expect(input).toHaveValue('hello');

// Wrong
expect(button.disabled).toBe(true);
expect(element.className).toContain('pf-m-primary');
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

## Mocking

### Child components

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

### Callbacks

```typescript
const onClickMock = jest.fn();
render(<MyButton onClick={onClickMock}>Text</MyButton>);
const user = userEvent.setup();
await user.click(screen.getByRole('button', { name: 'Text' }));
expect(onClickMock).toHaveBeenCalledTimes(1);
```

Also test that callbacks are NOT called when the interaction doesn't happen.

### Contexts

Wrap the component in the context provider with a `value` prop:

```typescript
render(
  <MyContext.Provider value={{ theme: 'dark' }}>
    <MyComponent />
  </MyContext.Provider>
);
```

## Async Patterns

Prefer `findBy*` over `waitFor` for elements:

```typescript
expect(await screen.findByText('Loaded')).toBeInTheDocument();
```

Use `waitFor` for non-query assertions:

```typescript
await waitFor(() => {
  expect(onComplete).toHaveBeenCalled();
});
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

## Test Abstraction

Default to **NOT abstracting** setup. Keep setup inline in each test unless:
- It excessively bloats the suite
- Abstracting clarifies which setup elements vary per test

`it.each` is acceptable when the pattern is clear:

```typescript
describe('variants', () => {
  it.each([
    ['primary', 'pf-m-primary'],
    ['secondary', 'pf-m-secondary'],
  ])('applies %s class', (variant, expectedClass) => {
    render(<Button variant={variant}>Text</Button>);
    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });
});
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
