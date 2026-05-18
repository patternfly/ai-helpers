#!/usr/bin/env node

/**
 * CSS Variable Analyzer for PatternFly
 *
 * Analyzes CSS variable usage, redefinitions, and naming patterns
 * in PatternFly component SCSS files.
 */

const fs = require('fs');
const path = require('path');

class CSSVariableAnalyzer {
  constructor(options = {}) {
    this.options = options;
    this.scssVariables = new Map(); // $tabs -> pf-v6-c-tabs
    this.definitions = []; // All variable definitions with context
    this.usages = []; // All variable usages
    this.redefinitions = new Map(); // Variable -> array of definition contexts
    this.issues = {
      undefined: [],
      unused: [],
      namingViolations: []
    };
  }

  /**
   * Main analysis entry point
   */
  analyze(componentNames, baseDir = 'src/patternfly') {
    // Step 1: Load SCSS variable mappings
    this.loadScssVariables(path.join(baseDir, 'sass-utilities/namespaces-components.scss'));

    // Step 2: Find and parse component files
    const files = this.findComponentFiles(componentNames, baseDir);

    for (const file of files) {
      this.parseFile(file);
    }

    // Step 3: Build redefinition chains
    this.buildRedefinitionChains();

    // Step 4: Detect issues
    this.detectIssues();

    return this.generateReport();
  }

  /**
   * Load SCSS variable mappings from namespaces file
   */
  loadScssVariables(namespacesFile) {
    try {
      const content = fs.readFileSync(namespacesFile, 'utf8');
      const lines = content.split('\n');

      // Match: $tabs: #{$pf-prefix} + 'c-tabs';
      const varPattern = /^\$([a-z-]+):\s*#\{[^}]+\}\s*\+\s*'([^']+)';/;

      for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(varPattern);
        if (match) {
          const [, varName, suffix] = match;
          // Assumes $pf-prefix = 'pf-v6-'
          this.scssVariables.set(varName, `pf-v6-${suffix}`);
        }
      }
    } catch (error) {
      console.error(`Error loading SCSS variables: ${error.message}`);
    }
  }

  /**
   * Find all SCSS files for given component names
   */
  findComponentFiles(componentNames, baseDir) {
    const files = [];
    const componentsDir = path.join(baseDir, 'components');

    for (const name of componentNames) {
      // Convert kebab-case or lowercase to PascalCase (tabs -> Tabs, data-list -> DataList)
      const componentDir = name
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
      const componentPath = path.join(componentsDir, componentDir);

      if (fs.existsSync(componentPath)) {
        const dirFiles = fs.readdirSync(componentPath);
        for (const file of dirFiles) {
          if (file.endsWith('.scss') || file.endsWith('.css')) {
            files.push(path.join(componentPath, file));
          }
        }
      } else {
        console.error(`Component directory not found: ${componentPath} (input: "${name}")`);
      }
    }

    return files;
  }

  /**
   * Parse a single SCSS file
   */
  parseFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let currentContext = {
      file: filePath,
      scope: 'root',
      selector: '',
      nesting: 0
    };

    const contextStack = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Track context changes
      this.updateContext(line, currentContext, contextStack);

      // Parse variable definitions
      this.parseDefinitions(line, lineNum, currentContext);

      // Parse variable usages
      this.parseUsages(line, lineNum, currentContext);
    }
  }

  /**
   * Update parsing context based on line content
   */
  updateContext(line, context, stack) {
    const trimmed = line.trim();

    // Check for opening braces
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;

    // Track pf-root
    if (trimmed.includes('@include pf-root(')) {
      const match = trimmed.match(/@include pf-root\(\$([^)]+)\)/);
      if (match) {
        stack.push({ ...context });
        context.scope = 'root';
        context.selector = `pf-root($${match[1]})`;
      }
    }

    // Track modifiers
    else if (trimmed.match(/&?\.(pf-m-[\w-]+)/)) {
      const match = trimmed.match(/&?\.(pf-m-[\w-]+)/);
      if (match && openBraces > 0) {
        stack.push({ ...context });
        context.scope = 'modifier';
        context.selector = match[1];
      }
    }

    // Track states
    else if (trimmed.match(/&:(hover|focus|disabled|active)/)) {
      const match = trimmed.match(/&:(hover|focus|disabled|active)/);
      if (match && openBraces > 0) {
        stack.push({ ...context });
        context.scope = 'state';
        context.selector = `:${match[1]}`;
      }
    }

    // Track media queries
    else if (trimmed.includes('@media')) {
      stack.push({ ...context });
      context.scope = 'media-query';
      context.selector = trimmed;
    }

    // Track breakpoints
    else if (trimmed.includes('@include pf-v6-apply-breakpoint')) {
      const match = trimmed.match(/@include pf-v6-apply-breakpoint\(([^)]+)\)/);
      if (match) {
        stack.push({ ...context });
        context.scope = 'breakpoint';
        context.selector = `breakpoint(${match[1]})`;
      }
    }

    // Handle closing braces
    if (closeBraces > openBraces) {
      const diff = closeBraces - openBraces;
      for (let i = 0; i < diff && stack.length > 0; i++) {
        const prev = stack.pop();
        Object.assign(context, prev);
      }
    }
  }

  /**
   * Parse CSS variable definitions from a line
   */
  parseDefinitions(line, lineNum, context) {
    // Pattern 1: --#{$var}--property or --#{$var}__element: value;
    const interpolatedPattern = /--#\{\$([a-z-]+)\}((?:--|__)[\w-]+):\s*([^;]+);/g;
    let match;

    while ((match = interpolatedPattern.exec(line)) !== null) {
      const [fullMatch, scssVar, property, value] = match;
      const fullVarName = `--#{$${scssVar}}${property}`;

      this.definitions.push({
        variable: fullVarName,
        scssVar,
        property,
        value: value.trim(),
        line: lineNum,
        file: context.file,
        scope: context.scope,
        selector: context.selector,
        interpolated: true
      });
    }

    // Pattern 2: --pf-v6-c-component--property: value; (hardcoded, violation)
    const hardcodedPattern = /--(pf-v6-c-[\w-]+):\s*([^;]+);/g;

    while ((match = hardcodedPattern.exec(line)) !== null) {
      // Skip if it's inside var() function
      if (line.substring(0, match.index).includes('var(')) continue;

      const [fullMatch, varName, value] = match;

      // Check if it's NOT using interpolation
      if (!line.includes('#{')) {
        this.definitions.push({
          variable: `--${varName}`,
          scssVar: null,
          property: varName.substring(varName.indexOf('--', 2)),
          value: value.trim(),
          line: lineNum,
          file: context.file,
          scope: context.scope,
          selector: context.selector,
          interpolated: false
        });

        this.issues.namingViolations.push({
          variable: `--${varName}`,
          line: lineNum,
          file: context.file,
          reason: 'Hardcoded variable name instead of using SCSS interpolation'
        });
      }
    }
  }

  /**
   * Parse CSS variable usages from a line
   */
  parseUsages(line, lineNum, context) {
    // Pattern 1: Interpolated variables --#{$var}--property or --#{$var}__element
    const interpolatedPattern = /(--#\{[^}]+\}(?:__|--)?[\w-]*)/g;
    let match;

    while ((match = interpolatedPattern.exec(line)) !== null) {
      const varName = match[1];

      // Skip if it's a definition (has : after it)
      const afterMatch = line.substring(match.index + varName.length).trim();
      if (afterMatch.startsWith(':')) continue;

      this.usages.push({
        variable: varName,
        line: lineNum,
        file: context.file,
        scope: context.scope,
        selector: context.selector
      });
    }

    // Pattern 2: Hardcoded variables --pf-v6-... (only in var() context)
    const hardcodedPattern = /var\((--pf-v6-[\w-]+)/g;

    while ((match = hardcodedPattern.exec(line)) !== null) {
      const varName = match[1];

      this.usages.push({
        variable: varName,
        line: lineNum,
        file: context.file,
        scope: context.scope,
        selector: context.selector
      });
    }
  }

  /**
   * Build redefinition chains
   */
  buildRedefinitionChains() {
    // Group definitions by variable name
    const defsByVar = new Map();

    for (const def of this.definitions) {
      if (!defsByVar.has(def.variable)) {
        defsByVar.set(def.variable, []);
      }
      defsByVar.get(def.variable).push(def);
    }

    // Sort by file and line number, track as redefinition chain
    for (const [varName, defs] of defsByVar) {
      if (defs.length > 1) {
        defs.sort((a, b) => {
          if (a.file !== b.file) return a.file.localeCompare(b.file);
          return a.line - b.line;
        });
        this.redefinitions.set(varName, defs);
      }
    }
  }

  /**
   * Detect undefined and unused variables
   */
  detectIssues() {
    // Build sets for quick lookup
    const definedVars = new Set(this.definitions.map(d => d.variable));
    const usedVars = new Set(this.usages.map(u => u.variable));

    // Find undefined (used but not defined)
    for (const usage of this.usages) {
      if (!definedVars.has(usage.variable)) {
        // Check if already reported
        if (!this.issues.undefined.find(u => u.variable === usage.variable)) {
          this.issues.undefined.push({
            variable: usage.variable,
            line: usage.line,
            file: usage.file
          });
        }
      }
    }

    // Find unused (defined but not used)
    for (const def of this.definitions) {
      // Skip if it's a redefinition of a used variable
      if (usedVars.has(def.variable)) continue;

      // Check if this variable is used in any form
      const isUsed = this.usages.some(u => {
        // Exact match
        if (u.variable === def.variable) return true;

        // Check if interpolated version is used
        if (def.interpolated) {
          const expanded = def.variable.replace(
            `--#{$${def.scssVar}}`,
            `--${this.scssVariables.get(def.scssVar) || def.scssVar}`
          );
          if (u.variable === expanded) return true;
        }

        return false;
      });

      if (!isUsed) {
        // Only report if it's the first definition (not a redefinition)
        const allDefs = this.definitions.filter(d => d.variable === def.variable);
        if (allDefs[0] === def) {
          this.issues.unused.push({
            variable: def.variable,
            line: def.line,
            file: def.file
          });
        }
      }
    }
  }

  /**
   * Generate analysis report
   */
  generateReport() {
    const totalVars = new Set(this.definitions.map(d => d.variable)).size;
    const redefinedCount = this.redefinitions.size;
    const redefinedPct = totalVars > 0 ? Math.round((redefinedCount / totalVars) * 100) : 0;

    return {
      summary: {
        totalVariables: totalVars,
        redefinedVariables: redefinedCount,
        redefinedPercentage: redefinedPct,
        undefinedVariables: this.issues.undefined.length,
        unusedVariables: this.issues.unused.length,
        namingViolations: this.issues.namingViolations.length
      },
      issues: this.issues,
      redefinitions: Object.fromEntries(this.redefinitions),
      definitions: this.definitions,
      usages: this.usages,
      scssVariables: Object.fromEntries(this.scssVariables)
    };
  }

  /**
   * Get redefinition chain for a specific variable
   */
  getRedefinitionChain(variableName) {
    // Handle both formats: --#{$var}--prop or --pf-v6-c-var--prop
    let chain = this.redefinitions.get(variableName);

    if (!chain) {
      // Try to find by pattern matching
      for (const [key, value] of this.redefinitions) {
        if (key.includes(variableName) || variableName.includes(key.replace(/[{}$#]/g, ''))) {
          chain = value;
          break;
        }
      }
    }

    return chain || [];
  }

  /**
   * Get variables for a specific modifier
   */
  getModifierVariables(modifierName) {
    const modifierClass = modifierName.startsWith('pf-m-') ? modifierName : `pf-m-${modifierName}`;

    return this.definitions.filter(def =>
      def.scope === 'modifier' && def.selector && def.selector.includes(modifierClass)
    );
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node css-var-analyzer.js <component> [component2...] [--variable=name] [--modifier=name]');
    process.exit(1);
  }

  const components = [];
  let variable = null;
  let modifier = null;

  for (const arg of args) {
    if (arg.startsWith('--variable=')) {
      variable = arg.substring('--variable='.length);
    } else if (arg.startsWith('--modifier=')) {
      modifier = arg.substring('--modifier='.length);
    } else {
      components.push(arg);
    }
  }

  const analyzer = new CSSVariableAnalyzer();
  const baseDir = process.env.PATTERNFLY_DIR || 'src/patternfly';
  const result = analyzer.analyze(components, baseDir);

  // Output as JSON for Claude to parse
  console.log(JSON.stringify({
    result,
    options: { variable, modifier }
  }, null, 2));
}

module.exports = CSSVariableAnalyzer;
