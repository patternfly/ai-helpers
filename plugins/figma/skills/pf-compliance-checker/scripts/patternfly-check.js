#!/usr/bin/env node

/**
 * PatternFly v6 Design Compliance Checker
 * Analyzes Figma prototypes against PatternFly design system standards
 */

import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Figma token from env var or config file
const CONFIG_PATH = path.join(__dirname, 'figma-config.env');
let FIGMA_TOKEN = process.env.FIGMA_TOKEN || '';

if (!FIGMA_TOKEN) {
  try {
    const configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const tokenMatch = configContent.match(/FIGMA_TOKEN=(.+)/);
    if (tokenMatch) {
      FIGMA_TOKEN = tokenMatch[1].trim();
    }
  } catch {}
}

if (!FIGMA_TOKEN) {
  console.error('Error: set FIGMA_TOKEN env var or create figma-config.env next to this script');
  console.error(`Expected fallback location: ${CONFIG_PATH}`);
  process.exit(1);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// PatternFly v6 Design Tokens
const PATTERNFLY_TOKENS = {
  colors: {
    primary: '#0066CC',
    danger: '#C9190B',
    success: '#3E8635',
    warning: '#F0AB00',
    info: '#2B9AF3',
    textPrimary: '#151515',
    textSecondary: '#6A6E73',
    background: '#FFFFFF',
    disabledText: '#D2D2D2',
    border: '#D2D2D2',
    hoverBackground: '#F0F0F0',
    stripedRow: '#FAFAFA',
    darkBackground: '#151515',
    darkSurface: '#212427',
    darkPrimary: '#2B9AF3',
    darkTextPrimary: '#FFFFFF',
    darkTextSecondary: '#C7C7C7',
    darkBorder: '#4F5255',
    tooltipBackground: '#151515',
  },
  typography: {
    fontFamilyHeading: 'Red Hat Display',
    fontFamilyBody: 'Red Hat Text',
    h1: { size: 24, lineHeight: 32, weight: 500 },
    h2: { size: 20, lineHeight: 30, weight: 500 },
    h3: { size: 18, lineHeight: 27, weight: 500 },
    h4: { size: 16, lineHeight: 24, weight: 500 },
    body: { size: 14, lineHeight: 21, weight: 400 },
    small: { size: 12, lineHeight: 18, weight: 400 },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 80,
  },
  borderRadius: {
    button: 999,      // Pill-shaped buttons (PF v6)
    card: 16,         // Medium radius for cards
    formControl: 6,   // Small radius for inputs
    nav: 999,         // Pill-shaped navigation items
    default: 3,       // Legacy/specific cases
    large: 8,
    pill: 30,
  },
  components: {
    button: {
      height: 36,
      paddingX: 16,
      paddingY: 8,
      borderRadius: 999,
      minWidth: 36,
    },
    input: {
      height: 36,
      paddingX: 12,
      paddingY: 8,
      borderWidth: 1,
      focusBorderWidth: 2,
      borderRadius: 6,
      labelSpacing: 8,
    },
    card: {
      padding: 24,
      borderWidth: 1,
      borderRadius: 16,
      titleMarginBottom: 16,
    },
    alert: {
      padding: 16,
      iconSize: 16,
      iconMarginRight: 8,
      borderLeftWidth: 3,
    },
    nav: {
      itemHeight: 36,
      itemPaddingX: 16,
      itemPaddingY: 8,
      activeIndicatorWidth: 3,
    },
    table: {
      rowHeight: 48,
      compactRowHeight: 36,
      cellPadding: 16,
      borderWidth: 1,
    },
    modal: {
      maxWidthSmall: 560,
      maxWidthMedium: 880,
      maxWidthLarge: 1120,
      padding: 24,
      headerSize: 20,
    },
    tooltip: {
      padding: 8,
      paddingX: 12,
      fontSize: 12,
      borderRadius: 3,
      maxWidth: 300,
      arrowSize: 8,
    },
    pagination: {
      buttonHeight: 36,
      buttonMinWidth: 36,
      paddingX: 12,
      paddingY: 8,
    },
    breadcrumb: {
      itemSpacing: 8,
      fontSize: 14,
      itemPadding: 8,
    },
    badge: {
      paddingX: 8,
      paddingY: 3,
      borderRadius: 30,
      fontSize: 12,
      fontWeight: 600,
    },
    tab: {
      height: 36,
      paddingX: 16,
      paddingY: 8,
      activeIndicatorWidth: 3,
      borderBottomWidth: 1,
    },
    accordion: {
      borderWidth: 1,
      headerPadding: 16,
      contentPaddingX: 24,
      contentPaddingY: 16,
      iconSize: 16,
    },
    wizard: {
      stepIndicatorSize: 24,
      stepSpacing: 8,
      buttonSpacing: 8,
      footerPadding: 16,
      lineWidth: 1,
    },
    drawer: {
      minWidth: 320,
      maxWidthPercent: 50,
      padding: 24,
      headerSize: 20,
      closeButtonSize: 36,
    },
  },
  accessibility: {
    minContrast: 4.5,
    minTouchTarget: 44,
    focusOutlineWidth: 2,
  },
  icons: {
    sizes: [16, 24, 36, 48],
    spacing: 8,
  },
  breakpoints: {
    mobile: 576,
    tablet: 768,
    desktopSmall: 992,
    desktopMedium: 1200,
  },
  chartColors: [
    '#0066CC',
    '#8476D1',
    '#F4C145',
    '#7D1007',
    '#009596',
    '#F0AB00',
  ],
};

// Compliance tracking
class ComplianceReport {
  constructor(fileName, figmaUrl = '', fileId = '') {
    this.fileName = fileName;
    this.figmaUrl = figmaUrl;
    this.fileId = fileId;
    this.date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    this.findings = {
      critical: [],
      warning: [],
      compliant: [],
    };
    this.componentCounts = {};
    this.categoryCounts = {};
    this.componentInstances = {
      patternfly: 0,
      custom: 0,
      detached: 0
    };
    this.typographyHierarchy = {
      h1Count: 0,
      headingSequence: []
    };
    this.microcopy = {
      deleteVsRemove: { delete: [], remove: [] },
      cancelVsClose: { cancel: [], close: [], dismiss: [] },
      buttonLabels: []
    };
    this.spacingRelationships = [];
  }

  addFinding(severity, category, component, issue, fix = null, nodeId = null) {
    const finding = {
      category,
      component,
      issue,
      fix,
      nodeId,
      figmaLink: nodeId && this.fileId ? `https://www.figma.com/file/${this.fileId}?node-id=${encodeURIComponent(nodeId)}` : null
    };

    if (severity === 'critical') {
      this.findings.critical.push(finding);
    } else if (severity === 'warning') {
      this.findings.warning.push(finding);
    } else {
      this.findings.compliant.push(finding);
    }

    // Track component counts
    if (!this.componentCounts[category]) {
      this.componentCounts[category] = { total: 0, compliant: 0 };
    }
    this.componentCounts[category].total++;
    if (severity === 'compliant') {
      this.componentCounts[category].compliant++;
    }
  }

  // Detect patterns in violations (e.g., many buttons with same height issue)
  detectPatterns() {
    const patterns = {};

    ['critical', 'warning'].forEach(severity => {
      this.findings[severity].forEach(finding => {
        const key = `${finding.category}:${finding.issue}`;
        if (!patterns[key]) {
          patterns[key] = {
            severity,
            category: finding.category,
            issue: finding.issue,
            fix: finding.fix,
            count: 0,
            examples: []
          };
        }
        patterns[key].count++;
        if (patterns[key].examples.length < 3) {
          patterns[key].examples.push(finding.component);
        }
      });
    });

    // Sort by count descending
    return Object.values(patterns)
      .filter(p => p.count > 1)
      .sort((a, b) => b.count - a.count);
  }

  // Get top priority fixes
  getPriorityFixes(limit = 10) {
    const patterns = this.detectPatterns();
    return patterns
      .filter(p => p.severity === 'critical')
      .slice(0, limit);
  }

  getScore() {
    const total = this.findings.critical.length + this.findings.warning.length + this.findings.compliant.length;
    if (total === 0) return 0;
    return Math.round((this.findings.compliant.length / total) * 100);
  }

  getCategoryScore(category) {
    const counts = this.componentCounts[category];
    if (!counts || counts.total === 0) return 0;
    return Math.round((counts.compliant / counts.total) * 100);
  }

  generateTableOfContents() {
    let toc = '';

    // Main sections
    if (this.findings.critical.length > 0) {
      toc += `        <div class="toc-item">
          <a href="#critical-violations">Critical Violations</a>
          <span class="toc-count">${this.findings.critical.length}</span>
        </div>\n`;
    }

    if (this.findings.warning.length > 0) {
      toc += `        <div class="toc-item">
          <a href="#minor-deviations">Minor Deviations</a>
          <span class="toc-count">${this.findings.warning.length}</span>
        </div>\n`;
    }

    if (this.findings.compliant.length > 0) {
      toc += `        <div class="toc-item">
          <a href="#compliant-elements">Compliant Elements</a>
          <span class="toc-count">${this.findings.compliant.length}</span>
        </div>\n`;
    }

    if (this.findings.critical.length > 0 || this.findings.warning.length > 0) {
      toc += `        <div class="toc-item">
          <a href="#recommendations">Recommendations</a>
          <span class="toc-count"></span>
        </div>\n`;
    }

    return toc;
  }

  generateHTML() {
    const score = this.getScore();
    const total = this.findings.critical.length + this.findings.warning.length + this.findings.compliant.length;
    const criticalPercent = total > 0 ? Math.round((this.findings.critical.length / total) * 100) : 0;
    const warningPercent = total > 0 ? Math.round((this.findings.warning.length / total) * 100) : 0;
    const compliantPercent = total > 0 ? Math.round((this.findings.compliant.length / total) * 100) : 0;

    let html = `<!DOCTYPE html>
<html>
<head>
  <title>PatternFly v6 Compliance Report</title>
  <style>
    body {
      font-family: 'Red Hat Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      padding: 40px;
      background: #f4f5f7;
      color: #151515;
      line-height: 1.5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #0066CC;
      padding-bottom: 16px;
      margin-bottom: 32px;
    }
    .header h1 {
      font-family: 'Red Hat Display', sans-serif;
      font-size: 32px;
      margin: 0 0 8px 0;
      color: #151515;
    }
    .header p {
      margin: 4px 0;
      color: #6A6E73;
    }
    .score-section {
      background: #F0F0F0;
      padding: 24px;
      border-radius: 8px;
      margin: 24px 0;
      text-align: center;
    }
    .score {
      font-size: 64px;
      font-weight: 700;
      color: #0066CC;
      margin: 0;
    }
    .score-label {
      font-size: 16px;
      color: #6A6E73;
      margin: 8px 0 16px 0;
    }
    .progress-bar {
      height: 32px;
      background: #D2D2D2;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 16px;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3E8635, #0066CC);
      transition: width 0.3s ease;
    }
    .critical { color: #C9190B; }
    .warning { color: #F0AB00; }
    .success { color: #3E8635; }
    .section {
      margin: 40px 0;
    }
    .section h2 {
      font-family: 'Red Hat Display', sans-serif;
      font-size: 24px;
      color: #151515;
      margin: 0 0 16px 0;
      border-bottom: 2px solid #D2D2D2;
      padding-bottom: 8px;
    }
    .section h3 {
      font-size: 18px;
      color: #151515;
      margin: 24px 0 12px 0;
    }
    .finding {
      padding: 16px;
      margin: 8px 0;
      border-left: 4px solid;
      border-radius: 4px;
      background: #fafbfc;
    }
    .finding.critical { border-left-color: #C9190B; background: #FFF5F5; }
    .finding.warning { border-left-color: #F0AB00; background: #FFFBF0; }
    .finding.success { border-left-color: #3E8635; background: #F5FFF5; }
    .finding strong {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
    }
    .finding p {
      margin: 4px 0;
      color: #151515;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
    }
    .summary-card {
      padding: 16px;
      border: 1px solid #D2D2D2;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card .number {
      font-size: 32px;
      font-weight: 700;
      margin: 8px 0;
    }
    .summary-card .label {
      font-size: 14px;
      color: #6A6E73;
    }
    .component-score {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 600;
      margin-left: 8px;
    }
    .component-score.high { background: #E7F5E7; color: #3E8635; }
    .component-score.medium { background: #FFF8E0; color: #F0AB00; }
    .component-score.low { background: #FFEAEA; color: #C9190B; }
    a { color: #0066CC; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .figma-link {
      display: inline-block;
      padding: 6px 12px;
      background: #0066CC;
      color: white !important;
      border-radius: 3px;
      font-size: 13px;
      font-weight: 500;
      margin-top: 8px;
      text-decoration: none !important;
    }
    .figma-link:hover {
      background: #0052A3;
      text-decoration: none !important;
    }
    ul { padding-left: 24px; }
    ol { padding-left: 24px; }
    .toc {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 12px;
      margin: 16px 0;
    }
    .toc-item {
      padding: 12px 16px;
      background: #F0F0F0;
      border-radius: 4px;
      border-left: 3px solid #0066CC;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: background 0.2s;
    }
    .toc-item:hover {
      background: #E0E0E0;
    }
    .toc-item a {
      font-weight: 500;
      flex: 1;
    }
    .toc-count {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 3px;
      margin-left: 8px;
      background: white;
      color: #6A6E73;
    }
    .back-to-top {
      display: inline-block;
      margin-top: 16px;
      padding: 8px 16px;
      background: #F0F0F0;
      border-radius: 3px;
      font-size: 14px;
      color: #0066CC;
      text-decoration: none;
      border: 1px solid #D2D2D2;
    }
    .back-to-top:hover {
      background: #E0E0E0;
      text-decoration: none;
    }
    .export-button {
      display: inline-block;
      margin: 8px 8px 8px 0;
      padding: 12px 24px;
      background: #0066CC;
      color: white;
      border: none;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    .export-button:hover {
      background: #0052A3;
    }
    .export-button:active {
      background: #004080;
    }
    .section-summary {
      font-size: 14px;
      color: #6A6E73;
      margin: 8px 0 16px 0;
      line-height: 1.6;
    }
    .toggle-button {
      display: inline-block;
      padding: 8px 16px;
      background: #F0F0F0;
      border: 1px solid #D2D2D2;
      border-radius: 3px;
      color: #0066CC;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      margin-top: 8px;
      transition: background 0.2s;
    }
    .toggle-button:hover {
      background: #E0E0E0;
    }
    .toggle-button::before {
      content: '▼ ';
      font-size: 10px;
      margin-right: 4px;
    }
    .toggle-button.collapsed::before {
      content: '▶ ';
    }
    .collapsible-content {
      display: none;
      margin-top: 16px;
    }
    .collapsible-content.expanded {
      display: block;
    }
  </style>
  <script>
    function toggleSection(buttonId, contentId) {
      const button = document.getElementById(buttonId);
      const content = document.getElementById(contentId);

      if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        button.classList.add('collapsed');
        button.textContent = button.textContent.replace('Collapse', 'Expand');
      } else {
        content.classList.add('expanded');
        button.classList.remove('collapsed');
        button.textContent = button.textContent.replace('Expand', 'Collapse');
      }
    }
  </script>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PatternFly v6 Compliance Report</h1>
      <p><strong>File:</strong> ${escapeHtml(this.fileName)}</p>
      <p><strong>Date:</strong> ${escapeHtml(this.date)}</p>
    </div>

    <div class="score-section">
      <div class="score">${score}%</div>
      <div class="score-label">Overall Compliance Score</div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${score}%"></div>
      </div>
    </div>

    <div class="section">
      <h2>Executive Summary</h2>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">Total Checked</div>
          <div class="number">${total}</div>
        </div>
        <div class="summary-card">
          <div class="label">Critical Violations</div>
          <div class="number critical">${this.findings.critical.length}</div>
          <div class="label">(${criticalPercent}%)</div>
        </div>
        <div class="summary-card">
          <div class="label">Minor Deviations</div>
          <div class="number warning">${this.findings.warning.length}</div>
          <div class="label">(${warningPercent}%)</div>
        </div>
        <div class="summary-card">
          <div class="label">Compliant</div>
          <div class="number success">${this.findings.compliant.length}</div>
          <div class="label">(${compliantPercent}%)</div>
        </div>
      </div>
      <p><strong>Compliance Score Calculation:</strong> (Compliant elements / Total elements) × 100 = ${score}%</p>
    </div>
`;

    // Component Instance Section
    if (this.componentInstances && (this.componentInstances.patternfly > 0 || this.componentInstances.custom > 0)) {
      const totalInstances = this.componentInstances.patternfly + this.componentInstances.custom;
      const pfPercent = totalInstances > 0 ? Math.round((this.componentInstances.patternfly / totalInstances) * 100) : 0;
      html += `
    <div class="section" id="component-sources">
      <h2>📦 Component Sources</h2>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="label">PatternFly Library</div>
          <div class="number success">${this.componentInstances.patternfly}</div>
          <div class="label">(${pfPercent}%)</div>
        </div>
        <div class="summary-card">
          <div class="label">Custom Components</div>
          <div class="number ${this.componentInstances.custom > this.componentInstances.patternfly ? 'warning' : ''}">${this.componentInstances.custom}</div>
          <div class="label">(${100 - pfPercent}%)</div>
        </div>
      </div>
      <p><strong>Recommendation:</strong> ${pfPercent >= 70 ? 'Great job using PatternFly library components!' : 'Consider using more PatternFly library components for better consistency and maintainability.'}</p>
    </div>
`;
    }

    // Priority Fixes Section
    const priorityFixes = this.getPriorityFixes(10);
    if (priorityFixes.length > 0) {
      html += `
    <div class="section" id="priority-fixes">
      <h2>🎯 Top Priority Fixes</h2>
      <p>These patterns appear multiple times and should be fixed together for maximum impact.</p>
`;
      priorityFixes.forEach((pattern, index) => {
        html += `
      <div class="finding critical">
        <strong>#${index + 1}: ${escapeHtml(pattern.category)} - ${pattern.count} instances</strong>
        <p>${escapeHtml(pattern.issue)}</p>
        ${pattern.fix ? `<p><strong>→ Fix:</strong> ${escapeHtml(pattern.fix)}</p>` : ''}
        <p><em>Examples: ${pattern.examples.map(e => escapeHtml(e)).join(', ')}${pattern.count > 3 ? ` +${pattern.count - 3} more` : ''}</em></p>
      </div>
`;
      });
      html += `      <a href="#" class="back-to-top">↑ Back to Top</a>\n`;
      html += `    </div>\n`;
    }

    html += `
    <div class="section">
      <h2>Table of Contents</h2>
      <div class="toc">
${this.generateTableOfContents()}
      </div>
    </div>
`;

    // Group findings by category within each severity level
    const groupByCategory = (findings) => {
      const grouped = {};
      findings.forEach(finding => {
        if (!grouped[finding.category]) {
          grouped[finding.category] = [];
        }
        grouped[finding.category].push(finding);
      });
      return grouped;
    };

    // Critical Violations Section
    if (this.findings.critical.length > 0) {
      const criticalByCategory = groupByCategory(this.findings.critical);
      const topCategories = Object.entries(criticalByCategory)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 2)
        .map(([cat, findings]) => `${cat} (${findings.length})`)
        .join(', ');

      html += `
    <div class="section" id="critical-violations">
      <h2>Critical Violations (${this.findings.critical.length})</h2>
      <div class="section-summary">
        These issues break core PatternFly standards and must be fixed before launch. Most common violations: ${topCategories}.
      </div>
      <button class="toggle-button collapsed" id="toggle-critical" onclick="toggleSection('toggle-critical', 'content-critical')">Expand Details</button>
      <div class="collapsible-content" id="content-critical">
`;
      Object.keys(criticalByCategory).sort().forEach(category => {
        const categoryScore = this.getCategoryScore(category);
        const scoreClass = categoryScore >= 80 ? 'high' : categoryScore >= 60 ? 'medium' : 'low';
        html += `
      <h3>${escapeHtml(category)} <span class="component-score ${scoreClass}">${categoryScore}% compliant</span></h3>
`;
        criticalByCategory[category].forEach(finding => {
          const figmaLink = finding.figmaLink ?
            `<p><a href="${escapeHtml(finding.figmaLink)}" target="_blank" class="figma-link">🔗 Open in Figma</a></p>` : '';
          html += `
      <div class="finding critical">
        <strong>${escapeHtml(finding.component)}</strong>
        <p>${escapeHtml(finding.issue)}</p>
        ${finding.fix ? `<p><strong>→ Fix:</strong> ${escapeHtml(finding.fix)}</p>` : ''}
        ${figmaLink}
      </div>
`;
        });
      });

      html += `      <a href="#" class="back-to-top">↑ Back to Top</a>\n`;
      html += `      </div>\n`; // Close collapsible-content
      html += `    </div>\n`; // Close section
    }

    // Minor Deviations Section
    if (this.findings.warning.length > 0) {
      const warningByCategory = groupByCategory(this.findings.warning);
      const topWarningCategories = Object.entries(warningByCategory)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 2)
        .map(([cat, findings]) => `${cat} (${findings.length})`)
        .join(', ');

      html += `
    <div class="section" id="minor-deviations">
      <h2>Minor Deviations (${this.findings.warning.length})</h2>
      <div class="section-summary">
        These issues deviate from PatternFly standards but may be acceptable with justification. They should be reviewed but won't block launch. Top categories: ${topWarningCategories}.
      </div>
      <button class="toggle-button collapsed" id="toggle-warning" onclick="toggleSection('toggle-warning', 'content-warning')">Expand Details</button>
      <div class="collapsible-content" id="content-warning">
`;
      Object.keys(warningByCategory).sort().forEach(category => {
        const categoryScore = this.getCategoryScore(category);
        const scoreClass = categoryScore >= 80 ? 'high' : categoryScore >= 60 ? 'medium' : 'low';
        html += `
      <h3>${escapeHtml(category)} <span class="component-score ${scoreClass}">${categoryScore}% compliant</span></h3>
`;
        warningByCategory[category].forEach(finding => {
          const figmaLink = finding.figmaLink ?
            `<p><a href="${escapeHtml(finding.figmaLink)}" target="_blank" class="figma-link">🔗 Open in Figma</a></p>` : '';
          html += `
      <div class="finding warning">
        <strong>${escapeHtml(finding.component)}</strong>
        <p>${escapeHtml(finding.issue)}</p>
        ${finding.fix ? `<p><strong>→ Recommendation:</strong> ${escapeHtml(finding.fix)}</p>` : ''}
        ${figmaLink}
      </div>
`;
        });
      });

      html += `      <a href="#" class="back-to-top">↑ Back to Top</a>\n`;
      html += `      </div>\n`; // Close collapsible-content
      html += `    </div>\n`; // Close section
    }

    // Typography Hierarchy Section (moved here - after minor deviations)
    if (this.typographyHierarchy.h1Count > 1) {
      html += `
    <div class="section" id="typography-hierarchy">
      <h2>📝 Typography Hierarchy Issues</h2>
      <div class="section-summary">
        Your design has ${this.typographyHierarchy.h1Count} H1 headings, but pages should have only one H1 for proper SEO and accessibility. Multiple H1s confuse screen readers and search engines about page structure.
      </div>
      <button class="toggle-button collapsed" id="toggle-typography" onclick="toggleSection('toggle-typography', 'content-typography')">Expand Details</button>
      <div class="collapsible-content" id="content-typography">
      <div class="finding critical">
        <strong>Multiple H1 headings found (${this.typographyHierarchy.h1Count})</strong>
        <p>Pages should have only one H1 heading for proper document structure.</p>
        <p><strong>→ Fix:</strong> Review page structure and ensure only one main heading uses H1 size/weight (24px, 500+ weight).</p>
      </div>
      <a href="#" class="back-to-top">↑ Back to Top</a>
      </div>
    </div>
`;
    }

    // Spacing Relationships Section (moved here - after typography)
    if (this.spacingRelationships.length > 0) {
      // Analyze spacing patterns
      const spacingCounts = {};
      this.spacingRelationships.forEach(rel => {
        spacingCounts[rel.gap] = (spacingCounts[rel.gap] || 0) + 1;
      });

      const validSpacings = [4, 8, 16, 24, 32, 48, 64];
      const invalidSpacings = Object.keys(spacingCounts)
        .map(Number)
        .filter(gap => !validSpacings.includes(gap))
        .sort((a, b) => spacingCounts[b] - spacingCounts[a]);

      if (invalidSpacings.length > 0) {
        const topSpacing = invalidSpacings[0];
        const topSpacingCount = spacingCounts[topSpacing];

        html += `
    <div class="section" id="spacing-relationships">
      <h2>📏 Spacing Consistency</h2>
      <div class="section-summary">
        Found ${invalidSpacings.length} non-standard spacing values between elements. Most common: ${topSpacing}px (${topSpacingCount} instances) should use PatternFly spacing tokens for consistency.
      </div>
      <button class="toggle-button collapsed" id="toggle-spacing" onclick="toggleSection('toggle-spacing', 'content-spacing')">Expand Details</button>
      <div class="collapsible-content" id="content-spacing">
`;
        invalidSpacings.slice(0, 5).forEach(gap => {
          const nearest = validSpacings.reduce((prev, curr) =>
            Math.abs(curr - gap) < Math.abs(prev - gap) ? curr : prev
          );
          html += `
      <div class="finding warning">
        <strong>${gap}px spacing (${spacingCounts[gap]} instances)</strong>
        <p>Non-standard spacing. Nearest valid: ${nearest}px</p>
        <p><strong>→ Fix:</strong> Use --pf-v6-global--spacer token (${nearest}px) for consistency.</p>
      </div>
`;
        });
        html += `      <a href="#" class="back-to-top">↑ Back to Top</a>\n`;
        html += `      </div>\n`; // Close collapsible-content
        html += `    </div>\n`; // Close section
      }
    }

    // Compliant Elements Section
    if (this.findings.compliant.length > 0) {
      const compliantByCategory = groupByCategory(this.findings.compliant);
      const topCompliantCategories = Object.entries(compliantByCategory)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 2)
        .map(([cat, findings]) => `${cat} (${findings.length})`)
        .join(', ');

      html += `
    <div class="section" id="compliant-elements">
      <h2>Compliant Elements (${this.findings.compliant.length})</h2>
      <div class="section-summary">
        These components and patterns follow PatternFly standards correctly and serve as good examples for the rest of the design. Top compliant categories: ${topCompliantCategories}.
      </div>
      <button class="toggle-button collapsed" id="toggle-compliant" onclick="toggleSection('toggle-compliant', 'content-compliant')">Expand Details</button>
      <div class="collapsible-content" id="content-compliant">
`;
      Object.keys(compliantByCategory).sort().forEach(category => {
        const categoryScore = this.getCategoryScore(category);
        const scoreClass = categoryScore >= 80 ? 'high' : categoryScore >= 60 ? 'medium' : 'low';
        html += `
      <h3>${category} <span class="component-score ${scoreClass}">${categoryScore}% compliant</span></h3>
      <ul>
`;
        compliantByCategory[category].forEach(finding => {
          html += `        <li><strong>${escapeHtml(finding.component)}:</strong> ${escapeHtml(finding.issue)}</li>\n`;
        });
        html += `      </ul>\n`;
      });

      html += `      <a href="#" class="back-to-top">↑ Back to Top</a>\n`;
      html += `      </div>\n`; // Close collapsible-content
      html += `    </div>\n`; // Close section
    }

    // Recommendations
    const criticalCount = this.findings.critical.length;
    const warningCount = this.findings.warning.length;

    if (criticalCount > 0 || warningCount > 0) {
      html += `
    <div class="section" id="recommendations">
      <h2>Recommendations</h2>
`;
      if (criticalCount > 0) {
        html += `
      <h3 class="critical">Immediate Fixes Required (${criticalCount} critical issues)</h3>
      <p>These issues break core PatternFly standards and should be addressed immediately:</p>
      <ol>
`;
        this.findings.critical.slice(0, 10).forEach(finding => {
          const categoryId = finding.category.toLowerCase().replace(/\s+/g, '-');
          html += `        <li><strong>${finding.component}</strong> (<a href="#${categoryId}">${finding.category}</a>): ${finding.issue}</li>\n`;
        });
        if (criticalCount > 10) {
          html += `        <li><em>...and ${criticalCount - 10} more critical issues (see category sections above)</em></li>\n`;
        }
        html += `      </ol>\n`;
      }

      if (warningCount > 0) {
        html += `
      <h3 class="warning">Suggested Improvements (${warningCount} minor issues)</h3>
      <p>These deviations should be reviewed for consistency with PatternFly:</p>
      <ol>
`;
        this.findings.warning.slice(0, 10).forEach(finding => {
          const categoryId = finding.category.toLowerCase().replace(/\s+/g, '-');
          html += `        <li><strong>${finding.component}</strong> (<a href="#${categoryId}">${finding.category}</a>): ${finding.issue}</li>\n`;
        });
        if (warningCount > 10) {
          html += `        <li><em>...and ${warningCount - 10} more minor issues (see category sections above)</em></li>\n`;
        }
        html += `      </ol>\n`;
      }

      html += `    </div>\n`;
    }

    // Microcopy Consistency Section
    const hasDeleteAndRemove = this.microcopy.deleteVsRemove.delete.length > 0 &&
                                this.microcopy.deleteVsRemove.remove.length > 0;
    const hasMultipleDismiss = (this.microcopy.cancelVsClose.cancel.length > 0 ? 1 : 0) +
                               (this.microcopy.cancelVsClose.close.length > 0 ? 1 : 0) +
                               (this.microcopy.cancelVsClose.dismiss.length > 0 ? 1 : 0) > 1;

    if (hasDeleteAndRemove || hasMultipleDismiss) {
      html += `
    <div class="section" id="microcopy-consistency">
      <h2>✍️ Microcopy Consistency</h2>
      <p>Inconsistent terminology can confuse users. PatternFly recommends standard patterns.</p>
`;
      if (hasDeleteAndRemove) {
        html += `
      <div class="finding warning">
        <strong>Mixed usage: "Delete" (${this.microcopy.deleteVsRemove.delete.length}) vs "Remove" (${this.microcopy.deleteVsRemove.remove.length})</strong>
        <p>PatternFly guideline: Use "Delete" for permanent removal, "Remove" for non-destructive actions.</p>
        <p><strong>→ Recommendation:</strong> Review each usage and apply consistently.</p>
        <p><em>Delete buttons: ${this.microcopy.deleteVsRemove.delete.slice(0, 3).map(d => escapeHtml(d.text)).join(', ')}${this.microcopy.deleteVsRemove.delete.length > 3 ? '...' : ''}</em></p>
        <p><em>Remove buttons: ${this.microcopy.deleteVsRemove.remove.slice(0, 3).map(d => escapeHtml(d.text)).join(', ')}${this.microcopy.deleteVsRemove.remove.length > 3 ? '...' : ''}</em></p>
      </div>
`;
      }

      if (hasMultipleDismiss) {
        html += `
      <div class="finding warning">
        <strong>Mixed usage: "Cancel" (${this.microcopy.cancelVsClose.cancel.length}), "Close" (${this.microcopy.cancelVsClose.close.length}), "Dismiss" (${this.microcopy.cancelVsClose.dismiss.length})</strong>
        <p>PatternFly guideline: Use "Cancel" for dismissive actions in modals/forms.</p>
        <p><strong>→ Recommendation:</strong> Standardize on "Cancel" for consistency.</p>
      </div>
`;
      }
      html += `    </div>\n`;
    }

    // Component Library Sync Section
    if (this.componentInstances.detached > 0) {
      html += `
    <div class="section" id="component-library">
      <h2>🔗 Component Library Sync</h2>
      <div class="finding warning">
        <strong>${this.componentInstances.detached} detached component instances</strong>
        <p>These components were originally from the library but have been detached.</p>
        <p><strong>→ Recommendation:</strong> Re-link to library components to receive updates automatically.</p>
      </div>
    </div>
`;
    }

    // Batch Operations Section - JSON Export
    const allViolations = [...this.findings.critical, ...this.findings.warning];
    if (allViolations.length > 0) {
      html += `
    <div class="section" id="batch-operations">
      <h2>🔧 Batch Operations</h2>
      <p>Export violations for batch processing or external tools.</p>

      <button onclick="downloadJSON()" class="export-button">📥 Export All Violations as JSON</button>
      <button onclick="copyFigmaLinks()" class="export-button">🔗 Copy All Figma Links</button>

      <script>
        function downloadJSON() {
          const data = ${JSON.stringify({
            fileName: this.fileName,
            date: this.date,
            score: this.getScore(),
            violations: allViolations.map(f => ({
              severity: this.findings.critical.includes(f) ? 'critical' : 'warning',
              category: f.category,
              component: f.component,
              issue: f.issue,
              fix: f.fix,
              figmaLink: f.figmaLink
            }))
          }, null, 2).replace(/<\//g, '<\\/')};

          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'patternfly-violations-${Date.now()}.json';
          a.click();
        }

        function copyFigmaLinks() {
          const links = ${JSON.stringify(allViolations.map(f => f.figmaLink).filter(Boolean)).replace(/<\//g, '<\\/')};
          navigator.clipboard.writeText(links.join('\\n'));
          alert('Copied ' + links.length + ' Figma links to clipboard!');
        }
      </script>
    </div>
`;
    }

    // Resources
    html += `
    <div class="section">
      <h2>Resources</h2>
      <ul>
        <li><a href="https://www.patternfly.org/design-guidelines/" target="_blank">PatternFly v6 Design Guidelines</a></li>
        <li><a href="https://www.patternfly.org/design-foundations/tokens" target="_blank">Design Tokens</a></li>
        <li><a href="https://www.patternfly.org/components/" target="_blank">Component Documentation</a></li>
        <li><a href="https://www.patternfly.org/accessibility/accessibility-fundamentals" target="_blank">Accessibility Guidelines</a></li>
      </ul>
    </div>

  </div>
</body>
</html>
`;

    return html;
  }
}

// Helper functions for better component detection

// Detect if a node is likely an icon
function isLikelyIcon(node) {
  if (!node || !node.absoluteBoundingBox) return false;

  const { width, height } = node.absoluteBoundingBox;
  const name = (node.name || '').toLowerCase();

  // Small square-ish elements (12-24px) are likely icons
  const isIconSize = (width >= 12 && width <= 28 && height >= 12 && height <= 28);

  // Name contains icon indicators
  const hasIconName = name.includes('icon') ||
                      name.includes('fa-') ||
                      name.includes('pficon') ||
                      name.startsWith('icons /') ||
                      name.includes('arrow') ||
                      name.includes('chevron');

  // Vector nodes are often icons
  const isVectorType = node.type === 'VECTOR' || node.type === 'BOOLEAN_OPERATION';

  return (isIconSize && (hasIconName || isVectorType)) || (hasIconName && width < 32 && height < 32);
}

// Detect if a node is likely a container vs. actual component
function isLikelyContainer(node, componentType) {
  if (!node || !node.absoluteBoundingBox) return false;

  const { width, height } = node.absoluteBoundingBox;

  // Containers are typically large
  if (componentType === 'navigation' && height > 100) return true;
  if (componentType === 'modal' && (width > 1200 || height > 800)) return true;
  if (componentType === 'card' && (width > 600 || height > 600)) return true;

  // Has many children - likely a container
  if (node.children && node.children.length > 10) return true;

  return false;
}

// Detect if node is text inside another component (shouldn't be analyzed separately)
function isChildTextElement(node) {
  if (!node || node.type !== 'TEXT') return false;

  // If it's just a text node with small dimensions, it's probably part of a larger component
  const bounds = node.absoluteBoundingBox;
  if (!bounds) return false;

  const { width, height } = bounds;

  // Small text elements (< 30px height) are likely labels/content, not components
  return height < 30;
}

// Check if node is a PatternFly library component instance
function isPatternFlyComponent(node) {
  if (!node) return false;

  // Instance nodes with component info
  if (node.type === 'INSTANCE' && node.componentId) {
    // Check if component name suggests PatternFly
    const name = (node.name || '').toLowerCase();
    const componentName = name;

    // Common PatternFly component naming patterns
    const pfPatterns = ['pf-', 'patternfly', 'red hat'];

    return pfPatterns.some(pattern => componentName.includes(pattern));
  }

  return false;
}

// Check if component instance is detached from library
function checkIfDetached(node) {
  if (node.type !== 'INSTANCE') return false;
  return !node.componentId;
}

// Get component source info
function getComponentSource(node) {
  const detached = checkIfDetached(node);
  if (node.type === 'INSTANCE') {
    return {
      isInstance: true,
      isPatternFly: detached ? false : isPatternFlyComponent(node),
      componentId: node.componentId || null,
      isDetached: detached
    };
  }
  return {
    isInstance: false,
    isPatternFly: false,
    componentId: null,
    isDetached: false
  };
}

// Detect component state from name
function detectComponentState(node) {
  const name = (node.name || '').toLowerCase();

  const states = {
    hover: name.includes('hover') || name.includes(':hover'),
    focus: name.includes('focus') || name.includes(':focus'),
    active: name.includes('active') || name.includes(':active') || name.includes('pressed'),
    disabled: name.includes('disabled') || name.includes(':disabled'),
    error: name.includes('error') || name.includes('invalid'),
    loading: name.includes('loading') || name.includes('spinner'),
    default: !name.includes('hover') && !name.includes('focus') && !name.includes('active') &&
             !name.includes('disabled') && !name.includes('error') && !name.includes('loading')
  };

  return states;
}

// Extract button text for microcopy analysis
function extractButtonText(node) {
  if (node.type === 'TEXT') {
    return node.characters || '';
  }

  if (node.children) {
    for (const child of node.children) {
      const text = extractButtonText(child);
      if (text) return text;
    }
  }

  return '';
}

// Analyze microcopy patterns
function analyzeMicrocopyPatterns(text, nodeName, report) {
  const lower = text.toLowerCase();

  // Delete vs Remove
  if (lower.includes('delete')) {
    report.microcopy.deleteVsRemove.delete.push({ text, node: nodeName });
  } else if (lower.includes('remove')) {
    report.microcopy.deleteVsRemove.remove.push({ text, node: nodeName });
  }

  // Cancel vs Close vs Dismiss
  if (lower.includes('cancel')) {
    report.microcopy.cancelVsClose.cancel.push({ text, node: nodeName });
  } else if (lower.includes('close')) {
    report.microcopy.cancelVsClose.close.push({ text, node: nodeName });
  } else if (lower.includes('dismiss')) {
    report.microcopy.cancelVsClose.dismiss.push({ text, node: nodeName });
  }

  // Track button labels for pattern analysis
  if (text.length > 0 && text.length < 50) {
    report.microcopy.buttonLabels.push({ text, node: nodeName });
  }
}

// Check typography hierarchy
function checkTypographyHierarchy(node, report) {
  if (node.type !== 'TEXT' || !node.style) return;

  const fontSize = node.style.fontSize || 14;
  const fontWeight = node.style.fontWeight || 400;

  // Detect heading level based on size and weight
  let headingLevel = null;
  if (fontSize >= 24 && fontWeight >= 500) headingLevel = 'h1';
  else if (fontSize >= 20 && fontWeight >= 500) headingLevel = 'h2';
  else if (fontSize >= 18 && fontWeight >= 500) headingLevel = 'h3';
  else if (fontSize >= 16 && fontWeight >= 500) headingLevel = 'h4';

  if (headingLevel) {
    if (headingLevel === 'h1') {
      report.typographyHierarchy.h1Count++;
    }
    report.typographyHierarchy.headingSequence.push({
      level: headingLevel,
      node: node.name,
      fontSize,
      fontWeight
    });
  }
}

// Analyze spacing relationships between nodes
function analyzeSpacingRelationship(parent, report) {
  if (!parent.children || parent.children.length < 2) return;

  // Check spacing between sibling elements
  const children = parent.children.filter(child => child.absoluteBoundingBox);

  for (let i = 0; i < children.length - 1; i++) {
    const current = children[i];
    const next = children[i + 1];

    const currentBounds = current.absoluteBoundingBox;
    const nextBounds = next.absoluteBoundingBox;

    // Calculate vertical spacing
    const verticalGap = Math.round(nextBounds.y - (currentBounds.y + currentBounds.height));

    if (verticalGap > 0 && verticalGap < 100) {
      report.spacingRelationships.push({
        parent: parent.name,
        element1: current.name,
        element2: next.name,
        gap: verticalGap
      });
    }
  }
}

// Extract Figma file ID from URL
function extractFileId(url) {
  const patterns = [
    /figma\.com\/file\/([a-zA-Z0-9]+)/,
    /figma\.com\/design\/([a-zA-Z0-9]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // Check if it's already just an ID
  if (/^[a-zA-Z0-9]+$/.test(url)) {
    return url;
  }

  throw new Error('Invalid Figma URL. Expected format: https://www.figma.com/file/{file-id}/...');
}

// Fetch Figma file data
async function fetchFigmaFile(fileId) {
  console.log(`Fetching Figma file: ${fileId}...`);

  const url = `https://api.figma.com/v1/files/${fileId}`;
  const response = await fetch(url, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Figma API error (${response.status}): ${error}`);
  }

  const data = await response.json();
  console.log(`✓ File loaded: ${data.name}`);
  return data;
}

// Color comparison helper
function compareColor(color1, color2) {
  // Normalize colors (handle both #RRGGBB and rgb objects)
  const normalize = (c) => {
    if (typeof c === 'string') {
      return c.toUpperCase().replace('#', '');
    }
    if (c.r !== undefined) {
      // Figma color object {r, g, b, a}
      const r = Math.round(c.r * 255).toString(16).padStart(2, '0');
      const g = Math.round(c.g * 255).toString(16).padStart(2, '0');
      const b = Math.round(c.b * 255).toString(16).padStart(2, '0');
      return (r + g + b).toUpperCase();
    }
    return '';
  };

  return normalize(color1) === normalize(color2);
}

// Calculate color contrast ratio
function calculateContrast(color1, color2) {
  const getLuminance = (c) => {
    if (typeof c === 'string') {
      const hex = c.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      const rgb = [r, g, b].map(val => {
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }
    return 0.5;
  };

  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Analyze node recursively
function analyzeNode(node, report, depth = 0) {
  if (!node) return;

  const nodeName = node.name || 'Unnamed';
  const nodeType = node.type;

  // Check for common component patterns by name
  const nameLower = nodeName.toLowerCase();

  // Button analysis
  if (nameLower.includes('button') || nodeType === 'COMPONENT' && nameLower.includes('btn')) {
    analyzeButton(node, report);
  }

  // Input/Form analysis
  if (nameLower.includes('input') || nameLower.includes('field') || nameLower.includes('textbox')) {
    analyzeInput(node, report);
  }

  // Card analysis
  if (nameLower.includes('card')) {
    analyzeCard(node, report);
  }

  // Alert analysis
  if (nameLower.includes('alert')) {
    analyzeAlert(node, report);
  }

  // Navigation analysis
  if (nameLower.includes('nav') || nameLower.includes('menu')) {
    analyzeNavigation(node, report);
  }

  // Table analysis
  if (nameLower.includes('table') || nameLower.includes('row') || nameLower.includes('cell')) {
    analyzeTable(node, report);
  }

  // Modal/Dialog analysis
  if (nameLower.includes('modal') || nameLower.includes('dialog')) {
    analyzeModal(node, report);
  }

  // Tooltip analysis
  if (nameLower.includes('tooltip')) {
    analyzeTooltip(node, report);
  }

  // Pagination analysis
  if (nameLower.includes('pagination') || nameLower.includes('pager')) {
    analyzePagination(node, report);
  }

  // Breadcrumb analysis
  if (nameLower.includes('breadcrumb')) {
    analyzeBreadcrumb(node, report);
  }

  // Badge analysis
  if (nameLower.includes('badge') || nameLower.includes('label')) {
    analyzeBadge(node, report);
  }

  // Tab analysis
  if (nameLower.includes('tab') && !nameLower.includes('table')) {
    analyzeTab(node, report);
  }

  // Accordion analysis
  if (nameLower.includes('accordion') || nameLower.includes('collapse')) {
    analyzeAccordion(node, report);
  }

  // Wizard analysis
  if (nameLower.includes('wizard') || nameLower.includes('stepper')) {
    analyzeWizard(node, report);
  }

  // Drawer analysis
  if (nameLower.includes('drawer') || nameLower.includes('sidebar')) {
    analyzeDrawer(node, report);
  }

  // Text analysis
  if (nodeType === 'TEXT') {
    analyzeText(node, report);
    // Check typography hierarchy
    checkTypographyHierarchy(node, report);
  }

  // Rectangle/Frame fills (for color checking)
  if (node.fills && node.fills.length > 0) {
    analyzeColors(node, report);
  }

  // Spacing analysis
  if (node.paddingLeft !== undefined || node.itemSpacing !== undefined) {
    analyzeSpacing(node, report);
  }

  // Spacing relationships (check gaps between children)
  if (node.children && node.children.length > 1) {
    analyzeSpacingRelationship(node, report);
  }

  // Component instance tracking
  if (node.type === 'INSTANCE') {
    const componentInfo = getComponentSource(node);
    if (componentInfo.isPatternFly) {
      report.componentInstances.patternfly++;
      if (componentInfo.isDetached) {
        report.componentInstances.detached++;
      }
    } else if (componentInfo.isInstance) {
      report.componentInstances.custom++;
    }
  }

  // Microcopy analysis for buttons
  if (nameLower.includes('button') && nodeType !== 'TEXT') {
    const buttonText = extractButtonText(node);
    if (buttonText) {
      analyzeMicrocopyPatterns(buttonText, nodeName, report);
    }
  }

  // Recurse into children
  if (node.children) {
    node.children.forEach(child => analyzeNode(child, report, depth + 1));
  }
}

// Component-specific analysis functions
function analyzeButton(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;
  const nodeId = node.id;

  if (!bounds) {
    return; // Skip if no dimensions
  }

  const height = Math.round(bounds.height);
  const width = Math.round(bounds.width);
  const expectedHeight = PATTERNFLY_TOKENS.components.button.height;

  // Smart validation: only analyze if dimensions are reasonable for a button
  // Buttons should be: 24-60px height, 36px+ width
  if (height < 24 || height > 60 || width < 20) {
    return; // Skip - likely text or icon labeled as button
  }

  // Additional heuristic: check if it's likely a real button
  // Should have fills/strokes or be a component instance
  const hasVisuals = (node.fills && node.fills.length > 0) ||
                     (node.strokes && node.strokes.length > 0) ||
                     node.type === 'COMPONENT' ||
                     node.type === 'INSTANCE';

  if (!hasVisuals) {
    return; // Skip - probably just a frame/group
  }

  if (height === expectedHeight) {
    report.addFinding('compliant', 'Buttons', name,
      `Correct height: --pf-v6-c-button--Height (${height}px)`, null, nodeId);
  } else if (Math.abs(height - expectedHeight) <= 2) {
    report.addFinding('warning', 'Buttons', name,
      `Height is ${height}px (expected --pf-v6-c-button--Height: ${expectedHeight}px)`,
      `Adjust height to --pf-v6-c-button--Height (${expectedHeight}px)`, nodeId);
  } else {
    report.addFinding('critical', 'Buttons', name,
      `Height is ${height}px (expected --pf-v6-c-button--Height: ${expectedHeight}px)`,
      `Change height to --pf-v6-c-button--Height (${expectedHeight}px)`, nodeId);
  }

  // Check border radius if available
  if (node.cornerRadius !== undefined) {
    const radius = node.cornerRadius;
    const expectedRadius = PATTERNFLY_TOKENS.components.button.borderRadius;

    if (radius === expectedRadius || radius >= 100) {
      report.addFinding('compliant', 'Buttons', name,
        `Correct border radius: --pf-v6-c-button--BorderRadius (${radius}px - pill shape)`, null, nodeId);
    } else {
      report.addFinding('warning', 'Buttons', name,
        `Border radius is ${radius}px (expected --pf-v6-c-button--BorderRadius: ${expectedRadius}px for pill shape)`,
        `Change border-radius to --pf-v6-c-button--BorderRadius (${expectedRadius}px)`, nodeId);
    }
  }

  // Check component states
  const states = detectComponentState(node);

  // Disabled state check
  if (states.disabled) {
    const opacity = node.opacity !== undefined ? node.opacity : 1.0;
    if (Math.abs(opacity - 0.6) < 0.1) {
      report.addFinding('compliant', 'Component States', name,
        `Disabled state has correct opacity (0.6)`, null, nodeId);
    } else {
      report.addFinding('warning', 'Component States', name,
        `Disabled state opacity is ${opacity.toFixed(2)} (expected 0.6)`,
        `Set opacity to 0.6 for disabled state`, nodeId);
    }
  }

  // Focus state check
  if (states.focus && node.strokes) {
    const focusStroke = node.strokes.find(s => s.visible !== false);
    if (focusStroke) {
      const strokeWeight = node.strokeWeight || 0;
      if (strokeWeight === 2) {
        report.addFinding('compliant', 'Component States', name,
          `Focus state has correct outline width (2px)`, null, nodeId);
      } else {
        report.addFinding('warning', 'Component States', name,
          `Focus state outline is ${strokeWeight}px (expected 2px)`,
          `Set outline width to 2px for focus state`, nodeId);
      }
    } else {
      report.addFinding('critical', 'Component States', name,
        `Focus state missing visible outline`,
        `Add 2px outline for keyboard focus accessibility`, nodeId);
    }
  }
}

function analyzeInput(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;
  const nodeId = node.id;

  if (!bounds) {
    return; // Skip if no dimensions
  }

  const height = Math.round(bounds.height);
  const width = Math.round(bounds.width);
  const expectedHeight = PATTERNFLY_TOKENS.components.input.height;

  // Smart validation: only analyze if dimensions are reasonable for an input
  // Form inputs should be: 24-60px height, 100px+ width
  if (height < 24 || height > 60 || width < 80) {
    return; // Skip - likely text or label
  }

  // Additional heuristic: should have border or be a component
  const hasVisuals = (node.fills && node.fills.length > 0) ||
                     (node.strokes && node.strokes.length > 0) ||
                     node.type === 'COMPONENT' ||
                     node.type === 'INSTANCE';

  if (!hasVisuals) {
    return; // Skip - probably just a frame/group
  }

  if (height === expectedHeight) {
    report.addFinding('compliant', 'Form Inputs', name,
      `Correct height: --pf-v6-c-form-control--Height (${height}px)`, null, nodeId);
  } else if (Math.abs(height - expectedHeight) <= 2) {
    report.addFinding('warning', 'Form Inputs', name,
      `Height is ${height}px (expected --pf-v6-c-form-control--Height: ${expectedHeight}px)`,
      `Adjust height to --pf-v6-c-form-control--Height (${expectedHeight}px)`, nodeId);
  } else {
    report.addFinding('critical', 'Form Inputs', name,
      `Height is ${height}px (expected --pf-v6-c-form-control--Height: ${expectedHeight}px)`,
      `Change height to --pf-v6-c-form-control--Height (${expectedHeight}px)`, nodeId);
  }

  // Check border radius if available
  if (node.cornerRadius !== undefined) {
    const radius = node.cornerRadius;
    const expectedRadius = PATTERNFLY_TOKENS.components.input.borderRadius;

    if (radius === expectedRadius) {
      report.addFinding('compliant', 'Form Inputs', name,
        `Correct border radius: --pf-v6-c-form-control--BorderRadius (${radius}px)`, null, nodeId);
    } else {
      report.addFinding('warning', 'Form Inputs', name,
        `Border radius is ${radius}px (expected --pf-v6-c-form-control--BorderRadius: ${expectedRadius}px)`,
        `Change border-radius to --pf-v6-c-form-control--BorderRadius (${expectedRadius}px)`, nodeId);
    }
  }
}

function analyzeCard(node, report) {
  const name = node.name;

  // Check padding
  if (node.paddingLeft !== undefined) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.card.padding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Cards', name, `Correct padding: --pf-v6-c-card--Padding (${padding}px)`);
    } else if (Math.abs(padding - expectedPadding) <= 4) {
      report.addFinding('warning', 'Cards', name,
        `Padding is ${padding}px (expected --pf-v6-c-card--Padding: ${expectedPadding}px)`,
        `Adjust padding to --pf-v6-c-card--Padding (${expectedPadding}px)`);
    } else {
      report.addFinding('critical', 'Cards', name,
        `Padding is ${padding}px (expected --pf-v6-c-card--Padding: ${expectedPadding}px)`,
        `Change padding to --pf-v6-c-card--Padding (${expectedPadding}px)`);
    }
  }

  // Check border radius
  if (node.cornerRadius !== undefined) {
    const radius = node.cornerRadius;
    const expectedRadius = PATTERNFLY_TOKENS.components.card.borderRadius;

    if (radius === expectedRadius) {
      report.addFinding('compliant', 'Cards', name, `Correct border radius: --pf-v6-c-card--BorderRadius (${radius}px)`);
    } else {
      report.addFinding('warning', 'Cards', name,
        `Border radius is ${radius}px (expected --pf-v6-c-card--BorderRadius: ${expectedRadius}px)`,
        `Change border-radius to --pf-v6-c-card--BorderRadius (${expectedRadius}px)`);
    }
  }
}

function analyzeText(node, report) {
  const name = node.name;
  const style = node.style;

  if (!style) return;

  const fontSize = Math.round(style.fontSize || 0);
  const fontWeight = style.fontWeight || 400;

  // Determine expected values based on font size
  let expectedWeight = 400;
  let typographyLevel = 'Body';

  if (fontSize >= 24) {
    expectedWeight = 500;
    typographyLevel = 'H1';
  } else if (fontSize >= 20) {
    expectedWeight = 500;
    typographyLevel = 'H2';
  } else if (fontSize >= 18) {
    expectedWeight = 500;
    typographyLevel = 'H3';
  } else if (fontSize >= 16) {
    expectedWeight = 500;
    typographyLevel = 'H4';
  } else if (fontSize === 14) {
    expectedWeight = 400;
    typographyLevel = 'Body';
  } else if (fontSize === 12) {
    expectedWeight = 400;
    typographyLevel = 'Small';
  }

  // Check font family
  if (style.fontFamily) {
    const family = style.fontFamily;
    const isHeading = fontSize >= 16 && fontWeight >= 500;
    const expectedFamily = isHeading ?
      PATTERNFLY_TOKENS.typography.fontFamilyHeading :
      PATTERNFLY_TOKENS.typography.fontFamilyBody;
    const tokenName = isHeading ?
      '--pf-v6-global--FontFamily--heading' :
      '--pf-v6-global--FontFamily--text';

    if (family.includes(expectedFamily)) {
      report.addFinding('compliant', 'Typography', name,
        `Correct font family for ${typographyLevel}: ${tokenName} (${family})`);
    } else {
      report.addFinding('warning', 'Typography', name,
        `Using ${family} instead of ${tokenName}: ${expectedFamily} for ${typographyLevel}`,
        `Change to ${tokenName} (${expectedFamily})`);
    }
  }

  // Check if font size matches PatternFly scale
  const validSizes = [12, 14, 16, 18, 20, 24];
  const fontSizeTokens = {
    12: '--pf-v6-global--FontSize--sm',
    14: '--pf-v6-global--FontSize--md',
    16: '--pf-v6-global--FontSize--lg',
    18: '--pf-v6-global--FontSize--xl',
    20: '--pf-v6-global--FontSize--2xl',
    24: '--pf-v6-global--FontSize--3xl'
  };

  if (validSizes.includes(fontSize)) {
    const token = fontSizeTokens[fontSize];
    report.addFinding('compliant', 'Typography', name,
      `Font size matches PatternFly scale: ${token} (${fontSize}px)`);
  } else if (fontSize > 0) {
    const nearest = validSizes.reduce((prev, curr) =>
      Math.abs(curr - fontSize) < Math.abs(prev - fontSize) ? curr : prev
    );
    const token = fontSizeTokens[nearest];
    report.addFinding('warning', 'Typography', name,
      `Font size ${fontSize}px doesn't match PatternFly scale`,
      `Consider using ${token} (${nearest}px)`);
  }
}

function analyzeColors(node, report) {
  const name = node.name;
  const nodeId = node.id;
  const fills = node.fills;

  if (!fills || fills.length === 0) return;

  const fill = fills[0];
  if (fill.type !== 'SOLID') return;

  const color = fill.color;
  const colorHex = `#${Math.round(color.r * 255).toString(16).padStart(2, '0')}${Math.round(color.g * 255).toString(16).padStart(2, '0')}${Math.round(color.b * 255).toString(16).padStart(2, '0')}`.toUpperCase();

  // Map color names to design tokens
  const colorTokens = {
    primary: '--pf-v6-global--primary-color--100',
    danger: '--pf-v6-global--danger-color--100',
    success: '--pf-v6-global--success-color--100',
    warning: '--pf-v6-global--warning-color--100',
    info: '--pf-v6-global--info-color--100',
    textPrimary: '--pf-v6-global--Color--100',
    textSecondary: '--pf-v6-global--Color--200',
    background: '--pf-v6-global--BackgroundColor--100',
    disabledText: '--pf-v6-global--disabled-color--100',
    border: '--pf-v6-global--BorderColor--100',
    hoverBackground: '--pf-v6-global--BackgroundColor--hover',
    stripedRow: '--pf-v6-global--BackgroundColor--200',
    darkBackground: '--pf-v6-global--BackgroundColor--dark-100',
    darkSurface: '--pf-v6-global--BackgroundColor--dark-200',
    darkPrimary: '--pf-v6-global--primary-color--dark',
    darkTextPrimary: '--pf-v6-global--Color--dark-100',
    darkTextSecondary: '--pf-v6-global--Color--dark-200',
    darkBorder: '--pf-v6-global--BorderColor--dark',
    tooltipBackground: '--pf-v6-c-tooltip--BackgroundColor',
  };

  // Check if color matches any PatternFly token
  const matchingToken = Object.entries(PATTERNFLY_TOKENS.colors).find(([key, value]) =>
    compareColor(colorHex, value)
  );

  if (matchingToken) {
    const tokenName = colorTokens[matchingToken[0]] || `--pf-v6-global--${matchingToken[0]}`;
    report.addFinding('compliant', 'Colors', name,
      `Using PatternFly color: ${tokenName} (${colorHex})`, null, nodeId);
  } else {
    // Check if it's close to a PatternFly color
    const closeToken = Object.entries(PATTERNFLY_TOKENS.colors).find(([key, value]) => {
      const diff = Math.abs(
        parseInt(colorHex.slice(1), 16) - parseInt(value.slice(1), 16)
      );
      return diff < 100000; // Somewhat close
    });

    if (closeToken) {
      const tokenName = colorTokens[closeToken[0]] || `--pf-v6-global--${closeToken[0]}`;
      report.addFinding('warning', 'Colors', name,
        `Using ${colorHex} which is close to ${tokenName} (${closeToken[1]})`,
        `Consider using ${tokenName} (${closeToken[1]})`, nodeId);
    }
  }
}

function analyzeSpacing(node, report) {
  const name = node.name;
  const nodeId = node.id;

  // Map spacing values to tokens
  const spacingTokens = {
    4: '--pf-v6-global--spacer--xs',
    8: '--pf-v6-global--spacer--sm',
    16: '--pf-v6-global--spacer--md',
    24: '--pf-v6-global--spacer--lg',
    32: '--pf-v6-global--spacer--xl',
    48: '--pf-v6-global--spacer--2xl',
    64: '--pf-v6-global--spacer--3xl'
  };

  // Check padding
  if (node.paddingLeft !== undefined) {
    const padding = node.paddingLeft;
    const validSpacings = Object.values(PATTERNFLY_TOKENS.spacing);

    if (validSpacings.includes(padding)) {
      const spacingName = Object.keys(PATTERNFLY_TOKENS.spacing).find(
        key => PATTERNFLY_TOKENS.spacing[key] === padding
      );
      const token = spacingTokens[padding];
      report.addFinding('compliant', 'Spacing', name,
        `Padding matches PatternFly spacing scale: ${token} (${padding}px)`);
    } else if (padding > 0) {
      const nearest = validSpacings.reduce((prev, curr) =>
        Math.abs(curr - padding) < Math.abs(prev - padding) ? curr : prev
      );
      const token = spacingTokens[nearest];

      if (Math.abs(padding - nearest) <= 4) {
        report.addFinding('warning', 'Spacing', name,
          `Padding is ${padding}px (closest valid: ${token}: ${nearest}px)`,
          `Consider using ${token} (${nearest}px)`);
      } else {
        report.addFinding('critical', 'Spacing', name,
          `Padding ${padding}px doesn't follow 8px base spacing scale`,
          `Use a value from PatternFly spacing scale (e.g., ${token}: ${nearest}px)`);
      }
    }
  }

  // Check item spacing (gap between items)
  if (node.itemSpacing !== undefined) {
    const spacing = node.itemSpacing;
    const validSpacings = Object.values(PATTERNFLY_TOKENS.spacing);

    if (validSpacings.includes(spacing)) {
      const token = spacingTokens[spacing];
      report.addFinding('compliant', 'Spacing', name,
        `Item spacing matches PatternFly scale: ${token} (${spacing}px)`);
    } else if (spacing > 0 && !validSpacings.includes(spacing)) {
      const nearest = validSpacings.reduce((prev, curr) =>
        Math.abs(curr - spacing) < Math.abs(prev - spacing) ? curr : prev
      );
      const token = spacingTokens[nearest];

      report.addFinding('warning', 'Spacing', name,
        `Item spacing is ${spacing}px (recommended: ${token}: ${nearest}px)`,
        `Use ${token} (${nearest}px)`);
    }
  }
}

function analyzeAlert(node, report) {
  const name = node.name;

  // Check padding
  if (node.paddingLeft !== undefined) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.alert.padding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Alerts', name, `Correct padding: --pf-v6-c-alert--Padding (${padding}px)`);
    } else if (Math.abs(padding - expectedPadding) <= 4) {
      report.addFinding('warning', 'Alerts', name,
        `Padding is ${padding}px (expected --pf-v6-c-alert--Padding: ${expectedPadding}px)`,
        `Adjust padding to --pf-v6-c-alert--Padding (${expectedPadding}px)`);
    } else {
      report.addFinding('critical', 'Alerts', name,
        `Padding is ${padding}px (expected --pf-v6-c-alert--Padding: ${expectedPadding}px)`,
        `Change padding to --pf-v6-c-alert--Padding (${expectedPadding}px)`);
    }
  }

  // Check for border-left (indicator)
  if (node.strokes && node.strokes.length > 0) {
    const strokeWeight = node.strokeWeight || 0;
    const expectedBorderWidth = PATTERNFLY_TOKENS.components.alert.borderLeftWidth;

    if (strokeWeight === expectedBorderWidth) {
      report.addFinding('compliant', 'Alerts', name, `Correct border indicator: --pf-v6-c-alert--BorderLeftWidth (${strokeWeight}px)`);
    } else {
      report.addFinding('warning', 'Alerts', name,
        `Border indicator is ${strokeWeight}px (expected --pf-v6-c-alert--BorderLeftWidth: ${expectedBorderWidth}px)`,
        `Set to --pf-v6-c-alert--BorderLeftWidth (${expectedBorderWidth}px)`);
    }
  }

  // Check icon size if children contain icons
  if (node.children) {
    node.children.forEach(child => {
      if (child.name && child.name.toLowerCase().includes('icon')) {
        const bounds = child.absoluteBoundingBox;
        if (bounds) {
          const size = Math.round(bounds.width);
          const expectedSize = PATTERNFLY_TOKENS.components.alert.iconSize;

          if (size === expectedSize) {
            report.addFinding('compliant', 'Alerts', `${name} > Icon`, `Correct icon size: --pf-v6-global--icon--FontSize--md (${size}px)`);
          } else {
            report.addFinding('warning', 'Alerts', `${name} > Icon`,
              `Icon size is ${size}px (expected --pf-v6-global--icon--FontSize--md: ${expectedSize}px)`,
              `Resize icon to --pf-v6-global--icon--FontSize--md (${expectedSize}px)`);
          }
        }
      }
    });
  }
}

function analyzeNavigation(node, report) {
  const name = node.name;
  const nodeId = node.id;

  // Skip if it's an icon
  if (isLikelyIcon(node)) {
    return;
  }

  // Skip if it's a large container (entire nav section)
  if (isLikelyContainer(node, 'navigation')) {
    return;
  }

  // Check nav item height
  if (node.absoluteBoundingBox) {
    const height = Math.round(node.absoluteBoundingBox.height);
    const width = Math.round(node.absoluteBoundingBox.width);
    const expectedHeight = PATTERNFLY_TOKENS.components.nav.itemHeight;

    // Nav items should be 28-60px height, 60px+ width
    if (height < 28 || height > 100 || width < 40) {
      return; // Skip - likely text, icon, or tiny element
    }

    if (height === expectedHeight) {
      report.addFinding('compliant', 'Navigation', name,
        `Correct item height: --pf-v6-c-nav__link--Height (${height}px)`, null, nodeId);
    } else if (Math.abs(height - expectedHeight) <= 4) {
      report.addFinding('warning', 'Navigation', name,
        `Item height is ${height}px (expected --pf-v6-c-nav__link--Height: ${expectedHeight}px)`,
        `Adjust to --pf-v6-c-nav__link--Height (${expectedHeight}px)`, nodeId);
    } else {
      report.addFinding('critical', 'Navigation', name,
        `Item height is ${height}px (expected --pf-v6-c-nav__link--Height: ${expectedHeight}px)`,
        `Change height to --pf-v6-c-nav__link--Height (${expectedHeight}px)`, nodeId);
    }
  }

  // Check padding
  if (node.paddingLeft !== undefined) {
    const paddingX = node.paddingLeft;
    const expectedPaddingX = PATTERNFLY_TOKENS.components.nav.itemPaddingX;

    if (paddingX === expectedPaddingX) {
      report.addFinding('compliant', 'Navigation', name, `Correct horizontal padding: --pf-v6-c-nav__link--PaddingX (${paddingX}px)`);
    } else {
      report.addFinding('warning', 'Navigation', name,
        `Horizontal padding is ${paddingX}px (expected --pf-v6-c-nav__link--PaddingX: ${expectedPaddingX}px)`,
        `Adjust to --pf-v6-c-nav__link--PaddingX (${expectedPaddingX}px)`);
    }
  }

  // Check active indicator
  if (node.name.toLowerCase().includes('active')) {
    if (node.strokes && node.strokes.length > 0) {
      const strokeWeight = node.strokeWeight || 0;
      const expectedWidth = PATTERNFLY_TOKENS.components.nav.activeIndicatorWidth;

      if (strokeWeight === expectedWidth) {
        report.addFinding('compliant', 'Navigation', name, `Correct active indicator: --pf-v6-c-nav__link--m-current--BorderLeftWidth (${strokeWeight}px)`);
      } else {
        report.addFinding('warning', 'Navigation', name,
          `Active indicator is ${strokeWeight}px (expected --pf-v6-c-nav__link--m-current--BorderLeftWidth: ${expectedWidth}px)`,
          `Set to --pf-v6-c-nav__link--m-current--BorderLeftWidth (${expectedWidth}px)`);
      }
    }
  }
}

function analyzeTable(node, report) {
  const name = node.name;
  const nameLower = name.toLowerCase();
  const nodeId = node.id;

  // Skip if it's an icon
  if (isLikelyIcon(node)) {
    return;
  }

  // Skip if it's a child text element
  if (isChildTextElement(node)) {
    return;
  }

  // Check row height
  if (node.absoluteBoundingBox && (nameLower.includes('row') || nameLower.includes('cell'))) {
    const height = Math.round(node.absoluteBoundingBox.height);
    const width = Math.round(node.absoluteBoundingBox.width);
    const expectedHeight = PATTERNFLY_TOKENS.components.table.rowHeight;
    const compactHeight = PATTERNFLY_TOKENS.components.table.compactRowHeight;

    // Table rows should be 30-70px height, 60px+ width
    if (height < 30 || height > 70 || width < 40) {
      return; // Skip - likely text content, icon, or not a table row
    }

    if (height === expectedHeight) {
      report.addFinding('compliant', 'Tables', name,
        `Correct row height: --pf-v6-c-table__tr--Height (${height}px)`, null, nodeId);
    } else if (height === compactHeight) {
      report.addFinding('compliant', 'Tables', name,
        `Correct compact row height: --pf-v6-c-table--m-compact__tr--Height (${height}px)`, null, nodeId);
    } else if (Math.abs(height - expectedHeight) <= 4 || Math.abs(height - compactHeight) <= 2) {
      report.addFinding('warning', 'Tables', name,
        `Row height is ${height}px (expected --pf-v6-c-table__tr--Height: ${expectedHeight}px or --pf-v6-c-table--m-compact__tr--Height: ${compactHeight}px)`,
        `Adjust to --pf-v6-c-table__tr--Height (${expectedHeight}px) or --pf-v6-c-table--m-compact__tr--Height (${compactHeight}px)`, nodeId);
    } else {
      report.addFinding('critical', 'Tables', name,
        `Row height is ${height}px (expected --pf-v6-c-table__tr--Height: ${expectedHeight}px or --pf-v6-c-table--m-compact__tr--Height: ${compactHeight}px)`,
        `Change to --pf-v6-c-table__tr--Height (${expectedHeight}px) or --pf-v6-c-table--m-compact__tr--Height (${compactHeight}px)`, nodeId);
    }
  }

  // Check cell padding
  if (node.paddingLeft !== undefined && nameLower.includes('cell')) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.table.cellPadding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Tables', name, `Correct cell padding: --pf-v6-c-table__td--Padding (${padding}px)`);
    } else {
      report.addFinding('warning', 'Tables', name,
        `Cell padding is ${padding}px (expected --pf-v6-c-table__td--Padding: ${expectedPadding}px)`,
        `Adjust to --pf-v6-c-table__td--Padding (${expectedPadding}px)`);
    }
  }

  // Check header font weight
  if (node.type === 'TEXT' && nameLower.includes('header')) {
    const fontWeight = node.style?.fontWeight || 400;
    if (fontWeight === 600) {
      report.addFinding('compliant', 'Tables', name, `Correct header font weight: --pf-v6-c-table__th--FontWeight (600)`);
    } else {
      report.addFinding('warning', 'Tables', name,
        `Header font weight is ${fontWeight} (expected --pf-v6-c-table__th--FontWeight: 600)`,
        `Change to --pf-v6-c-table__th--FontWeight (600)`);
    }
  }
}

function analyzeModal(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;

  if (!bounds) return;

  const width = Math.round(bounds.width);
  const { maxWidthSmall, maxWidthMedium, maxWidthLarge } = PATTERNFLY_TOKENS.components.modal;

  // Check modal width
  if (width === maxWidthSmall || width === maxWidthMedium || width === maxWidthLarge) {
    report.addFinding('compliant', 'Modals', name, `Correct width: --pf-v6-c-modal-box--MaxWidth (${width}px)`);
  } else {
    const validWidths = [maxWidthSmall, maxWidthMedium, maxWidthLarge];
    const nearest = validWidths.reduce((prev, curr) =>
      Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev
    );

    if (Math.abs(width - nearest) <= 20) {
      report.addFinding('warning', 'Modals', name,
        `Width is ${width}px (expected ${maxWidthSmall}px/small, ${maxWidthMedium}px/medium, or ${maxWidthLarge}px/large)`,
        `Adjust to standard modal size: --pf-v6-c-modal-box--MaxWidth (${nearest}px)`);
    } else {
      report.addFinding('critical', 'Modals', name,
        `Width is ${width}px (expected ${maxWidthSmall}px, ${maxWidthMedium}px, or ${maxWidthLarge}px)`,
        `Use standard modal width`);
    }
  }

  // Check padding
  if (node.paddingLeft !== undefined) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.modal.padding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Modals', name, `Correct padding: --pf-v6-c-modal-box--Padding (${padding}px)`);
    } else {
      report.addFinding('warning', 'Modals', name,
        `Padding is ${padding}px (expected --pf-v6-c-modal-box--Padding: ${expectedPadding}px)`,
        `Adjust to ${expectedPadding}px`);
    }
  }

  // Check header font size
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'TEXT' && child.name.toLowerCase().includes('header')) {
        const fontSize = Math.round(child.style?.fontSize || 0);
        const expectedSize = PATTERNFLY_TOKENS.components.modal.headerSize;

        if (fontSize === expectedSize) {
          report.addFinding('compliant', 'Modals', `${name} > Header`, `Correct header font size: --pf-v6-c-modal-box__title--FontSize (${fontSize}px)`);
        } else {
          report.addFinding('warning', 'Modals', `${name} > Header`,
            `Header font size is ${fontSize}px (expected --pf-v6-c-modal-box__title--FontSize: ${expectedSize}px)`,
            `Set to ${expectedSize}px`);
        }
      }
    });
  }
}

function analyzeTooltip(node, report) {
  const name = node.name;

  // Check padding
  if (node.paddingLeft !== undefined) {
    const paddingX = node.paddingLeft;
    const expectedPaddingX = PATTERNFLY_TOKENS.components.tooltip.paddingX;

    if (paddingX === expectedPaddingX) {
      report.addFinding('compliant', 'Tooltips', name, `Correct horizontal padding: --pf-v6-c-tooltip--PaddingX (${paddingX}px)`);
    } else {
      report.addFinding('warning', 'Tooltips', name,
        `Horizontal padding is ${paddingX}px (expected ${expectedPaddingX}px)`,
        `Adjust to ${expectedPaddingX}px`);
    }
  }

  // Check border radius
  if (node.cornerRadius !== undefined) {
    const radius = node.cornerRadius;
    const expectedRadius = PATTERNFLY_TOKENS.components.tooltip.borderRadius;

    if (radius === expectedRadius) {
      report.addFinding('compliant', 'Tooltips', name, `Correct border radius: --pf-v6-c-tooltip--BorderRadius (${radius}px)`);
    } else {
      report.addFinding('warning', 'Tooltips', name,
        `Border radius is ${radius}px (expected --pf-v6-c-tooltip--BorderRadius: ${expectedRadius}px)`,
        `Change to --pf-v6-c-tooltip--BorderRadius (${expectedRadius}px)`);
    }
  }

  // Check max width
  if (node.absoluteBoundingBox) {
    const width = Math.round(node.absoluteBoundingBox.width);
    const maxWidth = PATTERNFLY_TOKENS.components.tooltip.maxWidth;

    if (width <= maxWidth) {
      report.addFinding('compliant', 'Tooltips', name, `Within max width: --pf-v6-c-tooltip--MaxWidth (${width}px <= ${maxWidth}px)`);
    } else {
      report.addFinding('critical', 'Tooltips', name,
        `Width ${width}px exceeds max-width of ${maxWidth}px`,
        `Reduce width to ${maxWidth}px or less`);
    }
  }

  // Check text size
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'TEXT') {
        const fontSize = Math.round(child.style?.fontSize || 0);
        const expectedSize = PATTERNFLY_TOKENS.components.tooltip.fontSize;

        if (fontSize === expectedSize) {
          report.addFinding('compliant', 'Tooltips', `${name} > Text`, `Correct font size: --pf-v6-global--FontSize--sm (${fontSize}px)`);
        } else {
          report.addFinding('warning', 'Tooltips', `${name} > Text`,
            `Font size is ${fontSize}px (expected ${expectedSize}px)`,
            `Set to ${expectedSize}px`);
        }
      }
    });
  }
}

function analyzePagination(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;

  if (!bounds) return;

  const height = Math.round(bounds.height);
  const width = Math.round(bounds.width);
  const expectedHeight = PATTERNFLY_TOKENS.components.pagination.buttonHeight;
  const expectedMinWidth = PATTERNFLY_TOKENS.components.pagination.buttonMinWidth;

  // Check button height
  if (height === expectedHeight) {
    report.addFinding('compliant', 'Pagination', name, `Correct button height: --pf-v6-c-pagination__nav-page-select--Height (${height}px)`);
  } else if (Math.abs(height - expectedHeight) <= 2) {
    report.addFinding('warning', 'Pagination', name,
      `Button height is ${height}px (expected ${expectedHeight}px)`,
      `Adjust to ${expectedHeight}px`);
  } else {
    report.addFinding('critical', 'Pagination', name,
      `Button height is ${height}px (expected ${expectedHeight}px)`,
      `Change to ${expectedHeight}px`);
  }

  // Check min width
  if (width >= expectedMinWidth) {
    report.addFinding('compliant', 'Pagination', name, `Meets minimum width: --pf-v6-c-pagination__nav-page-select--MinWidth (${width}px >= ${expectedMinWidth}px)`);
  } else {
    report.addFinding('warning', 'Pagination', name,
      `Width ${width}px is below minimum ${expectedMinWidth}px`,
      `Increase to at least ${expectedMinWidth}px`);
  }
}

function analyzeBreadcrumb(node, report) {
  const name = node.name;

  // Check item spacing
  if (node.itemSpacing !== undefined) {
    const spacing = node.itemSpacing;
    const expectedSpacing = PATTERNFLY_TOKENS.components.breadcrumb.itemSpacing;

    if (spacing === expectedSpacing) {
      report.addFinding('compliant', 'Breadcrumbs', name, `Correct item spacing: --pf-v6-c-breadcrumb__item--MarginRight (${spacing}px)`);
    } else {
      report.addFinding('warning', 'Breadcrumbs', name,
        `Item spacing is ${spacing}px (expected ${expectedSpacing}px)`,
        `Adjust to ${expectedSpacing}px`);
    }
  }

  // Check font size
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'TEXT') {
        const fontSize = Math.round(child.style?.fontSize || 0);
        const expectedSize = PATTERNFLY_TOKENS.components.breadcrumb.fontSize;

        if (fontSize === expectedSize) {
          report.addFinding('compliant', 'Breadcrumbs', `${name} > Text`, `Correct font size: --pf-v6-global--FontSize--md (${fontSize}px)`);
        } else {
          report.addFinding('warning', 'Breadcrumbs', `${name} > Text`,
            `Font size is ${fontSize}px (expected ${expectedSize}px)`,
            `Set to ${expectedSize}px`);
        }
      }
    });
  }
}

function analyzeBadge(node, report) {
  const name = node.name;

  // Check border radius (should be pill-shaped)
  if (node.cornerRadius !== undefined) {
    const radius = node.cornerRadius;
    const expectedRadius = PATTERNFLY_TOKENS.components.badge.borderRadius;

    if (radius === expectedRadius) {
      report.addFinding('compliant', 'Badges', name, `Correct border radius (${radius}px - pill shape)`);
    } else if (radius >= 20) {
      report.addFinding('compliant', 'Badges', name, `Border radius --pf-v6-c-badge--BorderRadius (${radius}px) creates pill shape`);
    } else {
      report.addFinding('warning', 'Badges', name,
        `Border radius is ${radius}px (expected ${expectedRadius}px for pill shape)`,
        `Change to ${expectedRadius}px`);
    }
  }

  // Check padding
  if (node.paddingLeft !== undefined) {
    const paddingX = node.paddingLeft;
    const expectedPaddingX = PATTERNFLY_TOKENS.components.badge.paddingX;

    if (paddingX === expectedPaddingX) {
      report.addFinding('compliant', 'Badges', name, `Correct horizontal padding: --pf-v6-c-badge--PaddingX (${paddingX}px)`);
    } else {
      report.addFinding('warning', 'Badges', name,
        `Horizontal padding is ${paddingX}px (expected ${expectedPaddingX}px)`,
        `Adjust to ${expectedPaddingX}px`);
    }
  }

  // Check font size and weight
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'TEXT') {
        const fontSize = Math.round(child.style?.fontSize || 0);
        const fontWeight = child.style?.fontWeight || 400;
        const expectedSize = PATTERNFLY_TOKENS.components.badge.fontSize;
        const expectedWeight = PATTERNFLY_TOKENS.components.badge.fontWeight;

        if (fontSize === expectedSize) {
          report.addFinding('compliant', 'Badges', `${name} > Text`, `Correct font size: --pf-v6-c-badge--FontSize (${fontSize}px)`);
        } else {
          report.addFinding('warning', 'Badges', `${name} > Text`,
            `Font size is ${fontSize}px (expected ${expectedSize}px)`,
            `Set to ${expectedSize}px`);
        }

        if (fontWeight === expectedWeight) {
          report.addFinding('compliant', 'Badges', `${name} > Text`, `Correct font weight: --pf-v6-c-badge--FontWeight (${fontWeight})`);
        } else {
          report.addFinding('warning', 'Badges', `${name} > Text`,
            `Font weight is ${fontWeight} (expected ${expectedWeight})`,
            `Set to font-weight: ${expectedWeight}`);
        }
      }
    });
  }
}

function analyzeTab(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;

  if (!bounds) return;

  const height = Math.round(bounds.height);
  const expectedHeight = PATTERNFLY_TOKENS.components.tab.height;

  // Check tab height
  if (height === expectedHeight) {
    report.addFinding('compliant', 'Tabs', name, `Correct height: --pf-v6-c-tabs__link--Height (${height}px)`);
  } else if (Math.abs(height - expectedHeight) <= 4) {
    report.addFinding('warning', 'Tabs', name,
      `Height is ${height}px (expected ${expectedHeight}px)`,
      `Adjust to ${expectedHeight}px`);
  } else {
    report.addFinding('critical', 'Tabs', name,
      `Height is ${height}px (expected ${expectedHeight}px)`,
      `Change to ${expectedHeight}px`);
  }

  // Check padding
  if (node.paddingLeft !== undefined) {
    const paddingX = node.paddingLeft;
    const expectedPaddingX = PATTERNFLY_TOKENS.components.tab.paddingX;

    if (paddingX === expectedPaddingX) {
      report.addFinding('compliant', 'Tabs', name, `Correct horizontal padding: --pf-v6-c-tabs__link--PaddingX (${paddingX}px)`);
    } else {
      report.addFinding('warning', 'Tabs', name,
        `Horizontal padding is ${paddingX}px (expected ${expectedPaddingX}px)`,
        `Adjust to ${expectedPaddingX}px`);
    }
  }

  // Check active indicator
  if (node.name.toLowerCase().includes('active')) {
    if (node.strokes && node.strokes.length > 0) {
      const strokeWeight = node.strokeWeight || 0;
      const expectedWidth = PATTERNFLY_TOKENS.components.tab.activeIndicatorWidth;

      if (strokeWeight === expectedWidth) {
        report.addFinding('compliant', 'Tabs', name, `Correct active indicator: --pf-v6-c-tabs__link--m-current--BorderBottomWidth (${strokeWeight}px)`);
      } else {
        report.addFinding('warning', 'Tabs', name,
          `Active indicator is ${strokeWeight}px (expected ${expectedWidth}px)`,
          `Set bottom border to ${expectedWidth}px`);
      }
    }
  }
}

function analyzeAccordion(node, report) {
  const name = node.name;

  // Check header padding
  if (node.paddingLeft !== undefined && node.name.toLowerCase().includes('header')) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.accordion.headerPadding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Accordions', name, `Correct header padding: --pf-v6-c-accordion__toggle--Padding (${padding}px)`);
    } else {
      report.addFinding('warning', 'Accordions', name,
        `Header padding is ${padding}px (expected ${expectedPadding}px)`,
        `Adjust to ${expectedPadding}px`);
    }
  }

  // Check content padding
  if (node.paddingLeft !== undefined && node.name.toLowerCase().includes('content')) {
    const paddingX = node.paddingLeft;
    const expectedPaddingX = PATTERNFLY_TOKENS.components.accordion.contentPaddingX;

    if (paddingX === expectedPaddingX) {
      report.addFinding('compliant', 'Accordions', name, `Correct content padding: --pf-v6-c-accordion__expanded-content--PaddingX (${paddingX}px)`);
    } else {
      report.addFinding('warning', 'Accordions', name,
        `Content padding is ${paddingX}px (expected ${expectedPaddingX}px)`,
        `Adjust to ${expectedPaddingX}px`);
    }
  }

  // Check icon size
  if (node.children) {
    node.children.forEach(child => {
      if (child.name && child.name.toLowerCase().includes('icon')) {
        const bounds = child.absoluteBoundingBox;
        if (bounds) {
          const size = Math.round(bounds.width);
          const expectedSize = PATTERNFLY_TOKENS.components.accordion.iconSize;

          if (size === expectedSize) {
            report.addFinding('compliant', 'Accordions', `${name} > Icon`, `Correct icon size: --pf-v6-global--icon--FontSize--md (${size}px)`);
          } else {
            report.addFinding('warning', 'Accordions', `${name} > Icon`,
              `Icon size is ${size}px (expected ${expectedSize}px)`,
              `Resize to ${expectedSize}px`);
          }
        }
      }
    });
  }

  // Check border
  if (node.strokes && node.strokes.length > 0) {
    const strokeWeight = node.strokeWeight || 0;
    const expectedBorderWidth = PATTERNFLY_TOKENS.components.accordion.borderWidth;

    if (strokeWeight === expectedBorderWidth) {
      report.addFinding('compliant', 'Accordions', name, `Correct border width: --pf-v6-c-accordion--BorderWidth (${strokeWeight}px)`);
    } else {
      report.addFinding('warning', 'Accordions', name,
        `Border width is ${strokeWeight}px (expected ${expectedBorderWidth}px)`,
        `Set to ${expectedBorderWidth}px`);
    }
  }
}

function analyzeWizard(node, report) {
  const name = node.name;

  // Check step indicator size
  if (node.absoluteBoundingBox && node.name.toLowerCase().includes('step')) {
    const width = Math.round(node.absoluteBoundingBox.width);
    const height = Math.round(node.absoluteBoundingBox.height);
    const expectedSize = PATTERNFLY_TOKENS.components.wizard.stepIndicatorSize;

    if (width === expectedSize && height === expectedSize) {
      report.addFinding('compliant', 'Wizards', name, `Correct step indicator size: --pf-v6-c-wizard__nav-link-toggle-icon--Width (${width}x${height}px)`);
    } else {
      report.addFinding('warning', 'Wizards', name,
        `Step indicator is ${width}x${height}px (expected ${expectedSize}x${expectedSize}px)`,
        `Resize to ${expectedSize}x${expectedSize}px`);
    }
  }

  // Check step spacing
  if (node.itemSpacing !== undefined && node.name.toLowerCase().includes('step')) {
    const spacing = node.itemSpacing;
    const expectedSpacing = PATTERNFLY_TOKENS.components.wizard.stepSpacing;

    if (spacing === expectedSpacing) {
      report.addFinding('compliant', 'Wizards', name, `Correct step spacing: --pf-v6-c-wizard__nav-link--MarginRight (${spacing}px)`);
    } else {
      report.addFinding('warning', 'Wizards', name,
        `Step spacing is ${spacing}px (expected ${expectedSpacing}px)`,
        `Adjust to ${expectedSpacing}px`);
    }
  }

  // Check footer padding
  if (node.paddingLeft !== undefined && node.name.toLowerCase().includes('footer')) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.wizard.footerPadding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Wizards', name, `Correct footer padding: --pf-v6-c-wizard__footer--Padding (${padding}px)`);
    } else {
      report.addFinding('warning', 'Wizards', name,
        `Footer padding is ${padding}px (expected ${expectedPadding}px)`,
        `Adjust to ${expectedPadding}px`);
    }
  }

  // Check button spacing
  if (node.itemSpacing !== undefined && node.name.toLowerCase().includes('button')) {
    const spacing = node.itemSpacing;
    const expectedSpacing = PATTERNFLY_TOKENS.components.wizard.buttonSpacing;

    if (spacing === expectedSpacing) {
      report.addFinding('compliant', 'Wizards', name, `Correct button spacing: --pf-v6-c-wizard__footer-button--MarginRight (${spacing}px)`);
    } else {
      report.addFinding('warning', 'Wizards', name,
        `Button spacing is ${spacing}px (expected ${expectedSpacing}px)`,
        `Adjust to ${expectedSpacing}px`);
    }
  }
}

function analyzeDrawer(node, report) {
  const name = node.name;
  const bounds = node.absoluteBoundingBox;

  if (!bounds) return;

  const width = Math.round(bounds.width);
  const minWidth = PATTERNFLY_TOKENS.components.drawer.minWidth;

  // Check minimum width
  if (width >= minWidth) {
    report.addFinding('compliant', 'Drawers', name, `Meets minimum width: --pf-v6-c-drawer__panel--MinWidth (${width}px >= ${minWidth}px)`);
  } else {
    report.addFinding('critical', 'Drawers', name,
      `Width ${width}px is below minimum ${minWidth}px`,
      `Increase to at least ${minWidth}px`);
  }

  // Check padding
  if (node.paddingLeft !== undefined) {
    const padding = node.paddingLeft;
    const expectedPadding = PATTERNFLY_TOKENS.components.drawer.padding;

    if (padding === expectedPadding) {
      report.addFinding('compliant', 'Drawers', name, `Correct padding: --pf-v6-c-drawer__body--Padding (${padding}px)`);
    } else {
      report.addFinding('warning', 'Drawers', name,
        `Padding is ${padding}px (expected --pf-v6-c-modal-box--Padding: ${expectedPadding}px)`,
        `Adjust to ${expectedPadding}px`);
    }
  }

  // Check header font size
  if (node.children) {
    node.children.forEach(child => {
      if (child.type === 'TEXT' && child.name.toLowerCase().includes('header')) {
        const fontSize = Math.round(child.style?.fontSize || 0);
        const expectedSize = PATTERNFLY_TOKENS.components.drawer.headerSize;

        if (fontSize === expectedSize) {
          report.addFinding('compliant', 'Drawers', `${name} > Header`, `Correct header font size: --pf-v6-c-drawer__head-title--FontSize (${fontSize}px)`);
        } else {
          report.addFinding('warning', 'Drawers', `${name} > Header`,
            `Header font size is ${fontSize}px (expected --pf-v6-c-modal-box__title--FontSize: ${expectedSize}px)`,
            `Set to ${expectedSize}px`);
        }
      }

      // Check close button size
      if (child.name.toLowerCase().includes('close')) {
        const childBounds = child.absoluteBoundingBox;
        if (childBounds) {
          const size = Math.round(childBounds.width);
          const expectedSize = PATTERNFLY_TOKENS.components.drawer.closeButtonSize;

          if (size === expectedSize) {
            report.addFinding('compliant', 'Drawers', `${name} > Close Button`, `Correct size: --pf-v6-c-drawer__close--Width (${size}px)`);
          } else {
            report.addFinding('warning', 'Drawers', `${name} > Close Button`,
              `Size is ${size}px (expected ${expectedSize}px)`,
              `Resize to ${expectedSize}px`);
          }
        }
      }
    });
  }
}

// Main analysis function
async function analyzeFigmaFile(fileUrl) {
  try {
    // Extract file ID
    const fileId = extractFileId(fileUrl);

    // Fetch file data
    const fileData = await fetchFigmaFile(fileId);

    // Create report with Figma URL and file ID for deep linking
    const report = new ComplianceReport(fileData.name, fileUrl, fileId);

    console.log('Analyzing design...');

    // Analyze document
    if (fileData.document) {
      analyzeNode(fileData.document, report);
    }

    console.log('\nAnalysis complete!');
    console.log(`- Total elements checked: ${report.findings.critical.length + report.findings.warning.length + report.findings.compliant.length}`);
    console.log(`- Critical violations: ${report.findings.critical.length}`);
    console.log(`- Minor deviations: ${report.findings.warning.length}`);
    console.log(`- Compliant elements: ${report.findings.compliant.length}`);
    console.log(`- Overall score: ${report.getScore()}%`);

    // Generate HTML report
    const html = report.generateHTML();
    const outputPath = path.join(process.cwd(), `patternfly-compliance-report-${Date.now()}.html`);
    fs.writeFileSync(outputPath, html, 'utf-8');

    console.log(`\n✓ Report saved to: ${outputPath}`);

    const openCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${openCmd} "${outputPath}"`, () => {});

    return report;
  } catch (error) {
    console.error(`\n✗ Error: ${error.message}`);
    process.exit(1);
  }
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
PatternFly v6 Design Compliance Checker

Usage:
  node patternfly-check.js <figma-file-url>

Example:
  node patternfly-check.js https://www.figma.com/file/ABC123/My-Design

The tool will:
  1. Fetch your Figma file via API
  2. Analyze components against PatternFly v6 standards
  3. Generate an HTML compliance report with scores

Make sure your Figma token is configured in:
  ${CONFIG_PATH}
`);
  process.exit(0);
}

const figmaUrl = args[0];
analyzeFigmaFile(figmaUrl);
