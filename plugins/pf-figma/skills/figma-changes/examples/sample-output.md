# Sample Figma Change Report

This is an example of what the skill generates.

---

# Figma Change Summary
**File**: PatternFly Design System
**File Key**: abc123xyz
**Analysis Date**: 2026-03-18
**Change Period**: March 11-18, 2026

## Executive Summary
7 components were updated with significant changes to color tokens and spacing values. The Button component received a major redesign with new hover states, and the Card component padding was increased for better content hierarchy. Typography scale was adjusted globally affecting all heading styles.

## Detailed Changes

### Button (Primary)
**Last Modified**: 2026-03-15 14:32:00
**Modified By**: Sarah Designer
**Change Type**: Modified

#### Property Changes
- **Color Changes**
  - Background: `#0066CC` → `#004080` (variable: `--pf-c-button--m-primary--BackgroundColor`)
  - Hover Background: `#004E99` → `#003366`

- **Typography Changes**
  - Font Weight: `500` → `600` (token: `--pf-c-button--FontWeight`)

- **Spacing Changes**
  - Padding Left/Right: `16px` → `20px` (token: `--pf-c-button--PaddingLeft`)
  - Padding Top/Bottom: `8px` → `10px`

- **Other Changes**
  - Border Radius: `3px` → `4px`
  - Transition Duration: `0.2s` → `0.15s`

---

### Card Component
**Last Modified**: 2026-03-16 09:15:00
**Modified By**: Alex Designer
**Change Type**: Modified

#### Property Changes
- **Color Changes**
  - Border: `#EDEDED` → `#D2D2D2` (variable: `--pf-c-card--BorderColor`)
  - Shadow: Updated shadow definition for elevation

- **Spacing Changes**
  - Padding: `16px` → `24px` (token: `--pf-c-card--first-child--PaddingTop`)
  - Gap between items: `12px` → `16px`

---

### Typography - Headings
**Last Modified**: 2026-03-14 16:00:00
**Modified By**: Jordan Designer
**Change Type**: Modified

#### Property Changes
- **Typography Changes**
  - H2 Font Size: `18px` → `20px` (token: `--pf-global--FontSize--xl`)
  - H3 Font Size: `16px` → `18px` (token: `--pf-global--FontSize--lg`)
  - Line Height: `1.4` → `1.5` (token: `--pf-global--LineHeight--md`)

---

## Token Discrepancies

### Colors
| Figma Property | Figma Value | Token Name | Current Value | Status |
|----------------|-------------|------------|---------------|--------|
| Button Primary BG | `#004080` | `--pf-c-button--m-primary--BackgroundColor` | `#0066CC` | ❌ Mismatch |
| Button Hover BG | `#003366` | `--pf-c-button--m-primary--hover--BackgroundColor` | `#004E99` | ❌ Mismatch |
| Card Border | `#D2D2D2` | `--pf-c-card--BorderColor` | `#EDEDED` | ❌ Mismatch |
| Card Background | `#FFFFFF` | `--pf-c-card--BackgroundColor` | `#FFFFFF` | ✅ Match |

### Typography
| Figma Property | Figma Value | Token Name | Current Value | Status |
|----------------|-------------|------------|---------------|--------|
| H2 Font Size | `20px` | `--pf-global--FontSize--xl` | `18px` | ❌ Mismatch |
| H3 Font Size | `18px` | `--pf-global--FontSize--lg` | `16px` | ❌ Mismatch |
| Body Line Height | `1.5` | `--pf-global--LineHeight--md` | `1.5` | ✅ Match |
| Button Font Weight | `600` | `--pf-c-button--FontWeight` | `500` | ❌ Mismatch |

### Spacing
| Figma Property | Figma Value | Token Name | Current Value | Status |
|----------------|-------------|------------|---------------|--------|
| Card Padding | `24px` | `--pf-c-card--first-child--PaddingTop` | `16px` | ❌ Mismatch |
| Button Padding X | `20px` | `--pf-c-button--PaddingLeft` | `16px` | ❌ Mismatch |
| Button Padding Y | `10px` | `--pf-c-button--PaddingTop` | `8px` | ❌ Mismatch |
| Card Gap | `16px` | `--pf-c-card--child--Gap` | `12px` | ❌ Mismatch |

---

## Action Items Checklist

### High Priority (Breaking Changes / Visual Inconsistencies)
- [ ] Update `--pf-c-button--m-primary--BackgroundColor` from `#0066CC` to `#004080`
  - **Files to update**: `src/patternfly/components/Button/_button.scss`
  - **Impact**: All primary buttons across the application
  - **Reason**: Brand color update for better accessibility (AA contrast)

- [ ] Update `--pf-c-card--BorderColor` from `#EDEDED` to `#D2D2D2`
  - **Files to update**: `src/patternfly/components/Card/_card.scss`
  - **Impact**: All card components
  - **Reason**: Stronger border definition for better component separation

- [ ] Update heading font sizes globally
  - **Files to update**: `src/patternfly/base/tokens/_typography.scss`
  - **Tokens to update**:
    - `--pf-global--FontSize--xl`: `18px` → `20px`
    - `--pf-global--FontSize--lg`: `16px` → `18px`
  - **Impact**: All H2 and H3 headings
  - **Reason**: Typography scale adjustment for better hierarchy

### Medium Priority (Minor Adjustments)
- [ ] Update card padding `--pf-c-card--first-child--PaddingTop` from `16px` to `24px`
  - **Files to update**: `src/patternfly/components/Card/_card.scss`
  - **Impact**: Card component spacing
  - **Reason**: Increased padding for better content breathing room

- [ ] Update button padding tokens
  - **Files to update**: `src/patternfly/components/Button/_button.scss`
  - **Tokens to update**:
    - `--pf-c-button--PaddingLeft`: `16px` → `20px`
    - `--pf-c-button--PaddingTop`: `8px` → `10px`
  - **Impact**: All button sizes
  - **Reason**: Better proportion and touch target size

- [ ] Update button font weight `--pf-c-button--FontWeight` from `500` to `600`
  - **Files to update**: `src/patternfly/components/Button/_button.scss`
  - **Impact**: Button text styling
  - **Reason**: Improved readability and emphasis

### Low Priority (Enhancements)
- [ ] Update button border radius from `3px` to `4px`
  - **Files to update**: `src/patternfly/components/Button/_button.scss`
  - **Impact**: Button corners
  - **Reason**: Subtle softening of corners

- [ ] Update button transition duration from `0.2s` to `0.15s`
  - **Files to update**: `src/patternfly/components/Button/_button.scss`
  - **Impact**: Button hover/active states
  - **Reason**: Snappier interaction feedback

- [ ] Update card shadow definition
  - **Files to update**: `src/patternfly/components/Card/_card.scss`
  - **Impact**: Card elevation appearance
  - **Reason**: Refined shadow for better depth perception

---

## Next Steps

1. **Review with Team**: Share this report with design and development teams
2. **Prioritize Updates**: Decide which changes to implement in the next sprint
3. **Create Tickets**: Break down action items into JIRA/GitHub issues
4. **Test Changes**: Ensure visual regression testing covers updated components
5. **Document Updates**: Update component documentation with new token values
6. **Schedule Next Sync**: Set up recurring Figma sync checks (recommended: weekly)

## References
- Figma File: https://www.figma.com/file/abc123xyz/PatternFly-Design-System
- Token Files:
  - `src/patternfly/base/tokens/_colors.scss`
  - `src/patternfly/base/tokens/_typography.scss`
  - `src/patternfly/base/tokens/_spacing.scss`
- Last Sync Date: 2026-03-11
- Next Recommended Sync: 2026-03-25
