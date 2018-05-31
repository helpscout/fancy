# Theming

Fancy comes with `Theme.Provider`. Added to the top-level of your app, it can modify fancy styled components via a special `props.theme` prop.

Define your theme props to `Theme.Provider` as `theme`.

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

## Scoping

`Theme.Provider` has another special `scope` prop that allows you to define additional selectors to scope your fancy `styled` component CSS under.

### Example

```jsx
<ThemeProvider scope="html #App">
  <StyledCard />
</ThemeProvider>
```

If the hashed CSS classes for `StyledCard` was `.Card__213jdhx`, they will now render as `html #App .Card__213jdhx`.
