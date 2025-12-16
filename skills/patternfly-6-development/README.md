# PatternFly 6 Development Skill

A Claude Code skill for developing PatternFly 6 (PF6) React user interfaces with correct patterns and best practices.

## Features

- **Import Pattern Guidance** - Correct import paths for all PatternFly packages
- **Styling Rules** - CSS classes, design tokens, and component composition patterns
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Troubleshooting** - Quick solutions for common PF6 issues
- **Validation Scripts** - Check for incorrect imports and legacy class usage
- **Live Documentation** - Fetch latest docs from GitHub

## Installation

### Option 1: User-Level Installation (Personal Use)

Install the skill for your user account, available across all projects:

```bash
# Clone the repository
git clone https://github.com/patternfly/patternfly-ai-coding.git

# Copy skill to user skills directory
mkdir -p ~/.claude/skills
cp -r patternfly-ai-coding/skills/patternfly-6-development ~/.claude/skills/

# Clean up
rm -rf patternfly-ai-coding
```

Or manually:

```bash
mkdir -p ~/.claude/skills/patternfly-6-development
# Copy all files from this directory to ~/.claude/skills/patternfly-6-development/
```

### Option 2: Project-Level Installation (Team Sharing)

Install the skill in your project for team access via git:

```bash
# From your project root
mkdir -p .claude/skills

# Clone and copy
git clone https://github.com/patternfly/patternfly-ai-coding.git
cp -r patternfly-ai-coding/skills/patternfly-6-development .claude/skills/
rm -rf patternfly-ai-coding

# Commit to share with team
git add .claude/skills/patternfly-6-development
git commit -m "Add PatternFly 6 development skill"
```

### Verify Installation

The skill should automatically activate when you work with PatternFly components. Test by asking Claude Code:

```text
"How do I import PatternFly chart components?"
```

## Usage

### Automatic Activation

The skill activates automatically when Claude Code detects:

- `@patternfly` imports in code
- PatternFly component usage
- Questions about PF6 styling, charts, chatbot, or component-groups
- CSS class questions with `pf-v6-` prefixes

### Manual Reference

You can also explicitly ask about PatternFly topics:

```text
"What's the correct import for PatternFly charts?"
"How do I style a PatternFly card?"
"Fix my PatternFly import errors"
```

### Validation Scripts

Run validation scripts to check for common issues:

```bash
# Check for incorrect import patterns
bash ~/.claude/skills/patternfly-6-development/scripts/check-pf6-imports.sh src/

# Find legacy class usage (pf-v5-, pf-c-)
bash ~/.claude/skills/patternfly-6-development/scripts/check-pf6-classes.sh src/

# Fetch latest documentation
bash ~/.claude/skills/patternfly-6-development/scripts/fetch-latest-docs.sh charts
```

## Skill Contents

```text
patternfly-6-development/
├── SKILL.md              # Main skill instructions
├── IMPORTS.md            # Import patterns for all PF packages
├── STYLING.md            # CSS classes and design tokens
├── TROUBLESHOOTING.md    # Common issues and solutions
├── README.md             # This file
└── scripts/
    ├── check-pf6-imports.sh    # Validate import patterns
    ├── check-pf6-classes.sh    # Find legacy class usage
    └── fetch-latest-docs.sh    # Pull docs from GitHub
```

## Key Rules

### Import Patterns

```jsx
// Charts - MUST include /victory
import { ChartDonut } from '@patternfly/react-charts/victory';

// Chatbot - Use dynamic imports
import { Chatbot } from '@patternfly/chatbot/dist/dynamic/Chatbot';

// Component Groups - Use dynamic imports
import { BulkSelect } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';
```

### Required CSS

```jsx
import '@patternfly/react-core/dist/styles/base.css';
import '@patternfly/patternfly/patternfly-charts.css';      // For charts
import '@patternfly/chatbot/dist/css/main.css';             // For chatbot
import '@patternfly/react-component-groups/dist/css/main.css'; // For component-groups
```

### Version Requirements

- Always use PatternFly v6
- Use `pf-v6-` prefixed classes
- Use `pf-t-` semantic tokens for styling

## Documentation Sources

This skill fetches documentation from:

- [PatternFly AI Coding Repository](https://github.com/patternfly/patternfly-ai-coding)
- [PatternFly.org](https://www.patternfly.org/)

## Contributing

To improve this skill:

1. Fork the [patternfly-ai-coding](https://github.com/patternfly/patternfly-ai-coding) repository
2. Edit files in `skills/patternfly-6-development/`
3. Submit a pull request

## License

This skill is part of the PatternFly project. See the main repository for license information.
