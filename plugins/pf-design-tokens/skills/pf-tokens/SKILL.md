# pf-tokens

Build CSS tokens for PatternFly core and copy them to the PatternFly repository.

## Steps

1. Build the SCSS for PatternFly core
2. Copy the generated CSS files to the PatternFly repository (assumed to be in a sibling directory)

## Implementation

```bash
# Build SCSS for PatternFly core
npm run build:scss:core

# Copy generated CSS to PatternFly repository
cp packages/module/build/css/* ../patternfly/src/patternfly/base/tokens/
```

## Prerequisites

- The PatternFly repository must be cloned as a sibling directory to this repository
- The build:scss:core npm script must be defined in package.json

## Usage

Run this skill with:
```
/pf-tokens
```

