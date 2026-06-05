Example file with various design token violations
Use this to test /pf-design-token-check

SCSS examples:
```scss
.example-button {
  /* Color violations */
  background-color: #c9190b;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);

  /* Spacing violations */
  padding: 16px 24px;
  margin-bottom: 8px;
  gap: 12px;

  /* Typography violations */
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;

  /* Shadow violations */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  /* Border radius violations */
  border-radius: 4px;
}

.example-nav {
  .pf-c-nav__link {
    padding-inline-start: 16px;
    color: #06c;
  }
}
```

CSS-in-JS style object example (in a .tsx file this would be):
```tsx
const styles = {
  container: {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    fontSize: '16px',
    fontWeight: 500,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }
}
```

React inline style example (in a .tsx file this would be):
```tsx
<div style={{
  color: '#151515',
  marginTop: '24px',
  borderRadius: '8px'
}}>
```