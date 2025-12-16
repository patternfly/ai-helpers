# PatternFly 6 Import Patterns

Complete reference for PatternFly 6 import patterns across all packages.

## Package Installation

```bash
# Core components (required)
npm install @patternfly/react-core @patternfly/react-table @patternfly/react-icons

# Charts (Victory.js based)
npm install @patternfly/react-charts victory

# Chatbot
npm install @patternfly/chatbot

# Component Groups
npm install @patternfly/react-component-groups

# Base CSS variables and utilities
npm install @patternfly/patternfly
```

## @patternfly/react-core

Standard named imports from the package root.

```jsx
// Layout components
import {
  Page,
  PageSection,
  PageSidebar,
  PageSidebarBody,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent
} from '@patternfly/react-core';

// Content components
import {
  Card,
  CardTitle,
  CardBody,
  CardFooter,
  Title,
  Content,
  EmptyState,
  EmptyStateHeader,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateActions
} from '@patternfly/react-core';

// Form components
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Select,
  SelectOption,
  Checkbox,
  Radio,
  Switch,
  ActionGroup
} from '@patternfly/react-core';

// Navigation components
import {
  Nav,
  NavItem,
  NavList,
  NavExpandable,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  Tab,
  TabTitleText
} from '@patternfly/react-core';

// Interactive components
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  Modal,
  ModalVariant,
  Popover,
  Tooltip,
  Alert,
  AlertGroup,
  AlertActionCloseButton
} from '@patternfly/react-core';

// Layout utilities
import {
  Stack,
  StackItem,
  Split,
  SplitItem,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Gallery,
  GalleryItem
} from '@patternfly/react-core';

// Data display
import {
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Label,
  LabelGroup,
  Badge,
  Spinner
} from '@patternfly/react-core';

// Toolbar
import {
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarToggleGroup
} from '@patternfly/react-core';

// Pagination
import { Pagination, PaginationVariant } from '@patternfly/react-core';
```

## @patternfly/react-table

```jsx
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableText,
  SortByDirection,
  ThProps
} from '@patternfly/react-table';

// Composable table with expandable rows
import {
  ExpandableRowContent,
  OuterScrollContainer,
  InnerScrollContainer
} from '@patternfly/react-table';
```

## @patternfly/react-icons

```jsx
// Import individual icons for tree-shaking
import { TimesIcon } from '@patternfly/react-icons/dist/esm/icons/times-icon';
import { CheckIcon } from '@patternfly/react-icons/dist/esm/icons/check-icon';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { PlusIcon } from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import { TrashIcon } from '@patternfly/react-icons/dist/esm/icons/trash-icon';
import { EditIcon } from '@patternfly/react-icons/dist/esm/icons/edit-icon';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';
import { ArrowUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-up-icon';
import { ArrowDownIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-down-icon';
import { ExclamationCircleIcon } from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import { InfoCircleIcon } from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';
import { UserIcon } from '@patternfly/react-icons/dist/esm/icons/user-icon';
import { CogIcon } from '@patternfly/react-icons/dist/esm/icons/cog-icon';
```

## @patternfly/react-charts (Victory)

**CRITICAL**: Must import from `/victory` subpath.

```jsx
// Correct - Always include /victory
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartBar,
  ChartDonut,
  ChartDonutThreshold,
  ChartDonutUtilization,
  ChartGroup,
  ChartLegend,
  ChartLine,
  ChartPie,
  ChartScatter,
  ChartStack,
  ChartThemeColor,
  ChartTooltip,
  ChartVoronoiContainer
} from '@patternfly/react-charts/victory';

// Wrong - This will cause "Module not found" errors
// import { ChartDonut } from '@patternfly/react-charts';
```

### ECharts Alternative

```jsx
import { EChart } from '@patternfly/react-charts/echarts';
```

## @patternfly/chatbot

**CRITICAL**: Must use dynamic imports from `/dist/dynamic/` path.

```jsx
// Correct - Use dynamic imports
import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';
import { ChatbotContent } from '@patternfly/chatbot/dist/dynamic/ChatbotContent';
import { ChatbotWelcomePrompt } from '@patternfly/chatbot/dist/dynamic/ChatbotWelcomePrompt';
import { ChatbotFooter } from '@patternfly/chatbot/dist/dynamic/ChatbotFooter';
import { MessageBar } from '@patternfly/chatbot/dist/dynamic/MessageBar';
import { MessageBox } from '@patternfly/chatbot/dist/dynamic/MessageBox';
import { Message } from '@patternfly/chatbot/dist/dynamic/Message';

// Wrong - Standard imports may not work
// import { Chatbot, ChatbotContent } from '@patternfly/chatbot';
```

## @patternfly/react-component-groups

**CRITICAL**: Must use dynamic imports from `/dist/dynamic/` path.

```jsx
// Correct - Use dynamic imports
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
import { ErrorState } from '@patternfly/react-component-groups/dist/dynamic/ErrorState';
import { NotAuthorized } from '@patternfly/react-component-groups/dist/dynamic/NotAuthorized';
import { InvalidObject } from '@patternfly/react-component-groups/dist/dynamic/InvalidObject';
import { UnavailableContent } from '@patternfly/react-component-groups/dist/dynamic/UnavailableContent';
import { ServiceCard } from '@patternfly/react-component-groups/dist/dynamic/ServiceCard';

// Wrong - Standard imports may not work
// import { BulkSelect } from '@patternfly/react-component-groups';
```

## TypeScript Types

```tsx
// Core types
import type { ButtonProps, CardProps, ModalProps } from '@patternfly/react-core';

// Table types
import type { ThProps, TdProps, TrProps } from '@patternfly/react-table';

// Chart types
import type { ChartDonutProps, ChartLineProps } from '@patternfly/react-charts/victory';
```

## CSS Imports Summary

```jsx
// Main app entry point (index.js or App.js)

// Base PatternFly styles - REQUIRED
import '@patternfly/react-core/dist/styles/base.css';

// Utility classes (for pf-v6-u-* classes)
import '@patternfly/patternfly/patternfly-addons.css';

// Charts CSS (when using react-charts)
import '@patternfly/patternfly/patternfly-charts.css';

// Chatbot CSS (when using chatbot)
import '@patternfly/chatbot/dist/css/main.css';

// Component Groups CSS (when using component-groups)
import '@patternfly/react-component-groups/dist/css/main.css';
```

## Common Import Mistakes

| Wrong | Correct |
|-------|---------|
| `from '@patternfly/react-charts'` | `from '@patternfly/react-charts/victory'` |
| `from '@patternfly/chatbot'` | `from '@patternfly/chatbot/dist/dynamic/ComponentName'` |
| `from '@patternfly/react-component-groups'` | `from '@patternfly/react-component-groups/dist/dynamic/ComponentName'` |
| `import TimesIcon from '@patternfly/react-icons'` | `import { TimesIcon } from '@patternfly/react-icons/dist/esm/icons/times-icon'` |
