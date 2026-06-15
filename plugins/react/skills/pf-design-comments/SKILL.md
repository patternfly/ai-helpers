---
name: pf-design-comments
description: Integrate @patternfly/design-comments into React apps for on-page design feedback, pinned comment threads, GitHub Issues sync, and Jira linking. Use when adding design comments, review overlays, or removing the commenting system from a PatternFly React project.
---

# PF Design Comments

Add the [@patternfly/design-comments](https://github.com/patternfly/design-comments) floating comment overlay to the user's React app. The package pins feedback to UI elements, detects React components, and optionally syncs with GitHub Issues and Jira.

## When to use

- User asks to add design comments, a comment overlay, or in-app design review
- User wants GitHub Issues or Jira linked to specific pages or components
- User wants to remove or uninstall design comments

## Prerequisites

Confirm before installing:

- React 18+ and Node.js 18+
- Webpack-based dev setup with `webpack.dev.js` (required for OAuth/Jira/summarize proxy middleware)
- `src/app/` layout similar to [PatternFly React Seed](https://github.com/patternfly/patternfly-react-seed)
- Peer deps present or installable: `@patternfly/react-core`, `@patternfly/react-icons`, `react-router-dom` v7

If the project uses Vite, Create React App, or a different folder layout, warn the user that `npx design-comments init` may fail or need manual integration. Offer to scaffold with `pf-project-scaffolder` first when starting from scratch.

## Install workflow

### Step 1: Inspect the project

1. Read `package.json` for React, PatternFly, and router versions.
2. Confirm `src/app/index.tsx`, `src/app/routes.tsx`, and `src/app/AppLayout/AppLayout.tsx` exist (or note gaps).
3. Confirm `webpack.dev.js` exists at the project root or under a config folder the dev script uses.

### Step 2: Install the package

Use the scoped npm package name:

```bash
npm install @patternfly/design-comments
```

Use `yarn add @patternfly/design-comments` if the project uses Yarn.

### Step 3: Run the integration CLI

```bash
npx design-comments init
```

The CLI is interactive. It will:

- Wrap the app with `CommentProvider` and `GitHubAuthProvider` in `src/app/index.tsx`
- Add a Comments route in `src/app/routes.tsx`
- Add `CommentPanel` and `CommentOverlay` in `src/app/AppLayout/AppLayout.tsx`
- Patch `webpack.dev.js` with proxy middleware for GitHub OAuth, Jira, and optional AI summaries
- Create `src/app/Comments/Comments.tsx` and env templates

Let the user answer prompts for GitHub OAuth and Jira. Both are optional — the overlay works without them.

### Step 4: Configure environment files

After `init`, guide the user through env setup:

**`.env`** (client-safe values, may be committed)

- GitHub OAuth client ID
- Jira base URL

**`.env.server`** (secrets — should stay in `.gitignore`)

- GitHub OAuth client secret
- Jira API tokens
- Optional AI summary keys: `MAAS_API_KEY`, `MAAS_ENDPOINT_URL`, `MAAS_MODEL` (default `gpt-4o-mini`)

See `GITHUB_OAUTH_ENV_TEMPLATE.md` in the package for OAuth setup details.

For production builds, set `SUMMARIZE_API_URL` when building so the client calls a hosted summarization endpoint. Do not put private API keys in client-bundled `.env` values.

### Step 5: Verify

1. Run the project's dev command (usually `npm run start:dev`).
2. Confirm the floating comment widget appears.
3. Test hover preview, pin creation, and the Comments sidebar.

Report what changed:

- Package added to `package.json`
- Files modified by `init` (index, routes, AppLayout, webpack)
- New Comments page and env files created

## Uninstall workflow

**Always run remove before uninstalling.** The package modifies project files.

```bash
npx design-comments remove
npm uninstall @patternfly/design-comments
```

Then restart the dev server.

If the user already uninstalled without running `remove` and the app is broken:

```bash
npm install @patternfly/design-comments
npx design-comments remove
npm uninstall @patternfly/design-comments
```

The remove script reverses integration in `src/app/index.tsx` and `src/app/AppLayout/AppLayout.tsx`. Webpack middleware changes may need manual cleanup. `.env` and `.env.server` are kept intentionally.

## Usage reference (for the user)

After integration:

1. Hover a component to preview with a dashed border and label
2. Click to pin a comment — React component name, type, tree path, and props are captured
3. Use the widget to toggle visibility, resize the panel, reply in threads, and sync with GitHub/Jira when configured

Optional AI summaries (Summarize all threads / this page / this thread) need the local webpack proxy or a production `SUMMARIZE_API_URL` backend.

## Manual integration fallback

If `init` cannot run, read the package README and `scripts/README.md` from `node_modules/@patternfly/design-comments/` and apply the same changes by hand:

- Providers in the app entry
- Comments route
- `CommentPanel` + `CommentOverlay` in the main layout
- Webpack dev middleware for integrations

Import components from `@patternfly/design-comments` (package main: `src/commenting-system/index.ts`).

## Notes

- Run `init` only once per project unless the user asks to re-run after a failed partial install (the script is idempotent)
- Use git so the user can review integration diffs before committing
- For issues with the package itself, point to https://github.com/patternfly/design-comments/issues
