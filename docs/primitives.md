# Primitives

Fancy has the ability to create styled HTML primitive components \(heavily inspired by [styled-components](https://www.styled-components.com/)\).

### Example

```jsx
import styled from '@helpscout/fancy'

const Card = styled('div')`
  background: yellow;
  position: relative;
  border: 1px solid black;
`

const App = () => (
  <div id="App">
    <Card />
  </div>
)
```

## See also

* [Scoping](scoping.md)
* [Theming](theming.md)

