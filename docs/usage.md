# Usage

Under the hood, Fancy is powered by an enhanced fork of [Emotion](https://emotion.sh/). It can do everything that Emotion can!

No additional `emotion` dependencies are needed if you've installed Fancy. Everything needed to start styling, theming, scoping, and yes even injecting into iFrames, is provided by a single library.

Below is a detailed list of everything you can import from Fancy:

```jsx
import styled, {
  FrameProvider,
  ScopeProvider,
  ThemeProvider,
  createStyled,
  // Everything below comes from Emotion
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  cssWithScope, // A custom enhanced function, not part of Emotion ;)
  sheet,
  caches,
} from '@helpscout/fancy'
```

## See also

- [iFrames](iframes.md)
- [Scoping](scoping.md)
- [Theming](theming.md)
