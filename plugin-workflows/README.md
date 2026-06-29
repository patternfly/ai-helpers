# Plugin Workflows

Workflow integration files that define which PatternFly skills to invoke
before or after harness workflows. Organized by consumer harness.

## Structure

```
plugin-workflows/
  <harness-name>/
    patternfly.md    — PF skills mapped to that harness's workflows
```

Each harness gets its own subdirectory. The file inside is named after the
plugin (`patternfly.md`) so it arrives correctly in the workspace when the
harness copies it during setup.

## How it works

1. A harness (e.g., `aap-sdlc-harness`) has a generic `CLAUDE.md` pointer
   that says "check `plugin-workflows/` before starting any workflow"
2. During container setup, the harness copies `plugin-workflows/<harness-name>/*.md`
   from each installed plugin into the workspace
3. The model reads the matching file and invokes PF skills as pre/post-steps

## Adding a new harness integration

1. Create a subdirectory named after the harness (e.g., `firefly/`)
2. Add `patternfly.md` with sections mapping PF skills to that harness's workflows
3. Use explicit workflow names in headers: `### After /code-review`
