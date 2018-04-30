# 🌟 Reactor

> A simple way to include CSS with React Components.


## 🔧 Installation

```
npm install --save @awesomecss/reactor
```


## 🕹 Usage

#### Step 1: Import `withStyles` from Reactor

```jsx
import React from 'react'
import { withStyles } from '@awesomecss/reactor'
```


#### Step 2: Define your styles

Write your CSS styles as a string. This is default out-of-the-box CSS. Use things like `:hover`, `@media` queries, as you normally would!

```jsx
const css = `
  .Button {
    background: white;
    border: 1px solid #eee;
  }
`
```

Note: You can of course use string interpolation. It's still JS after all!


#### Step 3: Create your component

Create your component as you normally would.

```jsx
const Button = props => (
  <button className='Button' {...props} />
)
```

Note: The reference the CSS `className` to match the CSS you wrote. Reactor does not generated uniquely hashed classNames for you. See [CSS Modules](https://github.com/css-modules/css-modules) for that feature.


#### Step 4: Compose your CSS with your component

When exporting your component, compose it with the `withStyles` higher-order component along with your CSS styles.

```jsx
export default withStyles(css)(Button)
```


### Final code

```jsx
import React from 'react'
import { withStyles } from '@awesomecss/reactor'

const css = `
  .Button {
    background: white;
    border: 1px solid #eee;
  }
`

const Button = props => (
  <button className='Button' {...props} />
)

export default withStyles(css)(Button)
```

#### Results

```html
<html>
  <head>
    <style type='text/css'>
    .Button {
      background: white;
      border: 1px solid #eee;
    }
    </style>
  </head>
  <body>
    ...
    <button class='Button'>Button</button>
    ...
  </body>
</html>
```

That's it! You're done 🙌. You've created a CSS-ready component.
