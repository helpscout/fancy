// @flow

// Tiny primitive functions to check types
export const typeOf = (o, type) => typeof o === type && o !== null

export const isArray = o => Array.isArray(o)
export const isBool = o => typeOf(o, 'boolean')
export const isFunction = o => typeOf(o, 'function')
export const isObject = o => typeOf(o, 'object')
export const isString = o => typeOf(o, 'string')
