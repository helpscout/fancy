# Getting started

Under the hood, Fancy is powered by an enhanced fork of [Emotion](https://emotion.sh/). It can do everything that Emotion can!

In this guide, we're going to be "fancifying" a React component with some basic CSS styles.

### Step 1: Import Fancy

```jsx
import React from 'react'
import fancy from '@helpscout/fancy'
```

### Step 2: Define your styles

Write your CSS styles as a string. This is default out-of-the-box CSS. Use things like `:hover`, `@media` queries, as you normally would!

```jsx
;`
  background: white;
  border: 1px solid #eee;
`
```

Note: You can of course use string interpolation. It's still JS after all!

### Step 3: Create your component

Create your component as you normally would.

```jsx
const Button = props => <button className="Button" {...props} />
```

Note: The reference the CSS `className` to match the CSS you wrote. Fancy does not generated uniquely hashed classNames for you. See [CSS Modules](https://github.com/css-modules/css-modules) for that feature.

### Step 4: Compose your CSS with your component

When exporting your component, compose it with the `fancy` higher-order component along with your CSS styles.

```jsx
export default styled(Buton)(css)
```

### Final code

```jsx
import React from 'react'
import fancy from '@helpscout/fancy'

const Button = props => <button className="Button" {...props} />

export default styled(Button)`
  background: white;
  border: 1px solid #eee;
`
```

### Results

```markup
<html>
  <head>
    <style type='text/css'>
    .css-123nd1 {
      background: white;
      border: 1px solid #eee;
    }
    </style>
  </head>
  <body>
    ...
    <button class='css-123nd1'>Button</button>
    ...
  </body>
</html>
```

That's it! You're done 🙌. You've created a CSS-ready component.

## See also

* [Scoping](scoping.md)
* [Theming](theming.md)

