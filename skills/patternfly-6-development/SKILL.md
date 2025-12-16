---
name: patternfly-6-development
description: Develops PatternFly 6 (PF6) React user interfaces with correct patterns and best practices. Activates when working with PatternFly components, @patternfly imports, PF6 styling, charts (react-charts/victory), chatbot (@patternfly/chatbot), or component-groups. Provides import patterns, CSS rules, accessibility guidance, and troubleshooting.
---

# PatternFly 6 Development

This skill provides guidance for developing React applications with PatternFly 6 (PF6).

## Essential Rules

### Version Requirements
- **Always use PatternFly v6** - Use `pf-v6-` prefixed classes only
- **Use semantic tokens** - Prefer `pf-t-` tokens over `pf-v6-` tokens (e.g., `var(--pf-t--global--spacer--sm)`)
- **Use Content component** - Use `<Content component="h1">` instead of deprecated `<Text component="h1">`

### Critical Import Patterns

```jsx
// React Core - Standard imports
import { Button, Card, PageSection } from '@patternfly/react-core';

// Charts - MUST include /victory
import { ChartDonut, ChartLine } from '@patternfly/react-charts/victory';

// Chatbot - Use dynamic imports
import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import { MessageBox } from '@patternfly/chatbot/dist/dynamic/MessageBox';

// Component Groups - Use dynamic imports
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
```

### Required CSS Imports

```jsx
// Base PatternFly styles (required for all projects)
import '@patternfly/react-core/dist/styles/base.css';

// Charts (when using react-charts)
import '@patternfly/patternfly/patternfly-charts.css';

// Chatbot (when using chatbot components)
import '@patternfly/chatbot/dist/css/main.css';

// Component Groups (when using component groups)
import '@patternfly/react-component-groups/dist/css/main.css';

// Utility classes (for pf-v6-u-* classes)
import '@patternfly/patternfly/patternfly-addons.css';
```

## Common AI Mistakes to Avoid

| Mistake | Correct Approach |
|---------|------------------|
| `className={styles.x}` | CSS modules don't work - use `className="pf-v6-u-..."` |
| `import { Chart } from '@patternfly/react-charts'` | Must use `/victory` path |
| `<h1>Title</h1>` | Use `<Title headingLevel="h1">` or `<Content component="h1">` |
| `style={{ margin: 16 }}` | Use design tokens: `var(--pf-t--global--spacer--md)` |
| Hardcoded colors | Use chart tokens: `var(--pf-t-chart-color-blue-300)` |
| Missing ARIA labels | Always add `aria-label` for interactive elements |

## Component-First Approach

Always use PatternFly component composition before utility classes or custom CSS:

```jsx
// Correct - Component composition with proper hierarchy
<PageSection>
  <Stack hasGutter>
    <Title headingLevel="h1">Dashboard</Title>
    <Grid hasGutter>
      <GridItem span={6}>
        <Card><CardBody>Content</CardBody></Card>
      </GridItem>
    </Grid>
  </Stack>
</PageSection>

// Avoid - Utility classes for basic layout
<div className="pf-v6-u-m-md">
  <div className="pf-v6-u-mb-sm">Dashboard</div>
</div>
```

## Quick Start

For new PatternFly projects, use the official seed:

```bash
git clone https://github.com/patternfly/patternfly-react-seed
cd patternfly-react-seed
npm install
npm run start:dev
```

## Fetching Latest Documentation

For the most current PatternFly documentation, fetch from GitHub:

```bash
# Run the fetch script to get latest docs
bash scripts/fetch-latest-docs.sh [topic]

# Topics: charts, chatbot, components, guidelines, troubleshooting
```

Or fetch directly:
```bash
curl -s https://raw.githubusercontent.com/patternfly/patternfly-ai-coding/main/.pf-ai-documentation/charts/README.md
```

## Validation Scripts

Run these scripts to check for common issues:

```bash
# Check for incorrect import patterns
bash scripts/check-pf6-imports.sh [path]

# Find legacy PatternFly class usage (pf-v5-, pf-c-)
bash scripts/check-pf6-classes.sh [path]
```

## Reference Documentation

For detailed guidance on specific topics:

- **Import Patterns**: See [IMPORTS.md](IMPORTS.md) for complete import examples
- **Styling & Tokens**: See [STYLING.md](STYLING.md) for CSS classes and design tokens
- **Troubleshooting**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and fixes

## External Resources

- [PatternFly.org](https://www.patternfly.org/) - Official documentation
- [PatternFly React GitHub](https://github.com/patternfly/patternfly-react) - Source code
- [PatternFly React Seed](https://github.com/patternfly/patternfly-react-seed) - Starter template
- [PatternFly Chatbot](https://www.patternfly.org/patternfly-ai/chatbot/overview) - Chatbot docs
- [PatternFly Charts](https://www.patternfly.org/charts/about-charts) - Charts documentation

## Chart Color Guidelines

When using charts, follow these color rules:

- **Blue**: Use for success indicators
- **Red-orange**: Use only for failure/error states
- **Other colors** (green, teal, purple, orange, yellow): Use for neutral categories
- **Brightness order**: Start with 300 (base), then 100, 500, 200, 400

```jsx
const chartColors = [
  'var(--pf-t-chart-color-blue-300)',
  'var(--pf-t-chart-color-green-300)',
  'var(--pf-t-chart-color-purple-300)'
];
```

## State Handling Pattern

Always handle all data states:

```jsx
if (isLoading) return <Spinner aria-label="Loading" />;
if (error) return <EmptyState><EmptyStateHeader titleText="Error loading data" /></EmptyState>;
if (!data?.length) return <EmptyState><EmptyStateHeader titleText="No results" /></EmptyState>;

return <YourComponent data={data} />;
```

## Accessibility Requirements

- Always provide `aria-label` for interactive elements
- Use semantic heading levels with `Title` component
- Implement keyboard navigation for custom interactions
- Use `role` attributes appropriately
- Test with screen readers

```jsx
<Card
  isClickable
  onClick={handleClick}
  tabIndex={0}
  role="button"
  aria-label="View details"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  <CardBody>Clickable content</CardBody>
</Card>
```
