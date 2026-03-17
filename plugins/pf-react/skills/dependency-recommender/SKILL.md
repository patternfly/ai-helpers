---
name: dependency-recommender
description: Analyzes the project's manifests and code patterns, then recommends NPM or other dependencies that would reduce complexity, increase stability, and improve reusability—with a short rationale per recommendation.
disable-model-invocation: true
---

# Dependency Recommender

Recommend dependencies that would help this project reduce complexity, increase stability, and improve reusability. Output a structured list with a clear rationale for each recommendation.

## When to use

Invoke this skill when the user asks for dependency recommendations, library suggestions, "what packages could help this project", or tech-stack / dependency review.

## Instructions

1. **Gather context**
   - Read root and workspace package manifests (`package.json`, `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, or `requirements.txt`, `Cargo.toml`, etc.).
   - Optionally scan source for patterns: manual date handling, custom validators, repeated HTTP/API logic, ad-hoc state, duplicated utilities. Use this to tailor recommendations.

2. **Apply dependency knowledge**
   - Consider widely adopted, well-maintained packages in the project's ecosystem(s).
   - Map common problems (validation, dates, errors, HTTP, state, testing, formatting) to standard solutions.
   - Respect existing stack (e.g. don't suggest a different test runner if one is already standard). Note version/compatibility when relevant.

3. **Produce the output** using the format below. Every recommendation must have a project-specific "Why here" reason—no generic "you could use X" without tying it to this codebase.

## Output format

Use this structure. Group by category (e.g. Validation, Date/time, Testing) when it helps. Omit categories that have no recommendations.

```markdown
## Dependency recommendations for [project or repo name]

### [Category name]
- **[package name]** ([ecosystem], e.g. NPM) – [One-line: what it does.]
  - **Why here:** [Project-specific reason: what in this codebase it would replace, simplify, or improve.]
  - **Note:** [Optional: caveats, integration with existing deps, bundle size, compatibility.]
```

Keep each recommendation concise. Prefer a short, actionable list over long prose.

## Scope

- **In scope:** Recommendations with rationale; grouping by category; multiple ecosystems; project-aware reasons.
- **Out of scope:** Do not modify lockfiles or install packages; do not run security/CVE scans. Focus on analysis and recommendations only.
