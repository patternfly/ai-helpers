# PF Security Anti-Patterns Reference

## Scope grep commands

Run from the project root. Adjust paths as needed.

```bash
# Files using PatternFly React
rg "from '@patternfly/react" --glob '*.{tsx,ts,jsx,js}'

# dangerouslySetInnerHTML (all occurrences need review)
rg "dangerouslySetInnerHTML" --glob '*.{tsx,ts,jsx,js}'

# __html object pattern
rg "__html" --glob '*.{tsx,ts,jsx,js}'

# javascript: URLs (literal)
rg "javascript:" --glob '*.{tsx,ts,jsx,js}'

# data: URLs
rg "href=.*data:" --glob '*.{tsx,ts,jsx,js}'

# target="_blank" candidates (manual review for rel attribute)
rg 'target="_blank"' --glob '*.{tsx,ts,jsx,js}'

# Dynamic href/to bindings (manual review for validation)
rg 'href=\{' --glob '*.{tsx,ts,jsx,js}'
rg 'to=\{' --glob '*.{tsx,ts,jsx,js}'
```

## PF component checklist

Components that commonly receive user-controlled strings or URLs:

| Category | Components | Props / children |
|----------|------------|------------------|
| Tooltips / popovers | `Tooltip`, `Popover` | `content`, `bodyContent`, `headerContent` |
| Labels / chips | `Label`, `Badge`, `Chip`, `ChipGroup` | children, `text` |
| Links / navigation | `Button`, `NavItem`, `NavLink`, `BreadcrumbItem`, `DropdownItem`, `MenuItem`, `JumpLinksItem` | `href`, `to` |
| Text surfaces | `Title`, `Text`, `Content`, `Alert`, `HelperText`, `FormGroup` | children, `label`, `title` |
| Data display | `Td`, `DataListCell`, `DescriptionListDescription`, `EmptyState` | children, `dataLabel` |
| Menus / selects | `SelectOption`, `DropdownItem`, `MenuItem` | children |

## Sanitizer recognition

Treat these as approved sanitization when applied to the flagged value **before** render:

- `DOMPurify.sanitize(...)` / `dompurify`
- `sanitize-html(...)` / `sanitizeHtml`
- Project-specific `sanitize*`, `cleanHtml`, `stripHtml` utilities — verify implementation if unfamiliar

Absence of sanitization between user/API source and render target is a finding.

## URL validation patterns

| Pattern | Risk | Action |
|---------|------|--------|
| `href={userInput}` | Open redirect, `javascript:` injection | Validate origin/path against allowlist |
| `href={\`https://${domain}/...\`}` | Domain injection if `domain` is user-controlled | Allowlist domains |
| `href={searchParams.get('next')}` | Open redirect | Reject external URLs; allow relative paths only |
| `to={location.pathname + userInput}` | Path traversal / XSS in router | Validate path segments |
| `component="a"` + dynamic `href` | Same as `<a href>` | Apply URL rules |

## Severity guide

| Severity | Criteria |
|----------|----------|
| **CRITICAL** | Confirmed or highly likely exploitable XSS or `javascript:` execution path |
| **HIGH** | User-controlled content in PF render path without sanitization; unvalidated external URLs |
| **WARN** | Missing `rel` on `target="_blank"`; `dangerouslySetInnerHTML` with sanitization present but unverified; dynamic href with partial validation |
