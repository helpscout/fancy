# Nesting

Fancy comes with [stylis](https://github.com/thysultan/stylis.js), a tiny CSS pre-processor. This (amazing) little library provides nifty features like nesting, similar to what you'd get with Less or Sass.

### Example

```jsx
const css = `
  .Card {
    background: white;
    position: relative;
    border: 1px solid black;

    &__block {
      padding: 20px;
    }
  }
`

const Card = props => (
  <div className="Card">
    <div className="Card__block">{props.children}</div>
  </div>
)

const StyledCard = styled(Card)(css)
```
