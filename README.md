# 🌟 Reactor [![npm version](https://badge.fury.io/js/%40awesomecss%2Freactor.svg)](https://badge.fury.io/js/%40awesomecss%2Freactor) [![Build Status](https://travis-ci.org/awesomecss/reactor.svg?branch=master)](https://travis-ci.org/awesomecss/reactor) [![Coverage Status](https://coveralls.io/repos/github/awesomecss/reactor/badge.svg?branch=master)](https://coveralls.io/github/awesomecss/reactor?branch=master)

> A simple way to include CSS with React Components.

* **Tiny**, at less than 850 bytes gzipped
* **Only one dependency - ([Stylis](https://github.com/thysultan/stylis.js))**
* **Write plain ol' CSS.** Period.
* **Built-in pre-processing** when you need it. Powered by [Stylis](https://github.com/thysultan/stylis.js).
* **Easily integrate** with your setup. No extra webpack-loaders required.


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


#### Final code

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


### Dynamic styles

You can define dynamic styles by passing a `function` into `withStyles`. It will have access to a component's `props`, allowing you to define custom rules for various `prop` values.

#### Example

```jsx
const Card = props => (<div {...props} />)
const css = (props) => `
  div {
    background: ${props.title ? 'red' : 'blue'};
    position: relative;
    border: 1px solid black;
  }
`
const StyledCard = withStyles(css)(Card)
```

This technique is similar to the ones found in [Styled Components](https://www.styled-components.com/).
