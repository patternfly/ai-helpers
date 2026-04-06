---
name: pf-unit-test-standards
description: PatternFly React unit testing standards. Use when writing, reviewing, or modifying unit tests for PatternFly React components.
---

# PatternFly React Unit Test Standards

Testing standards and patterns for PatternFly React components based on official testing guidelines.

## Testing Philosophy

**"The more your tests resemble the way your software is used, the more confidence they can give you."**

### Core Principles

- **Test user behavior, not implementation** - Focus on what users see and do
- **Tests should survive refactors** - Don't break when code is refactored
- **Use semantic queries** - Query by roles, labels, and text users see
- **Don't test PatternFly components** - They're already tested. Test YOUR logic.

### What to Test

**Test YOUR application logic:**
- How you compose PatternFly components
- Data transformations and business logic
- Conditional rendering based on props/state
- User interactions with YOUR components
- API calls and async operations

**Don't test PatternFly internals:**
- That a `<Button>` renders correctly
- That a `<Card>` has the right structure
- PatternFly component styling or CSS classes

### Integration Over Unit Tests

Prefer testing components integrated with their children. Mock at the network boundary, not component boundaries:

```typescript
// ✅ Mock at network boundary, render real components
jest.mock("../api/users");

it("displays users and allows selection", async () => {
  (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  const user = userEvent.setup();

  render(<UserPage />);

  await screen.findByText(mockUsers[0].name);
  await user.click(screen.getByRole("checkbox", { name: mockUsers[0].name }));
});

// ❌ Don't mock your own components
jest.mock("./UserCard");
jest.mock("./UserTable");
```

---

## Test Structure

### Required Imports

```typescript
import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
```

### Organization Pattern

```typescript
describe("ComponentName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("displays user data", () => {
      render(<UserCard user={mockUser} />);
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("calls onEdit when edit button is clicked", async () => {
      const onEdit = jest.fn();
      const user = userEvent.setup();

      render(<UserCard user={mockUser} onEdit={onEdit} />);
      await user.click(screen.getByRole("button", { name: "Edit" }));

      expect(onEdit).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("conditional rendering", () => {
    it("shows loading spinner when loading", () => {
      render(<UserCard user={mockUser} isLoading={true} />);
      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
  });
});
```

---

## Query Strategies

Use queries in this priority order (from [Testing Library docs](https://testing-library.com/docs/queries/about)):

### 1. getByRole (Preferred)

```typescript
screen.getByRole("button", { name: "Save" });
screen.getByRole("textbox", { name: "Username" });
screen.getByRole("heading", { name: "Dashboard" });
screen.getByRole("checkbox", { name: "Accept terms" });
```

### 2. getByLabelText

```typescript
screen.getByLabelText("Email address");
screen.getByLabelText("Password");
```

### 3. getByPlaceholderText

```typescript
screen.getByPlaceholderText("Enter username");
```

### 4. getByText

```typescript
screen.getByText("Welcome to PatternFly");
screen.getByText(/error occurred/i);
```

### 5. getByDisplayValue

```typescript
screen.getByDisplayValue("john@example.com");
```

### 6. getByAltText

```typescript
screen.getByAltText("User profile photo");
```

### 7. getByTitle

```typescript
screen.getByTitle("Close dialog");
```

### 8. getByTestId (Last Resort)

```typescript
screen.getByTestId("custom-widget");
```

### Query Variants

- **`getBy*`** - Element should exist, throws if not found
- **`queryBy*`** - Element may not exist, returns null if not found
- **`findBy*`** - Element appears async, waits and returns promise

```typescript
// Element should exist
expect(screen.getByRole("button")).toBeInTheDocument();

// Element should NOT exist
expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

// Element appears after async operation
expect(await screen.findByText("Success")).toBeInTheDocument();
```

### Avoid These

- Array indexing: `getAllByRole('button')[1]`
- Class selectors: `container.querySelector('.pf-v6-c-button')`
- Implementation details: Component state, internal functions

---

## User Interactions

**Always use `userEvent`, never `fireEvent`**

```typescript
const user = userEvent.setup();

await user.click(screen.getByRole("button", { name: "Submit" }));
await user.type(screen.getByRole("textbox", { name: "Username" }), "alice");
await user.keyboard("{Escape}");
await user.tab();
```

---

## Mocking

### Mock Placement

All mocks at top of file:

```typescript
jest.mock("../api/users", () => ({
  fetchUsers: jest.fn(),
  deleteUser: jest.fn(),
}));

describe("UserList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
});
```

### What to Mock

**Do mock:**
- API calls and external services
- Browser APIs (localStorage, sessionStorage)

**Don't mock:**
- Your own child components
- PatternFly components
- React hooks
- Code you're testing

### Callback Mocking

```typescript
const onSave = jest.fn();

render(<UserForm onSave={onSave} />);
await user.click(screen.getByRole("button", { name: "Save" }));

expect(onSave).toHaveBeenCalledTimes(1);
expect(onSave).toHaveBeenCalledWith(expectedData);
```

---

## Common Patterns

### Conditional Rendering

```typescript
describe("conditional rendering", () => {
  it("shows loading spinner when fetching", () => {
    render(<UserList isLoading={true} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error message on failure", () => {
    render(<UserList error="Failed to load" />);
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("shows user list when data loaded", () => {
    render(<UserList users={mockUsers} />);
    expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument();
  });
});
```

### Async Operations

**Prefer `findBy*` over `waitFor` for better error messages:**

```typescript
// ✅ Better: findBy* waits automatically with helpful errors
it("displays user data after fetch", async () => {
  render(<UserProfile userId="123" />);
  expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
});

// ⚠️ Acceptable but more verbose
it("fetches and displays user data", async () => {
  const mockFetch = jest.fn().mockResolvedValue(mockUser);
  render(<UserProfile userId="123" fetchUser={mockFetch} />);

  await waitFor(() => {
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });

  expect(mockFetch).toHaveBeenCalledWith("123");
});

// ✅ Use waitFor for non-query assertions
await waitFor(() => {
  expect(onComplete).toHaveBeenCalled();
});
```

### Forms

```typescript
it("submits form with entered data", async () => {
  const onSubmit = jest.fn();
  const user = userEvent.setup();

  render(<UserForm onSubmit={onSubmit} />);

  await user.type(screen.getByRole("textbox", { name: "Username" }), "alice");
  await user.type(screen.getByLabelText("Email"), "alice@example.com");
  await user.click(screen.getByRole("button", { name: "Submit" }));

  expect(onSubmit).toHaveBeenCalledWith({
    username: "alice",
    email: "alice@example.com",
  });
});
```

### PatternFly Tables

```typescript
it("displays table data", () => {
  render(<UserTable users={mockUsers} />);

  expect(screen.getByRole("grid")).toBeInTheDocument();
  expect(screen.getByText(mockUsers[0].name)).toBeInTheDocument();
});

it("calls onSelect when row checkbox is clicked", async () => {
  const onSelect = jest.fn();
  const user = userEvent.setup();

  render(<UserTable users={mockUsers} onSelect={onSelect} />);

  await user.click(
    screen.getByRole("checkbox", { name: `Select ${mockUsers[0].name}` })
  );

  expect(onSelect).toHaveBeenCalledWith(mockUsers[0].id);
});
```

### Modals

```typescript
it("opens modal when button is clicked", async () => {
  const user = userEvent.setup();
  render(<UserProfile user={mockUser} />);

  await user.click(screen.getByRole("button", { name: "Edit" }));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

it("closes modal on escape key", async () => {
  const onClose = jest.fn();
  const user = userEvent.setup();

  render(<EditModal isOpen={true} onClose={onClose} />);

  await user.keyboard("{Escape}");
  expect(onClose).toHaveBeenCalled();
});
```

### Accessibility

```typescript
describe("accessibility", () => {
  it("has proper ARIA labels", () => {
    render(<DeleteButton itemName="User Report" />);
    expect(
      screen.getByRole("button", { name: "Delete User Report" })
    ).toBeInTheDocument();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<NavigationMenu />);

    await user.tab();
    expect(screen.getByRole("menuitem", { name: "Dashboard" })).toHaveFocus();
  });
});
```

---

## Complete Example

```typescript
import { describe, expect, it, beforeEach } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserManagementPage } from "./UserManagementPage";
import { fetchUsers, deleteUser } from "../api/users";

jest.mock("../api/users");

const mockUsers = [
  { id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@example.com", role: "User" },
];

describe("UserManagementPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  describe("rendering", () => {
    it("renders page title", () => {
      render(<UserManagementPage />);
      expect(
        screen.getByRole("heading", { name: "User Management" })
      ).toBeInTheDocument();
    });

    it("fetches and displays users", async () => {
      render(<UserManagementPage />);

      expect(await screen.findByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });

  describe("user interactions", () => {
    it("deletes user when confirmed", async () => {
      (deleteUser as jest.Mock).mockResolvedValue({});
      const user = userEvent.setup();

      render(<UserManagementPage />);
      await screen.findByText("Alice");

      await user.click(screen.getByRole("button", { name: /delete alice/i }));
      await user.click(screen.getByRole("button", { name: "Confirm" }));

      expect(deleteUser).toHaveBeenCalledWith("1");
    });
  });

  describe("conditional rendering", () => {
    it("shows loading state while fetching", () => {
      (fetchUsers as jest.Mock).mockImplementation(() => new Promise(() => {}));
      render(<UserManagementPage />);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("shows error state on failure", async () => {
      (fetchUsers as jest.Mock).mockRejectedValue(new Error("Network error"));
      render(<UserManagementPage />);

      await waitFor(() => {
        expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
      });
    });

    it("shows empty state when no users", async () => {
      (fetchUsers as jest.Mock).mockResolvedValue([]);
      render(<UserManagementPage />);

      await waitFor(() => {
        expect(screen.getByText(/no users found/i)).toBeInTheDocument();
      });
    });
  });
});
```

---

## Quick Reference

**Do:**
- Use `userEvent` for interactions
- Use `getByRole` as first choice
- Use `waitFor` for async assertions
- Mock at the network boundary (API calls, external services)
- Test all conditional rendering branches
- Test YOUR logic, not PatternFly components

**Don't:**
- Use `fireEvent` for user interactions
- Use array indexing or class selectors
- Test PatternFly component internals
- Test implementation details
- Use arbitrary timeouts instead of `waitFor`

---

## Sources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [PatternFly React Testing Wiki](https://github.com/patternfly/patternfly-react/wiki/React-Testing-Library-Basics,-Best-Practices,-and-Guidelines)
- [PatternFly React CONTRIBUTING.md](https://github.com/patternfly/patternfly-react/blob/main/CONTRIBUTING.md)
