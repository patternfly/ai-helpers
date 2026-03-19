Generate a comprehensive unit test file for the given React component.

## Input

The user will provide a component file path or component code. Read the component source before generating tests.

## How to Generate

1. Identify what the component does: rendering, user interactions, conditional states, async operations.
2. Look up any PatternFly components used so you understand their expected props and behaviors.
3. Generate a complete test file covering all branches.

## Test File Structure

```typescript
import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
```

Organize tests into `describe` blocks: `rendering`, `user interactions`, `conditional rendering`, `async operations`, `accessibility` -- only include sections that apply.

## Rules

**Queries** -- use in this order:
1. `getByRole` (always first choice)
2. `getByLabelText`
3. `getByText`
4. `getByTestId` (last resort only)

**Interactions** -- always `userEvent`, never `fireEvent`:
```typescript
const user = userEvent.setup();
await user.click(screen.getByRole("button", { name: "Save" }));
```

**Mocking** -- mock at the network boundary:
- Mock API calls and external services
- Never mock child components or PatternFly components
- Place all mocks at top of file
- `jest.clearAllMocks()` in `beforeEach`

**Async** -- prefer `findBy*` over `waitFor` for waiting on elements:
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
- Your application logic and component composition
- All conditional rendering branches (loading, error, empty, populated)
- User interactions and their effects
- Callback invocations with correct arguments

**What NOT to test:**
- PatternFly component internals (they're already tested)
- Implementation details (state, internal functions)
- CSS classes or styling

## Output

Output the complete test file ready to save. Name it `ComponentName.test.tsx` matching the source file.
