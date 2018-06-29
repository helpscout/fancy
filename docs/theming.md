# Theming

Fancy comes with `ThemeProvider`. Added to the top-level of your app, it can modify fancy styled components via a special `props.theme` prop.

Define your theme props to `ThemeProvider` as `theme`.

### Example

```jsx
import styled, { ThemeProvider } from '@helpscout/fancy'

const css = props => `
  .Card {
    background: ${props.theme.dark ? 'black' : 'white'};
    position: relative;
    border: 1px solid black;
  }
`

const Card = props => (
  <div className="Card">
    <div className="Card__block">{props.children}</div>
  </div>
)

const StyledCard = styled(Card)(css)

const App = () => (
  <div id="App">
    <ThemeProvider theme={{ dark: true }}>
      <div>
        ...
        <StyledCard />
        ...
      </div>
    </ThemeProvider>
  </div>
)
```

## See also

- [Primitives](./primitives.md)
- [Component styling](./component-styling.md)
- [Scoping](./scoping.md)
- [Style interpolation](./style-interpolation.md)
