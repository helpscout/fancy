# ❄️ Fancy

[![npm version](https://badge.fury.io/js/%40helpscout%2Ffancy.svg)](https://badge.fury.io/js/%40helpscout%2Ffancy) [![Build Status](https://travis-ci.org/helpscout/fancy.svg?branch=master)](https://travis-ci.org/helpscout/fancy) [![Coverage Status](https://coveralls.io/repos/github/helpscout/fancy/badge.svg?branch=master)](https://coveralls.io/github/helpscout/fancy?branch=master) [![npm version](https://badge.fury.io/js/%40helpscout%2Fblue.svg)](https://badge.fury.io/js/%40helpscout%2Fblue) ![node](https://img.shields.io/badge/node-8.11.3-blue.svg) ![npm](https://img.shields.io/badge/npm-5.6.0-blue.svg)

> A simple way to include CSS with React Components.

- **[Emotion](https://github.com/emotion-js/emotion)**, under the hood.
- **Write** plain ol' CSS. Period.
- **Pre-processing** when you need it. Powered by [Stylis](https://github.com/thysultan/stylis.js).
- **Integrate** with ease into your existing setup. No fiddling with Webpack required.
- **iFrame** support, out-of-the-box!
- **Theming** support!
- **Scoping**, to integrate into older (more hostile) CSS systems.

## 🔧 Installation

```
npm install --save @helpscout/fancy
```

## 🕹 Usage

Here's a quick example of how you can compose regular CSS with your React components.

```jsx
import React from 'react'
import styled from '@helpscout/fancy'

const Button = props => {
  const { children, styles, ...rest } = props

  <button className={styles.Button} {...rest}>
    {children}
  </button>
}

export default styled(Button)`
  background: white;
  border: 1px solid #eee;
`
```

## 📘 Documentation

[View the docs](./docs/) to get started with Fancy!

## 💼 Migration

- [From v1.x to v2.x](./docs/migration/migration-1x-2x.md)
- [From v0.x to v1.x](./docs/migration/migration-0x-1x.md)

## ❤️ Credit

Many thanks to the folks who built [Emotion](https://github.com/emotion-js/emotion) and [Styled Components](https://github.com/styled-components/styled-components).
