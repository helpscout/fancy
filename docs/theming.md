# Theming

Fancy comes with `ThemeProvider`. Added to the top-level of your app, it can modify fancy styled components via a special `props.theme` prop.

Define your theme props to `ThemeProvider` as `theme`.

### Example

```jsx
import styled, { ThemeProvider } from '@helpscout/fancy'

const Card = props => (
  <div className="Card">
    <div className="Card__block">{props.children}</div>
  </div>
)

const StyledCard = styled(Card)`
  .Card {
    ${props =>
      props.theme.color &&
      `
      background: ${props.theme.color};
    `} position: relative;
    border: 1px solid black;
  }
`

const App = () => (
  <div id="App">
    <ThemeProvider theme={{ color: 'red' }}>
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
- [Scoping](./scoping.md)
