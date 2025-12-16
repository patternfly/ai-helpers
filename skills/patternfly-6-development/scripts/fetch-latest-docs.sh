#!/bin/bash
#
# fetch-latest-docs.sh
# Fetches the latest PatternFly documentation from GitHub
#
# Usage: bash fetch-latest-docs.sh [topic]
#
# Topics:
#   charts          - Charts documentation
#   chatbot         - Chatbot documentation
#   components      - Component layout and data display docs
#   guidelines      - Core development guidelines
#   styling         - Styling standards
#   troubleshooting - Common issues and solutions
#   setup           - Project setup and quick start
#   all             - All documentation (default)
#

set -e

BASE_URL="https://raw.githubusercontent.com/patternfly/patternfly-ai-coding/main/.pf-ai-documentation"
TOPIC="${1:-all}"

echo "Fetching PatternFly documentation..."
echo "===================================="
echo ""

fetch_doc() {
    local path="$1"
    local name="$2"
    echo "--- $name ---"
    curl -s "${BASE_URL}/${path}" 2>/dev/null || echo "Failed to fetch: ${path}"
    echo ""
    echo ""
}

case "$TOPIC" in
    charts)
        fetch_doc "charts/README.md" "Charts Documentation"
        ;;

    chatbot)
        fetch_doc "chatbot/README.md" "Chatbot Documentation"
        ;;

    components)
        fetch_doc "components/layout/README.md" "Layout Components"
        fetch_doc "components/data-display/README.md" "Data Display Components"
        fetch_doc "components/data-display/table.md" "Table Component"
        ;;

    guidelines)
        fetch_doc "guidelines/README.md" "Core Guidelines"
        fetch_doc "guidelines/component-architecture.md" "Component Architecture"
        ;;

    styling)
        fetch_doc "guidelines/styling-standards.md" "Styling Standards"
        ;;

    troubleshooting)
        fetch_doc "troubleshooting/common-issues.md" "Common Issues"
        ;;

    setup)
        fetch_doc "setup/README.md" "Setup Guide"
        fetch_doc "setup/quick-start.md" "Quick Start"
        fetch_doc "setup/development-environment.md" "Development Environment"
        ;;

    component-groups)
        fetch_doc "component-groups/README.md" "Component Groups"
        ;;

    all)
        echo "Fetching all documentation..."
        echo ""
        fetch_doc "README.md" "Main README"
        fetch_doc "charts/README.md" "Charts"
        fetch_doc "chatbot/README.md" "Chatbot"
        fetch_doc "component-groups/README.md" "Component Groups"
        fetch_doc "guidelines/README.md" "Guidelines"
        fetch_doc "guidelines/styling-standards.md" "Styling Standards"
        fetch_doc "guidelines/component-architecture.md" "Component Architecture"
        fetch_doc "troubleshooting/common-issues.md" "Troubleshooting"
        ;;

    index|list)
        echo "Available topics:"
        echo "  charts          - Charts documentation (Victory.js/ECharts)"
        echo "  chatbot         - Chatbot component documentation"
        echo "  components      - Layout and data display components"
        echo "  component-groups - React Component Groups documentation"
        echo "  guidelines      - Core development guidelines"
        echo "  styling         - CSS classes and design tokens"
        echo "  troubleshooting - Common issues and solutions"
        echo "  setup           - Project setup and quick start"
        echo "  all             - All documentation (default)"
        echo ""
        echo "Usage: bash fetch-latest-docs.sh [topic]"
        ;;

    *)
        echo "Unknown topic: $TOPIC"
        echo ""
        echo "Available topics: charts, chatbot, components, component-groups,"
        echo "                  guidelines, styling, troubleshooting, setup, all"
        echo ""
        echo "Use 'bash fetch-latest-docs.sh list' to see all options"
        exit 1
        ;;
esac

echo "===================================="
echo "Documentation fetched successfully."
echo ""
echo "Source: https://github.com/patternfly/patternfly-ai-coding"
echo ""
echo "For more information, visit https://www.patternfly.org/"
