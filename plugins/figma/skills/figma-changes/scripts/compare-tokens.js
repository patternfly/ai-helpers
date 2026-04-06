#!/usr/bin/env node
/**
 * Compare Figma design tokens with local code tokens
 *
 * Usage:
 *   node compare-tokens.js <figma-data.json> <tokens-dir>
 *
 * Example:
 *   node compare-tokens.js ./figma-data.json ./src/patternfly/base/tokens
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const [,, figmaDataPath, tokensDirPath] = process.argv;

if (!figmaDataPath || !tokensDirPath) {
  console.error('Usage: node compare-tokens.js <figma-data.json> <tokens-dir>');
  process.exit(1);
}

// Read Figma data
let figmaData;
try {
  figmaData = JSON.parse(fs.readFileSync(figmaDataPath, 'utf8'));
} catch (error) {
  console.error(`Error reading Figma data: ${error.message}`);
  process.exit(1);
}

/**
 * Extract colors from Figma data
 */
function extractFigmaColors(data) {
  const colors = [];

  // Extract from styles
  if (data.styles) {
    Object.entries(data.styles).forEach(([key, style]) => {
      if (style.styleType === 'FILL' && style.name) {
        colors.push({
          name: style.name,
          key: key,
          type: 'style'
        });
      }
    });
  }

  // Traverse document to find color fills
  function traverse(node, path = []) {
    if (!node) return;

    const nodePath = [...path, node.name];

    // Check fills
    if (node.fills && Array.isArray(node.fills)) {
      node.fills.forEach(fill => {
        if (fill.type === 'SOLID' && fill.color) {
          const hex = rgbToHex(fill.color);
          colors.push({
            name: node.name,
            path: nodePath.join(' > '),
            color: hex,
            type: 'fill'
          });
        }
      });
    }

    // Recurse to children
    if (node.children) {
      node.children.forEach(child => traverse(child, nodePath));
    }
  }

  if (data.document) {
    traverse(data.document);
  }

  return colors;
}

/**
 * Convert Figma RGB to hex
 */
function rgbToHex({r, g, b}) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Extract design tokens from SCSS files
 */
function extractScssTokens(dir) {
  const tokens = {
    colors: [],
    spacing: [],
    typography: []
  };

  if (!fs.existsSync(dir)) {
    console.warn(`Warning: Directory not found: ${dir}`);
    return tokens;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && (file.endsWith('.scss') || file.endsWith('.css'))) {
      const content = fs.readFileSync(filePath, 'utf8');

      // Extract CSS variables
      // Match: --variable-name: value;
      const varRegex = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
      let match;

      while ((match = varRegex.exec(content)) !== null) {
        const [, name, value] = match;
        const cleanValue = value.trim();

        // Categorize token
        if (name.includes('color') || name.includes('bg') || name.includes('border')) {
          tokens.colors.push({ name: `--${name}`, value: cleanValue, file });
        } else if (name.includes('spacing') || name.includes('padding') || name.includes('margin') || name.includes('gap')) {
          tokens.spacing.push({ name: `--${name}`, value: cleanValue, file });
        } else if (name.includes('font') || name.includes('text') || name.includes('line-height')) {
          tokens.typography.push({ name: `--${name}`, value: cleanValue, file });
        }
      }

      // Also extract SCSS variables
      // Match: $variable-name: value;
      const scssVarRegex = /\$([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;

      while ((match = scssVarRegex.exec(content)) !== null) {
        const [, name, value] = match;
        const cleanValue = value.trim();

        if (name.includes('color')) {
          tokens.colors.push({ name: `$${name}`, value: cleanValue, file });
        } else if (name.includes('spacing') || name.includes('padding')) {
          tokens.spacing.push({ name: `$${name}`, value: cleanValue, file });
        } else if (name.includes('font') || name.includes('text')) {
          tokens.typography.push({ name: `$${name}`, value: cleanValue, file });
        }
      }
    }
  });

  return tokens;
}

/**
 * Compare Figma colors with local tokens
 */
function compareColors(figmaColors, localTokens) {
  const comparison = {
    matches: [],
    mismatches: [],
    figmaOnly: [],
    codeOnly: []
  };

  // Create a map of local color values
  const localColorMap = new Map();
  localTokens.colors.forEach(token => {
    localColorMap.set(token.name, token.value);
  });

  // For this simplified version, we'll just list what we found
  figmaColors.forEach(figmaColor => {
    if (figmaColor.color) {
      comparison.figmaOnly.push({
        name: figmaColor.name,
        value: figmaColor.color,
        path: figmaColor.path
      });
    }
  });

  localTokens.colors.forEach(token => {
    comparison.codeOnly.push({
      name: token.name,
      value: token.value,
      file: token.file
    });
  });

  return comparison;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Extracting Figma design tokens...\n');

  const figmaColors = extractFigmaColors(figmaData);
  console.log(`Found ${figmaColors.length} colors in Figma\n`);

  console.log('📁 Reading local token files...\n');
  const localTokens = extractScssTokens(tokensDirPath);
  console.log(`Found ${localTokens.colors.length} color tokens in code`);
  console.log(`Found ${localTokens.spacing.length} spacing tokens in code`);
  console.log(`Found ${localTokens.typography.length} typography tokens in code\n`);

  console.log('🔄 Comparing tokens...\n');
  const colorComparison = compareColors(figmaColors, localTokens);

  // Output results
  console.log('='.repeat(80));
  console.log('COMPARISON RESULTS');
  console.log('='.repeat(80));

  console.log('\n📊 FIGMA COLORS:');
  console.log('-'.repeat(80));
  figmaColors.slice(0, 20).forEach(color => {
    if (color.color) {
      console.log(`  ${color.name.padEnd(30)} ${color.color.padEnd(10)} (${color.path})`);
    }
  });
  if (figmaColors.length > 20) {
    console.log(`  ... and ${figmaColors.length - 20} more`);
  }

  console.log('\n📊 CODE COLOR TOKENS:');
  console.log('-'.repeat(80));
  localTokens.colors.slice(0, 20).forEach(token => {
    console.log(`  ${token.name.padEnd(40)} ${token.value.padEnd(15)} (${token.file})`);
  });
  if (localTokens.colors.length > 20) {
    console.log(`  ... and ${localTokens.colors.length - 20} more`);
  }

  console.log('\n💡 NEXT STEPS:');
  console.log('-'.repeat(80));
  console.log('  1. Review the colors and tokens listed above');
  console.log('  2. Manually map Figma colors to corresponding tokens');
  console.log('  3. Identify which values need to be updated');
  console.log('  4. Create a detailed action plan for token updates');

  // Save detailed output to JSON
  const output = {
    figma: {
      colors: figmaColors,
      totalColors: figmaColors.length
    },
    code: {
      colors: localTokens.colors,
      spacing: localTokens.spacing,
      typography: localTokens.typography,
      totalTokens: localTokens.colors.length + localTokens.spacing.length + localTokens.typography.length
    },
    timestamp: new Date().toISOString()
  };

  const outputPath = 'token-comparison.json';
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\n✅ Detailed comparison saved to: ${outputPath}`);
}

main();
