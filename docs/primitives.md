# Primitives

Fancy has the ability to create styled HTML primitive components (heavily inspired by [styled-components](https://www.styled-components.com/)).

### Example

```jsx
import styled from '@helpscout/fancy'

const Card = styled.div`
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

Alternatively, you can create primitive components by passing a `string` that represents the component name:

```jsx
import styled from '@helpscout/fancy'

const Card = styled('div')`
  background: yellow;
  position: relative;
  border: 1px solid black;
`
```

## See also

- [Primitives](./primitives.md)
- [Style Interpolation](./style-interpolation.md)
- [Theming](./theming.md)
