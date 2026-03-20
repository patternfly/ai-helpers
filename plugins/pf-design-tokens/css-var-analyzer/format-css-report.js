#!/usr/bin/env node

/**
 * Format CSS Variable Analysis Report
 *
 * Takes JSON output from css-var-analyzer.js and formats it as markdown
 */

function formatSummaryReport(data, componentNames) {
  const { result, options } = data;
  const { summary, issues, redefinitions } = result;

  const componentList = componentNames.join(', ');
  let report = `# CSS Variable Analysis: ${componentList}\n\n`;

  // Summary section
  report += `## Summary\n`;
  report += `- **Total variables defined**: ${summary.totalVariables}\n`;
  report += `- **Variables redefined**: ${summary.redefinedVariables} (${summary.redefinedPercentage}%)\n`;
  report += `- **Undefined variables**: ${summary.undefinedVariables}\n`;
  report += `- **Unused variables**: ${summary.unusedVariables}\n`;
  report += `- **Naming violations**: ${summary.namingViolations}\n\n`;

  // Issues section
  if (issues.undefined.length > 0 || issues.unused.length > 0 || issues.namingViolations.length > 0) {
    report += `## Issues\n\n`;

    // Undefined variables (but filter out global theme tokens which are expected)
    const componentUndefined = issues.undefined.filter(u =>
      !u.variable.includes('--pf-t--global--') &&
      !u.variable.includes('--pf-v6-global--')
    );

    if (componentUndefined.length > 0) {
      report += `### Undefined Variables\n`;
      report += `Variables used but never defined in this component:\n\n`;
      for (const issue of componentUndefined.slice(0, 10)) {
        const fileName = issue.file.split('/').pop();
        report += `- \`${issue.variable}\` (used in ${fileName}:${issue.line})\n`;
      }
      if (componentUndefined.length > 10) {
        report += `- ... and ${componentUndefined.length - 10} more\n`;
      }
      report += `\n`;
    }

    // Unused variables
    if (issues.unused.length > 0) {
      report += `### Unused Variables\n`;
      report += `Variables defined but never used:\n\n`;
      for (const issue of issues.unused.slice(0, 10)) {
        const fileName = issue.file.split('/').pop();
        report += `- \`${issue.variable}\` (defined in ${fileName}:${issue.line})\n`;
      }
      if (issues.unused.length > 10) {
        report += `- ... and ${issues.unused.length - 10} more\n`;
      }
      report += `\n`;
    }

    // Naming violations
    if (issues.namingViolations.length > 0) {
      report += `### Naming Violations\n`;
      report += `Variables not following --pf-v6- pattern or not using SCSS interpolation:\n\n`;
      for (const issue of issues.namingViolations) {
        const fileName = issue.file.split('/').pop();
        report += `- \`${issue.variable}\` (${fileName}:${issue.line}) - ${issue.reason}\n`;
      }
      report += `\n`;
    }
  }

  // Redefinition summary
  if (redefinitions.size > 0) {
    report += `## Redefinition Summary\n`;
    report += `Top variables by redefinition count:\n\n`;

    const sorted = Array.from(redefinitions.entries())
      .map(([varName, defs]) => ({ varName, count: defs.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    for (let i = 0; i < sorted.length; i++) {
      const { varName, count } = sorted[i];
      report += `${i + 1}. \`${varName}\` - ${count} redefinitions\n`;
    }

    report += `\n`;
  }

  // Footer with instructions
  report += `---\n`;
  report += `💡 **Next steps:**\n`;
  report += `- Use \`/analyze-css-vars ${componentList} --variable=<name>\` to see detailed redefinition chain\n`;
  report += `- Use \`/analyze-css-vars ${componentList} --modifier=<name>\` to analyze modifier-specific variables\n`;

  return report;
}

function formatVariableDetail(data, variableName, componentNames) {
  const { result } = data;
  const componentList = componentNames.join(', ');

  let report = `# Redefinition Chain: \`${variableName}\`\n\n`;
  report += `**Component(s)**: ${componentList}\n\n`;

  // Find the variable in redefinitions
  let chain = null;
  let exactVar = null;

  for (const [key, value] of Object.entries(result.redefinitions)) {
    if (key.includes(variableName) || variableName.includes(key.replace(/[{}$#]/g, ''))) {
      chain = value;
      exactVar = key;
      break;
    }
  }

  if (!chain || chain.length === 0) {
    // Try to find in all definitions
    const allDefs = result.definitions.filter(d =>
      d.variable.includes(variableName) || d.property.includes(variableName)
    );

    if (allDefs.length === 0) {
      report += `⚠️ Variable not found. Available variables:\n\n`;
      const uniqueVars = [...new Set(result.definitions.map(d => d.variable))];
      for (const v of uniqueVars.slice(0, 20)) {
        report += `- \`${v}\`\n`;
      }
      return report;
    }

    if (allDefs.length === 1) {
      report += `## Variable Information\n`;
      report += `- **Defined once** (no redefinitions)\n`;
      report += `- **Location**: ${allDefs[0].file.split('/').pop()}:${allDefs[0].line}\n\n`;

      report += `## Definition\n\n`;
      report += `**Context**: ${allDefs[0].scope}\n`;
      if (allDefs[0].selector) {
        report += `**Selector**: \`${allDefs[0].selector}\`\n`;
      }
      report += `\n\`\`\`scss\n`;
      report += `${allDefs[0].variable}: ${allDefs[0].value};\n`;
      report += `\`\`\`\n\n`;

      // Show usage
      const usages = result.usages.filter(u => u.variable === allDefs[0].variable);
      if (usages.length > 0) {
        report += `## Usage (${usages.length} occurrence${usages.length > 1 ? 's' : ''})\n\n`;
        for (const usage of usages.slice(0, 5)) {
          const fileName = usage.file.split('/').pop();
          report += `- ${fileName}:${usage.line} (in ${usage.scope}`;
          if (usage.selector) report += `: ${usage.selector}`;
          report += `)\n`;
        }
        if (usages.length > 5) {
          report += `- ... and ${usages.length - 5} more\n`;
        }
      }

      return report;
    }

    chain = allDefs;
    exactVar = allDefs[0].variable;
  }

  // Variable found with redefinitions
  report += `## Variable Information\n`;
  report += `- **Total definitions**: ${chain.length}\n`;
  report += `- **First defined**: ${chain[0].file.split('/').pop()}:${chain[0].line}\n`;

  const usages = result.usages.filter(u =>
    u.variable === exactVar || u.variable.includes(variableName)
  );
  report += `- **Usage count**: ${usages.length}\n\n`;

  // Definition chain
  report += `## Definition Chain\n\n`;

  for (let i = 0; i < chain.length; i++) {
    const def = chain[i];
    const fileName = def.file.split('/').pop();

    report += `### ${i + 1}. ${def.scope === 'root' ? 'Base Definition' : 'Redefinition'} (${fileName}:${def.line})\n`;
    report += `**Context**: ${def.scope}\n`;
    if (def.selector) {
      report += `**Selector**: \`${def.selector}\`\n`;
    }
    report += `\n\`\`\`scss\n`;
    report += `${def.variable}: ${def.value};\n`;
    report += `\`\`\`\n\n`;
  }

  // Usage examples
  if (usages.length > 0) {
    report += `## Usage Examples\n`;
    report += `Showing where this variable is used:\n\n`;

    for (let i = 0; i < Math.min(5, usages.length); i++) {
      const usage = usages[i];
      const fileName = usage.file.split('/').pop();
      report += `${i + 1}. **${fileName}:${usage.line}**\n`;
      report += `   - Context: ${usage.scope}`;
      if (usage.selector) report += ` (${usage.selector})`;
      report += `\n\n`;
    }

    if (usages.length > 5) {
      report += `... and ${usages.length - 5} more usages\n\n`;
    }
  }

  return report;
}

function formatModifierDetail(data, modifierName, componentNames) {
  const { result } = data;
  const componentList = componentNames.join(', ');
  const modifierClass = modifierName.startsWith('pf-m-') ? modifierName : `pf-m-${modifierName}`;

  let report = `# Modifier Variables: \`${modifierClass}\`\n\n`;
  report += `**Component(s)**: ${componentList}\n\n`;

  // Find variables defined in this modifier
  const modifierDefs = result.definitions.filter(def =>
    def.scope === 'modifier' && def.selector.includes(modifierClass)
  );

  if (modifierDefs.length === 0) {
    report += `⚠️ No variables found for modifier \`${modifierClass}\`\n\n`;
    report += `Available modifiers:\n\n`;

    const modifiers = new Set();
    result.definitions.forEach(def => {
      if (def.scope === 'modifier' && def.selector) {
        const match = def.selector.match(/pf-m-[\w-]+/);
        if (match) modifiers.add(match[0]);
      }
    });

    for (const mod of Array.from(modifiers).slice(0, 20)) {
      report += `- \`${mod}\`\n`;
    }

    return report;
  }

  report += `## Summary\n`;
  report += `- **Variables defined**: ${modifierDefs.length}\n`;
  report += `- **Modifier class**: \`${modifierClass}\`\n\n`;

  report += `## Variables\n\n`;

  for (const def of modifierDefs) {
    const fileName = def.file.split('/').pop();
    report += `### \`${def.variable}\`\n`;
    report += `**Location**: ${fileName}:${def.line}\n\n`;
    report += `\`\`\`scss\n`;
    report += `${def.variable}: ${def.value};\n`;
    report += `\`\`\`\n\n`;
  }

  return report;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: node format-css-report.js <json-file> <component-names> [--variable=name] [--modifier=name]');
    process.exit(1);
  }

  const fs = require('fs');
  const jsonFile = args[0];
  const componentNames = args[1].split(',');

  let variable = null;
  let modifier = null;

  for (let i = 2; i < args.length; i++) {
    if (args[i].startsWith('--variable=')) {
      variable = args[i].substring('--variable='.length);
    } else if (args[i].startsWith('--modifier=')) {
      modifier = args[i].substring('--modifier='.length);
    }
  }

  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

  let report;
  if (variable) {
    report = formatVariableDetail(data, variable, componentNames);
  } else if (modifier) {
    report = formatModifierDetail(data, modifier, componentNames);
  } else {
    report = formatSummaryReport(data, componentNames);
  }

  console.log(report);
}

module.exports = {
  formatSummaryReport,
  formatVariableDetail,
  formatModifierDetail
};
