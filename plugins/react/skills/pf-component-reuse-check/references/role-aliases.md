# Role → PatternFly search aliases

Use these synonyms when `searchPatternFlyDocs` with the custom component name returns nothing useful. Prefer the PF component name that matches **role**, not the local class name.

| Custom role / wording | Search terms | Likely PatternFly |
|----------------------|--------------|-------------------|
| Primary / secondary / danger click target | button, action | Button |
| Icon-only control | button, plain | Button (`variant="plain"`) |
| Link styled as button | button, link | Button (`variant="link"`) |
| Banner / toast / inline message | alert, notification | Alert, NotificationDrawer, AlertGroup |
| Confirm / dialog / popup | modal, dialog | Modal |
| Side panel / slide-over | drawer, panel | Drawer |
| Card / tile / info box | card | Card |
| Empty list / no data | empty state | EmptyState |
| Tabs / tabbed panel | tabs | Tabs, Tab |
| Nav item / side nav | navigation, nav | Nav, NavItem, NavList |
| Top bar / header bar | masthead, page | Masthead, Page |
| Page body section | page section | PageSection |
| Data table / grid table | table | Table, Thead, Tbody, Tr, Th, Td |
| Description / term list | description list | DescriptionList |
| List of records | data list | DataList |
| Toolbar / filter bar | toolbar | Toolbar, ToolbarItem, ToolbarContent |
| Form field / input | form, text input | Form, FormGroup, TextInput, TextArea |
| Checkbox / radio | checkbox, radio | Checkbox, Radio |
| Select / dropdown select | select, menu | Select, Menu, Dropdown |
| Chip / tag / label pill | label, chip | Label, LabelGroup |
| Badge / count | badge | Badge |
| Spinner / loading | spinner, progress | Spinner, Progress |
| Skeleton placeholder | skeleton | Skeleton |
| Switch / toggle | switch | Switch |
| Tooltip / hint | tooltip, popover | Tooltip, Popover |
| Accordion / expand section | accordion, expand | Accordion, ExpandableSection |
| Wizard / multi-step | wizard | Wizard |
| Pagination | pagination | Pagination |
| Search input | search, text input | SearchInput, TextInput |
| Breadcrumb | breadcrumb | Breadcrumb |
| Truncate / overflow menu | overflow menu | OverflowMenu, Menu |
| Dual list / transfer | dual list | DualListSelector |
| Tree | tree | TreeView |
| Chart / graph | chart | Chart* (`@patternfly/react-charts`) |
| Chat / assistant UI | chatbot | Chatbot (`@patternfly/chatbot`) |
| Bulk select | bulk select | BulkSelect (`@patternfly/react-component-groups`) |

## Matching notes

- Domain names (`VmPowerButton`, `ClusterStatusAlert`) still map by **role** (Button, Alert), not by domain nouns.
- A custom component that only adds business logic around a PF primitive is usually a keep; suggest composing PatternFly instead of replacing the domain logic.
- If several PF components fit, pick the one whose examples closest match interaction (e.g. modal confirm vs inline Alert).
