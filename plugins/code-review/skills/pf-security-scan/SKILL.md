---
name: pf-security-scan
description: Scan PatternFly React code for security anti-patterns — XSS via dangerouslySetInnerHTML, unsanitized user input in tooltips/labels, and insecure href patterns. Use when reviewing PF code for security vulnerabilities or auditing user-controlled content in PF components.
---

# PF Security Scan

Audit PatternFly React usage for security anti-patterns that turn UI components into XSS or open-redirect vectors. This skill focuses on **PF-specific hotspots** — not general app security (auth, CSRF, secrets).

## PatternFly MCP

If `@patternfly/patternfly-mcp` is available, use it to confirm which props accept HTML or render links for unfamiliar components. This skill defines **what to flag**; the MCP fills in API details.

## How to run

1. Ask the user which directory or files to scan. Default to the current working directory.
2. Limit scope to files importing from `@patternfly/react-core`, `@patternfly/react-table`, `@patternfly/react-component-groups`, or `@patternfly/react-templates`.
3. Run targeted searches (see [references/anti-patterns.md](references/anti-patterns.md) for grep patterns), then read flagged files for context.
4. Trace user-controlled data: API responses, URL params, query strings, form input, localStorage, WebSocket payloads, and props passed from parent components.
5. Report findings grouped by file with line numbers. End with a summary count.

## Anti-patterns to detect

### 1. XSS via `dangerouslySetInnerHTML`

| Severity | Flag when |
|----------|-----------|
| **CRITICAL** | `dangerouslySetInnerHTML` with a value that is not a compile-time constant |
| **CRITICAL** | `__html` built from user/API data without a recognized sanitizer (DOMPurify, sanitize-html, or project-approved equivalent) |
| **WARN** | `dangerouslySetInnerHTML` anywhere — even with sanitization, confirm the sanitizer config allows only safe tags |

Also flag PF components that accept HTML strings when fed unsanitized data:

- `innerHTML`-style props or render callbacks that inject raw HTML
- Rich-text editors or markdown renderers whose output flows into PF `Text`, `Title`, `Alert`, or table cells without sanitization

### 2. Unsanitized user input in tooltips, labels, and text surfaces

User-controlled strings rendered in PF components are XSS vectors when the data can contain HTML or script payloads.

| Severity | Component / prop | Flag when |
|----------|------------------|-----------|
| **CRITICAL** | `Tooltip` / `Popover` — `content`, `bodyContent`, `headerContent` | Value from user/API state without sanitization |
| **CRITICAL** | `Label`, `Badge`, `Chip`, `ChipGroup` — children or `text` | User-controlled value rendered directly |
| **HIGH** | `Alert` — `title`, `titleHeadingLevel`, children | Message from API/error payload without sanitization |
| **HIGH** | `Title`, `Text`, `Content` — children | User or CMS content interpolated without escaping |
| **HIGH** | `FormGroup` — `label`, `HelperText` — children | Label or helper text from user input |
| **HIGH** | `EmptyState` — `titleText`, `body` | Dynamic content from external source |
| **HIGH** | `DescriptionListDescription`, `DataListCell`, `Td` | Cell/description values from API without sanitization |
| **WARN** | `MenuItem`, `DropdownItem`, `SelectOption` — children | Display text from user data (lower risk if React text nodes, but still audit source) |

**Safe patterns** (do not flag):

- React text children (`<Label>{userName}</Label>`) — React escapes by default
- Values passed through a project-approved sanitizer at the boundary
- Compile-time string literals

**Unsafe patterns** (always flag):

- `dangerouslySetInnerHTML` in or near PF text surfaces
- `innerHTML` assignment on DOM nodes inside PF component refs
- Rendering markdown/HTML from user input without sanitization pipeline

### 3. Insecure URL / href patterns

PF components frequently render links via `Button`, `NavItem`, `BreadcrumbItem`, `DropdownItem`, `MenuItem`, and standalone `<a>` inside PF layouts.

| Severity | Flag when |
|----------|-----------|
| **CRITICAL** | `href` or `to` set to `javascript:` URL (literal or constructed) |
| **CRITICAL** | `href` built from unsanitized user input without URL validation |
| **HIGH** | `href` using `data:` scheme with non-image MIME types |
| **HIGH** | Dynamic `href` from API/params with no allowlist or `URL` constructor validation |
| **WARN** | `target="_blank"` without `rel="noopener noreferrer"` on external links |
| **WARN** | `Button component="a"` with dynamic `href` — same rules as `<a>` |

**PF-specific link surfaces to check:**

| Component | Props |
|-----------|-------|
| `Button` | `href`, `component="a"` |
| `NavItem` / `NavLink` | `to`, `href` |
| `BreadcrumbItem` | `to`, `href` |
| `DropdownItem` | `href`, `to` |
| `MenuItem` | `to`, `href` |
| `JumpLinksItem` | `href` |
| `ExternalLink` (if used) | `href` |

**Safe patterns:**

```tsx
// Allowlisted origin
const safeUrl = allowedOrigins.includes(new URL(userUrl).origin) ? userUrl : '#';

// React Router internal navigation only
<NavItem to={`/users/${userId}`}>...</NavItem>

// External link with tab-nabbing protection
<Button component="a" href={trustedUrl} target="_blank" rel="noopener noreferrer">
```

**Unsafe patterns:**

```tsx
// javascript: injection
<Button component="a" href={userSuppliedUrl}>...</Button>

// Unvalidated redirect
<DropdownItem href={searchParams.get('redirect')}>...</DropdownItem>

// String concat into href from API
<BreadcrumbItem href={`/docs/${apiResponse.path}`}>...</BreadcrumbItem>
```

## Report format

For each finding:

```
[CRITICAL|HIGH|WARN] file/path.tsx:42 - Unsanitized API data in Tooltip content
  Found: <Tooltip content={apiResponse.description}>
  Risk: XSS — attacker-controlled HTML in tooltip popper
  Fix: Sanitize with DOMPurify before render, or render as React text child if HTML is not required
```

End with:

```
Scanned: 18 files
Critical: 2 (across 1 file)
High: 3 (across 2 files)
Warnings: 1 (across 1 file)
```

Group findings by anti-pattern category (XSS, unsanitized input, insecure URLs) so patterns are visible.

## Applying fixes

1. **Prefer React text nodes** over HTML rendering when formatting is not required.
2. **Sanitize at the boundary** — one approved sanitizer at the data ingress point, not scattered per component.
3. **Validate URLs** — parse with `new URL()`, allowlist origins or paths, reject `javascript:`, `data:`, and protocol-relative `//` from untrusted input.
4. **Add `rel="noopener noreferrer"`** to every `target="_blank"` link.
5. Do not weaken sanitizer configs to "make it work" — flag and ask the user if legitimate HTML is required.

Only apply fixes when the remediation is unambiguous. If a finding needs a product decision (e.g., rich-text support), report it and ask.

## Additional resources

- Grep patterns and component checklist: [references/anti-patterns.md](references/anti-patterns.md)
