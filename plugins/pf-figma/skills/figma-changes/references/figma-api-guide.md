# Figma API Reference Guide

## Quick Reference

### Authentication
```bash
export FIGMA_ACCESS_TOKEN="your-token-here"
```

### Common Endpoints

#### Get File
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/{file_key}"
```

**Response includes**:
- Document structure
- Styles (colors, text, effects)
- Components
- Canvas data

#### Get Version History
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/{file_key}/versions"
```

**Response includes**:
- Version ID
- Timestamp (created_at)
- User who made the change
- Description/label

#### Get Specific Version
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/{file_key}?version={version_id}"
```

#### Get File Styles
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/{file_key}/styles"
```

**Returns**:
- Published styles
- Style metadata
- Style keys

#### Get Local Variables (Design Tokens)
```bash
curl -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/{file_key}/variables/local"
```

**Returns** (if file uses Variables):
- Variable collections
- Variable names and values
- Modes (themes)

## Extracting File Key from URL

Figma URLs follow this pattern:
```
https://www.figma.com/file/{FILE_KEY}/{file-name}
```

Example:
```
https://www.figma.com/file/abc123xyz/My-Design-System
```
File key: `abc123xyz`

## Parsing Figma Data

### Color Extraction

```javascript
// From fills array
const fills = node.fills;
fills.forEach(fill => {
  if (fill.type === 'SOLID') {
    const color = fill.color; // {r, g, b, a}
    const hex = rgbToHex(color);
  }
});

// From styles
const styles = figmaData.styles;
Object.entries(styles).forEach(([key, style]) => {
  if (style.styleType === 'FILL') {
    // Color style
  }
});
```

### Typography Extraction

```javascript
const style = node.style;
const typography = {
  fontFamily: style.fontFamily,
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
  lineHeight: style.lineHeightPx,
  letterSpacing: style.letterSpacing,
  textAlignHorizontal: style.textAlignHorizontal
};
```

### Spacing Extraction

```javascript
// From layout properties
const spacing = {
  paddingLeft: node.paddingLeft,
  paddingRight: node.paddingRight,
  paddingTop: node.paddingTop,
  paddingBottom: node.paddingBottom,
  itemSpacing: node.itemSpacing, // gap in auto-layout
};
```

### Layout Properties

```javascript
const layout = {
  layoutMode: node.layoutMode, // HORIZONTAL, VERTICAL, NONE
  primaryAxisSizingMode: node.primaryAxisSizingMode,
  counterAxisSizingMode: node.counterAxisSizingMode,
  primaryAxisAlignItems: node.primaryAxisAlignItems,
  counterAxisAlignItems: node.counterAxisAlignItems,
};
```

## Rate Limiting

Figma API rate limits:
- **Personal access tokens**: 1000 requests per hour
- **OAuth tokens**: Higher limits (varies)

Check rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1234567890
```

## Error Handling

Common errors:

**401 Unauthorized**
- Invalid or missing access token
- Token doesn't have access to this file

**403 Forbidden**
- File is private and token doesn't have permission
- File has been deleted

**404 Not Found**
- Invalid file key
- File doesn't exist

**429 Too Many Requests**
- Rate limit exceeded
- Wait until reset time

## Converting Figma Values to CSS

### Colors
```javascript
// Figma: {r: 0.0, g: 0.4, b: 0.8, a: 1}
// CSS: #0066CC or rgb(0, 102, 204)
function rgbToHex({r, g, b}) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

### Font Weights
```javascript
// Figma uses numeric weights
const weightMap = {
  100: 'Thin',
  200: 'Extra Light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
  800: 'Extra Bold',
  900: 'Black'
};
```

### Line Height
```javascript
// Figma can use:
// - lineHeightPx (absolute pixels)
// - lineHeightPercent (percentage)
// - Auto

// Convert to CSS line-height
const lineHeight = node.lineHeightPercent
  ? node.lineHeightPercent / 100
  : `${node.lineHeightPx}px`;
```

## Best Practices

1. **Cache API Responses**: Save responses to avoid repeated API calls
2. **Use Version IDs**: Compare specific versions rather than always using latest
3. **Batch Processing**: If checking multiple files, space out requests
4. **Error Recovery**: Implement retry logic with exponential backoff
5. **Token Security**: Never commit access tokens to version control
