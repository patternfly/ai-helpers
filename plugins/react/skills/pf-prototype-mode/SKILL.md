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
3. **Read** `scripts/ProtoBanner.tsx` from this skill directory  
4. **Write** to `src/components/ProtoBanner.tsx` in the user's project (create `src/components/` if needed)

If a custom message was provided, replace the default message in `ProtoBanner.tsx` before writing it.

## Step 3: Find and Update Entry Point

1. **Find** the React entry point file using bash commands:
   - Try: `src/index.tsx`, `src/index.jsx`, `index.tsx`, `index.jsx`
   - Use `find` or check with `test -f` if needed
   
2. **Read** the entry point file

3. **Determine the correct import path** based on file location:
   - If file is under `src/`: use `./prototype.css`
   - If file is at root level: use `./src/prototype.css`

4. **Check** if prototype CSS import already exists
   - If it exists: skip this step
   - If not: **Edit** to add the import (with correct path) after existing imports

## Step 4: Find and Update App Component

1. **Find** the main App component file:
   - Try: `src/App.tsx`, `src/App.jsx`, `App.tsx`, `App.jsx`
   - Use `find` command if needed

2. **Read** the App component file

3. **Determine the correct import path** based on file location:
   - If file is under `src/`: use `./components/ProtoBanner`
   - If file is at root level: use `./src/components/ProtoBanner`

4. **Check** if ProtoBanner import already exists
   - If not: **Edit** to add the import (with correct path) after existing imports

5. **Check** if `<ProtoBanner` already exists in the JSX
   - If not: **Edit** to insert `<ProtoBanner />` or `<ProtoBanner message="custom message" />` at the start of the return statement

## Step 5: Verify Changes

Confirm with the user:
- ✅ prototype.css copied to src/
- ✅ ProtoBanner.tsx copied to src/components/
- ✅ CSS import added to entry point
- ✅ ProtoBanner component added to App

Tell the user that prototype mode is enabled. The banner includes a "Grayscale Mode" toggle switch to turn the grayscale filter on/off for prototyping.

## Notes

- Always use Read tool before Edit tool
- Use Edit tool (not Write) for modifying existing files
- Check for existing imports/components to avoid duplicates
- The grayscale filter applies when the `prototype-grayscale` class is on the `<html>` element (toggled via Switch in ProtoBanner)
- The ProtoBanner uses PatternFly's Banner component with `isSticky` prop and includes a Switch to toggle grayscale mode