---
name: pf-prototype-mode
description: Enable prototype mode for React apps (grayscale + banner)
---

Enables prototype mode by adding a grayscale filter and prototype banner to a React application.

## Step 1: Ask for Custom Message (Optional)

Ask the user if they want a custom banner message. Default: "This application is a design prototype"

## Step 2: Copy Template Files

Copy the template files from this skill's `scripts/` directory to the user's project:

1. **Read** `scripts/prototype.css` from this skill directory
2. **Write** to `src/prototype.css` in the user's project
3. **Read** `scripts/protoBanner.tsx` from this skill directory  
4. **Write** to `src/components/ProtoBanner.tsx` in the user's project (create `src/components/` if needed)

If a custom message was provided, replace the default message in `ProtoBanner.tsx` before writing it.

## Step 3: Find and Update Entry Point

1. **Find** the React entry point file using bash commands:
   - Try: `src/index.tsx`, `src/index.jsx`, `index.tsx`, `index.jsx`
   - Use `find` or check with `test -f` if needed
   
2. **Read** the entry point file

3. **Check** if `import './prototype.css';` already exists
   - If it exists: skip this step
   - If not: **Edit** to add `import './prototype.css';` after existing imports

## Step 4: Find and Update App Component

1. **Find** the main App component file:
   - Try: `src/App.tsx`, `src/App.jsx`, `App.tsx`, `App.jsx`
   - Use `find` command if needed

2. **Read** the App component file

3. **Check** if ProtoBanner import already exists
   - If not: **Edit** to add `import { ProtoBanner } from './components/ProtoBanner';` after existing imports

4. **Check** if `<ProtoBanner` already exists in the JSX
   - If not: **Edit** to insert `<ProtoBanner />` or `<ProtoBanner message="custom message" />` at the start of the return statement

## Step 5: Verify Changes

Confirm with the user:
- ✅ prototype.css copied to src/
- ✅ ProtoBanner.tsx copied to src/components/
- ✅ CSS import added to entry point
- ✅ ProtoBanner component added to App

Tell the user that prototype mode is enabled and all UI will render in grayscale with a banner.

## Notes

- Always use Read tool before Edit tool
- Use Edit tool (not Write) for modifying existing files
- Check for existing imports/components to avoid duplicates
- The grayscale filter applies to the entire HTML document via CSS
- The ProtoBanner uses PatternFly's Banner component with `isSticky` prop