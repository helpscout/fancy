# Style interpolation

Fancy provides a handful of ways to add and interpolate styles with your component.

### Backticks

The easiest and recommended way is to use backticks followed be the styled component you wish to create:

```jsx
const Card = styled.div`
  background: yellow;
  position: relative;
  border: 1px solid black;
`
```

### String

You can also pass a string:

```jsx
const Card = styled.div('
  background: yellow;
  position: relative;
  border: 1px solid black;
')
```

### Function

Or even a function:

```jsx
const Card = styled.div(() => '
  background: yellow;
  position: relative;
  border: 1px solid black;
')
```

## Prop interpolation

The `props` prop is made available when styling. How you use it depends on your CSS style implementation.

### Backticks

```jsx
const Card = styled.div`
  background: ${prop => (prop.title ? 'yellow' : 'red')};
  position: relative;
  border: 1px solid black;
`
```

### String

```jsx
const Card = styled.div(`
  background: ${prop.title ? 'yellow' : 'red'};
  position: relative;
  border: 1px solid black;
`)
```

### Function

```jsx
const Card = styled.div(
  props => `
  background: ${prop.title ? 'yellow' : 'red'};
  position: relative;
  border: 1px solid black;
`
)
```

## Theming

Props defined in the [`<ThemeProvider>`](./theming.md) will be available as a special `props.theme` prop for your styling needs:

```jsx
const Card = styled.div`
  background: ${props => (props.theme === 'light' ? 'white' : 'black')};
  position: relative;
  border: 1px solid black;
`
```

## See also

- [Primitives](./primitives.md)
- [Component styling](./component-styling.md)
- [Theming](./theming.md)
