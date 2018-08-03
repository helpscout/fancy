# migration-0x-1x

Updates in `v1.0.0` may break previous implementations of Fancy. These changes include:

* No longer preserving the original classNames. Fancy now only generates hashed classNames.
* Swapping the composition order of `component` and `css`

```jsx
// Before (v0.x)
const StyledCard = fancy(css)(Card)

// After (v1.x)
const StyledCard = fancy(Card)(css)
```

