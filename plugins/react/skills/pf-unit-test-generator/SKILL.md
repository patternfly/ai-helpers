---
name: pf-unit-test-generator
description: Generate a unit test file for a React component using Testing Library. Use when adding test coverage to new or existing components.
---

Generate a comprehensive unit test file for the given React component.

## Input

The user will provide a component file path or component code. Read the component source before generating tests.

## Context Detection

Determine if the component is part of a component library (patternfly-react, patternfly-chatbot, or similar) or a consumer application. Check whether the component lives in a library source tree or an application codebase. This determines the testing approach — see "Component Library Contributions" below for adjustments.

## How to Generate

1. Identify what the component does: rendering, user interactions, conditional states, async operations.
2. Look up any PatternFly components used so you understand their expected props and behaviors.
3. Generate a complete test file covering all branches.

## Test File Structure

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
```

Organize tests into `describe` blocks by behavior: `rendering`, `user interactions`, `conditional rendering`, `async operations`, `accessibility` — only include sections that apply.

## Rules

**Queries** — use in this order:
1. `getByRole` (always first choice)
2. `getByLabelText`
3. `getByText`
4. `getByTestId` (last resort only)

**Interactions** — always `userEvent`, never `fireEvent`:
```typescript
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: "Save" }));
```

**Mocking** — mock at the network boundary:
- Mock API calls and external services
- Never mock child components or PatternFly components
- Place all mocks at top of file
- `jest.clearAllMocks()` in `beforeEach`

**Async** — prefer `findBy*` over `waitFor` for waiting on elements:
```typescript
expect(await screen.findByText("Success")).toBeInTheDocument();
```

Use `waitFor` only for non-query assertions:
```typescript
await waitFor(() => {
  expect(onComplete).toHaveBeenCalled();
});
```

**What to test:**
- Component behavior from the user's perspective
- All conditional rendering branches (loading, error, empty, populated)
- User interactions and their effects
- Callback invocations with correct arguments

**What NOT to test:**
- PatternFly component internals (they're already tested)
- Implementation details (state, internal functions)

**CSS classes** — test with `toHaveClass` when classes are part of the component's public API (e.g., modifier classes, conditional styling). Don't test internal or structural classes that are implementation details.

## Component Library Contributions

When testing a component within a component library (patternfly-react, patternfly-chatbot, etc.), these adjustments apply. The "user" of a library component is a developer consuming its API — so test the API contract.

**Mocking child components** — default to mocking child components for unit isolation:
```typescript
jest.mock('../Header', () => ({
  Header: ({ children, ...props }) => <h1 {...props}>{children}</h1>
}));
```
Exception: don't mock when the parent-child interaction is the behavior being tested (e.g., a composite component where orchestration between children is the point).

**Coverage checklist** — cover these for every library component:
1. Default rendering with only required props
2. Prop variations — each prop value produces expected output
3. Custom className — merges with internal classes
4. Spread props — extra props forwarded to root element
5. Children — renders children correctly
6. Callbacks — event handlers fire with correct arguments
7. Conditional rendering — elements show/hide based on props
8. Accessibility — ARIA roles, labels, keyboard interaction

**Snapshots** — use for component structure and element ordering. Do not use snapshots to verify CSS classes — use `toHaveClass` instead:
```typescript
const { asFragment } = render(<MyLayout />);
expect(asFragment()).toMatchSnapshot();
```

**File organization** — one test file per exported component, colocated with the source:
```text
Button/
├── Button.tsx
├── Button.test.tsx
├── ButtonVariant.tsx
└── ButtonVariant.test.tsx
```

**PatternFly-specific conventions** — follow the [PatternFly testing wiki](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines). Use `test()` for top-level tests and `it()` inside `describe()` blocks:
```typescript
test('renders with default props', () => { ... });

describe('when disabled', () => {
  it('has disabled attribute', () => { ... });
  it('does not fire onClick', () => { ... });
});
```

## Output

Output the complete test file ready to save. Name it `ComponentName.test.tsx` matching the source file.
