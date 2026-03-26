---
name: analyze-modifiers
description: Find, list, and summarize PatternFly component modifiers (pf-m- classes) across the codebase
---

# Analyze Modifiers Skill

This skill helps you discover, understand, and document PatternFly modifier classes (pf-m- classes) across components.

## What This Skill Does

When invoked, the assistant will:
1. Search through PatternFly component SCSS files to extract all modifier classes (pf-m-*)
2. Analyze what each modifier does based on the CSS properties it applies
3. Create a comprehensive summary organized by your preference
4. Provide usage statistics and insights

## Output Format

The default output should be a markdown file with:

### Summary Section
- Total unique modifiers found
- Total components analyzed
- Top 5 most frequently used modifiers (with count)
- Top 5 components with the most modifiers (with count)

### Modifier Listings

**Default Organization: By Modifier (Alphabetical)**
```markdown
## pf-m-{modifier-name}
- Component1
- Component2
```

**Alternative Organization: By Component**
```markdown
## Component Name
- pf-m-modifier1
- pf-m-modifier2
```

## Usage Examples

### Example 1: Analyze all modifiers
```
User: /analyze-modifiers
```
Expected: Create a complete listing of all modifiers across all components, organized alphabetically by modifier name.

### Example 2: Analyze specific component
```
User: /analyze-modifiers for the Button component
```
Expected: List all modifiers used in the Button component with brief descriptions of what they do.

### Example 3: Find modifier usage
```
User: /analyze-modifiers find where pf-m-disabled is used
```
Expected: List all components that use the pf-m-disabled modifier and show the CSS properties it applies in each context.

### Example 4: Compare modifiers
```
User: /analyze-modifiers compare pf-m-expanded and pf-m-collapsed
```
Expected: Show which components use each modifier and explain the differences in behavior.

## Instructions for the Assistant

### Step 1: Determine Scope
Identify what the user wants to analyze:
- All components (default)
- Specific component(s)
- Specific modifier(s)
- Components in a specific directory

### Step 2: Search for Modifiers
1. Use Glob to find relevant SCSS files: `src/patternfly/components/**/*.scss`
2. Use Grep to extract modifier patterns: `&\.pf-m-[\w-]+|\.pf-m-[\w-]+`
3. For each modifier found, note the component name (derived from file path)

### Step 3: Extract Modifier Details
For each modifier, determine:
- What CSS properties it modifies (if user asks for details)
- Which elements it applies to (component root, specific child elements)
- Any state changes it represents (expanded, disabled, current, etc.)
- Responsive variants (on-sm, on-md, on-lg, on-xl, on-2xl)

### Step 4: Organize Results
Create a structured summary based on the user's request:
- **By modifier**: Group components under each modifier name
- **By component**: Group modifiers under each component name
- **Statistical**: Show usage patterns, most common modifiers, etc.

### Step 5: Generate Output
Write results to a markdown file named appropriately:
- `modifiers-listing.md` for complete listings
- `{component-name}-modifiers.md` for component-specific analysis
- `{modifier-name}-usage.md` for modifier-specific analysis

## Output Quality Guidelines

### Be Comprehensive
- Don't miss modifiers in nested selectors
- Include responsive variants (pf-m-expandable-on-md, etc.)
- Capture pseudo-state modifiers (:hover, :focus contexts)
- Note element-specific modifiers (pf-v6-c-component__item.pf-m-current)

### Be Clear
- Use consistent component names (Title, not title)
- Alphabetize lists for easy scanning
- Use proper markdown formatting for readability
- Include clear section headers

### Provide Context
In the summary section, highlight:
- Patterns in modifier usage (many components use pf-m-disabled)
- Outliers (Table has 67 modifiers vs average of 15)
- Design system conventions (color modifiers: red, blue, green, orange, etc.)

## Common Modifier Categories

Help users understand patterns by grouping related modifiers:

### State Modifiers
- pf-m-disabled, pf-m-active, pf-m-current, pf-m-selected, pf-m-hover, pf-m-focus

### Size Modifiers
- pf-m-sm, pf-m-md, pf-m-lg, pf-m-xl, pf-m-2xl, pf-m-compact

### Layout Modifiers
- pf-m-vertical, pf-m-horizontal, pf-m-inline, pf-m-block, pf-m-grid

### Visual Modifiers
- pf-m-plain, pf-m-bordered, pf-m-raised, pf-m-filled, pf-m-outline

### Color Modifiers
- pf-m-red, pf-m-blue, pf-m-green, pf-m-orange, pf-m-purple, pf-m-teal, pf-m-yellow

### Responsive Modifiers
- pf-m-{base}-on-sm, pf-m-{base}-on-md, pf-m-{base}-on-lg, pf-m-{base}-on-xl, pf-m-{base}-on-2xl

### Semantic/Status Modifiers
- pf-m-success, pf-m-warning, pf-m-danger, pf-m-info, pf-m-custom

## Edge Cases to Handle

### Multiple Component Files
Some components have multiple SCSS files (e.g., Table: table.scss, table-grid.scss, table-tree-view.scss). Consolidate these under a single component name.

### Incomplete Modifier Patterns
Some modifiers use dynamic values:
- `pf-m-align-items-*` (various alignment values)
- `pf-m-width-*` (percentage values)
- `pf-m-inset-*` (spacing values)

List these with asterisk notation and note they represent a pattern.

### Deprecated or Internal Modifiers
If you encounter modifiers that seem internal or temporary (e.g., pf-m-initializing-accent), still include them but note if they appear to be internal.

## Error Handling

If the search returns no results:
- Verify the file path pattern is correct for the codebase structure
- Check if components are organized differently
- Suggest the user verify the working directory

If the output is extremely large:
- Offer to create separate files (one per component)
- Provide summary statistics only
- Allow filtering by component or modifier pattern

## Success Criteria

A successful execution should:
1. Find all modifier classes in the specified scope
2. Organize results clearly and logically
3. Provide actionable statistics and insights
4. Create a well-formatted markdown file
5. Complete in a reasonable time (under 5 minutes for full codebase)

## Related Skills

This skill complements:
- Component documentation generation
- CSS audit and optimization
- Accessibility review (modifier states)
- Design token validation
