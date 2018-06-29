# Scoping

Fancy comes with a special `ScopeProvider` that allows you to define additional selectors to scope your fancy `styled` component CSS under.

### Example

```jsx
<ScopeProvider scope="html #App">
  <StyledCard />
</ScopeProvider>
```

If the hashed CSS classes for `StyledCard` was `.Card__213jdhx`, they will now render as `html #App .Card__213jdhx`.

## See also

- [Primitives](./primitives.md)
- [Component styling](./component-styling.md)
- [Style interpolation](./style-interpolation.md)
- [Theming](./theming.md)
