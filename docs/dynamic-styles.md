# Dynamic styles

In this guide, we're going to be making our CSS styles dynamic, based on your React component's props.

This technique is similar to the ones found in [Styled Components](https://www.styled-components.com/).

You can define dynamic styles by passing a `function` into `fancy`. It will have access to a component's `props`, allowing you to define custom rules for various `prop` values.

### Example

```jsx
const Card = props => <div {...props} />
const css = props => `
  div {
    background: ${props.title ? 'red' : 'blue'};
    position: relative;
    border: 1px solid black;
  }
`
const StyledCard = styled(Card)(css)
```

### 🤔 How does it work…

Under the hood, Fancy does a `diff` check in it's virtual Stylesheet (not unlike how React handles VDOM diffing) every time a [component updates](https://reactjs.org/docs/react-component.html#componentdidupdate). If an update occurs, it regenerates the style rules and re-injects it into the document stylesheet.

## See also

- [Primitives](./primitives.md)
- [Component styling](./component-styling.md)
- [Style interpolation](./style-interpolation.md)
- [Theming](./theming.md)
