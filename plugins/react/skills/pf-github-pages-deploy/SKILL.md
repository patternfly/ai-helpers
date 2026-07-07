---
name: pf-github-pages-deploy
description: Deploy a PatternFly React project to GitHub Pages using pfcli deploy. Use when publishing a prototype, sharing a demo URL, deploying to GitHub Pages, or when the user mentions pfcli deploy.
disable-model-invocation: true
---

# Deploy to GitHub Pages with pfcli

Build the project and publish it to GitHub Pages with a single command. `pfcli deploy` runs the build, configures asset paths for project pages, enables GitHub Pages when possible, and pushes to the `gh-pages` branch.

## Prerequisites

Verify before deploying:

1. **PatternFly CLI** — `pfcli --version` or `patternfly-cli --version`. If missing, install from [patternfly/patternfly-cli](https://github.com/patternfly/patternfly-cli).
2. **GitHub CLI** — `gh auth status` must show a logged-in account with repo access.
3. **Git remote** — the project must have an `origin` remote pointing at GitHub (`git remote get-url origin`). If missing, run `pfcli init` first.
4. **Build script** — `package.json` must define a `build` script unless deploying prebuilt output with `--no-build`.

Run from the project root (or pass the path as the final argument).

## Deploy workflow

```text
Task progress:
- [ ] Confirm prerequisites
- [ ] Commit or stash uncommitted work if the user wants a clean deploy
- [ ] Run pfcli deploy
- [ ] Share the live URL with the user
```

### Step 1: Confirm the project is ready

From the project root:

```bash
test -f package.json && git remote get-url origin
gh auth status
```

If there is no GitHub remote, run `pfcli init` in the project directory and follow its prompts to create or connect a repository.

If the user has uncommitted changes they want on GitHub before deploying, run `pfcli save` first.

### Step 2: Deploy

Default deploy (build + publish `dist/` to `gh-pages`):

```bash
pfcli deploy
```

Common options:

| Flag | Purpose |
|------|---------|
| `-d, --dist-dir <dir>` | Output folder (default: `dist`) |
| `--no-build` | Deploy existing build output only |
| `-b, --branch <branch>` | Deploy branch (default: `gh-pages`) |
| `--base <path>` | Override public asset path (default: derived from repo name) |

Examples:

```bash
# Deploy a project in another directory
pfcli deploy ./my-app

# CRA or webpack output in build/
pfcli deploy -d build

# Skip build when dist/ is already built
pfcli deploy --no-build

# User/org site served from root (e.g. owner.github.io)
pfcli deploy --base /
```

For project repos (`github.com/owner/my-app`), `pfcli deploy` automatically sets Vite `--base`, webpack `ASSET_PATH`, or CRA `PUBLIC_URL` to `/<repo>/`.

If the app uses React Router, remind the user to set `basename` to match the public path (e.g. `<BrowserRouter basename="/my-app">`).

### Step 3: Share the result

On success, the CLI prints the live URL:

- Project page: `https://<owner>.github.io/<repo>/`
- User/org page: `https://<owner>.github.io/`

Tell the user the URL may take a minute to update on first deploy. If Pages is not enabled, they can set **Settings → Pages → Source** to the `gh-pages` branch.

## Troubleshooting

| Error | Likely cause | Fix |
|-------|--------------|-----|
| `Please save your changes first...` | No `origin` remote | Run `pfcli init` or add `git remote add origin ...` |
| `No package.json found` | Wrong directory | `cd` to project root or pass the path |
| `No "build" script found` | Missing build script | Add `"build"` to `package.json` or use `--no-build -d <dir>` |
| `Build output directory "dist" does not exist` | Wrong output dir or failed build | Fix the build or pass `-d` with the correct folder |
| Blank page or missing assets | Wrong base path | Re-deploy; for custom hosting use `--base /<repo>/` |
| `gh auth` failures | GitHub CLI not authenticated | Run `gh auth login` |

Do not manually configure GitHub Actions or gh-pages npm scripts when `pfcli deploy` is available — the CLI handles build env vars, SPA `404.html`, and Pages setup.
