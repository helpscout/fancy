# ❄️ Fancy [![npm version](https://badge.fury.io/js/%40helpscout%2Ffancy.svg)](https://badge.fury.io/js/%40helpscout%2Ffancy) [![Build Status](https://travis-ci.org/helpscout/fancy.svg?branch=master)](https://travis-ci.org/helpscout/fancy) [![Coverage Status](https://coveralls.io/repos/github/helpscout/fancy/badge.svg?branch=master)](https://coveralls.io/github/helpscout/fancy?branch=master)

> A simple way to include CSS with React Components.

- **Tiny**, around 3 KB gzipped
- **One dependency** - ([Stylis](https://github.com/thysultan/stylis.js))
- **Write** plain ol' CSS. Period.
- **Pre-processing** when you need it. Powered by [Stylis](https://github.com/thysultan/stylis.js).
- **Uniquely** generated classNames, [CSS Modules](https://github.com/css-modules/css-modules) style.
- **Integrate** with ease into your existing setup. No fiddling with Webpack required.
- **HTML primitive** creation, [Styled Components](https://www.styled-components.com/) style.
- **Theming** support!

## 🔧 Installation

```
npm install --save @helpscout/fancy
```

## 🕹 Usage

Here's a quick example of how you can compose regular CSS with your React components.

```jsx
import React from 'react'
import styled from '@helpscout/fancy'

const css = `
  .Button {
    background: white;
    border: 1px solid #eee;
  }
`

const Button = props => {
  const { children, styles, ...rest } = props

  <button className={styles.Button} {...rest}>
    {children}
  </button>
}

export default styled(Button)(css)
```

## 📘 Documentation

[View the docs](./docs/) to get started with Fancy!

## Migration

- [From v0.x to v1.x](./docs/migration/migration-0x-1x.md)
