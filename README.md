# 🦋 Fancy [![npm version](https://badge.fury.io/js/%40helpscout%2Ffancy.svg)](https://badge.fury.io/js/%40helpscout%2Ffancy) [![Build Status](https://travis-ci.org/helpscout/fancy.svg?branch=master)](https://travis-ci.org/helpscout/fancy) [![Coverage Status](https://coveralls.io/repos/github/helpscout/fancy/badge.svg?branch=master)](https://coveralls.io/github/helpscout/fancy?branch=master)

> A simple way to include CSS with React Components.

* **Tiny**, around than 1.5 KB gzipped
* **Only one dependency - ([Stylis](https://github.com/thysultan/stylis.js))**
* **Write plain ol' CSS.** Period.
* **Built-in pre-processing** when you need it. Powered by [Stylis](https://github.com/thysultan/stylis.js).
* **Generates unique classNames**, [CSS Modules](https://github.com/css-modules/css-modules) style.
* **Easily integrate** with your setup. No extra webpack-loaders required.


## 🔧 Installation

```
npm install --save @helpscout/fancy
```


## 🕹 Usage

Here's a quick example of how you can compose regular CSS with your React components.

```jsx
import React from 'react'
import fancy from '@helpscout/fancy'

const css = `
  .Button {
    background: white;
    border: 1px solid #eee;
  }
`

const Button = props => (
  <button className='Button' {...props} />
)

export default fancy(css)(Button)
```


## 📘 Documentation

[View the docs](./docs/) to get started with Fancy!
