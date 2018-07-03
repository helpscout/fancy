// @flow
import createEmotion from '../create-emotion/index'

const context = typeof global !== 'undefined' ? global : {}

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  cssWithScope, // custom enhanced function
  sheet,
  caches,
} = createEmotion(context)
