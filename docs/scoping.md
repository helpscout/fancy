# Scoping

Fancy comes with a special `ScopeProvider` that allows you to define additional selectors to scope your fancy `styled` component CSS under.

### Example

```jsx
<ScopeProvider scope="html #App">
  <StyledCard />
</ScopeProvider>
```

If the hashed CSS classes for `StyledCard` was `.css-213jdhx`, they will now render as `html #App .css-213jdhx`.

## See also

* [Primitives](primitives.md)
* [Theming](theming.md)

