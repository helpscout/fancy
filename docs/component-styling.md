# Component styling

Fancy provides an easy to to enhance/style existing components, using conventions inspired by [styled-components](https://www.styled-components.com/).

### Example

```jsx
import styled from '@helpscout/fancy'

const Card = props => <div {...props} />

const FancyCard = styled(Card)`
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

- [Primitives](./primitives.md)
- [Style interpolation](./style-interpolation.md)
- [Theming](./theming.md)
