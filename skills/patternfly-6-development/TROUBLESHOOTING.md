# PatternFly 6 Troubleshooting Guide

Quick solutions for common PatternFly 6 issues.

## Import Errors

### Module not found: '@patternfly/react-charts'

**Cause**: Missing `/victory` in import path.

```jsx
// Wrong
import { ChartDonut } from '@patternfly/react-charts';

// Correct
import { ChartDonut } from '@patternfly/react-charts/victory';
```

**Also check**:
```bash
npm install @patternfly/react-charts victory
```

### Module not found: '@patternfly/chatbot'

**Cause**: Missing dynamic import path.

```jsx
// Wrong
import { Chatbot } from '@patternfly/chatbot';

// Correct
import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';
```

**Also check**:
```bash
npm install @patternfly/chatbot
```

### Module not found: '@patternfly/react-component-groups'

**Cause**: Missing dynamic import path.

```jsx
// Wrong
import { BulkSelect } from '@patternfly/react-component-groups';

// Correct
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
```

### Module not found: '@patternfly/react-core'

**Solution**:
```bash
npm install @patternfly/react-core @patternfly/react-table @patternfly/react-icons
```

## Styling Issues

### PatternFly styles not applied

**Cause**: Missing CSS import.

```jsx
// Add to main App.js or index.js
import '@patternfly/react-core/dist/styles/base.css';
```

### Utility classes not working (pf-v6-u-*)

**Cause**: Missing addons CSS.

```jsx
import '@patternfly/patternfly/patternfly-addons.css';
```

**Also check** package is installed:
```bash
npm install @patternfly/patternfly
```

### Chart colors not defined

**Cause**: Missing charts CSS.

```jsx
import '@patternfly/patternfly/patternfly-charts.css';
```

### Chatbot components unstyled

**Cause**: Missing chatbot CSS.

```jsx
import '@patternfly/chatbot/dist/css/main.css';
```

### Wrong class prefix (pf-v5-, pf-c-)

**Solution**: Replace with `pf-v6-` prefix.

```jsx
// Wrong
<div className="pf-v5-c-button">
<div className="pf-c-button">

// Correct
<div className="pf-v6-c-button">
```

Run validation script:
```bash
bash scripts/check-pf6-classes.sh src/
```

## Component Issues

### AI generates non-existent components

**Common mistakes and corrections**:

| Wrong | Correct |
|-------|---------|
| `<TextContent>` | `<Content>` |
| `<EmptyStateHeader>No data</EmptyStateHeader>` | `<EmptyStateHeader titleText="No data" />` |
| `<TableHeader>` | `<Thead>` |
| `<Text component="h1">` | `<Title headingLevel="h1">` or `<Content component="h1">` |
| `<PageHeader>` | Use `<PageSection>` with `<Title>` |

### CSS modules syntax doesn't work

**Cause**: PatternFly doesn't use CSS modules.

```jsx
// Wrong
<div className={styles.customClass}>

// Correct - Use PatternFly utilities
<div className="pf-v6-u-m-md">

// Or inline with tokens
<div style={{ margin: 'var(--pf-t--global--spacer--md)' }}>
```

### Dropdown gets clipped in scrollable container

**Solution**: Use popperProps to append to body.

```jsx
<Dropdown
  popperProps={{
    appendTo: () => document.body,
    enableFlip: true
  }}
>
```

## Chart Issues

### Chart not rendering

**Checklist**:
1. Check import path includes `/victory`
2. Verify container has width/height
3. Check data format matches chart expectations
4. Look for Victory.js warnings in console

```jsx
// Ensure container has dimensions
<div style={{ height: '300px', width: '100%' }}>
  <ChartDonut data={data} />
</div>
```

### Chart colors wrong

**Cause**: Using hardcoded colors instead of tokens.

```jsx
// Wrong
<ChartDonut colorScale={['#333', '#666', '#999']} />

// Correct
const chartColors = [
  'var(--pf-t-chart-color-blue-300)',
  'var(--pf-t-chart-color-green-300)',
  'var(--pf-t-chart-color-purple-300)'
];
<ChartDonut colorScale={chartColors} />
```

## Accessibility Issues

### Missing ARIA labels

**Solution**: Always add aria-label for interactive elements.

```jsx
// Wrong
<Card onClick={handleClick}>

// Correct
<Card
  isClickable
  onClick={handleClick}
  tabIndex={0}
  role="button"
  aria-label="View details"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
```

### Missing keyboard navigation

**Solution**: Add tabIndex and key handlers.

```jsx
<div
  tabIndex={0}
  onClick={handleAction}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
  role="button"
  aria-label="Perform action"
>
```

## Performance Issues

### Slow table with large datasets

**Solutions**:

1. **Pagination**:
```jsx
const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(20);
const paginatedData = data.slice((page - 1) * perPage, page * perPage);
```

2. **Memoization**:
```jsx
const MemoizedRow = React.memo(({ item }) => (
  <Tr><Td>{item.name}</Td></Tr>
));
```

3. **Virtualization**: Use react-virtual or similar library for 1000+ rows.

### Large bundle size

**Solutions**:

1. **Tree-shake icons**:
```jsx
// Correct - Individual imports
import { TimesIcon } from '@patternfly/react-icons/dist/esm/icons/times-icon';

// Wrong - Imports entire package
import { TimesIcon } from '@patternfly/react-icons';
```

2. **Lazy load heavy components**:
```jsx
const LazyChart = React.lazy(() => import('./HeavyChart'));

<Suspense fallback={<Spinner />}>
  <LazyChart />
</Suspense>
```

## Setup Issues

### npm install fails

**Solutions**:
```bash
# Clear cache
npm cache clean --force

# Remove and reinstall
rm -rf node_modules package-lock.json
npm install

# Try legacy peer deps
npm install --legacy-peer-deps
```

### Port already in use

**Solutions**:
```bash
# Kill process on port (Linux/Mac)
lsof -ti:9000 | xargs kill -9

# Use different port
PORT=3001 npm run start:dev
```

### Permission errors on npm

**Solution**: Use nvm for Node.js management.
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install node
nvm use node
```

## Build Issues

### TypeScript errors

**Check**:
```bash
npx tsc --noEmit
```

### Build fails with module errors

**Solutions**:
```bash
# Clear build cache
rm -rf dist/ build/

# Verify all imports
npm run lint

# Rebuild
npm run build
```

## Quick Diagnostic Commands

```bash
# Check PatternFly package versions
npm list @patternfly/react-core @patternfly/react-charts @patternfly/chatbot

# Find incorrect import patterns
bash scripts/check-pf6-imports.sh src/

# Find legacy class usage
bash scripts/check-pf6-classes.sh src/

# Verify package installation
npm list | grep patternfly
```

## Getting Help

1. Check [PatternFly.org](https://www.patternfly.org/)
2. Search [GitHub Issues](https://github.com/patternfly/patternfly-react/issues)
3. Use `patternfly` tag on Stack Overflow
4. Fetch latest docs:
```bash
bash scripts/fetch-latest-docs.sh troubleshooting
```
