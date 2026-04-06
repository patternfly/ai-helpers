---
name: pf-tokens
description: Build CSS design tokens for PatternFly core and copy them to the PatternFly repository.
---

Build CSS design tokens for PatternFly core and move them to the PatternFly repository.

## What to do

1. Build the SCSS for PatternFly core using the `build:scss:core` script
2. Copy the generated CSS files from the build output to the PatternFly repository's token directory (PatternFly is typically cloned as a sibling directory)

## Expected outcome

The PatternFly repository's `src/patternfly/base/tokens/` directory contains the freshly built CSS token files from this repository's build output at `packages/module/build/css/`.

